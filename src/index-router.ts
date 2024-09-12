import { BigNumber, type ContractTransaction, type Signer } from "ethers";

import type { Index } from "./base-index";
import { Contract } from "./contract";
import { Erc20 } from "./erc-20";
import {
	type IndexRouter as IndexRouterContractInterface,
	IndexRouter__factory,
} from "./typechain";
import type { IIndexRouter } from "./typechain/IndexRouter";

/** ### Default IndexRouter address for network */
export const defaultIndexRouterAddress: Record<number, string> = {
	/** ### Default IndexRouter address on mainnet. */
	1: "0x1985426d77c431fc95e5ca51547bcb9b793e8482",
	/** ### Default IndexRouter address on c-chain. */
	43114: "0xd6dd95610fc3a3579a2c32fe06158d8bfb8f4ee9",
};

/** ### IndexRouter Contract */
export class IndexRouter extends Contract<IndexRouterContractInterface> {
	/**
	 * ### Creates a new IndexRouter instance
	 *
	 * @param account Account to use for signing
	 * @param contract Contract instance or address of the IndexRouter contract
	 *
	 * @returns New IndexRouter token instance
	 */
	constructor(
		account: Signer,
		contract: IndexRouterContractInterface | string,
	) {
		super(account, contract, IndexRouter__factory);
	}

	/**
	 * ### Mint
	 *
	 * @param options mint options
	 * @param sellAmount token's  amount
	 * @param sellToken (optional) erc20 token
	 *
	 * @returns mint transaction
	 */
	async mintSwap(
		options: IIndexRouter.MintSwapParamsStruct,
		sellAmount: string,
		sellToken?: string,
	): Promise<ContractTransaction> {
		if (!sellToken) {
			const mintSwapValueOptions: IIndexRouter.MintSwapValueParamsStruct = {
				index: options.index,
				quotes: options.quotes,
				recipient: options.recipient,
			};

			const mintSwapValueEstimatedGas =
				await this.contract.estimateGas.mintSwapValue(mintSwapValueOptions, {
					value: sellAmount,
				});

			return this.contract.mintSwapValue(mintSwapValueOptions, {
				value: sellAmount,
				gasLimit: mintSwapValueEstimatedGas.mul(100).div(95),
			});
		}

		const sellTokenInstance = new Erc20(this.signer, sellToken);
		await sellTokenInstance.checkAllowance(this.contract.address, sellAmount);

		const estimatedGas = await this.contract.estimateGas.mintSwap(
			options as IIndexRouter.MintSwapParamsStruct,
		);

		return this.contract.mintSwap(
			options as IIndexRouter.MintSwapParamsStruct,
			{ gasLimit: estimatedGas.mul(100).div(95) },
		);
	}

