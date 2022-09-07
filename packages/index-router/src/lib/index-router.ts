import { Erc20, StandardPermitArguments } from '@phuture/erc-20';
import { Address, isAddress, Network, Networkish } from '@phuture/types';
import { BigNumber, BigNumberish, ContractTransaction } from 'ethers';
import { Contract } from '@phuture/contract';
import { Account } from '@phuture/account';
import { Index } from '@phuture/index';
import {
	IndexRouter as IndexRouterContractInterface,
	IndexRouter__factory,
} from '../types';
import { IIndexRouter } from '../types/IndexRouter';

/** ### Default IndexRouter address for network */
export const defaultIndexRouterAddress: Record<Networkish, Address> = {
	/** ### Default IndexRouter address on mainnet. */
	[Network.Mainnet]: '0x1985426d77c431fc95E5Ca51547BcB9b793E8482',
	/** ### Default IndexRouter address on c-chain. */
	[Network.CChain]: '0xD6dd95610fC3A3579a2C32fe06158d8bfB8F4eE9',
};

/** ### IndexRouter Contract */
export class IndexRouter extends Contract<IndexRouterContractInterface> {
	private _weth?: Address;

	/**
	 * ### Creates a new IndexRouter instance
	 *
	 * @param account Account to use for signing
	 * @param contract Contract instance or address of the IndexRouter contract
	 *
	 * @returns New IndexRouter token instance
	 */
	constructor(
		account: Account,
		contract?: IndexRouterContractInterface | Address
	) {
		super(
			account,
			contract ?? defaultIndexRouterAddress[Network.Mainnet],
			IndexRouter__factory
		);
	}

