import type { TransactionResponse } from "@ethersproject/abstract-provider";
import { constants, BigNumber, type BigNumberish } from "ethers";

import type { Zero0xQuoteOptions, ZeroExAggregator } from "./0x-aggregator";
import type { Index } from "./base-index";
import type { Erc20 } from "./erc-20";
import { InsufficientAllowanceError } from "./errors";
import type { IndexRouter } from "./index-router";
import { IndexHelper__factory, PhuturePriceOracle__factory } from "./typechain";

const baseMintGas = 260_000;
const additionalMintGasPerAsset = 125_000;

const baseBurnGas = 100_000;
const additionalBurnGasPerAsset = 195_000;

/** ### Default PhuturePriceOracle address for network */
export const defaultPhuturePriceOracleAddress: Record<number, string> = {
	/** ### Default PhuturePriceOracle address on mainnet. */
	1: "0x384ac33558821383ff4fc73d1dee3539a74bf540",
	/** ### Default PhuturePriceOracle address on c-chain. */
	43114: "0x69e848b2f41019340cec3e6696d5c937e74da96b",
};

/** ### Default IndexHelper address for network */
export const defaultIndexHelperAddress: Record<number, string> = {
	/** ### Default IndexHelper address on mainnet. */
	1: "0x76dd4189d73f07e7b11350cffc9b503627fc7a3b",
	/** ### Default IndexHelper address on c-chain. */
	43114: "0xacef72ef3afeb044845f0869586445e5c6c2504a",
};

