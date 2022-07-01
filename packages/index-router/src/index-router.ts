import {
	Erc20,
	Erc20Permit,
	setOfAssets,
	StandardPermitArguments,
} from '@phuture/erc-20';
import {InsufficientAllowanceError} from '@phuture/errors';
import {Address, isAddress} from '@phuture/types';
import {BigNumber, BigNumberish, ContractTransaction, Signer} from 'ethers';
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

		this.contract = isAddress(contract)
			? IndexRouter__factory.connect(contract, this._signer)
			: contract;
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

		if (!(await this._checkAllowance(sellToken, sellAmount)))
			throw new InsufficientAllowanceError(sellAmount);

		return this.contract.mintSwap(options as IIndexRouter.MintSwapParamsStruct);
	}

	async mintIndexAmount(
		index: Address,
		amountInInputToken: BigNumberish,
		quotes: IIndexRouter.MintQuoteParamsStruct[],
		inputToken: Address = setOfAssets.mainnet.weth,
	): Promise<BigNumber> {
		const option: IIndexRouter.MintSwapParamsStruct = {
			inputToken,
			amountInInputToken,
			quotes,
			index,
			recipient: await this._signer.getAddress(),
		};

		return this.contract.mintSwapIndexAmount(option);
	}

	async burn(
		index: Address | Erc20,
		amount: BigNumberish,
		recipient: Address,
		permitOptions?: Omit<StandardPermitArguments, 'amount'>,
	): Promise<ContractTransaction> {
		const indexInstance = isAddress(index)
			? new Erc20(this._signer, index)
			: index;
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
		if (!(await this._checkAllowance(indexInstance, amount)))
			throw new InsufficientAllowanceError(amount);

		return this.contract.burn(burnParameters);
	}

	async burnSwap(
		index: Address | Erc20,
		amount: BigNumberish,
		recipient: Address,
		options: {
			outputAsset?: Address;
			quotes: IIndexRouter.BurnQuoteParamsStruct[];
			permitOptions?: Omit<StandardPermitArguments, 'amount'>;
		},
	): Promise<ContractTransaction> {
		const indexInstance = isAddress(index)
			? new Erc20(this._signer, index)
			: index;
		const burnParameters: IIndexRouter.BurnSwapParamsStruct = {
			index: indexInstance.address,
			amount,
			recipient,
			quotes: options.quotes,
			outputAsset: '',
		};

		if (options.outputAsset === undefined) {
			if (options.permitOptions !== undefined)
				return this.contract.burnSwapValueWithPermit(
					burnParameters,
					options.permitOptions.deadline,
					options.permitOptions.v,
					options.permitOptions.r,
					options.permitOptions.s,
				);

			if (!(await this._checkAllowance(indexInstance, amount)))
				throw new InsufficientAllowanceError(amount);
			return this.contract.burnSwapValue(burnParameters);
		}

		burnParameters.outputAsset = options.outputAsset;
		if (options.permitOptions !== undefined) {
			return this.contract.burnSwapWithPermit(
				burnParameters,
				options.permitOptions.deadline,
				options.permitOptions.v,
				options.permitOptions.r,
				options.permitOptions.s,
			);
		}

		if (!(await this._checkAllowance(indexInstance, amount)))
			throw new InsufficientAllowanceError(amount);
		return this.contract.burnSwap(burnParameters);
	}

	// Get burn amounts of multiple tokens
	burnAmount(index: Address, amount: BigNumberish): Promise<BigNumber[]>;

	// Get burn amount of single tokens
	burnAmount(
		index: Address,
		amount: BigNumberish,
		prices?: BigNumberish[],
	): Promise<BigNumber>;

	async burnAmount(
		index: Address,
		amount: BigNumberish,
		prices?: BigNumberish[],
	): Promise<BigNumber | BigNumber[]> {
		const amounts = await this.contract.burnTokensAmount(index, amount);
		if (!prices) {
			return amounts;
		}

		let totalAmount = BigNumber.from(0);

		for (const [index, amount] of amounts.entries()) {
			totalAmount = totalAmount.add(amount).mul(prices[index]);
		}

		return totalAmount;
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
}
