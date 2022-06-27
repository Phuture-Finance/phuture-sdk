import {Erc20, Erc20Permit, StandardPermitArguments} from '@phuture/erc-20';
import {Address} from '@phuture/types';
import {BigNumberish, ContractTransaction, Signer, utils} from 'ethers';
import {MintOptions} from './mint-options';
import {
	IndexRouter as IndexRouterContractInterface,
	IndexRouter__factory,
} from './types';
import {IIndexRouter} from './types/IndexRouter';

/** ### Default IndexRouter address for network */
export enum DefaultIndexRouterAddress {
	/** ### Default IndexRouter address on mainnet. */
	Mainnet = '0xcbB6a59393D68cDa7431792e291b00c6801e7279',
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
		} else {
			this.contract = contract;
		}
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
		if (sellToken === undefined) {
			return this.contract.mintSwapValue(
				options as IIndexRouter.MintSwapValueParamsStruct,
				{value: sellAmount},
			);
		}

		if (permitOptions !== undefined) {
			return this.contract.mintSwapWithPermit(
				options as IIndexRouter.MintSwapParamsStruct,
				permitOptions.deadline,
				permitOptions.v,
				permitOptions.r,
				permitOptions.s,
			);
		}

		const allowance = await sellToken.contract.allowance(
			await this._signer.getAddress(),
			this.contract.address,
		);
		if (allowance.lt(sellAmount)) throw new Error('Insufficient allowance');

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

	// TODO: implement burn function
	// async burn(): Promise<ContractTransaction> {
	// 	// TODO: using mint method as an example, call contract.burn*** methods and return a transaction
	// 	throw new Error("Not implemented");
	// }
	// TODO: implement burnTokensAmount function
	// async burnTokensAmount(): Promise<Record<Address, BigNumber>> {
	// 	// TODO: call contract.burnTokensAmount and index.anatomy method
	// 	// merge the results of the two into a single object with the address as the key and the amount as the value
	// 	throw new Error("Not implemented");
	// }
	// TODO: implement burnSwapTokenAmount function
	// async burnSwapTokenAmount() {
	// 	// TODO: reduce through the result of burnTokensAmount applying base price to each asset
	// 	throw new Error("Not implemented");
	// }
}
