import { Erc20, StandardPermitArguments } from "@phuture/erc-20";
import { InsufficientAllowanceError } from "@phuture/errors";
import { Address, isAddress } from "@phuture/types";
import { BigNumber, BigNumberish, ContractTransaction, Signer } from "ethers";
import { Contract } from "@phuture/contract";
import { MintOptions } from "./mint-options";
import { IndexRouter as IndexRouterContractInterface, IndexRouter__factory } from "./types";
import { IIndexRouter } from "./types/IndexRouter";

/** ### Default IndexRouter address for network */
export enum DefaultIndexRouterAddress {
	/** ### Default IndexRouter address on mainnet. */
	Mainnet = "0x7b6c3e5486d9e6959441ab554a889099eed76290",
}

/**
 * ### IndexRouter Contract
 */
export class IndexRouter extends Contract<IndexRouterContractInterface> {
	private _weth?: Address;

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
			| Address = DefaultIndexRouterAddress.Mainnet
	) {
		super(signer, contract, IndexRouter__factory);
	}

	async weth(): Promise<Address> {
		this._weth ??= await this.contract.WETH();

		return this._weth;
	}

	// Mint swap for native token
	mintSwap(
		options: IIndexRouter.MintSwapValueParamsStruct,
		sellAmount: BigNumberish
	): Promise<ContractTransaction>;
	// Mint swap for single sell token
	mintSwap(
		options: IIndexRouter.MintSwapParamsStruct,
		sellAmount: BigNumberish,
		sellToken: Erc20,
		permitOptions?: Omit<StandardPermitArguments, "amount">
	): Promise<ContractTransaction>;

	/**
	 * ### Mint
	 *
	 * @param options mint options
	 * @param sellAmount token's  amount
	 * @param sellToken (optional) erc20 token
	 * @param permitOptions (optional) permit options for transaction
	 *
	 * @returns mint transaction
	 */
	async mintSwap(
		options: MintOptions,
		sellAmount: BigNumberish,
		sellToken?: Erc20,
		permitOptions?: Omit<StandardPermitArguments, "amount">
	): Promise<ContractTransaction> {
		if (!sellToken)
			return this.contract.mintSwapValue(
				options as IIndexRouter.MintSwapValueParamsStruct,
				{ value: sellAmount }
			);

		if (permitOptions !== undefined)
			return this.contract.mintSwapWithPermit(
				options as IIndexRouter.MintSwapParamsStruct,
				permitOptions.deadline,
				permitOptions.v,
				permitOptions.r,
				permitOptions.s
			);

		if (!(await this._checkAllowance(sellToken, sellAmount)))
			throw new InsufficientAllowanceError(sellAmount);

		return this.contract.mintSwap(options as IIndexRouter.MintSwapParamsStruct);
	}

	// Mint static for native token
	mintSwapStatic(
		options: IIndexRouter.MintSwapValueParamsStruct,
		sellAmount: BigNumberish
	): Promise<BigNumber>;
	// Mint static for single sell token
	mintSwapStatic(
		options: IIndexRouter.MintSwapParamsStruct,
		sellAmount: BigNumberish,
		sellToken: Erc20,
		permitOptions?: Omit<StandardPermitArguments, "amount">
	): Promise<BigNumber>;

	/**
	 * ### Mint Static
	 *
	 * @param options mint options
	 * @param sellAmount token's  amount
	 * @param sellToken (optional) erc20 token
	 * @param permitOptions (optional) permit options for transaction
	 *
	 * @returns mint transaction
	 */
	async mintSwapStatic(
		options: MintOptions,
		sellAmount: BigNumberish,
		sellToken?: Erc20,
		permitOptions?: Omit<StandardPermitArguments, "amount">
	): Promise<BigNumber> {
		if (!sellToken)
			return this.contract.callStatic.mintSwapValue(
				options as IIndexRouter.MintSwapValueParamsStruct,
				{ value: sellAmount }
			);

		if (permitOptions !== undefined)
			return this.contract.callStatic.mintSwapWithPermit(
				options as IIndexRouter.MintSwapParamsStruct,
				permitOptions.deadline,
				permitOptions.v,
				permitOptions.r,
				permitOptions.s
			);

		if (!(await this._checkAllowance(sellToken, sellAmount)))
			throw new InsufficientAllowanceError(sellAmount);

		return this.contract.callStatic.mintSwap(
			options as IIndexRouter.MintSwapParamsStruct
		);
	}

	/**
	 * ### Mint Index Amount
	 *
	 * @param index index address
	 * @param amountInInputToken token's  amount
	 * @param quotes quotes for swaps
	 * @param inputToken (optional) token's address
	 *
	 * @returns mint amount in single token
	 */
	async mintIndexAmount(
		index: Address,
		amountInInputToken: BigNumberish,
		quotes: IIndexRouter.MintQuoteParamsStruct[],
		inputToken?: Address
	): Promise<BigNumber> {
		const option: IIndexRouter.MintSwapParamsStruct = {
			inputToken: inputToken ?? (await this.weth()),
			amountInInputToken,
			quotes,
			index,
			recipient: await this.signer.getAddress()
		};

		return this.contract.mintSwapIndexAmount(option);
	}

	/**
	 * ### Burn
	 *
	 * @param index index address or it's erc20 interface
	 * @param amount index amount
	 * @param recipient address of account to receive tokens
	 * @param permitOptions permit options for transaction
	 *
	 * @returns burn transaction
	 */
	async burn(
		index: Address | Erc20,
		amount: BigNumberish,
		recipient: Address,
		permitOptions?: Omit<StandardPermitArguments, "amount">
	): Promise<ContractTransaction> {
		const indexInstance = isAddress(index)
			? new Erc20(this.signer, index)
			: index;
		const burnParameters: IIndexRouter.BurnParamsStruct = {
			index: indexInstance.address,
			amount,
			recipient
		};

		if (permitOptions !== undefined)
			return this.contract.burnWithPermit(
				burnParameters,
				permitOptions.deadline,
				permitOptions.v,
				permitOptions.r,
				permitOptions.s
			);
		if (!(await this._checkAllowance(indexInstance, amount)))
			throw new InsufficientAllowanceError(amount);

		return this.contract.burn(burnParameters);
	}

	/**
	 * ### Burn Swap
	 *
	 * @param index index address or it's erc20 interface
	 * @param amount index amount
	 * @param recipient signer's address
	 * @param options burn swap options
	 *
	 * @returns burn swap transaction
	 */
	async burnSwap(
		index: Address | Erc20,
		amount: BigNumberish,
		recipient: Address,
		options: {
			quotes: IIndexRouter.BurnQuoteParamsStruct[];
			outputAsset?: Address;
			permitOptions?: Omit<StandardPermitArguments, "amount">;
		}
	): Promise<ContractTransaction> {
		const indexInstance = isAddress(index)
			? new Erc20(this.signer, index)
			: index;
		const burnParameters: IIndexRouter.BurnSwapParamsStruct = {
			index: indexInstance.address,
			amount,
			recipient,
			quotes: options.quotes,
			outputAsset: ""
		};

		if (options.outputAsset === undefined) {
			if (options.permitOptions !== undefined)
				return this.contract.burnSwapValueWithPermit(
					burnParameters,
					options.permitOptions.deadline,
					options.permitOptions.v,
					options.permitOptions.r,
					options.permitOptions.s
				);

			if (!(await this._checkAllowance(indexInstance, amount)))
				throw new InsufficientAllowanceError(amount);

			return this.contract.burnSwapValue(burnParameters);
		}

		burnParameters.outputAsset = options.outputAsset;
		if (options.permitOptions !== undefined)
			return this.contract.burnSwapWithPermit(
				burnParameters,
				options.permitOptions.deadline,
				options.permitOptions.v,
				options.permitOptions.r,
				options.permitOptions.s
			);

		if (!(await this._checkAllowance(indexInstance, amount)))
			throw new InsufficientAllowanceError(amount);

		return this.contract.burnSwap(burnParameters);
	}

	/**
	 * ### Burn Swap Static
	 *
	 * @param index index address or it's erc20 interface
	 * @param amount index amount
	 * @param recipient signer's address
	 * @param options burn swap options
	 *
	 * @returns burn swap transaction
	 */
	async burnSwapStatic(
		index: Address | Erc20,
		amount: BigNumberish,
		recipient: Address,
		options: {
			quotes: IIndexRouter.BurnQuoteParamsStruct[];
			outputAsset?: Address;
			permitOptions?: Omit<StandardPermitArguments, "amount">;
		}
	): Promise<BigNumber> {
		const indexInstance = isAddress(index)
			? new Erc20(this.signer, index)
			: index;
		const burnParameters: IIndexRouter.BurnSwapParamsStruct = {
			index: indexInstance.address,
			amount,
			recipient,
			quotes: options.quotes,
			outputAsset: ""
		};

		if (options.outputAsset === undefined) {
			if (options.permitOptions !== undefined)
				return this.contract.callStatic.burnSwapValueWithPermit(
					burnParameters,
					options.permitOptions.deadline,
					options.permitOptions.v,
					options.permitOptions.r,
					options.permitOptions.s
				);

			if (!(await this._checkAllowance(indexInstance, amount)))
				throw new InsufficientAllowanceError(amount);
			return this.contract.callStatic.burnSwapValue(burnParameters);
		}

		burnParameters.outputAsset = options.outputAsset;
		if (options.permitOptions !== undefined) {
			return this.contract.callStatic.burnSwapWithPermit(
				burnParameters,
				options.permitOptions.deadline,
				options.permitOptions.v,
				options.permitOptions.r,
				options.permitOptions.s
			);
		}

		if (!(await this._checkAllowance(indexInstance, amount)))
			throw new InsufficientAllowanceError(amount);
		return this.contract.callStatic.burnSwap(burnParameters);
	}

	// Get burn amounts of multiple tokens
	burnAmount(index: Address, amount: BigNumberish): Promise<BigNumber[]>;

	// Get burn amount of single tokens
	burnAmount(
		index: Address,
		amount: BigNumberish,
		prices?: BigNumberish[]
	): Promise<BigNumber>;

	/**
	 * ### Burn amount
	 *
	 * @param index index address
	 * @param amount index amount
	 * @param prices (optional) prices
	 *
	 * @returns burn amount in single token or total from array of tokens
	 */
	async burnAmount(
		index: Address,
		amount: BigNumberish,
		prices?: BigNumberish[]
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

	/**
	 * ### Check Allowance
	 *
	 * @param token erc20 token interface
	 * @param amount token amount
	 *
	 * @returns true or false
	 */
	private async _checkAllowance(
		token: Erc20,
		amount: BigNumberish
	): Promise<boolean> {
		const allowance = await token.contract.allowance(
			await this.signer.getAddress(),
			this.contract.address
		);

		return allowance.gte(amount);
	}
}
