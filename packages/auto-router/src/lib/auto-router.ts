import { Zero0xQuoteOptions, ZeroExAggregator } from '@phuture/0x-aggregator';
import { Erc20, StandardPermitArguments } from '@phuture/erc-20';
import {Index, IndexNav} from '@phuture/index';
import { IndexRouter } from '@phuture/index-router';
import { Address, Network, Networkish, TokenSymbol } from '@phuture/types';
import { BigNumber, BigNumberish, constants } from 'ethers';
import { TransactionResponse } from '@ethersproject/abstract-provider';
import { InsufficientAllowanceError } from '@phuture/errors';
import { getDefaultPriceOracle } from '@phuture/price-oracle';

const baseMintGas = 260_000;
const additionalMintGasPerAsset = 135_000;

const baseBurnGas = 100_000;
const additionalBurnGasPerAsset = 300_000;

export const nativeTokenSymbol = (network: Networkish): TokenSymbol => {
	const symbol = {
		[Network.Mainnet]: 'ETH',
		[Network.CChain]: 'AVAX',
	}[network];

	if (!symbol) throw new Error(`Unsupported network: ${network}`);

	return symbol;
};

/** ### AutoRouter class */
export class AutoRouter {
	private indexNav: IndexNav

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
		this.indexNav = new IndexNav(indexRouter.account);
	}

	/**
	 * ### Static auto Buy
	 *
	 * @param index index address or it's Index interface
	 * @param amountInInputToken amount in input token
	 * @param inputToken Erc20 or Erc20Permit interface of input token
	 * @param options 0x request options
	 *
	 * @returns output amount of Index
	 */
	async selectBuy(
		index: Index,
		amountInInputToken: BigNumberish,
		inputToken?: Erc20,
		options?: Partial<Zero0xQuoteOptions>
	): Promise<{
		isMint: boolean;
		target: Address;
		outputAmount: BigNumber;
		expectedAllowance?: BigNumber;
	}> {
		const [zeroExSwap, amounts, indexNav] = await Promise.all([
			this.zeroExAggregator.quote(
				inputToken?.address ||
					nativeTokenSymbol(await this.indexRouter.account.chainId()),
				index.address,
				amountInInputToken,
				options
			),
			index.scaleAmount(amountInInputToken),
			this.indexNav.contract.getNAV(index.address),
		]);

		const inputTokenAddress =
			inputToken?.address ?? (await this.indexRouter.weth());

		const quotes = await Promise.all(
			amounts.map(async ({ amount, asset }) => {
				if (asset === inputTokenAddress)
					return {
						asset,
						swapTarget: constants.AddressZero,
						buyAssetMinAmount: amount,
						assetQuote: [],
						estimatedGas: 0,
					};

				const { to, buyAmount, data, estimatedGas } =
					await this.zeroExAggregator.quote(
						inputTokenAddress,
						asset,
						amount,
						options
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

		const priceOracle = await getDefaultPriceOracle(this.indexRouter.account);
		const ethBasePrice = await priceOracle.contract.callStatic.refreshedAssetPerBaseInUQ(
			await this.indexRouter.weth()
		);

		const isMint = totalMintGas
			.sub(zeroExSwap.estimatedGas)
			.mul(zeroExSwap.gasPrice)
			.lte(
				indexRouterMintOutputAmount
					.sub(zeroExSwap.buyAmount)
					.mul(indexNav._nav)
					.div(indexNav._totalSupply)
					.mul(ethBasePrice)
					.div(BigNumber.from(2).pow(112))
			);

		const target = isMint ? this.indexRouter.address : zeroExSwap.to;

		let expectedAllowance: BigNumber | undefined;
		if (inputToken) {
			try {
				await inputToken.checkAllowance(target, amountInInputToken);
			} catch (error) {
				if (error instanceof InsufficientAllowanceError) {
					expectedAllowance = error.expectedAllowance;
				} else {
					throw error;
				}
			}
		}

		return {
			isMint,
			target,
			outputAmount: isMint
				? indexRouterMintOutputAmount
				: BigNumber.from(zeroExSwap.buyAmount),
			expectedAllowance,
		};
	}

	/**
	 * ### Auto Buy
	 *
	 * @param isMint true if minting, false if swapping
	 * @param index index address or it's Index interface
	 * @param amountInInputToken amount in input token
	 * @param inputToken Erc20 or Erc20Permit interface of input token
	 * @param options 0x request options and permit options for transaction
	 *
	 * @returns mint or swap transaction
	 */
	async buy(
		isMint: boolean,
		index: Index,
		amountInInputToken: BigNumberish,
		inputToken?: Address,
		options?: Partial<{
			permitOptions: Omit<StandardPermitArguments, 'amount'>;
			zeroExOptions: Partial<Zero0xQuoteOptions>;
		}>
	): Promise<TransactionResponse> {
		if (isMint)
			return this.buyMint(index, amountInInputToken, inputToken, options);

		return this.buySwap(
			index.address,
			amountInInputToken,
			inputToken,
			options?.zeroExOptions
		);
	}

	public async buyMint(
		index: Index,
		amountInInputToken: BigNumberish,
		inputTokenAddress?: Address,
		options?: Partial<{
			permitOptions: Omit<StandardPermitArguments, 'amount'>;
			zeroExOptions: Partial<Zero0xQuoteOptions>;
		}>
	): Promise<TransactionResponse> {
		const amounts = await index.scaleAmount(amountInInputToken);

		const routerInputTokenAddress =
			inputTokenAddress ?? (await this.indexRouter.weth());
		const buyAmounts = await Promise.all(
			amounts.map(async ({ asset, amount }) => {
				if (asset === routerInputTokenAddress || amount.isZero())
					return {
						asset,
						swapTarget: constants.AddressZero,
						buyAssetMinAmount: amount,
						assetQuote: [],
						estimatedGas: 0,
					};

				const { to, buyAmount, data, estimatedGas } =
					await this.zeroExAggregator.quote(
						routerInputTokenAddress,
						asset,
						amount,
						options?.zeroExOptions
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

		const priceOracle = await getDefaultPriceOracle(this.indexRouter.account);
		const buyAmountsInBase = await Promise.all(
			buyAmounts.map(async ({ asset, buyAssetMinAmount }, index) => {
				const price =
					await priceOracle.contract.callStatic.refreshedAssetPerBaseInUQ(
						asset
					);
				return {
					asset,
					buyAmount: BigNumber.from(buyAssetMinAmount)
						.mul(BigNumber.from(2).pow(112))
						.mul(255)
						.div(price.mul(amounts[index].weight)),
				};
			})
		);

		const minAmount = buyAmountsInBase.reduce((min, curr) =>
			min.buyAmount.lte(curr.buyAmount) ? min : curr
		);

		const scaledSellAmounts = Object.values(amounts).map(({ amount }, i) =>
			amount.mul(minAmount.buyAmount).div(buyAmountsInBase[i].buyAmount)
		);

		const quotes = await Promise.all(
			amounts.map(async ({ asset }, i) => {
				if (asset === routerInputTokenAddress || scaledSellAmounts[i].isZero())
					return {
						asset,
						swapTarget: constants.AddressZero,
						buyAssetMinAmount: scaledSellAmounts[i],
						assetQuote: [],
						estimatedGas: 0,
					};

				const {
					buyAmount,
					to: swapTarget,
					data: assetQuote,
					estimatedGas,
				} = await this.zeroExAggregator.quote(
					routerInputTokenAddress,
					asset,
					scaledSellAmounts[i],
					options?.zeroExOptions
				);

				const buyAssetMinAmount = options?.zeroExOptions?.slippagePercentage
					? BigNumber.from(buyAmount)
							.mul(1000 - options?.zeroExOptions?.slippagePercentage * 1000)
							.div(1000)
					: buyAmount;
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

		const mintOptions = {
			index: index.address,
			recipient: await this.indexRouter.account.address(),
			quotes,
			amountInInputToken,
			inputToken: routerInputTokenAddress,
		};

		return this.indexRouter.mintSwap(
			mintOptions,
			amountInInputToken,
			inputTokenAddress,
			options?.permitOptions
		);
	}

	public async buySwap(
		indexAddress: Address,
		amountInInputToken: BigNumberish,
		inputTokenAddress?: Address,
		zeroExOptions?: Partial<Zero0xQuoteOptions>
	): Promise<TransactionResponse> {
		const { to, sellAmount, data, estimatedGas } =
			await this.zeroExAggregator.quote(
				inputTokenAddress ??
					nativeTokenSymbol(await this.indexRouter.account.chainId()),
				indexAddress,
				amountInInputToken,
				{
					...zeroExOptions,
					takerAddress: await this.indexRouter.account.address(),
				}
			);

		// TODO: catch InsufficientAllowanceError from ZeroExAggregator instead
		// if (inputToken)
		// 	await inputToken.checkAllowance(to, sellAmount);

		return this.indexRouter.account.signer.sendTransaction({
			to,
			data,
			gasLimit: BigNumber.from(estimatedGas).toHexString(),
			...(inputTokenAddress
				? {}
				: { value: BigNumber.from(sellAmount).toHexString() }),
		});
	}

	/**
	 * ### Static auto Sell
	 *
	 * @param index index address or it's Index interface
	 * @param indexAmount amount in index token
	 * @param outputToken instance or address of output token
	 * @param options 0x request options
	 *
	 * @returns output token amount
	 */
	async selectSell(
		index: Index,
		indexAmount: BigNumberish,
		outputToken?: Erc20,
		options?: Partial<Zero0xQuoteOptions>
	): Promise<{
		isBurn: boolean;
		outputAmount: BigNumber;
		target: Address;
		expectedAllowance?: BigNumber;
	}> {
		let outputTokenAddress: Address;
		let outputTokenPriceEth: BigNumber = BigNumber.from(10).pow(18);

		if (outputToken) {
			outputTokenAddress = outputToken.address;
			const { buyAmount } = await this.zeroExAggregator.price(
				outputToken.address,
				await this.indexRouter.weth(),
				BigNumber.from(10).pow(await outputToken.decimals()),
				options
			);

			outputTokenPriceEth = BigNumber.from(buyAmount);
		} else {
			outputTokenAddress = await this.indexRouter.weth();
			outputToken = new Erc20(
				this.indexRouter.account,
				await this.indexRouter.weth()
			);
		}

		const [zeroExSwap, amounts] = await Promise.all([
			this.zeroExAggregator.quote(
				index.address,
				outputTokenAddress ??
					nativeTokenSymbol(await this.indexRouter.account.chainId()),
				indexAmount,
				options
			),
			this.indexRouter.burnTokensAmount(index, indexAmount),
		]);

		const prices = await Promise.all(
			amounts.map(async ({ amount, asset }) => {
				if(asset === outputTokenAddress) {
					return {
						buyAmount: amount,
						estimatedGas: 0
					}
				}

 				if (!amount || amount.isZero()) {
					return {
						buyAmount: 0,
						estimatedGas: 0,
					};
				}

				return this.zeroExAggregator.price(
					asset,
					outputTokenAddress,
					amount.mul(999).div(1000),
					options
				);
			})
		);

		const indexRouterBurnOutputAmount = prices.reduce(
			(acc, { buyAmount }) => acc.add(buyAmount),
			BigNumber.from(0)
		);

		const totalBurnGas = BigNumber.from(
			prices
				.reduce(
					(curr, { estimatedGas }) => curr.add(estimatedGas),
					BigNumber.from(0)
				)
				.add(baseBurnGas + prices.length * additionalBurnGasPerAsset)
		);

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

		const target = isBurn ? this.indexRouter.address : zeroExSwap.to;
		let expectedAllowance: BigNumber | undefined;
		try {
			await index.checkAllowance(target, indexAmount);
		} catch (error) {
			if (error instanceof InsufficientAllowanceError) {
				expectedAllowance = error.expectedAllowance;
			} else {
				throw error;
			}
		}

		return {
			isBurn,
			target,
			outputAmount: isBurn
				? indexRouterBurnOutputAmount
				: BigNumber.from(zeroExSwap.buyAmount),
			expectedAllowance,
		};
	}

	/**
	 * ### Auto Sell
	 *
	 * @param isBurn true if burn, false if swap
	 * @param index index  nterface
	 * @param indexAmount amount in index token
	 * @param outputTokenAddress instance or address of output token
	 * @param options 0x request and zeroEx options
	 *
	 * @returns burn or swap transaction
	 */
	async sell(
		isBurn: boolean,
		index: Index,
		indexAmount: BigNumberish,
		outputTokenAddress?: Address,
		options?: Partial<{
			permitOptions: Omit<StandardPermitArguments, 'amount'>;
			zeroExOptions: Partial<Zero0xQuoteOptions>;
		}>
	): Promise<TransactionResponse> {
		if (isBurn)
			return this.sellBurn(index, indexAmount, outputTokenAddress, options);

		return this.sellSwap(
			index.address,
			indexAmount,
			outputTokenAddress,
			options?.zeroExOptions
		);
	}

	public async sellBurn(
		index: Index,
		indexAmount: BigNumberish,
		outputTokenAddress?: Address,
		options?: Partial<{
			permitOptions: Omit<StandardPermitArguments, 'amount'>;
			zeroExOptions: Partial<Zero0xQuoteOptions>;
		}>
	): Promise<TransactionResponse> {
		const amounts = await this.indexRouter.burnAmount(index, indexAmount);

		const routerOutputTokenAddress = outputTokenAddress ?? (await this.indexRouter.weth())
		const quotes = await Promise.all(
			amounts.map(async ({ amount, asset }, i) => {
				if (!amount || amount.isZero() || asset === routerOutputTokenAddress) {
					return {
						swapTarget: constants.AddressZero,
						assetQuote: [],
						buyAssetMinAmount: 0,
						estimatedGas: 0,
					};
				}

				const {
					buyAmount,
					to: swapTarget,
					data: assetQuote,
					estimatedGas,
				} = await this.zeroExAggregator.quote(
					asset,
					routerOutputTokenAddress,
					amount.mul(999).div(1000),
					options?.zeroExOptions
				);

				const buyAssetMinAmount = options?.zeroExOptions?.slippagePercentage
					? BigNumber.from(buyAmount)
							.mul(1000 - options?.zeroExOptions?.slippagePercentage * 1000)
							.div(1000)
					: buyAmount;
				return {
					swapTarget,
					buyAssetMinAmount,
					assetQuote,
					estimatedGas,
				};
			})
		);

		return this.indexRouter.burnSwap(
			index.address,
			indexAmount,
			await this.indexRouter.account.address(),
			{
				outputAsset: outputTokenAddress,
				quotes,
				permitOptions: options?.permitOptions,
			}
		);
	}

	public async sellSwap(
		indexAddress: Address,
		indexAmount: BigNumberish,
		outputTokenAddress?: Address,
		options?: Partial<Zero0xQuoteOptions>
	): Promise<TransactionResponse> {
		const { to, data, estimatedGas } = await this.zeroExAggregator.quote(
			indexAddress,
			outputTokenAddress ??
				nativeTokenSymbol(await this.indexRouter.account.chainId()),
			indexAmount,
			{ ...options, takerAddress: await this.indexRouter.account.address() }
		);

		// TODO: catch InsufficientAllowanceError from ZeroExAggregator instead
		// await index.checkAllowance(zeroExSwap.to, zeroExSwap.sellAmount);

		return this.indexRouter.account.signer.sendTransaction({
			to,
			data,
			gasLimit: BigNumber.from(estimatedGas).toHexString(),
		});
	}
}
