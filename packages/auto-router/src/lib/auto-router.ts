import {ZeroExAggregator} from '@phuture/0x-aggregator';
import {Erc20, StandardPermitArguments} from '@phuture/erc-20';
import {Index} from '@phuture/index';
import {IndexRouter} from '@phuture/index-router';
import {Address, isAddress} from '@phuture/types';
import {BigNumber, BigNumberish} from 'ethers';
import {getDefaultPriceOracle} from '@phuture/price-oracle';

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
		public readonly zeroExAggregator: ZeroExAggregator
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
		permitOptions?: Omit<StandardPermitArguments, 'amount'>
	) {
		const inputTokenAddress =
			inputToken?.address || (await this.indexRouter.weth());

		const [
			{
				sellAmount: zeroExSellAmount,
				buyAmount: zeroExBuyAmount,
				to: swapTarget,
				data: indexQuote,
				gasPrice,
				estimatedGas: zeroExGas,
			},
			amounts,
			indexPriceEth,
		] = await Promise.all([
			this.zeroExAggregator.quote(
				inputTokenAddress,
				index.address,
				amountInInputToken
			),
			index.scaleAmount(amountInInputToken),
			index.priceEth(),
		]);

		const buyAmounts = await Promise.all(
			Object.entries(amounts).map(async ([asset, {amount}]) => {
				const {buyAmount} = await this.zeroExAggregator.price(
					inputTokenAddress,
					asset,
					amount
				);
				return {
					asset,
					buyAmount,
				};
			})
		);

		const priceOracle = getDefaultPriceOracle(this.indexRouter.account);
		const buyAmountsInBase = await Promise.all(
			buyAmounts.map(async ({asset, buyAmount}) => {
				const price =
					await priceOracle.contract.callStatic.refreshedAssetPerBaseInUQ(
						asset
					);
				return {
					asset,
					buyAmount: BigNumber.from(buyAmount)
						.mul(BigNumber.from(2).pow(112))
						.mul(255)
						.div(price.mul(amounts[asset].weight)),
				};
			})
		);

		const minAmount = buyAmountsInBase.reduce((min, curr) =>
			min.buyAmount.lte(curr.buyAmount) ? min : curr
		);

		const scaledSellAmounts = Object.values(amounts).map(({amount}, i) =>
			amount.mul(minAmount.buyAmount).div(buyAmountsInBase[i].buyAmount)
		)

		const quotes = await Promise.all(
			Object.keys(amounts).map(async (asset, i) => {
				const {
					buyAmount: buyAssetMinAmount,
					to: swapTarget,
					data: assetQuote,
				} = await this.zeroExAggregator.quote(
					inputTokenAddress,
					asset,
					scaledSellAmounts[i]
				);

				return {
					asset,
					buyAssetMinAmount,
					swapTarget,
					assetQuote,
				};
			})
		);

		amountInInputToken = scaledSellAmounts.reduce((sum, curr) => sum.add(curr), BigNumber.from(0));

		const options = {
			index: index.address,
			recipient: await this.indexRouter.account.address(),
			quotes,
			amountInInputToken,
			inputToken: inputTokenAddress,
		};
		const {estimatedGas, outputAmount} =
			await this.indexRouter.mintSwapStatic(
				options,
				amountInInputToken,
				inputToken,
				permitOptions
			);

		if (
			estimatedGas
				.sub(zeroExGas)
				.mul(gasPrice)
				.gte(outputAmount.sub(zeroExBuyAmount).mul(indexPriceEth))
		)
			return this.indexRouter.mintSwap(
				options,
				amountInInputToken,
				inputToken,
				permitOptions
			);

		return this.indexRouter.account.signer.call({
			to: swapTarget,
			data: indexQuote,
			value: inputToken ? 0 : zeroExSellAmount,
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
		permitOptions?: Omit<StandardPermitArguments, 'amount'>
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
				BigNumber.from(10).pow(await outputToken.decimals())
			);

			outputTokenPriceEth = BigNumber.from(buyAmount);
		} else {
			outputToken = new Erc20(
				this.indexRouter.account,
				await this.indexRouter.weth()
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
			anatomy,
			inactiveAnatomy,
			amounts,
		] = await Promise.all([
			this.zeroExAggregator.quote(
				index.address,
				outputToken.address,
				indexAmount
			),
			index.contract.anatomy(),
			index.contract.inactiveAnatomy(),
			this.indexRouter.burnAmount(index.address, indexAmount),
		]);

		const assets: Address[] = [...anatomy._assets, ...inactiveAnatomy];

		const quotes = await Promise.all(
			amounts.map(async (amount, i) => {
				const {
					buyAmount: buyAssetMinAmount,
					to: swapTarget,
					data: assetQuote,
				} = await this.zeroExAggregator.quote(index.address, assets[i], amount);

				return {
					asset: assets[i],
					swapTarget,
					buyAssetMinAmount,
					assetQuote,
				};
			})
		);

		const options = {
			outputAsset: outputTokenAddress,
			quotes,
			permitOptions,
		};

		const {outputAmount, estimatedGas} =
			await this.indexRouter.burnSwapStatic(
				index.address,
				indexAmount,
				await this.indexRouter.account.address(),
				options
			);

		if (
			estimatedGas
				.sub(zeroExGas)
				.mul(gasPrice)
				.gte(outputAmount.sub(zeroExAmount).mul(outputTokenPriceEth))
		)
			return this.indexRouter.burnSwap(
				index.address,
				indexAmount,
				await this.indexRouter.account.address(),
				options
			);

		return this.indexRouter.account.signer.call({
			to: swapTarget,
			data: assetQuote,
		});
	}
}