	async weth(): Promise<Address> {
		// eslint-disable-next-line new-cap
		this._weth ??= await this.contract.WETH();

		return this._weth;
	}

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
		options: IIndexRouter.MintSwapParamsStruct,
		sellAmount: BigNumberish,
		sellToken?: Erc20 | Address,
		permitOptions?: Omit<StandardPermitArguments, 'amount'>
	): Promise<ContractTransaction> {
		if (!sellToken) {
			const mintSwapValueOptions: IIndexRouter.MintSwapValueParamsStruct = {
				index: options.index,
				quotes: options.quotes,
				recipient: options.recipient,
			};

			const estimatedGas = await this.contract.estimateGas.mintSwapValue(
				mintSwapValueOptions,
				{ value: sellAmount }
			);

			return this.contract.mintSwapValue(mintSwapValueOptions, {
				value: sellAmount,
				gasLimit: estimatedGas.mul(100).div(95),
			});
		}

		if (permitOptions !== undefined) {
			const estimatedGas = await this.contract.estimateGas.mintSwapWithPermit(
				options as IIndexRouter.MintSwapParamsStruct,
				permitOptions.deadline,
				permitOptions.v,
				permitOptions.r,
				permitOptions.s
			);

			return this.contract.mintSwapWithPermit(
				options as IIndexRouter.MintSwapParamsStruct,
				permitOptions.deadline,
				permitOptions.v,
				permitOptions.r,
				permitOptions.s,
				{ gasLimit: estimatedGas.mul(100).div(95) }
			);
		}

		if (isAddress(sellToken)) sellToken = new Erc20(this.account, sellToken);

		await sellToken.checkAllowance(this.address, sellAmount);

		const estimatedGas = await this.contract.estimateGas.mintSwap(
			options as IIndexRouter.MintSwapParamsStruct
		);

		return this.contract.mintSwap(
			options as IIndexRouter.MintSwapParamsStruct,
			{ gasLimit: estimatedGas.mul(100).div(95) }
		);
	}

	/**
	 * ### Mint Static
	 *
	 * @param options mint options
	 * @param sellAmount token's  amount
	 * @param sellToken (optional) erc20 token
	 * @param permitOptions (optional) permit options for transaction
	 *
	 * @returns mint amount
	 */
	async mintSwapStatic(
		options: IIndexRouter.MintSwapParamsStruct,
		sellAmount: BigNumberish,
		sellToken?: Erc20,
		permitOptions?: Omit<StandardPermitArguments, 'amount'>
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

		if (permitOptions !== undefined) {
			return this.contract.callStatic.mintSwapWithPermit(
				options as IIndexRouter.MintSwapParamsStruct,
				permitOptions.deadline,
				permitOptions.v,
				permitOptions.r,
				permitOptions.s
			);
		}

		await sellToken.checkAllowance(this.address, sellAmount);

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
			recipient: await this.account.address(),
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
		permitOptions?: Omit<StandardPermitArguments, 'amount'>
	): Promise<ContractTransaction> {
		const indexInstance = isAddress(index)
			? new Erc20(this.account, index)
			: index;
		const burnParameters: IIndexRouter.BurnParamsStruct = {
			index: indexInstance.address,
			amount,
			recipient,
		};

		if (permitOptions !== undefined) {
			const estimatedGas = await this.contract.estimateGas.burnWithPermit(
				burnParameters,
				permitOptions.deadline,
				permitOptions.v,
				permitOptions.r,
				permitOptions.s
			);

			return this.contract.burnWithPermit(
				burnParameters,
				permitOptions.deadline,
				permitOptions.v,
				permitOptions.r,
				permitOptions.s,
				{ gasLimit: estimatedGas.mul(100).div(95) }
			);
		}

		await indexInstance.checkAllowance(this.address, amount);

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
		index: Address | Erc20,
		amount: BigNumberish,
		recipient: Address,
		options: {
			quotes: IIndexRouter.BurnQuoteParamsStruct[];
			outputAsset?: Address;
			permitOptions?: Omit<StandardPermitArguments, 'amount'>;
		}
	): Promise<ContractTransaction> {
		const indexInstance = isAddress(index)
			? new Erc20(this.account, index)
			: index;
		const burnParameters: IIndexRouter.BurnSwapParamsStruct = {
			index: indexInstance.address,
			amount,
			recipient,
			quotes: options.quotes,
			outputAsset: options.outputAsset ?? (await this.weth()),
		};

		if (options.outputAsset === undefined) {
			if (options.permitOptions !== undefined) {
				const estimatedGas = await this.contract.estimateGas.burnSwapWithPermit(
					burnParameters,
					options.permitOptions.deadline,
					options.permitOptions.v,
					options.permitOptions.r,
					options.permitOptions.s
				);

				return this.contract.burnSwapValueWithPermit(
					burnParameters,
					options.permitOptions.deadline,
					options.permitOptions.v,
					options.permitOptions.r,
					options.permitOptions.s,
					{ gasLimit: estimatedGas.mul(100).div(95) }
				);
			}

			await indexInstance.checkAllowance(this.address, amount);

			const estimatedGas = await this.contract.estimateGas.burnSwap(
				burnParameters
			);

			return this.contract.burnSwapValue(burnParameters, {
				gasLimit: estimatedGas.mul(100).div(95),
			});
		}

		if (options.permitOptions !== undefined) {
			const estimatedGas = await this.contract.estimateGas.burnSwapWithPermit(
				burnParameters,
				options.permitOptions.deadline,
				options.permitOptions.v,
				options.permitOptions.r,
				options.permitOptions.s
			);

			return this.contract.burnSwapWithPermit(
				burnParameters,
				options.permitOptions.deadline,
				options.permitOptions.v,
				options.permitOptions.r,
				options.permitOptions.s,
				{ gasLimit: estimatedGas.mul(100).div(95) }
			);
		}

		await indexInstance.checkAllowance(this.address, amount);

		const estimatedGas = await this.contract.estimateGas.burnSwap(
			burnParameters
		);

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
		index: Address | Erc20,
		amount: BigNumberish,
		recipient: Address,
		options: {
			quotes: IIndexRouter.BurnQuoteParamsStruct[];
			outputAsset?: Address;
			permitOptions?: Omit<StandardPermitArguments, 'amount'>;
		}
	): Promise<BigNumber> {
		const indexInstance = isAddress(index)
			? new Erc20(this.account, index)
			: index;
		const burnParameters: IIndexRouter.BurnSwapParamsStruct = {
			index: indexInstance.address,
			amount,
			recipient,
			quotes: options.quotes,
			outputAsset: options.outputAsset ?? (await this.weth()),
		};

		if (options.outputAsset === undefined) {
			if (options.permitOptions !== undefined) {
				return this.contract.callStatic.burnSwapValueWithPermit(
					burnParameters,
					options.permitOptions.deadline,
					options.permitOptions.v,
					options.permitOptions.r,
					options.permitOptions.s
				);
			}

			await indexInstance.checkAllowance(this.address, amount);

			return this.contract.callStatic.burnSwapValue(burnParameters);
		}

		if (options.permitOptions !== undefined) {
			return this.contract.callStatic.burnSwapWithPermit(
				burnParameters,
				options.permitOptions.deadline,
				options.permitOptions.v,
				options.permitOptions.r,
				options.permitOptions.s
			);
		}

		await indexInstance.checkAllowance(this.address, amount);

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
		amount: BigNumberish
	): Promise<{ asset: Address; amount: BigNumber; weight: number }[]> {
		const [constituents, burnTokensAmounts] = await Promise.all([
			index.constituents(),
			this.contract.burnTokensAmount(index.address, amount),
		]);

		return constituents.map((constituent, index) => ({
			amount: burnTokensAmounts[index] ?? BigNumber.from(0),
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
		index: Index,
		amount: BigNumberish
	): Promise<{ asset: Address; amount: BigNumber; weight: number }[]> {
		const [constituents, burnTokensAmounts] = await Promise.all([
			index.constituents(),
			this.contract.callStatic.burnWithAmounts({
				index: index.address,
				recipient: this.account.address(),
				amount,
			}),
		]);

		return constituents.map((constituent, index) => ({
			amount: burnTokensAmounts[index] ?? BigNumber.from(0),
			...constituent,
		}));
	}
}