/** ### AutoRouter class */
export class AutoRouter {
  /**
   * ### Creates a new AutoRouter instance
   *
   * @param indexRouter instance of IndexRouter
   * @param zeroExAggregator ZeroEx client
   *
   * @returns New AutoRouter instance
   */
  constructor(
    public readonly indexRouter: IndexRouter,
    public readonly zeroExAggregator: ZeroExAggregator,
  ) {}

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
    inputToken: Erc20,
    options?: Partial<Zero0xQuoteOptions>,
  ): Promise<{
    isMint: boolean
    target: string
    outputAmount: BigNumber
    expectedAllowance?: BigNumberish
  }> {
    const chainId = await index.signer.getChainId()
    const inputTokenAddress = inputToken.contract.address

    const [zeroExSwap, amounts, wethAddress] = await Promise.all([
      this.zeroExAggregator.quote(
        inputToken?.contract.address ||
          '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
        index.contract.address,
        amountInInputToken,
        options,
      ),
      index.getAnatomy(),
      this.indexRouter.contract.WETH(),
    ])

    const indexHelperAddress = defaultIndexHelperAddress[chainId]
    if (!indexHelperAddress)
      throw Error('No default IndexHelper found for chain')

    const indexHelper = IndexHelper__factory.connect(
      indexHelperAddress,
      index.signer,
    )

    const priceOracleAddress = defaultPhuturePriceOracleAddress[chainId]
    if (!priceOracleAddress)
      throw Error('No default PhuturePriceOracle found for chain')

    const priceOracle = PhuturePriceOracle__factory.connect(
      priceOracleAddress,
      index.signer,
    )

    const quotes = await Promise.all(
      amounts
        .map(({ asset, weight }) => ({
          asset,
          amount: BigNumber.from(amountInInputToken).mul(weight).div(255),
          weight,
        }))
        .map(async ({ amount, asset }) => {
          if (asset === inputTokenAddress)
            return {
              asset,
              swapTarget: constants.AddressZero,
              buyAssetMinAmount: amount,
              assetQuote: [],
              estimatedGas: 0,
            }

          const { to, buyAmount, data, estimatedGas } =
            await this.zeroExAggregator.quote(
              inputTokenAddress,
              asset,
              amount,
              options,
            )

          return {
            asset,
            swapTarget: to,
            buyAssetMinAmount: buyAmount,
            assetQuote: data,
            estimatedGas,
          }
        }),
    )

    const [indexRouterMintOutputAmount, totalEvaluation, ethBasePrice] =
      await Promise.all([
        this.indexRouter.mintIndexAmount(
          index.contract.address,
          amountInInputToken,
          quotes,
          inputToken?.contract.address,
        ),
        indexHelper.totalEvaluation(index.contract.address),
        priceOracle.callStatic.refreshedAssetPerBaseInUQ(wethAddress),
      ])

    const totalMintGas = BigNumber.from(
      quotes
        .reduce((curr, acc) => curr.add(acc.estimatedGas), BigNumber.from(0))
        .add(baseMintGas + quotes.length * additionalMintGasPerAsset),
    )

    const gasDiffInEth = totalMintGas
      .sub(zeroExSwap.estimatedGas)
      .mul(zeroExSwap.gasPrice)

    const outputAmountDiffInEth = indexRouterMintOutputAmount
      .sub(zeroExSwap.buyAmount)
      .mul(totalEvaluation._indexPriceInBase)
      .div(BigNumber.from(10).pow(18)) // we know for sure all our indicies are 18d
      .mul(ethBasePrice)
      .div(BigNumber.from(2).pow(112))

    const isMint = gasDiffInEth.lte(outputAmountDiffInEth)
    const target = isMint ? this.indexRouter.contract.address : zeroExSwap.to

    let expectedAllowance: BigNumberish | undefined
    if (inputToken) {
      try {
        await inputToken.checkAllowance(target, amountInInputToken)
      } catch (error) {
        if (error instanceof InsufficientAllowanceError) {
          expectedAllowance = error.expectedAllowance
        } else {
          throw error
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
    }
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
    inputTokenAddress: string,
    options?: Partial<{
      zeroExOptions: Partial<Zero0xQuoteOptions>
    }>,
  ): Promise<TransactionResponse> {
    if (isMint)
      return this.buyMint(index, amountInInputToken, inputTokenAddress, options)

    return this.buySwap(
      index.contract.address,
      amountInInputToken,
      inputTokenAddress,
      options?.zeroExOptions,
    )
  }

  public async buyMint(
    index: Index,
    amountInInputToken: BigNumberish,
    inputTokenAddress: string,
    options?: Partial<{
      zeroExOptions: Partial<Zero0xQuoteOptions>
    }>,
  ): Promise<TransactionResponse> {
    const amounts = await index.getAnatomy()

    const buyAmounts = await Promise.all(
      amounts
        .map(({ asset, weight }) => ({
          asset,
          amount: BigNumber.from(amountInInputToken).mul(weight).div(255),
          weight,
        }))
        .map(async ({ asset, amount }) => {
          if (asset === inputTokenAddress || amount.isZero())
            return {
              asset,
              swapTarget: constants.AddressZero,
              buyAssetMinAmount: amount,
              assetQuote: [],
              estimatedGas: 0,
            }

          const { to, buyAmount, data, estimatedGas } =
            await this.zeroExAggregator.quote(
              inputTokenAddress,
              asset,
              amount,
              options?.zeroExOptions,
            )

          return {
            asset,
            swapTarget: to,
            buyAssetMinAmount: buyAmount,
            assetQuote: data,
            estimatedGas,
          }
        }),
    )

    const priceOracleAddress =
      defaultPhuturePriceOracleAddress[await index.signer.getChainId()]
    if (!priceOracleAddress)
      throw Error('No default PhuturePriceOracle found for chain')

    const priceOracle = PhuturePriceOracle__factory.connect(
      priceOracleAddress,
      index.signer,
    )

    const buyAmountsInBase = await Promise.all(
      buyAmounts.map(async ({ asset, buyAssetMinAmount }, amountIndex) => {
        const price = await priceOracle.callStatic.refreshedAssetPerBaseInUQ(
          asset,
        )
        return {
          asset,
          buyAmount: BigNumber.from(buyAssetMinAmount)
            .mul(BigNumber.from(2).pow(112))
            .mul(255)
            .div(price.mul(amounts[amountIndex]!.weight)),
        }
      }),
    )

    const minAmount = buyAmountsInBase.reduce((min, curr) =>
      min.buyAmount.lte(curr.buyAmount) ? min : curr,
    )

    const scaledSellAmounts = Object.values(
      amounts.map(({ asset, weight }) => ({
        asset,
        amount: BigNumber.from(amountInInputToken).mul(weight).div(255),
        weight,
      })),
    ).map(({ amount }, i) =>
      amount.mul(minAmount.buyAmount).div(buyAmountsInBase[i]!.buyAmount),
    )

    const quotes = await Promise.all(
      amounts.map(async ({ asset }, i) => {
        const scaledSellAmount = scaledSellAmounts[i] as BigNumber
        if (asset === inputTokenAddress || scaledSellAmount.isZero())
          return {
            asset,
            swapTarget: constants.AddressZero,
            buyAssetMinAmount: scaledSellAmounts[i]!,
            assetQuote: [],
            estimatedGas: 0,
          }

        const {
          buyAmount,
          to: swapTarget,
          data: assetQuote,
          estimatedGas,
        } = await this.zeroExAggregator.quote(
          inputTokenAddress,
          asset,
          scaledSellAmount,
          options?.zeroExOptions,
        )

        let buyAssetMinAmount = BigNumber.from(buyAmount)
        if (options?.zeroExOptions?.slippagePercentage) {
          buyAssetMinAmount = buyAssetMinAmount
            .mul(1000 - options?.zeroExOptions?.slippagePercentage * 1000)
            .div(1000)
        }

        return {
          asset,
          buyAssetMinAmount,
          swapTarget,
          assetQuote,
          estimatedGas,
        }
      }),
    )

    amountInInputToken = scaledSellAmounts.reduce(
      (sum, curr) => sum.add(curr),
      BigNumber.from(0),
    )

    const mintOptions = {
      index: index.contract.address,
      recipient: await this.indexRouter.signer.getAddress(),
      quotes,
      amountInInputToken,
      inputToken: inputTokenAddress,
    }

    return this.indexRouter.mintSwap(
      mintOptions,
      amountInInputToken,
      inputTokenAddress,
    )
  }

  public async buySwap(
    indexAddress: string,
    amountInInputToken: BigNumberish,
    inputTokenAddress?: string,
    zeroExOptions?: Partial<Zero0xQuoteOptions>,
  ): Promise<TransactionResponse> {
    const { to, sellAmount, data, estimatedGas } =
      await this.zeroExAggregator.quote(
        inputTokenAddress || '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
        indexAddress,
        amountInInputToken,
        {
          ...zeroExOptions,
          takerAddress: await this.indexRouter.signer.getAddress(),
        },
      )

    // TODO: catch InsufficientAllowanceError from ZeroExAggregator instead
    // if (inputToken)
    // 	await inputToken.checkAllowance(to, sellAmount);

    return this.indexRouter.signer.sendTransaction({
      to,
      data,
      gasLimit: BigNumber.from(estimatedGas).toHexString(),
      ...(inputTokenAddress
        ? {}
        : { value: BigNumber.from(sellAmount).toHexString() }),
    })
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
    outputToken: Erc20,
    options?: Partial<Zero0xQuoteOptions>,
  ): Promise<{
    isBurn: boolean
    outputAmount: BigNumber
    target: string
    expectedAllowance?: BigNumberish
  }> {
    const outputTokenAddress: string = outputToken.contract.address

    const { buyAmount: outputTokenPriceEth } =
      await this.zeroExAggregator.price(
        outputToken.contract.address,
        await this.indexRouter.contract.WETH(),
        BigNumber.from(10).pow(await outputToken.contract.decimals()),
        options,
      )

    const [zeroExSwap, amounts] = await Promise.all([
      this.zeroExAggregator.quote(
        index.contract.address,
        outputTokenAddress || '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
        indexAmount,
        options,
      ),
      this.indexRouter.burnTokensAmount(index, indexAmount),
    ])

    const prices = await Promise.all(
      amounts.map(async ({ amount, asset }) => {
        if (asset === outputTokenAddress) {
          return {
            buyAmount: amount,
            estimatedGas: 0,
          }
        }

        if (!amount || amount.isZero()) {
          return {
            buyAmount: 0,
            estimatedGas: 0,
          }
        }

        return this.zeroExAggregator.price(
          asset,
          outputTokenAddress,
          amount.mul(999).div(1000),
          options,
        )
      }),
    )

    const indexRouterBurnOutputAmount = prices.reduce(
      (acc, { buyAmount }) => acc.add(buyAmount),
      BigNumber.from(0),
    )

    const totalBurnGas = BigNumber.from(
      prices
        .reduce(
          (curr, { estimatedGas }) => curr.add(estimatedGas),
          BigNumber.from(0),
        )
        .add(baseBurnGas + prices.length * additionalBurnGasPerAsset),
    )

    const isBurn = totalBurnGas
      .sub(zeroExSwap.estimatedGas)
      .mul(zeroExSwap.gasPrice)
      .lte(
        indexRouterBurnOutputAmount
          .sub(zeroExSwap.buyAmount)
          .mul(outputTokenPriceEth)
          .div(BigNumber.from(10).pow(await outputToken.contract.decimals())),
      )

    const target = isBurn ? this.indexRouter.contract.address : zeroExSwap.to
    let expectedAllowance: BigNumberish | undefined
    try {
      await index.checkAllowance(target, indexAmount)
    } catch (error) {
      if (error instanceof InsufficientAllowanceError) {
        expectedAllowance = error.expectedAllowance
      } else {
        throw error
      }
    }

    return {
      isBurn,
      target,
      outputAmount: isBurn
        ? indexRouterBurnOutputAmount
        : BigNumber.from(zeroExSwap.buyAmount),
      expectedAllowance,
    }
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
    outputTokenAddress: string,
    options?: Partial<{
      zeroExOptions: Partial<Zero0xQuoteOptions>
    }>,
  ): Promise<TransactionResponse> {
    if (isBurn)
      return this.sellBurn(index, indexAmount, outputTokenAddress, options)

    return this.sellSwap(
      index.contract.address,
      indexAmount,
      outputTokenAddress,
      options?.zeroExOptions,
    )
  }

  public async sellBurn(
    index: Index,
    indexAmount: BigNumberish,
    outputTokenAddress: string,
    options?: Partial<{
      zeroExOptions: Partial<Zero0xQuoteOptions>
    }>,
  ): Promise<TransactionResponse> {
    const amounts = await this.indexRouter.burnAmount(index, indexAmount)

    const routerOutputTokenAddress = outputTokenAddress
    const quotes = await Promise.all(
      amounts.map(async ({ amount, asset }) => {
        if (!amount || amount.isZero() || asset === routerOutputTokenAddress) {
          return {
            swapTarget: constants.AddressZero,
            assetQuote: [],
            buyAssetMinAmount: 0,
            estimatedGas: 0,
          }
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
          options?.zeroExOptions,
        )

        const buyAssetMinAmount = options?.zeroExOptions?.slippagePercentage
          ? BigNumber.from(buyAmount)
              .mul(1000 - options?.zeroExOptions?.slippagePercentage * 1000)
              .div(1000)
          : buyAmount
        return {
          swapTarget,
          buyAssetMinAmount,
          assetQuote,
          estimatedGas,
        }
      }),
    )

    return this.indexRouter.burnSwap(
      index.contract.address,
      indexAmount,
      await this.indexRouter.signer.getAddress(),
      outputTokenAddress,
      quotes,
    )
  }

  public async sellSwap(
    indexAddress: string,
    indexAmount: BigNumberish,
    outputTokenAddress?: string,
    options?: Partial<Zero0xQuoteOptions>,
  ): Promise<TransactionResponse> {
    const { to, data, estimatedGas } = await this.zeroExAggregator.quote(
      indexAddress,
      outputTokenAddress || '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
      indexAmount,
      { ...options, takerAddress: await this.indexRouter.signer.getAddress() },
    )

    // TODO: catch InsufficientAllowanceError from ZeroExAggregator instead
    // await index.checkAllowance(zeroExSwap.to, zeroExSwap.sellAmount);

    return this.indexRouter.signer.sendTransaction({
      to,
      data,
      gasLimit: BigNumber.from(estimatedGas).toHexString(),
    })
  }
}
