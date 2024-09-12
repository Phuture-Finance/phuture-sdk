import { TransactionResponse } from '@ethersproject/abstract-provider'
import { BigNumber, BigNumberish, constants } from 'ethers'

import { Zero0xQuoteOptions, ZeroExAggregator } from '../0x-aggregator/v2'
import { Erc20, StandardPermitArguments } from '../erc-20'
import { InsufficientAllowanceError } from '../errors'
import { IndexRouter } from '../index-router'
import { getDefaultPriceOracle } from '../price-oracle'
import { getDefaultIndexHelper, Index } from '../products/index'
import { Router } from '../router'
import { Address, ChainId, ChainIds, TokenSymbol } from '../types'

const baseMintGas = 260_000
const additionalMintGasPerAsset = (network: ChainId): number => {
  const gas = {
    [ChainIds.Mainnet]: 148_000,
    [ChainIds.CChain]: 105_000,
  }[network]

  return gas || 135_000
}

const baseBurnGas = 100_000
const additionalBurnGasPerAsset = (network: ChainId) => {
  const gas = {
    [ChainIds.Mainnet]: 234_000,
    [ChainIds.CChain]: 192_000,
  }[network]

  return gas || 300_000
}

export const nativeTokenSymbol = (network: ChainId): TokenSymbol => {
  const symbol = {
    [ChainIds.Mainnet]: 'ETH',
    [ChainIds.CChain]: 'AVAX',
  }[network]

  if (!symbol) throw new Error(`Unsupported network: ${network}`)

  return symbol
}

