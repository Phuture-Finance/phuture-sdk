import { constants, BigNumber } from "ethers";

import type { ZeroExAggregator2, ZeroExRequest } from "./0x-aggregator-2";
import type { Index } from "./base-index";
import { Erc20 } from "./erc-20";
import { InsufficientAllowanceError } from "./errors";
import type { IndexRouter } from "./index-router";
import { IndexHelper__factory, PhuturePriceOracle__factory } from "./typechain";
import { TransactionResponse } from "@ethersproject/abstract-provider";

const NATIVE = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";

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
    public readonly zeroExAggregator: ZeroExAggregator2
  ) {}

  /**
   * ### Static auto Buy
   *
   * @param index index address or it's Index interface
   * @param sellAmount amount in input token
   * @param inputToken Erc20 or Erc20Permit interface of input token
   * @param zeroExOptions 0x request options
   *
   * @returns output amount of Index
   */
  async selectBuy(
    chainId: number,
    index: Index,
    sellAmount: string,
    sellToken: string,
    zeroExOptions?: Partial<ZeroExRequest>
  ): Promise<{
    isMint: boolean;
    target: string;
    outputAmount: BigNumber;
    expectedAllowance?: string;
  }> {
    const sellTokenInstance = new Erc20(index.signer, sellToken);

    const [zeroExSwap, amounts, wethAddress] = await Promise.all([
      this.zeroExAggregator.allowanceHolderQuote({
        ...zeroExOptions,
        chainId,
        sellToken,
        sellAmount,
        buyToken: index.contract.address,
      }),
      index.getAnatomy(),
      this.indexRouter.contract.WETH(),
    ]);

    const indexHelperAddress = defaultIndexHelperAddress[chainId];
    if (!indexHelperAddress)
      throw Error("No default IndexHelper found for chain");

    const indexHelper = IndexHelper__factory.connect(
      indexHelperAddress,
      index.signer
    );

    const priceOracleAddress = defaultPhuturePriceOracleAddress[chainId];
    if (!priceOracleAddress)
      throw Error("No default PhuturePriceOracle found for chain");

    const priceOracle = PhuturePriceOracle__factory.connect(
      priceOracleAddress,
      index.signer
    );

    const quotes = await Promise.all(
      amounts
        .map(({ asset, weight }) => ({
          asset,
          amount: BigNumber.from(sellAmount).mul(weight).div(255),
          weight,
        }))
        .map(async ({ amount, asset }) => {
          if (asset === sellToken)
            // TODO: isAddressEq
            return {
              asset,
              swapTarget: constants.AddressZero,
              buyAssetMinAmount: amount,
              assetQuote: [],
              estimatedGas: 0,
            };

          const { data } = await this.zeroExAggregator.allowanceHolderQuote({
            ...zeroExOptions,
            chainId,
            sellToken,
            buyToken: asset,
            sellAmount: amount.toString(),
          });

          return {
            asset,
            swapTarget: data.transaction.to,
            buyAssetMinAmount: data.minBuyAmount,
            assetQuote: data.transaction.data,
            estimatedGas: data.gas || 0,
          };
        })
    );

    const [indexRouterMintOutputAmount, totalEvaluation, ethBasePrice] =
      await Promise.all([
        this.indexRouter.mintIndexAmount(
          index.contract.address,
          sellAmount,
          quotes,
          sellToken
        ),
        indexHelper.totalEvaluation(index.contract.address),
        priceOracle.callStatic.refreshedAssetPerBaseInUQ(wethAddress),
      ]);

    const totalMintGas = BigNumber.from(
      quotes
        .reduce((curr, acc) => curr.add(acc.estimatedGas), BigNumber.from(0))
        .add(baseMintGas + quotes.length * additionalMintGasPerAsset)
    );

    const gasDiffInEth = totalMintGas
      .sub(zeroExSwap.data.transaction.gas || 0)
      .mul(zeroExSwap.data.transaction.gasPrice);

    const outputAmountDiffInEth = indexRouterMintOutputAmount
      .sub(zeroExSwap.data.buyAmount)
      .mul(totalEvaluation._indexPriceInBase)
      .div(BigNumber.from(10).pow(18)) // we know for sure all our indicies are 18d
      .mul(ethBasePrice)
      .div(BigNumber.from(2).pow(112));

    const isMint = gasDiffInEth.lte(outputAmountDiffInEth);
    const target = isMint
      ? this.indexRouter.contract.address
      : zeroExSwap.data.transaction.to;

    let expectedAllowance: string | undefined;
    if (sellToken.toLowerCase() !== NATIVE.toLowerCase()) {
      try {
        await sellTokenInstance.checkAllowance(target, sellAmount);
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
        : BigNumber.from(zeroExSwap.data.buyAmount),
      expectedAllowance,
    };
  }

  /**
   * ### Auto Buy
   *
   * @param isMint true if minting, false if swapping
   * @param index index address or it's Index interface
   * @param sellAmount amount in input token
   * @param inputToken Erc20 or Erc20Permit interface of input token
   * @param options 0x request options and permit options for transaction
   *
   * @returns mint or swap transaction
   */
  async buy(
    isMint: boolean,
    chainId: number,
    index: Index,
    sellAmount: string,
    sellToken: string,
    zeroExOptions?: Partial<ZeroExRequest>
  ): Promise<TransactionResponse> {
    if (isMint)
      return this.buyMint(chainId, index, sellAmount, sellToken, zeroExOptions);

    return this.buySwap(
      chainId,
      index.contract.address,
      sellAmount,
      sellToken,
      zeroExOptions
    );
  }

  public async buyMint(
    chainId: number,
    index: Index,
    sellAmount: string,
    sellToken: string,
    zeroExOptions?: Partial<ZeroExRequest>
  ): Promise<TransactionResponse> {
    const amounts = await index.getAnatomy();

    const buyAmounts = await Promise.all(
      amounts
        .map(({ asset, weight }) => ({
          asset,
          amount: BigNumber.from(sellAmount).mul(weight).div(255),
          weight,
        }))
        .map(async ({ asset, amount }) => {
          if (asset === sellToken || amount.isZero())
            return {
              asset,
              swapTarget: constants.AddressZero,
              buyAssetMinAmount: amount,
              assetQuote: [],
              estimatedGas: 0,
            };

          const { data } = await this.zeroExAggregator.allowanceHolderQuote({
            ...zeroExOptions,
            chainId,
            sellToken,
            buyToken: asset,
            sellAmount: amount.toString(),
          });

          return {
            asset,
            swapTarget: data.transaction.to,
            buyAssetMinAmount: data.minBuyAmount,
            assetQuote: data,
            estimatedGas: data.gas || 0,
          };
        })
    );

    const priceOracleAddress = defaultPhuturePriceOracleAddress[chainId];
    if (!priceOracleAddress)
      throw Error("No default PhuturePriceOracle found for chain");

    const priceOracle = PhuturePriceOracle__factory.connect(
      priceOracleAddress,
      index.signer
    );

    const buyAmountsInBase = await Promise.all(
      buyAmounts.map(async ({ asset, buyAssetMinAmount }, amountIndex) => {
        const price = await priceOracle.callStatic.refreshedAssetPerBaseInUQ(
          asset
        );
        return {
          asset,
          buyAmount: BigNumber.from(buyAssetMinAmount)
            .mul(BigNumber.from(2).pow(112))
            .mul(255)
            .div(price.mul(amounts[amountIndex]!.weight)),
        };
      })
    );

    const minAmount = buyAmountsInBase.reduce((min, curr) =>
      min.buyAmount.lte(curr.buyAmount) ? min : curr
    );

    const scaledSellAmounts = Object.values(
      amounts.map(({ asset, weight }) => ({
        asset,
        amount: BigNumber.from(sellAmount).mul(weight).div(255),
        weight,
      }))
    ).map(({ amount }, i) =>
      amount.mul(minAmount.buyAmount).div(buyAmountsInBase[i]!.buyAmount)
    );

    const quotes = await Promise.all(
      amounts.map(async ({ asset }, i) => {
        const scaledSellAmount = scaledSellAmounts[i] as BigNumber;
        if (asset === sellToken || scaledSellAmount.isZero())
          return {
            asset,
            swapTarget: constants.AddressZero,
            buyAssetMinAmount: scaledSellAmounts[i]!,
            assetQuote: [],
            estimatedGas: 0,
          };

        const { data } = await this.zeroExAggregator.allowanceHolderQuote({
          ...zeroExOptions,
          chainId,
          sellToken,
          sellAmount: scaledSellAmount.toString(),
          buyToken: asset,
        });

        return {
          asset,
          swapTarget: data.transaction.to,
          buyAssetMinAmount: data.minBuyAmount,
          assetQuote: data.transaction.data,
          estimatedGas: data.gas || "0",
        };
      })
    );

    sellAmount = scaledSellAmounts
      .reduce((sum, curr) => sum.add(curr), BigNumber.from(0))
      .toString();

    const mintOptions = {
      index: index.contract.address,
      recipient: await this.indexRouter.signer.getAddress(),
      quotes,
      amountInInputToken: sellAmount,
      inputToken: sellToken,
    };

    return this.indexRouter.mintSwap(mintOptions, sellAmount, sellToken);
  }

  public async buySwap(
    chainId: number,
    indexAddress: string,
    sellAmount: string,
    sellToken: string,
    zeroExOptions?: Partial<ZeroExRequest>
  ): Promise<TransactionResponse> {
    const { data } = await this.zeroExAggregator.allowanceHolderQuote({
      ...zeroExOptions,
      chainId,
      sellToken,
      sellAmount,
      buyToken: indexAddress,
    });

    // TODO: catch InsufficientAllowanceError from ZeroEx

    return this.indexRouter.signer.sendTransaction({
      to: data.transaction.to,
      data: data.transaction.data,
      gasLimit: BigNumber.from(data.transaction.gas).toHexString(),
      // ...(sellToken ? {} : { value: BigNumber.from(sellAmount).toHexString() }), // TODO
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
    chainId: number,
    index: Index,
    sellAmount: string,
    buyToken: string,
    zeroExOptions?: Partial<ZeroExRequest>
  ): Promise<{
    isBurn: boolean;
    outputAmount: BigNumber;
    target: string;
    expectedAllowance?: string;
  }> {
    const buyTokenInstance = new Erc20(index.signer, buyToken);

    const { data } = await this.zeroExAggregator.allowanceHolderPrice({
      ...zeroExOptions,
      chainId,
      sellToken: buyToken,
      buyToken: await this.indexRouter.contract.WETH(),
      sellAmount: BigNumber.from(10)
        .pow(await buyTokenInstance.contract.decimals())
        .toString(),
    });

    const outputTokenPriceEth = data.buyAmount;

    const [zeroExSwap, amounts] = await Promise.all([
      this.zeroExAggregator.allowanceHolderQuote({
        ...zeroExOptions,
        chainId,
        sellToken: index.contract.address,
        buyToken,
        sellAmount,
      }),
      this.indexRouter.burnTokensAmount(index, sellAmount),
    ]);

    const prices = await Promise.all(
      amounts.map(async ({ amount, asset }) => {
        if (asset.toLowerCase() === buyToken.toLowerCase()) {
          return {
            data: {
              minBuyAmount: 0,
              gas: 0,
            },
          };
        }

        if (!amount || amount.isZero()) {
          return {
            data: {
              minBuyAmount: 0,
              gas: 0,
            },
          };
        }

        return this.zeroExAggregator.allowanceHolderPrice({
          ...zeroExOptions,
          chainId,
          sellToken: asset,
          buyToken,
          sellAmount: amount.mul(999).div(1000).toString(),
        });
      })
    );

    const indexRouterBurnOutputAmount = prices.reduce(
      (acc, { data }) => acc.add(data.minBuyAmount),
      BigNumber.from(0)
    );

    const totalBurnGas = BigNumber.from(
      prices
        .reduce((curr, { data }) => curr.add(data.gas ?? 0), BigNumber.from(0))
        .add(baseBurnGas + prices.length * additionalBurnGasPerAsset)
    );

    const isBurn = totalBurnGas
      .sub(zeroExSwap.data.transaction.gas || 0)
      .mul(zeroExSwap.data.transaction.gasPrice)
      .lte(
        indexRouterBurnOutputAmount
          .sub(zeroExSwap.data.minBuyAmount)
          .mul(outputTokenPriceEth)
          .div(
            BigNumber.from(10).pow(await buyTokenInstance.contract.decimals())
          )
      );

    const target = isBurn
      ? this.indexRouter.contract.address
      : zeroExSwap.data.transaction.to;
    let expectedAllowance: string | undefined;
    try {
      await index.checkAllowance(target, sellAmount);
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
        : BigNumber.from(zeroExSwap.data.buyAmount),
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
    chainId: number,
    index: Index,
    indexAmount: string,
    outputTokenAddress: string,
    zeroExOptions?: Partial<ZeroExRequest>
  ): Promise<TransactionResponse> {
    if (isBurn)
      return this.sellBurn(
        chainId,
        index,
        indexAmount,
        outputTokenAddress,
        zeroExOptions
      );

    return this.sellSwap(
      chainId,
      index.contract.address,
      indexAmount,
      outputTokenAddress,
      zeroExOptions
    );
  }

  public async sellBurn(
    chainId: number,
    index: Index,
    indexAmount: string,
    outputTokenAddress: string,
    zeroExOptions?: Partial<ZeroExRequest>
  ): Promise<TransactionResponse> {
    const amounts = await this.indexRouter.burnAmount(index, indexAmount);

    const routerOutputTokenAddress = outputTokenAddress;
    const quotes = await Promise.all(
      amounts.map(async ({ amount, asset }) => {
        if (
          !amount ||
          amount.isZero() ||
          asset.toLowerCase() === routerOutputTokenAddress.toLowerCase()
        ) {
          return {
            swapTarget: constants.AddressZero,
            assetQuote: [],
            buyAssetMinAmount: 0,
            estimatedGas: 0,
          };
        }

        const { data } = await this.zeroExAggregator.allowanceHolderQuote({
          ...zeroExOptions,
          chainId,
          sellToken: asset,
          buyToken: routerOutputTokenAddress,
          sellAmount: amount.mul(999).div(1000).toString(),
        });

        return {
          swapTarget: data.transaction.to,
          buyAssetMinAmount: data.minBuyAmount,
          assetQuote: data.transaction.data,
          estimatedGas: data.transaction.gas,
        };
      })
    );

    return this.indexRouter.burnSwap(
      index.contract.address,
      indexAmount,
      await this.indexRouter.signer.getAddress(),
      outputTokenAddress,
      quotes
    );
  }

  public async sellSwap(
    chainId: number,
    indexAddress: string,
    sellAmount: string,
    buyToken: string,
    zeroExOptions?: Partial<ZeroExRequest>
  ): Promise<TransactionResponse> {
    const { data } = await this.zeroExAggregator.allowanceHolderQuote({
      ...zeroExOptions,
      chainId,
      sellToken: indexAddress,
      sellAmount,
      buyToken,
    });

    // TODO: catch InsufficientAllowanceError from ZeroExAggregator

    return this.indexRouter.signer.sendTransaction({
      to: data.transaction.to,
      data: data.transaction.data,
      gasLimit: BigNumber.from(data.transaction.gas).toHexString(),
    });
  }
}
