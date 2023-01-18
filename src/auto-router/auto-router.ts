import { TransactionResponse } from '@ethersproject/abstract-provider'
import { BigNumber, BigNumberish, constants } from 'ethers'

import { Zero0xQuoteOptions, ZeroExAggregator } from '../0x-aggregator'
import { Erc20, StandardPermitArguments } from '../erc-20'
import { InsufficientAllowanceError } from '../errors'
import { IndexWithdrawRouter } from '../index-router'
import {
  defaultIndexDepositRouterAddress,
  IndexDepositRouter,
} from '../index-router/index-deposit-router'
import { getDefaultPriceOracle } from '../price-oracle'
import { getDefaultIndexHelper, Index } from '../products/index'
import { Router } from '../router'
import { IReserveRouter } from '../typechain/IndexDepositRouter'
import { Address, ChainId, ChainIds, TokenSymbol } from '../types'

const UQ112 = BigNumber.from(2).pow(112)
const baseDepositGas = 95_000
const additionalSwapDepositGas = (network: ChainId) => {
  const gas = {
    [ChainIds.Mainnet]: 115_000,
    [ChainIds.CChain]: 100_000,
  }[network]

  return gas || 125_000
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
   * @param indexWithdrawRouter instance of IndexWithdrawRouter
   * @param indexDepositRouter instance of indexDepositRouter
   * @param zeroExAggregator ZeroEx client
   *
   * @returns New AutoRouter instance
   */
  constructor(
    public readonly indexWithdrawRouter: IndexWithdrawRouter,
    public readonly indexDepositRouter: IndexDepositRouter,
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
    const [
      zeroExSwap,
      IndexHelper,
      priceOracle,
      wethAddress,
    ] = await Promise.all([
      this.zeroExAggregator.quote(
        inputToken?.address || nativeTokenSymbol(await index.account.chainId()),
        index.address,
        amountInInputToken,
        options,
      ),
      getDefaultIndexHelper(index.account),
      getDefaultPriceOracle(index.account),
      this.indexWithdrawRouter.weth(),
    ])

    const inputTokenAddress = inputToken?.address || wethAddress

    const [totalEvaluation, ethBasePrice] = await Promise.all([
      IndexHelper.contract.totalEvaluation(index.address),
      priceOracle.contract.callStatic.refreshedAssetPerBaseInUQ(wethAddress),
    ])

    let totalDepositGas = BigNumber.from(baseDepositGas)
    if (inputToken) {
      const { buyAmount, estimatedGas } = await this.zeroExAggregator.quote(
        inputTokenAddress,
        await this.indexWithdrawRouter.weth(),
        amountInInputToken,
      )
      totalDepositGas = totalDepositGas
        .add(estimatedGas)
        .add(
          additionalSwapDepositGas(
            await this.indexWithdrawRouter.account.chainId(),
          ),
        )

      amountInInputToken = BigNumber.from(buyAmount)
    }

    const indexOutputAmount = BigNumber.from(amountInInputToken)
      .mul(UQ112)
      .div(ethBasePrice)
      .mul(await index.contract.totalSupply())
      .div(totalEvaluation._totalEvaluation)

    const gasDiffInEth = totalDepositGas
      .sub(zeroExSwap.estimatedGas)
      .mul(zeroExSwap.gasPrice)

    const outputAmountDiffInEth = indexOutputAmount
      .sub(zeroExSwap.buyAmount)
      .mul(totalEvaluation._indexPriceInBase)
      .div(BigNumber.from(10).pow(await index.decimals()))
      .mul(ethBasePrice)
      .div(UQ112)

    const isDeposit = gasDiffInEth.lte(outputAmountDiffInEth)
    const target = isDeposit
      ? defaultIndexDepositRouterAddress[await index.account.chainId()]
      : zeroExSwap.to

    let expectedAllowance: BigNumber | undefined
    if (inputToken) {
      try {
        await inputToken.checkAllowance(target, amountInInputToken)
      } catch (error) {
        if (!(error instanceof InsufficientAllowanceError)) {
          throw error
        }

        expectedAllowance = error.expectedAllowance
      }
    }

    return {
      isMint: isDeposit,
      target,
      outputAmount: isDeposit
        ? indexOutputAmount
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
    let params: IReserveRouter.QuoteParamsStruct | undefined
    if (inputTokenAddress) {
      const { to, buyAmount, data } = await this.zeroExAggregator.quote(
        inputTokenAddress,
        await this.indexWithdrawRouter.weth(),
        amountInInputToken,
        options?.zeroExOptions,
      )
      params = {
        input: inputTokenAddress,
        inputAmount: amountInInputToken,
        minOutputAmount: buyAmount,
        swapTarget: to,
        assetQuote: data,
      }
      await new Erc20(
        this.indexWithdrawRouter.account,
        inputTokenAddress as Address,
      ).checkAllowance(
        defaultIndexDepositRouterAddress[
          await this.indexWithdrawRouter.account.chainId()
        ],
        amountInInputToken,
      )
    }

    return this.indexDepositRouter.deposit(
      index.address,
      amountInInputToken,
      params,
    )
  }

  public async buySwap(
    indexAddress: Address,
    amountInInputToken: BigNumberish,
    inputTokenAddress?: Address,
    zeroExOptions?: Partial<Zero0xQuoteOptions>,
  ): Promise<TransactionResponse> {
    const {
      to,
      sellAmount,
      data,
      estimatedGas,
    } = await this.zeroExAggregator.quote(
      inputTokenAddress ||
        nativeTokenSymbol(await this.indexWithdrawRouter.account.chainId()),
      indexAddress,
      amountInInputToken,
      {
        ...zeroExOptions,
        takerAddress: await this.indexWithdrawRouter.account.address(),
      },
    )

    // TODO: catch InsufficientAllowanceError from ZeroExAggregator instead
    // if (inputToken)
    // 	await inputToken.checkAllowance(to, sellAmount);

    return this.indexWithdrawRouter.account.signer.sendTransaction({
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
        outputToken.address,
        await this.indexWithdrawRouter.weth(),
        BigNumber.from(10).pow(await outputToken.decimals()),
        options,
      )

      outputTokenPriceEth = BigNumber.from(buyAmount)
    } else {
      outputTokenAddress = await this.indexWithdrawRouter.weth()
      outputToken = new Erc20(
        this.indexWithdrawRouter.account,
        await this.indexWithdrawRouter.weth(),
      )
    }

    const [zeroExSwap, amounts] = await Promise.all([
      this.zeroExAggregator.quote(
        index.address,
        outputTokenAddress ||
          nativeTokenSymbol(await this.indexWithdrawRouter.account.chainId()),
        indexAmount,
        options,
      ),
      this.indexWithdrawRouter.burnTokensAmount(index, indexAmount),
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
        .add(
          baseBurnGas +
            prices.length *
              additionalBurnGasPerAsset(
                await this.indexWithdrawRouter.account.chainId(),
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

    const target = isBurn ? this.indexWithdrawRouter.address : zeroExSwap.to
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
    const amounts = await this.indexWithdrawRouter.burnAmount(
      index,
      indexAmount,
    )

    const routerOutputTokenAddress =
      outputTokenAddress || (await this.indexWithdrawRouter.weth())
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

    return this.indexWithdrawRouter.burnSwap(
      index.address,
      indexAmount,
      await this.indexWithdrawRouter.account.address(),
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
      indexAddress,
      outputTokenAddress ||
        nativeTokenSymbol(await this.indexWithdrawRouter.account.chainId()),
      indexAmount,
      {
        ...options,
        takerAddress: await this.indexWithdrawRouter.account.address(),
      },
    )

    // TODO: catch InsufficientAllowanceError from ZeroExAggregator instead
    // await index.checkAllowance(zeroExSwap.to, zeroExSwap.sellAmount);

    return this.indexWithdrawRouter.account.signer.sendTransaction({
      to,
      data,
      gasLimit: BigNumber.from(estimatedGas).toHexString(),
    })
  }
}