/** ### AutoRouter class */
export class AutoRouter implements Router {
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
    inputToken?: Erc20,
    options?: Partial<Zero0xQuoteOptions>,
  ): Promise<{
    isMint: boolean
    target: Address
    outputAmount: BigNumber
    expectedAllowance?: BigNumber
  }> {
    const [zeroExSwap, amounts, IndexHelper, priceOracle, wethAddress] =
      await Promise.all([
        this.zeroExAggregator.quote(
          await this.indexRouter.account.address(),
          await this.indexRouter.account.chainId(),
          inputToken?.address ||
            nativeTokenSymbol(await index.account.chainId()),
          index.address,
          amountInInputToken,
          options,
        ),
        index.scaleAmount(amountInInputToken),
        getDefaultIndexHelper(index.account),
        getDefaultPriceOracle(index.account),
        this.indexRouter.weth(),
      ])

    const inputTokenAddress = inputToken?.address || wethAddress

    const quotes = await Promise.all(
      amounts.map(async ({ amount, asset }) => {
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
            await this.indexRouter.account.address(),
            await this.indexRouter.account.chainId(),
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
          index.address,
          amountInInputToken,
          quotes,
          inputToken?.address,
        ),
        IndexHelper.contract.totalEvaluation(index.address),
        priceOracle.contract.callStatic.refreshedAssetPerBaseInUQ(wethAddress),
      ])

    const totalMintGas = BigNumber.from(
      quotes
        .reduce((curr, acc) => curr.add(acc.estimatedGas), BigNumber.from(0))
        .add(
          baseMintGas +
            quotes.length *
              additionalMintGasPerAsset(await index.account.chainId()),
        ),
    )

    const gasDiffInEth = totalMintGas
      .sub(zeroExSwap.estimatedGas)
      .mul(zeroExSwap.gasPrice)

    const outputAmountDiffInEth = indexRouterMintOutputAmount
      .sub(zeroExSwap.buyAmount)
      .mul(totalEvaluation._indexPriceInBase)
      .div(BigNumber.from(10).pow(await index.decimals()))
      .mul(ethBasePrice)
      .div(BigNumber.from(2).pow(112))

    const isMint = gasDiffInEth.lte(outputAmountDiffInEth)
    const target = isMint ? this.indexRouter.address : zeroExSwap.to

    let expectedAllowance: BigNumber | undefined
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
    inputToken?: Address,
    options?: Partial<{
      permitOptions: Omit<StandardPermitArguments, 'amount'>
      zeroExOptions: Partial<Zero0xQuoteOptions>
    }>,
  ): Promise<TransactionResponse> {
    if (isMint)
      return this.buyMint(index, amountInInputToken, inputToken, options)

    return this.buySwap(
      index.address,
      amountInInputToken,
      inputToken,
      options?.zeroExOptions,
    )
  }

  public async buyMint(
    index: Index,
    amountInInputToken: BigNumberish,
    inputTokenAddress?: Address,
    options?: Partial<{
      permitOptions: Omit<StandardPermitArguments, 'amount'>
      zeroExOptions: Partial<Zero0xQuoteOptions>
    }>,
  ): Promise<TransactionResponse> {
    const amounts = await index.scaleAmount(amountInInputToken)

    const routerInputTokenAddress =
      inputTokenAddress || (await this.indexRouter.weth())
    const buyAmounts = await Promise.all(
      amounts.map(async ({ asset, amount }) => {
        if (asset === routerInputTokenAddress || amount.isZero())
          return {
            asset,
            swapTarget: constants.AddressZero,
            buyAssetMinAmount: amount,
            assetQuote: [],
            estimatedGas: 0,
          }

        const { to, buyAmount, data, estimatedGas } =
          await this.zeroExAggregator.quote(
            await this.indexRouter.account.address(),
            await this.indexRouter.account.chainId(),
            routerInputTokenAddress,
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

    const priceOracle = await getDefaultPriceOracle(this.indexRouter.account)
    const buyAmountsInBase = await Promise.all(
      buyAmounts.map(async ({ asset, buyAssetMinAmount }, amountIndex) => {
        const price =
          await priceOracle.contract.callStatic.refreshedAssetPerBaseInUQ(asset)
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

    const scaledSellAmounts = Object.values(amounts).map(({ amount }, i) =>
      amount.mul(minAmount.buyAmount).div(buyAmountsInBase[i]!.buyAmount),
    )

    const quotes = await Promise.all(
      amounts.map(async ({ asset }, i) => {
        const scaledSellAmount = scaledSellAmounts[i] as BigNumber
        if (asset === routerInputTokenAddress || scaledSellAmount.isZero())
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
          await this.indexRouter.account.address(),
          await this.indexRouter.account.chainId(),
          routerInputTokenAddress,
          asset,
          scaledSellAmount,
          options?.zeroExOptions,
        )

        let buyAssetMinAmount = BigNumber.from(buyAmount)
        if (options?.zeroExOptions?.slippageBps) {
          buyAssetMinAmount = buyAssetMinAmount
            .mul(1000 - options?.zeroExOptions?.slippageBps)
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
      index: index.address,
      recipient: await this.indexRouter.account.address(),
      quotes,
      amountInInputToken,
      inputToken: routerInputTokenAddress,
    }

    return this.indexRouter.mintSwap(
      mintOptions,
      amountInInputToken,
      inputTokenAddress,
      options?.permitOptions,
    )
  }

  public async buySwap(
    indexAddress: Address,
    amountInInputToken: BigNumberish,
    inputTokenAddress?: Address,
    zeroExOptions?: Partial<Zero0xQuoteOptions>,
  ): Promise<TransactionResponse> {
    const { to, sellAmount, data, estimatedGas } =
      await this.zeroExAggregator.quote(
        await this.indexRouter.account.address(),
        await this.indexRouter.account.chainId(),
        inputTokenAddress ||
          nativeTokenSymbol(await this.indexRouter.account.chainId()),
        indexAddress,
        amountInInputToken,
        {
          ...zeroExOptions,
          taker: await this.indexRouter.account.address(),
        },
      )

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
    outputToken?: Erc20,
    options?: Partial<Zero0xQuoteOptions>,
  ): Promise<{
    isBurn: boolean
    outputAmount: BigNumber
    target: Address
    expectedAllowance?: BigNumber
  }> {
    let outputTokenAddress: Address
    let outputTokenPriceEth: BigNumber = BigNumber.from(10).pow(18)

    if (outputToken) {
      outputTokenAddress = outputToken.address
      const { buyAmount } = await this.zeroExAggregator.price(
        await this.indexRouter.account.chainId(),
        outputToken.address,
        await this.indexRouter.weth(),
        BigNumber.from(10).pow(await outputToken.decimals()),
        options,
      )

      outputTokenPriceEth = BigNumber.from(buyAmount)
    } else {
      outputTokenAddress = await this.indexRouter.weth()
      outputToken = new Erc20(
        this.indexRouter.account,
        await this.indexRouter.weth(),
      )
    }

    const [zeroExSwap, amounts] = await Promise.all([
      this.zeroExAggregator.quote(
        await this.indexRouter.account.address(),
        await this.indexRouter.account.chainId(),
        index.address,
        outputTokenAddress ||
          nativeTokenSymbol(await this.indexRouter.account.chainId()),
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
          await this.indexRouter.account.chainId(),
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
        .add(
          baseBurnGas +
            prices.length *
              additionalBurnGasPerAsset(
                await this.indexRouter.account.chainId(),
              ),
        ),
    )

    const isBurn = totalBurnGas
      .sub(zeroExSwap.estimatedGas)
      .mul(zeroExSwap.gasPrice)
      .lte(
        indexRouterBurnOutputAmount
          .sub(zeroExSwap.buyAmount)
          .mul(outputTokenPriceEth)
          .div(
            BigNumber.from(10).pow(
              outputToken ? await outputToken.decimals() : 18,
            ),
          ),
      )

    const target = isBurn ? this.indexRouter.address : zeroExSwap.to
    let expectedAllowance: BigNumber | undefined
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
    outputTokenAddress?: Address,
    options?: Partial<{
      permitOptions: Omit<StandardPermitArguments, 'amount'>
      zeroExOptions: Partial<Zero0xQuoteOptions>
    }>,
  ): Promise<TransactionResponse> {
    if (isBurn)
      return this.sellBurn(index, indexAmount, outputTokenAddress, options)

    return this.sellSwap(
      index.address,
      indexAmount,
      outputTokenAddress,
      options?.zeroExOptions,
    )
  }

  public async sellBurn(
    index: Index,
    indexAmount: BigNumberish,
    outputTokenAddress?: Address,
    options?: Partial<{
      permitOptions: Omit<StandardPermitArguments, 'amount'>
      zeroExOptions: Partial<Zero0xQuoteOptions>
    }>,
  ): Promise<TransactionResponse> {
    const amounts = await this.indexRouter.burnAmount(index, indexAmount)

    const routerOutputTokenAddress =
      outputTokenAddress || (await this.indexRouter.weth())
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
          await this.indexRouter.account.address(),
          await this.indexRouter.account.chainId(),
          asset,
          routerOutputTokenAddress,
          amount.mul(999).div(1000),
          options?.zeroExOptions,
        )

        const buyAssetMinAmount = options?.zeroExOptions?.slippageBps
          ? BigNumber.from(buyAmount)
              .mul(1000 - options?.zeroExOptions?.slippageBps)
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
      index.address,
      indexAmount,
      await this.indexRouter.account.address(),
      {
        outputAsset: outputTokenAddress,
        quotes,
        permitOptions: options?.permitOptions,
      },
    )
  }

  public async sellSwap(
    indexAddress: Address,
    indexAmount: BigNumberish,
    outputTokenAddress?: Address,
    options?: Partial<Zero0xQuoteOptions>,
  ): Promise<TransactionResponse> {
    const { to, data, estimatedGas } = await this.zeroExAggregator.quote(
      await this.indexRouter.account.address(),
      await this.indexRouter.account.chainId(),
      indexAddress,
      outputTokenAddress ||
        nativeTokenSymbol(await this.indexRouter.account.chainId()),
      indexAmount,
      { ...options, taker: await this.indexRouter.account.address() },
    )

    // TODO: catch InsufficientAllowanceError from ZeroExAggregator instead
    // await index.checkAllowance(zeroExSwap.to, zeroExSwap.sellAmount);

    return this.indexRouter.account.signer.sendTransaction({
      to,
      data,
      gasLimit: BigNumber.from(estimatedGas).toHexString(),
    })
  }
}
