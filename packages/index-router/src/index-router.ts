import {Erc20, Erc20Permit, StandardPermitArguments} from '@phuture/erc-20';
import {Address} from '@phuture/types';
import {BigNumberish, ContractTransaction, Signer, utils} from 'ethers';
import {Index} from '../../index/dist/src';
import {MintOptions} from './mint-options';
import {
	IndexRouter as IndexRouterContractInterface,
	IndexRouter__factory,
} from './types';
import {IIndexRouter} from './types/IndexRouter';

/** ### Default IndexRouter address for network */
export enum DefaultIndexRouterAddress {
	/** ### Default IndexRouter address on mainnet. */
	Mainnet = '0x7b6c3e5486d9e6959441ab554a889099eed76290',
}

/**
 * ### IndexRouter Contract
 */
export class IndexRouter {
	/** ### IndexRouter contract instance */
	public contract: IndexRouterContractInterface;

	public _signer: Signer;

	/**
	 * ### Creates a new IndexRouter instance
	 *
	 * @param contract Contract instance or address of the IndexRouter contract
	 * @param signer Signer instance
	 *
	 * @returns New IndexRouter token instance
	 */
	constructor(
		signer: Signer,
		contract:
			| IndexRouterContractInterface
			| Address = DefaultIndexRouterAddress.Mainnet,
	) {
		this._signer = signer;

		if (typeof contract === 'string') {
			if (!utils.isAddress(contract))
				throw new TypeError(`Invalid contract address: ${contract}`);

			this.contract = IndexRouter__factory.connect(contract, this._signer);
		} else this.contract = contract;
	}

	get signer(): Signer {
		return this._signer;
	}

	set signer(signer: Signer) {
		this._signer = signer;
		this.contract = IndexRouter__factory.connect(
			this.contract.address,
			this._signer,
		);
	}

	// Mint swap for native token
	mint(
		options: IIndexRouter.MintSwapValueParamsStruct,
		sellAmount: BigNumberish,
	): Promise<ContractTransaction>;
	// Mint swap for single sell token
	mint(
		options: IIndexRouter.MintSwapParamsStruct,
		sellAmount: BigNumberish,
		sellToken: Erc20,
	): Promise<ContractTransaction>;
	// Mint swap for sell token with permit
	mint(
		options: IIndexRouter.MintSwapParamsStruct,
		sellAmount: BigNumberish,
		sellToken: Erc20Permit,
		permitOptions: Omit<StandardPermitArguments, 'amount'>,
	): Promise<ContractTransaction>;

	async mint(
		options: MintOptions,
		sellAmount: BigNumberish,
		sellToken?: Erc20 | Erc20Permit,
		permitOptions?: Omit<StandardPermitArguments, 'amount'>,
	): Promise<ContractTransaction> {
		if (!sellToken)
			return this.contract.mintSwapValue(
				options as IIndexRouter.MintSwapValueParamsStruct,
				{value: sellAmount},
			);

		if (permitOptions !== undefined)
			return this.contract.mintSwapWithPermit(
				options as IIndexRouter.MintSwapParamsStruct,
				permitOptions.deadline,
				permitOptions.v,
				permitOptions.r,
				permitOptions.s,
			);

		if (await this._checkAllowance(sellToken, sellAmount))
			throw new Error('Insufficient allowance');

		return this.contract.mintSwap(options as IIndexRouter.MintSwapParamsStruct);
	}

	// Mint swap for native token
	// mintIndexAmount(
	// 	options: IIndexRouter.MintSwapValueParamsStruct,
	// 	sellAmount: BigNumberish,
	// ): Promise<BigNumber>;

	// Mint swap for single sell token
	// mintIndexAmount(
	// 	options: IIndexRouter.MintSwapParamsStruct,
	// 	sellAmount: BigNumberish,
	// 	sellToken: Erc20 | Erc20Permit,
	// ): Promise<BigNumber>;

	// TODO: implement mintIndexAmount function
	// async mintIndexAmount(
	// 	options: MintOptions,
	// 	sellAmount: BigNumberish,
	// 	sellToken?: Erc20 | Erc20Permit,
	// ): Promise<BigNumber> {
	// 	if (sellToken === undefined) {
	// 		// TODO: mintIndexAmount for native token
	// 	}

	// 	// TODO: mintIndexAmount for single sell token token

	// 	throw new Error('Not implemented');
	// }

	async burn(
		index: Address | Index,
		amount: BigNumberish,
		recipient: Address,
		permitOptions?: Omit<StandardPermitArguments, 'amount'>,
	): Promise<ContractTransaction> {
		const indexInstance =
			index instanceof Index ? index : new Index(this._signer, index);
		const burnParameters: IIndexRouter.BurnParamsStruct = {
			index: indexInstance.address,
			amount,
			recipient,
		};

		if (permitOptions !== undefined)
			return this.contract.burnWithPermit(
				burnParameters,
				permitOptions.deadline,
				permitOptions.v,
				permitOptions.r,
				permitOptions.s,
			);

		if (await this._checkAllowance(indexInstance, amount))
			throw new Error('Insufficient allowance');

		return this.contract.burn(burnParameters);
	}

	async burnSwap(
		index: Address | Index,
		amount: BigNumberish,
		recipient: Address,
		options: Pick<IIndexRouter.BurnSwapParamsStruct, 'outputAsset' | 'quotes'>,
		permitOptions?: Omit<StandardPermitArguments, 'amount'>,
	): Promise<ContractTransaction> {
		const indexInstance =
			index instanceof Index ? index : new Index(this._signer, index);
		const burnParameters: IIndexRouter.BurnSwapParamsStruct = {
			index: indexInstance.address,
			amount,
			recipient,
			quotes: options.quotes,
			outputAsset: '',
		};

		if (options.outputAsset === undefined) {
			if (permitOptions !== undefined)
				return this.contract.burnSwapValueWithPermit(
					burnParameters,
					permitOptions.deadline,
					permitOptions.v,
					permitOptions.r,
					permitOptions.s,
				);

			if (await this._checkAllowance(indexInstance, amount))
				throw new Error('Insufficient allowance');

			return this.contract.burnSwapValue(burnParameters);
		}

		burnParameters.outputAsset = options.outputAsset;
		if (permitOptions !== undefined)
			return this.contract.burnSwapWithPermit(
				burnParameters,
				permitOptions.deadline,
				permitOptions.v,
				permitOptions.r,
				permitOptions.s,
			);

		if (await this._checkAllowance(indexInstance, amount))
			throw new Error('Insufficient allowance');

		return this.contract.burnSwap(burnParameters);
	}

	private async _checkAllowance(
		token: Erc20,
		amount: BigNumberish,
	): Promise<boolean> {
		const allowance = await token.contract.allowance(
			await this._signer.getAddress(),
			this.contract.address,
		);

		return allowance.gte(amount);
	}

	// 	Async;
	// 	burnTokensAmount();
	// :
	// 	Promise < Record < Address, BigNumber >> {
	// 		// TODO: call contract.burnTokensAmount and index.anatomy method
	// 		// merge the results of the two into a single object with the address as the key and the amount as the value
	// 		throw new Error("Not implemented");
	// 	};
	//
	// 	async;
	// 	burnSwapTokenAmount();
	// 	{
	// 		// TODO: reduce through the result of burnTokensAmount applying base price to each asset
	// 		throw new Error("Not implemented");
	// 	}
}
