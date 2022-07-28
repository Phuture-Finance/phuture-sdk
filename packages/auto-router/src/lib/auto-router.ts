import {ZeroExAggregator} from '@phuture/0x-aggregator';
import {Erc20, StandardPermitArguments} from '@phuture/erc-20';
import {Index} from '@phuture/index';
import {IndexRouter} from '@phuture/index-router';
import {Address, isAddress} from '@phuture/types';
import {BigNumber, BigNumberish} from 'ethers';

export interface MintThreshold {
	amount: BigNumberish;
	tokenAddress: Address;
}

/** ### AutoRouter class */
export class AutoRouter {
	/**
	 * ### Creates a new AutoRouter instance
	 *
	 * @param indexRouter IndexRouter package
	 * @param zeroExAggregator ZeroExAggregator package
	 *
	 * @returns New AutoRouter instance
	 */
	constructor(
		public readonly indexRouter: IndexRouter,
		public readonly zeroExAggregator: ZeroExAggregator,
	) {
	}

	/**
	 * ### Auto Buy
	 *
	 * @param index index address or it's Index interface
	 * @param amountInInputToken amount in input token
	 * @param inputToken Erc20 or Erc20Permit interface of input token
	 * @param permitOptions permit options for transaction
	 *
	 * @returns mint or swap transaction
	 */
	async autoBuy(
		index: Index,
		amountInInputToken: BigNumberish,
		inputToken?: Erc20,
		permitOptions?: Omit<StandardPermitArguments, 'amount'>,
	) {
		const inputTokenAddress = inputToken?.address || (await this.indexRouter.weth());
		const [{
			buyAmount: zeroExAmount,
			to: swapTarget,
			data: indexQuote,
			gasPrice,
			estimatedGas: zeroExGas,
		}, {amounts, amountToSell}, indexPriceEth] = await Promise.all([
			this.zeroExAggregator.quote(
				inputTokenAddress,
				index.address,
				amountInInputToken,
			),
			index.scaleAmount(amountInInputToken),
			index.priceEth()
		]);

		const quotes = await Promise.all(
			Object.entries(amounts).map(async ([asset, amount]) => {
				const {
					buyAmount: buyAssetMinAmount,
					to: swapTarget,
					data: assetQuote,
				} = await this.zeroExAggregator.quote(inputTokenAddress, asset, amount);

				return {
					asset,
					swapTarget,
					buyAssetMinAmount,
					assetQuote,
				};
			}),
		);

		const options = {
			index: index.address,
			recipient: await this.indexRouter.account.address(),
			quotes,
			amountInInputToken,
			inputToken: inputTokenAddress,
		};
		const {estimatedGas, outputAmount} = await this.indexRouter.mintSwapStatic(
			options,
			amountToSell,
			inputToken,
			permitOptions,
		);

		if (estimatedGas
			.sub(zeroExGas)
			.mul(gasPrice)
			.gte(outputAmount.sub(zeroExAmount).mul(indexPriceEth)))
			return this.indexRouter.mintSwap(
				options,
				amountToSell,
				inputToken,
				permitOptions,
			);

		return this.indexRouter.account.signer.call({
			to: swapTarget,
			data: indexQuote,
			value: inputToken ? 0 : zeroExAmount,
		});
	}

	/**
	 * ### Auto Sell
	 *
	 * @param index index address or it's Index interface
	 * @param indexAmount amount in index token
	 * @param outputToken instance or address of output token
	 * @param permitOptions permit options for transaction
	 *
	 * @returns burn or swap transaction
	 */
	async autoSell(
		index: Index,
		indexAmount: BigNumberish,
		outputToken?: Erc20 | Address,
		permitOptions?: Omit<StandardPermitArguments, 'amount'>,
	) {
		let outputTokenAddress: Address | undefined;
		let outputTokenPriceEth: BigNumber = BigNumber.from(10).pow(18);

		if (outputToken) {
			outputToken = isAddress(outputToken)
				? new Erc20(this.indexRouter.account, outputToken)
				: outputToken;
			outputTokenAddress = outputToken.address;
			const {buyAmount} = await this.zeroExAggregator.price(
				outputToken.address,
				await this.indexRouter.weth(),
				BigNumber.from(10).pow(await outputToken.decimals()),
			);

			outputTokenPriceEth = BigNumber.from(buyAmount);
		} else {
			outputToken = new Erc20(
				this.indexRouter.account,
				await this.indexRouter.weth(),
			);
		}

		const [
			{
				buyAmount: zeroExAmount,
				to: swapTarget,
				data: assetQuote,
				gasPrice,
				estimatedGas: zeroExGas,
			},
			{amounts, amountToSell},
		] = await Promise.all([
			this.zeroExAggregator.quote(
				index.address,
				outputToken.address,
				indexAmount,
			),
			index.scaleAmount(indexAmount),
		]);

		const quotes = await Promise.all(
			Object.entries(amounts).map(async ([asset, amount]) => {
				const {
					buyAmount: buyAssetMinAmount,
					to: swapTarget,
					data: assetQuote,
				} = await this.zeroExAggregator.quote(index.address, asset, amount);

				return {
					asset,
					swapTarget,
					buyAssetMinAmount,
					assetQuote,
				};
			}),
		);

		const options = {
			outputAsset: outputTokenAddress,
			quotes,
			permitOptions,
		};

		const {outputAmount, estimatedGas} = await this.indexRouter.burnSwapStatic(
			index.address,
			amountToSell,
			await this.indexRouter.account.address(),
			options,
		);

		if (
			estimatedGas
				.sub(zeroExGas)
				.mul(gasPrice)
				.gte(outputAmount.sub(zeroExAmount).mul(outputTokenPriceEth))
		)
			return this.indexRouter.burnSwap(
				index.address,
				amountToSell,
				await this.indexRouter.account.address(),
				options,
			);

		return this.indexRouter.account.signer.call({
			to: swapTarget,
			data: assetQuote,
		});
	}
}