	/**
	 * ### Mint Static
	 *
	 * @param options mint options
	 * @param sellAmount token's  amount
	 * @param sellToken (optional) erc20 token
	 *
	 * @returns mint amount
	 */
	async mintSwapStatic(
		options: IIndexRouter.MintSwapParamsStruct,
		sellAmount: string,
		sellToken?: Erc20,
	): Promise<BigNumber> {
		if (!sellToken) {
			const mintSwapValueOptions: IIndexRouter.MintSwapValueParamsStruct = {
				index: options.index,
				quotes: options.quotes,
				recipient: options.recipient,
			};

			return this.contract.callStatic.mintSwapValue(mintSwapValueOptions, {
				value: sellAmount,
			});
		}

		await sellToken.checkAllowance(this.contract.address, sellAmount);

		return this.contract.callStatic.mintSwap(
			options as IIndexRouter.MintSwapParamsStruct,
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
		index: string,
		amountInInputToken: string,
		quotes: IIndexRouter.MintQuoteParamsStruct[],
		inputToken: string,
	): Promise<BigNumber> {
		const option: IIndexRouter.MintSwapParamsStruct = {
			inputToken,
			amountInInputToken,
			quotes,
			index,
			recipient: await this.signer.getAddress(),
		};

		return this.contract.mintSwapIndexAmount(option);
	}

	/**
	 * ### Burn
	 *
	 * @param index index address or it's erc20 interface
	 * @param amount index amount
	 * @param recipient address of account to receive tokens
	 *
	 * @returns burn transaction
	 */
	async burn(
		index: string,
		amount: string,
		recipient: string,
	): Promise<ContractTransaction> {
		const indexInstance = new Erc20(this.signer, index);
		const burnParameters: IIndexRouter.BurnParamsStruct = {
			index,
			amount,
			recipient,
		};

		await indexInstance.checkAllowance(this.contract.address, amount);

		const estimatedGas = await this.contract.estimateGas.burn(burnParameters);

		return this.contract.burn(burnParameters, {
			gasLimit: estimatedGas.mul(100).div(95),
		});
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
		index: string,
		amount: string,
		recipient: string,
		outputAsset: string,
		quotes: IIndexRouter.BurnQuoteParamsStruct[],
	): Promise<ContractTransaction> {
		const indexInstance = new Erc20(this.signer, index);
		const burnParameters: IIndexRouter.BurnSwapParamsStruct = {
			index,
			amount,
			recipient,
			quotes,
			outputAsset,
		};

		await indexInstance.checkAllowance(this.contract.address, amount);

		const estimatedGas =
			await this.contract.estimateGas.burnSwap(burnParameters);

		return this.contract.burnSwap(burnParameters, {
			gasLimit: estimatedGas.mul(100).div(95),
		});
	}

	/**
	 * ### Burn Swap Static
	 *
	 * @param index index address or it's erc20 interface
	 * @param amount index amount
	 * @param recipient signer's address
	 * @param options burn swap options
	 *
	 * @returns burn swap amount
	 */
	async burnSwapStatic(
		index: string,
		amount: string,
		recipient: string,
		outputAsset: string,
		quotes: IIndexRouter.BurnQuoteParamsStruct[],
	): Promise<BigNumber> {
		const indexInstance = new Erc20(this.signer, index);
		const burnParameters: IIndexRouter.BurnSwapParamsStruct = {
			index,
			amount,
			recipient,
			quotes,
			outputAsset,
		};

		await indexInstance.checkAllowance(this.contract.address, amount);

		return this.contract.callStatic.burnSwap(burnParameters);
	}

	/**
	 * ### Burn tokens amount view
	 *
	 * @param index index interface
	 * @param amount index amount
	 *
	 * @returns burn amount in single token or total from array of tokens
	 */
	async burnTokensAmount(
		index: Index,
		amount: string,
	): Promise<{ asset: string; amount: BigNumber; weight: number }[]> {
		const [anatomy, inactiveAnatomy, burnTokensAmounts] = await Promise.all([
			index.getAnatomy(),
			index.getInactiveAnatomy(),
			this.contract.burnTokensAmount(index.contract.address, amount),
		]);

		return [...anatomy, ...inactiveAnatomy].map(
			(constituent, constituentIndex) => ({
				amount: burnTokensAmounts[constituentIndex] || BigNumber.from(0),
				...constituent,
			}),
		);
	}

	/**
	 * ### Burn amounts static
	 *
	 * @param index index interface
	 * @param amount index amount
	 *
	 * @returns burn amount in single token or total from array of tokens
	 */
	async burnAmount(
		index: Index,
		amount: string,
	): Promise<{ asset: string; amount: BigNumber; weight: number }[]> {
		const [anatomy, inactiveAnatomy, burnTokensAmounts] = await Promise.all([
			index.getAnatomy(),
			index.getInactiveAnatomy(),
			this.contract.callStatic.burnWithAmounts({
				index: index.contract.address,
				recipient: this.signer.getAddress(),
				amount,
			}),
		]);

		return [...anatomy, ...inactiveAnatomy].map(
			(constituent, constituentIndex) => ({
				amount: burnTokensAmounts[constituentIndex] || BigNumber.from(0),
				...constituent,
			}),
		);
	}
}
