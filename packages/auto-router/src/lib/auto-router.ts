import { ZeroExAggregator } from '@phuture/0x-aggregator';
import { Erc20, StandardPermitArguments } from '@phuture/erc-20';
import { Index } from '@phuture/index';
import { IndexRouter } from '@phuture/index-router';
import { Address } from '@phuture/types';
import { BigNumber, BigNumberish } from 'ethers';
import { TransactionResponse } from '@ethersproject/abstract-provider';
import { getDefaultPriceOracle } from '@phuture/price-oracle';
import { InsufficientAllowanceError } from '@phuture/errors';

const baseMintGas = 260_000;
const additionalMintGasPerAsset = 135_000;

const baseBurnGas = 100_000;
const additionalBurnGasPerAsset = 300_000;

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
	) {}

	/**
	 * ### Static auto Buy
	 *
	 * @param index index address or it's Index interface
	 * @param amountInInputToken amount in input token
	 * @param inputToken Erc20 or Erc20Permit interface of input token
	 * @param permitOptions permit options for transaction
	 *
	 * @returns output amount of Index
	 */
	async autoBuyStatic(
		index: Index,
		amountInInputToken: BigNumberish,
		inputToken?: Erc20,
		permitOptions?: Omit<StandardPermitArguments, 'amount'>
	): Promise<{ outputAmount: BigNumber; allowanceTarget?: Address }> {
		const { zeroExSwap, indexPriceEth, quotes } = await this.prepareBuy(
			index,
			amountInInputToken,
			inputToken,
		);

		const indexRouterMintOutputAmount = await this.indexRouter.mintIndexAmount(
			index.address,
			amountInInputToken,
			quotes,
			inputToken?.address
		);

		const totalMintGas = BigNumber.from(
			quotes
				.reduce((curr, acc) => curr.add(acc.estimatedGas), BigNumber.from(0))
				.add(baseMintGas + quotes.length * additionalMintGasPerAsset)
		);

		console.dir({ totalMintGas: totalMintGas.toString() });

		const isMint = totalMintGas
			.sub(zeroExSwap.estimatedGas)
			.mul(zeroExSwap.gasPrice)
			.lte(
				indexRouterMintOutputAmount
					.sub(zeroExSwap.buyAmount)
					.mul(indexPriceEth)
					.div(BigNumber.from(10).pow(18))
			);

		let allowanceTarget: Address | undefined;
		if (inputToken) {
			try {
				await inputToken.checkAllowance(
					isMint ? this.indexRouter.address : zeroExSwap.to,
					amountInInputToken
				);
			} catch (error) {
				if (error instanceof InsufficientAllowanceError) {
					allowanceTarget = error.target;
				} else {
					throw error;
				}
			}
		}

		return {
			outputAmount: isMint
				? indexRouterMintOutputAmount
				: BigNumber.from(zeroExSwap.buyAmount),
			allowanceTarget,
		};
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
	): Promise<TransactionResponse> {
		const {
			zeroExSwap,
			indexPriceEth,
			amounts,
			quotes: buyAmounts,
		} = await this.prepareBuy(
			index,
			amountInInputToken,
			inputToken,
			await this.indexRouter.account.address()
		);

		const priceOracle = getDefaultPriceOracle(this.indexRouter.account);
		const buyAmountsInBase = await Promise.all(
			buyAmounts.map(async ({ asset, buyAssetMinAmount }) => {
				const price =
					await priceOracle.contract.callStatic.refreshedAssetPerBaseInUQ(
						asset
					);
				return {
					asset,
					buyAmount: BigNumber.from(buyAssetMinAmount)
						.mul(BigNumber.from(2).pow(112))
						.mul(255)
						.div(price.mul(amounts[asset].weight)),
				};
			})
		);

		const minAmount = buyAmountsInBase.reduce((min, curr) =>
			min.buyAmount.lte(curr.buyAmount) ? min : curr
		);

		const scaledSellAmounts = Object.values(amounts).map(({ amount }, i) =>
			amount.mul(minAmount.buyAmount).div(buyAmountsInBase[i].buyAmount)
		);

		const routerInputTokenAddress =
			inputToken?.address ?? (await this.indexRouter.weth());

		const quotes = await Promise.all(
			Object.keys(amounts).map(async (asset, i) => {
				const {
					buyAmount: buyAssetMinAmount,
					to: swapTarget,
					data: assetQuote,
					estimatedGas,
				} = await this.zeroExAggregator.quote(
					routerInputTokenAddress,
					asset,
					scaledSellAmounts[i]
				);

				return {
					asset,
					buyAssetMinAmount,
					swapTarget,
					assetQuote,
					estimatedGas,
				};
			})
		);

		amountInInputToken = scaledSellAmounts.reduce(
			(sum, curr) => sum.add(curr),
			BigNumber.from(0)
		);

		const options = {
			index: index.address,
			recipient: await this.indexRouter.account.address(),
			quotes,
			amountInInputToken,
			inputToken: routerInputTokenAddress,
		};

		const indexRouterMintOutputAmount = await this.indexRouter.mintSwapStatic(
			options,
			amountInInputToken,
			inputToken,
			permitOptions
		);

		const totalMintGas = BigNumber.from(
			quotes
				.reduce((curr, acc) => curr.add(acc.estimatedGas), BigNumber.from(0))
				.add(baseMintGas + quotes.length * additionalMintGasPerAsset)
		);

		console.dir({
			gasDiff: totalMintGas
				.sub(zeroExSwap.estimatedGas)
				.mul(zeroExSwap.gasPrice)
				.toString(),
			amountDiff: indexRouterMintOutputAmount
				.sub(zeroExSwap.buyAmount)
				.mul(indexPriceEth)
				.div(BigNumber.from(10).pow(18))
				.toString(),
		});

		const isMint = totalMintGas
			.sub(zeroExSwap.estimatedGas)
			.mul(zeroExSwap.gasPrice)
			.lte(
				indexRouterMintOutputAmount
					.sub(zeroExSwap.buyAmount)
					.mul(indexPriceEth)
					.div(BigNumber.from(10).pow(18))
			);
		if (isMint)
			return this.indexRouter.mintSwap(
				options,
				amountInInputToken,
				inputToken,
				permitOptions
			);

		if (inputToken)
			await inputToken.checkAllowance(zeroExSwap.to, zeroExSwap.sellAmount);

		return this.indexRouter.account.signer.sendTransaction({
			to: zeroExSwap.to,
			data: zeroExSwap.data,
			gasLimit: BigNumber.from(zeroExSwap.estimatedGas).toHexString(),
			...(inputToken
				? {}
				: { value: BigNumber.from(zeroExSwap.sellAmount).toHexString() }),
		});
	}

	protected async prepareBuy(
		index: Index,
		amountInInputToken: BigNumberish,
		inputToken?: Erc20,
		takerAddress?: Address
	) {
		const [zeroExSwap, amounts, indexPriceEth] = await Promise.all([
			this.zeroExAggregator.quote(
				inputToken?.address || 'ETH',
				index.address,
				amountInInputToken,
				{ takerAddress }
			),
			index.scaleAmount(amountInInputToken),
			index.priceEth(),
		]);

		const quotes = await Promise.all(
			Object.entries(amounts).map(async ([asset, { amount }]) => {
				const { to, buyAmount, data, estimatedGas } =
					await this.zeroExAggregator.quote(
						inputToken?.address ?? (await this.indexRouter.weth()),
						asset,
						amount
					);

				return {
					asset,
					swapTarget: to,
					buyAssetMinAmount: buyAmount,
					assetQuote: data,
					estimatedGas,
				};
			})
		);

		return { zeroExSwap, indexPriceEth, amounts, quotes };
	}

	/**
	 * ### Static auto Sell
	 *
	 * @param index index address or it's Index interface
	 * @param indexAmount amount in index token
	 * @param outputToken instance or address of output token
	 * @param permitOptions permit options for transaction
	 *
	 * @returns output token amount
	 */
	async autoSellStatic(
		index: Index,
		indexAmount: BigNumberish,
		outputToken?: Erc20,
		permitOptions?: Omit<StandardPermitArguments, 'amount'>
	): Promise<{ outputAmount: BigNumber; allowanceTarget?: Address }> {
		let outputTokenAddress: Address | undefined;
		let outputTokenPriceEth: BigNumber = BigNumber.from(10).pow(18);

		if (outputToken) {
			outputTokenAddress = outputToken.address;
			const { buyAmount } = await this.zeroExAggregator.price(
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

		const [zeroExSwap, anatomy, inactiveAnatomy, amounts] = await Promise.all([
			this.zeroExAggregator.quote(
				index.address,
				outputToken.address,
				indexAmount
			),
			index.contract.anatomy(),
			index.contract.inactiveAnatomy(),
			this.indexRouter.contract.burnTokensAmount(index.address, indexAmount),
		]);

		const assets: Address[] = [...anatomy._assets, ...inactiveAnatomy];

		const quotes = await Promise.all(
			amounts.map(async (amount, i) => {
				const { buyAmount, estimatedGas } = await this.zeroExAggregator.price(
					assets[i],
					outputTokenAddress ?? (await this.indexRouter.weth()),
					amount.mul(999).div(1000)
				);

				return { buyAmount, estimatedGas };
			})
		);

		const indexRouterBurnOutputAmount = quotes.reduce(
			(acc, { buyAmount }) => acc.add(buyAmount),
			BigNumber.from(0)
		);

		const totalBurnGas = BigNumber.from(
			quotes
				.reduce(
					(curr, { estimatedGas }) => curr.add(estimatedGas),
					BigNumber.from(0)
				)
				.add(baseBurnGas + quotes.length * additionalBurnGasPerAsset)
		);

		console.dir({ totalBurnGas: totalBurnGas.toString() });

		const isBurn = totalBurnGas
			.sub(zeroExSwap.estimatedGas)
			.mul(zeroExSwap.gasPrice)
			.lte(
				indexRouterBurnOutputAmount
					.sub(zeroExSwap.buyAmount)
					.mul(outputTokenPriceEth)
					.div(
						BigNumber.from(10).pow(
							outputToken ? await outputToken.decimals() : 18
						)
					)
			);

		let allowanceTarget: Address | undefined;
		try {
			await index.checkAllowance(
				isBurn ? this.indexRouter.address : zeroExSwap.to,
				indexAmount
			);
		} catch (error) {
			if (error instanceof InsufficientAllowanceError) {
				allowanceTarget = error.target;
			} else {
				throw error;
			}
		}

		return {
			outputAmount: isBurn
				? indexRouterBurnOutputAmount
				: BigNumber.from(zeroExSwap.buyAmount),
			allowanceTarget,
		};
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
		outputToken?: Erc20,
		permitOptions?: Omit<StandardPermitArguments, 'amount'>
	): Promise<TransactionResponse> {
		let outputTokenAddress: Address | undefined;
		let outputTokenPriceEth: BigNumber = BigNumber.from(10).pow(18);

		if (outputToken) {
			outputTokenAddress = outputToken.address;
			const { buyAmount } = await this.zeroExAggregator.price(
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

		const [zeroExSwap, anatomy, inactiveAnatomy, amounts] = await Promise.all([
			this.zeroExAggregator.quote(
				index.address,
				outputToken.address,
				indexAmount,
				{ takerAddress: await this.indexRouter.account.address() }
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
					estimatedGas,
				} = await this.zeroExAggregator.quote(
					assets[i],
					outputTokenAddress ?? (await this.indexRouter.weth()),
					amount.mul(999).div(1000)
				);

				return {
					swapTarget,
					buyAssetMinAmount,
					assetQuote,
					estimatedGas,
				};
			})
		);

		const options = {
			outputAsset: outputTokenAddress,
			quotes,
			permitOptions,
		};

		const indexRouterBurnOutputAmount = await this.indexRouter.burnSwapStatic(
			index.address,
			indexAmount,
			await this.indexRouter.account.address(),
			options
		);

		const totalBurnGas = BigNumber.from(
			quotes
				.reduce(
					(curr, { estimatedGas }) => curr.add(estimatedGas),
					BigNumber.from(0)
				)
				.add(baseBurnGas + quotes.length * additionalBurnGasPerAsset)
		);

		console.dir({
			gasDiff: totalBurnGas
				.sub(zeroExSwap.estimatedGas)
				.mul(zeroExSwap.gasPrice)
				.toString(),
			amountDiff: indexRouterBurnOutputAmount
				.sub(zeroExSwap.buyAmount)
				.mul(outputTokenPriceEth)
				.div(
					BigNumber.from(10).pow(
						outputToken ? await outputToken.decimals() : 18
					)
				)
				.toString(),
		});

		const isBurn = totalBurnGas
			.sub(zeroExSwap.estimatedGas)
			.mul(zeroExSwap.gasPrice)
			.lte(
				indexRouterBurnOutputAmount
					.sub(zeroExSwap.buyAmount)
					.mul(outputTokenPriceEth)
					.div(
						BigNumber.from(10).pow(
							outputToken ? await outputToken.decimals() : 18
						)
					)
			);
		if (isBurn)
			return this.indexRouter.burnSwap(
				index.address,
				indexAmount,
				await this.indexRouter.account.address(),
				options
			);

		await index.checkAllowance(zeroExSwap.to, zeroExSwap.sellAmount);

		return this.indexRouter.account.signer.sendTransaction({
			to: zeroExSwap.to,
			data: zeroExSwap.data,
			gasLimit: BigNumber.from(zeroExSwap.estimatedGas).toHexString(),
		});
	}
}
