import type { JsonRpcSigner } from "@ethersproject/providers";
import { BigNumber, type ContractTransaction, utils } from "ethers";

import { Contract } from "./contract";
import { Erc20 } from "./erc-20";
import {
	type BaseIndex,
	BaseIndex__factory,
	type IndexRouter as IndexRouterContractInterface,
	IndexRouter__factory,
} from "./typechain";
import type { IIndexRouterV2 } from "./typechain/IndexRouter";

/** ### Default IndexRouter address for network */
export const defaultIndexRouterAddress: Record<number, string> = {
	/** ### Default IndexRouter address on mainnet. */
	1: "0x1985426d77c431fc95e5ca51547bcb9b793e8482",
	/** ### Default IndexRouter address on c-chain. */
	43114: "0xd6dd95610fc3a3579a2c32fe06158d8bfb8f4ee9",
};

const BALANCE_OF_SLOT = 8;
const ALLOWANCE_SLOT = 9;

export type Anatomy = {
	asset: string;
	weight: number;
}[];

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
	constructor(account: JsonRpcSigner, contract: IndexRouterContractInterface | string) {
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
		options: IIndexRouterV2.MintSwapParamsStruct,
		sellAmount: string,
		sellToken: string,
	): Promise<ContractTransaction> {
		const sellTokenInstance = new Erc20(this.signer, sellToken);
		await sellTokenInstance.checkAllowance(this.contract.address, sellAmount);

		const estimatedGas = await this.contract.estimateGas.mintSwap(
			options as IIndexRouterV2.MintSwapParamsStruct,
		);

		return this.contract.mintSwap(options as IIndexRouterV2.MintSwapParamsStruct, {
			gasLimit: estimatedGas.mul(105).div(100),
		});
	}

	async mintSwapValue(
		options: IIndexRouterV2.MintSwapParamsStruct,
		sellAmount: string,
	): Promise<ContractTransaction> {
		const mintSwapValueOptions: IIndexRouterV2.MintSwapValueParamsStruct = {
			index: options.index,
			quotes: options.quotes,
			recipient: options.recipient,
		};

		const mintSwapValueEstimatedGas = await this.contract.estimateGas.mintSwapValue(
			mintSwapValueOptions,
			{
				value: sellAmount,
			},
		);

		return this.contract.mintSwapValue(mintSwapValueOptions, {
			value: sellAmount,
			gasLimit: mintSwapValueEstimatedGas.mul(105).div(100),
		});
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
		options: IIndexRouterV2.MintSwapParamsStruct,
		sellAmount: string,
		sellToken?: Erc20,
	): Promise<BigNumber> {
		if (!sellToken) {
			const mintSwapValueOptions: IIndexRouterV2.MintSwapValueParamsStruct = {
				index: options.index,
				quotes: options.quotes,
				recipient: options.recipient,
			};

			return this.contract.callStatic.mintSwapValue(mintSwapValueOptions, {
				value: sellAmount,
			});
		}

		await sellToken.checkAllowance(this.contract.address, sellAmount);

		return this.contract.callStatic.mintSwap(options as IIndexRouterV2.MintSwapParamsStruct);
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
		quotes: IIndexRouterV2.MintQuoteParamsStruct[],
		inputToken: string,
	): Promise<BigNumber> {
		const option: IIndexRouterV2.MintSwapParamsStruct = {
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
	async burn(index: string, amount: string, recipient: string): Promise<ContractTransaction> {
		const indexInstance = new Erc20(this.signer, index);
		const burnParameters: IIndexRouterV2.BurnParamsStruct = {
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
		quotes: IIndexRouterV2.BurnQuoteParamsStruct[],
	): Promise<ContractTransaction> {
		const indexInstance = new Erc20(this.signer, index);
		const burnParameters: IIndexRouterV2.BurnSwapParamsStruct = {
			index,
			amount,
			recipient,
			quotes,
			outputAsset,
		};

		await indexInstance.checkAllowance(this.contract.address, amount);

		const estimatedGas = await this.contract.estimateGas.burnSwap(burnParameters);

		return this.contract.burnSwap(burnParameters, {
			gasLimit: estimatedGas.mul(100).div(95),
		});
	}

	async burnSwapValue(
		index: string,
		amount: string,
		recipient: string,
		outputAsset: string,
		quotes: IIndexRouterV2.BurnQuoteParamsStruct[],
	): Promise<ContractTransaction> {
		const indexInstance = new Erc20(this.signer, index);
		const burnParameters: IIndexRouterV2.BurnSwapParamsStruct = {
			index,
			amount,
			recipient,
			quotes,
			outputAsset,
		};

		await indexInstance.checkAllowance(this.contract.address, amount);

		const estimatedGas = await this.contract.estimateGas.burnSwapValue(burnParameters);

		return this.contract.burnSwapValue(burnParameters, {
			gasLimit: estimatedGas.mul(105).div(100),
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
		quotes: IIndexRouterV2.BurnQuoteParamsStruct[],
	): Promise<BigNumber> {
		const indexInstance = new Erc20(this.signer, index);
		const burnParameters: IIndexRouterV2.BurnSwapParamsStruct = {
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
		index: string,
		amount: string,
	): Promise<{ asset: string; amount: BigNumber; weight: number }[]> {
		const indexInstance = BaseIndex__factory.connect(index, this.signer);

		const [anatomy, inactiveAnatomy, burnTokensAmounts] = await Promise.all([
			this.getIndexAnatomy(indexInstance),
			this.getIndexInactiveAnatomy(indexInstance),
			this.contract.burnTokensAmount(index, amount),
		]);

		return [...anatomy, ...inactiveAnatomy].map((constituent, constituentIndex) => ({
			amount: burnTokensAmounts[constituentIndex] || BigNumber.from(0),
			...constituent,
		}));
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
		index: string,
		amount: string,
	): Promise<{ asset: string; amount: BigNumber; weight: number }[]> {
		const indexInstance = BaseIndex__factory.connect(index, this.signer);

		const recipient = await this.signer.getAddress();
		const balanceOfOwnerSlot = utils.keccak256(
			utils.defaultAbiCoder.encode(["address", "uint256"], [recipient, BALANCE_OF_SLOT]),
		);

		const allowanceOwnerSlot = utils.keccak256(
			utils.defaultAbiCoder.encode(["address", "uint256"], [recipient, ALLOWANCE_SLOT]),
		);
		const spenderSlot = utils.keccak256(
			utils.defaultAbiCoder.encode(
				["address", "bytes32"],
				[this.contract.address, allowanceOwnerSlot],
			),
		);

		const stateDiff = {
			[index]: {
				stateDiff: {
					[balanceOfOwnerSlot]: utils.hexZeroPad(utils.hexValue(BigNumber.from(amount)), 32),
					[spenderSlot]: utils.hexZeroPad(utils.hexValue(BigNumber.from(amount)), 32),
				},
			},
		};

		const [anatomy, inactiveAnatomy, rawBurnTokensAmounts] = await Promise.all([
			this.getIndexAnatomy(indexInstance),
			this.getIndexInactiveAnatomy(indexInstance),
			this.signer.provider.send("eth_call", [
				{
					from: recipient,
					to: this.contract.address,
					data: this.contract.interface.encodeFunctionData("burnWithAmounts", [
						{
							index,
							recipient,
							amount,
						},
					]),
				},
				"latest",
				stateDiff,
			]),
		]);

		const [burnTokensAmounts] = new utils.AbiCoder().decode(["uint[]"], rawBurnTokensAmounts);

		return [...anatomy, ...inactiveAnatomy].map((constituent, constituentIndex) => ({
			amount: burnTokensAmounts[constituentIndex] || BigNumber.from(0),
			...constituent,
		}));
	}

	async getIndexAnatomy(indexInstance: BaseIndex): Promise<Anatomy> {
		const { _assets, _weights } = await indexInstance.anatomy();
		return _assets.map((asset, i) => ({ asset, weight: Number(_weights[i]) }));
	}

	async getIndexInactiveAnatomy(indexInstance: BaseIndex): Promise<Anatomy> {
		const _assets = await indexInstance.inactiveAnatomy();
		return _assets.map((asset) => ({ asset, weight: 0 }));
	}
}
