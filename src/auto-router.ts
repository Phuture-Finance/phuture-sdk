import { constants, BigNumber } from "ethers";

import type { TransactionResponse } from "@ethersproject/abstract-provider";
import type { ZeroExAggregator2, ZeroExRequest } from "./0x-aggregator-2";
import { Erc20 } from "./erc-20";
import { InsufficientAllowanceError } from "./errors";
import type { IndexRouter } from "./index-router";
import { BaseIndex__factory, IndexHelper__factory, PhuturePriceOracle__factory } from "./typechain";

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
    public readonly zeroExAggregator: ZeroExAggregator2,
  ) {}

  /**
   * ### Static auto Buy
   *
   * @param index index address or it's Index interface
   * @param sellAmount amount in input token
   * @param sellToken Erc20 or Erc20Permit interface of input token
   * @param zeroExOptions 0x request options
   *
   * @returns output amount of Index
   */
  async selectBuy(
    indexToken: string,
    sellAmount: string,
    sellToken: string,
    zeroExOptions?: Partial<ZeroExRequest>,
  ): Promise<{
    isMint: boolean;
    target: string;
    buyAmount: BigNumber;
    expectedAllowance?: string;
  }> {
    const sellTokenInstance = new Erc20(this.indexRouter.signer, sellToken);
    const indexTokenInstance = BaseIndex__factory.connect(indexToken, this.indexRouter.signer);

    const chainId = await this.indexRouter.signer.getChainId();

    const [zeroExSwap, amounts, wethAddress] = await Promise.all([
      this.zeroExAggregator.allowanceHolderQuote({
        ...zeroExOptions,
        chainId,
        sellToken,
        sellAmount,
        buyToken: indexToken,
        taker: await this.indexRouter.signer.getAddress(),
      }),
      this.indexRouter.getIndexAnatomy(indexTokenInstance),
      this.indexRouter.contract.WETH(),
    ]);

    const indexHelperAddress = defaultIndexHelperAddress[chainId];
    if (!indexHelperAddress) throw Error("No default IndexHelper found for chain");

    const indexHelper = IndexHelper__factory.connect(indexHelperAddress, this.indexRouter.signer);

    const priceOracleAddress = defaultPhuturePriceOracleAddress[chainId];
    if (!priceOracleAddress) throw Error("No default PhuturePriceOracle found for chain");

    const priceOracle = PhuturePriceOracle__factory.connect(
      priceOracleAddress,
      this.indexRouter.signer,
    );

    const quotes = await Promise.all(
      amounts
        .map(({ asset, weight }) => ({
          asset,
          amount: BigNumber.from(sellAmount).mul(weight).div(255),
          weight,
        }))
        .map(async ({ amount, asset }) => {
          if (asset.toLowerCase() === sellToken.toLowerCase())
            return {
              asset,
              swapTarget: constants.AddressZero,
              buyAssetMinAmount: amount,
              assetQuote: [],
              estimatedGas: 0,
              allowanceTarget: constants.AddressZero,
            };

          const data = await this.zeroExAggregator.allowanceHolderQuote({
            ...zeroExOptions,
            chainId,
            sellToken,
            buyToken: asset,
            sellAmount: amount.toString(),
            taker: this.indexRouter.contract.address,
          });

          return {
            asset,
            swapTarget: data.transaction.to,
            buyAssetMinAmount: data.minBuyAmount,
            assetQuote: data.transaction.data,
            estimatedGas: data.gas || 0,
            allowanceTarget: data.issues?.allowance?.spender ?? data.transaction.to,
          };
        }),
    );

    const [indexRouterMintOutputAmount, totalEvaluation, ethBasePrice] = await Promise.all([
      this.indexRouter.mintIndexAmount(indexToken, sellAmount, quotes, sellToken),
      indexHelper.totalEvaluation(indexToken),
      priceOracle.callStatic.refreshedAssetPerBaseInUQ(wethAddress),
    ]);

    const totalMintGas = BigNumber.from(
      quotes
        .reduce((curr, acc) => curr.add(acc.estimatedGas), BigNumber.from(0))
        .add(baseMintGas + quotes.length * additionalMintGasPerAsset),
    );

    const gasDiffInEth = totalMintGas
      .sub(zeroExSwap.transaction.gas || 0)
      .mul(zeroExSwap.transaction.gasPrice);

    const buyAmountDiffInEth = indexRouterMintOutputAmount
      .sub(zeroExSwap.buyAmount)
      .mul(totalEvaluation._indexPriceInBase)
      .div(BigNumber.from(10).pow(18)) // we know for sure all our indicies are 18d
      .mul(ethBasePrice)
      .div(BigNumber.from(2).pow(112));

    const isMint = gasDiffInEth.lte(buyAmountDiffInEth);

    const target = isMint ? this.indexRouter.contract.address : zeroExSwap.transaction.to;

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
      buyAmount: isMint ? indexRouterMintOutputAmount : BigNumber.from(zeroExSwap.buyAmount),
      expectedAllowance,
    };
  }

  /**
   * ### Auto Buy
   *
   * @param isMint true if minting, false if swapping
   * @param index index address or it's Index interface
   * @param sellAmount amount in input token
   * @param sellToken Erc20 or Erc20Permit interface of input token
   * @param options 0x request options and permit options for transaction
   *
   * @returns mint or swap transaction
   */
  async buy(
    isMint: boolean,
    indexToken: string,
    sellAmount: string,
    sellToken: string,
    zeroExOptions?: Partial<ZeroExRequest>,
  ): Promise<TransactionResponse> {
    return isMint
      ? this.buyMint(indexToken, sellAmount, sellToken, zeroExOptions)
      : this.buySwap(indexToken, sellAmount, sellToken, zeroExOptions);
  }

  public async buyMint(
    indexToken: string,
    sellAmount: string,
    sellToken: string,
    zeroExOptions?: Partial<ZeroExRequest>,
  ): Promise<TransactionResponse> {
    const chainId = await this.indexRouter.signer.getChainId();
    const recipient = await this.indexRouter.signer.getAddress();

    const indexTokenInstance = BaseIndex__factory.connect(indexToken, this.indexRouter.signer);

    const amounts = await this.indexRouter.getIndexAnatomy(indexTokenInstance);
    const isNativeSell = sellToken.toLowerCase() === NATIVE.toLowerCase();

    const routerSellTokenAddress = isNativeSell
      ? await this.indexRouter.contract.WETH()
      : sellToken;

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

          const data = await this.zeroExAggregator.allowanceHolderQuote({
            ...zeroExOptions,
            chainId,
            sellToken: routerSellTokenAddress,
            buyToken: asset,
            sellAmount: amount.toString(),
            taker: this.indexRouter.contract.address,
          });

          return {
            asset,
            swapTarget: data.transaction.to,
            buyAssetMinAmount: data.minBuyAmount,
            assetQuote: data,
            estimatedGas: data.gas || 0,
          };
        }),
    );

    const priceOracleAddress = defaultPhuturePriceOracleAddress[chainId];
    if (!priceOracleAddress) throw Error("No default PhuturePriceOracle found for chain");

    const priceOracle = PhuturePriceOracle__factory.connect(
      priceOracleAddress,
      this.indexRouter.signer,
    );

    const buyAmountsInBase = await Promise.all(
      buyAmounts.map(async ({ asset, buyAssetMinAmount }, amountIndex) => {
        const price = await priceOracle.callStatic.refreshedAssetPerBaseInUQ(asset);
        return {
          asset,
          buyAmount: BigNumber.from(buyAssetMinAmount)
            .mul(BigNumber.from(2).pow(112))
            .mul(255)
            .div(price.mul(amounts[amountIndex]!.weight)),
        };
      }),
    );

    const minAmount = buyAmountsInBase.reduce((min, curr) =>
      min.buyAmount.lte(curr.buyAmount) ? min : curr,
    );

    const scaledSellAmounts = Object.values(
      amounts.map(({ asset, weight }) => ({
        asset,
        amount: BigNumber.from(sellAmount).mul(weight).div(255),
        weight,
      })),
    ).map(({ amount }, i) => amount.mul(minAmount.buyAmount).div(buyAmountsInBase[i].buyAmount));

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
            allowanceTarget: constants.AddressZero,
          };

        const data = await this.zeroExAggregator.allowanceHolderQuote({
          ...zeroExOptions,
          chainId,
          sellToken: routerSellTokenAddress,
          sellAmount: scaledSellAmount.toString(),
          buyToken: asset,
          taker: this.indexRouter.contract.address,
        });

        return {
          asset,
          swapTarget: data.transaction.to,
          buyAssetMinAmount: data.minBuyAmount,
          assetQuote: data.transaction.data,
          estimatedGas: data.gas || "0",
          allowanceTarget: data.issues?.allowance?.spender ?? data.transaction.to,
        };
      }),
    );

    sellAmount = scaledSellAmounts
      .reduce((sum, curr) => sum.add(curr), BigNumber.from(0))
      .toString();

    const mintOptions = {
      index: indexToken,
      recipient,
      quotes,
      amountInInputToken: sellAmount,
      inputToken: routerSellTokenAddress,
    };

    return isNativeSell
      ? this.indexRouter.mintSwapValue(mintOptions, sellAmount)
      : this.indexRouter.mintSwap(mintOptions, sellAmount, sellToken);
  }

  public async buySwap(
    indexToken: string,
    sellAmount: string,
    sellToken: string,
    zeroExOptions?: Partial<ZeroExRequest>,
  ): Promise<TransactionResponse> {
    const chainId = await this.indexRouter.signer.getChainId();
    const taker = await this.indexRouter.signer.getAddress();

    const data = await this.zeroExAggregator.allowanceHolderQuote({
      ...zeroExOptions,
      chainId,
      sellToken,
      sellAmount,
      buyToken: indexToken,
      taker,
    });

    // TODO: catch InsufficientAllowanceError from ZeroEx

    return await this.indexRouter.signer.sendTransaction({
      to: data.transaction.to,
      data: data.transaction.data,
      gasLimit: BigNumber.from(data.transaction.gas).toHexString(),
      ...(sellToken.toLowerCase() !== NATIVE.toLowerCase()
        ? {}
        : { value: data.transaction.value }), // TODO
    });
  }

  /**
   * ### Static auto Sell
   *
   * @param index index address or it's Index interface
   * @param indexAmount amount in index token
   * @param buyToken instance or address of output token
   * @param options 0x request options
   *
   * @returns output token amount
   */
  async selectSell(
    indexToken: string,
    sellAmount: string,
    buyToken: string,
    zeroExOptions?: Partial<ZeroExRequest>,
  ): Promise<{
    isBurn: boolean;
    buyAmount: BigNumber;
    target: string;
    expectedAllowance?: string;
  }> {
    const chainId = await this.indexRouter.signer.getChainId();
    const taker = await this.indexRouter.signer.getAddress();

    const indexTokenInstance = new Erc20(this.indexRouter.signer, indexToken);

    let buyTokenInstance: Erc20;
    let buyTokenPriceEth = BigNumber.from(10).pow(18).toString();
    let buyTokenDecimals = 18;

    if (buyToken === NATIVE) {
      buyTokenInstance = new Erc20(this.indexRouter.signer, await this.indexRouter.contract.WETH());
    } else {
      buyTokenInstance = new Erc20(this.indexRouter.signer, buyToken);
      buyTokenDecimals = await buyTokenInstance.contract.decimals();

      const data = await this.zeroExAggregator.allowanceHolderPrice({
        ...zeroExOptions,
        chainId,
        sellToken: buyToken,
        buyToken: await this.indexRouter.contract.WETH(),
        sellAmount: BigNumber.from(10).pow(buyTokenDecimals).toString(),
      });

      buyTokenPriceEth = data.minBuyAmount;
    }

    const [zeroExSwap, amounts] = await Promise.all([
      this.zeroExAggregator.allowanceHolderQuote({
        ...zeroExOptions,
        chainId,
        sellToken: indexToken,
        buyToken,
        sellAmount,
        taker,
      }),
      this.indexRouter.burnTokensAmount(indexToken, sellAmount),
    ]);

    const prices = await Promise.all(
      amounts.map(async ({ amount, asset }) => {
        if (asset.toLowerCase() === buyToken.toLowerCase() || !amount || amount.isZero()) {
          return {
            minBuyAmount: 0,
            gas: 0,
          };
        }

        return this.zeroExAggregator.allowanceHolderPrice({
          ...zeroExOptions,
          chainId,
          sellToken: asset,
          buyToken,
          sellAmount: amount.mul(999).div(1000).toString(),
        });
      }),
    );

    const indexRouterBurnOutputAmount = prices.reduce(
      (acc, { minBuyAmount }) => acc.add(minBuyAmount),
      BigNumber.from(0),
    );

    const totalBurnGas = BigNumber.from(
      prices
        .reduce((curr, { gas }) => curr.add(gas ?? 0), BigNumber.from(0))
        .add(baseBurnGas + prices.length * additionalBurnGasPerAsset),
    );

    const gasDiffInEth = totalBurnGas
      .sub(zeroExSwap.transaction.gas || 0)
      .mul(zeroExSwap.transaction.gasPrice);

    const buyAmountDiffInEth = indexRouterBurnOutputAmount
      .sub(zeroExSwap.minBuyAmount)
      .mul(buyTokenPriceEth)
      .div(BigNumber.from(10).pow(buyTokenDecimals));

    const isBurn = gasDiffInEth.lte(buyAmountDiffInEth);

    const target = isBurn ? this.indexRouter.contract.address : zeroExSwap.transaction.to;
    let expectedAllowance: string | undefined;
    try {
      await indexTokenInstance.checkAllowance(target, sellAmount);
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
      buyAmount: isBurn ? indexRouterBurnOutputAmount : BigNumber.from(zeroExSwap.buyAmount),
      expectedAllowance,
    };
  }

  /**
   * ### Auto Sell
   *
   * @param isBurn true if burn, false if swap
   * @param index index interface
   * @param indexAmount amount in index token
   * @param buyToken instance or address of output token
   * @param options 0x request and zeroEx options
   *
   * @returns burn or swap transaction
   */
  async sell(
    isBurn: boolean,
    indexToken: string,
    sellAmount: string,
    buyToken: string,
    zeroExOptions?: Partial<ZeroExRequest>,
  ): Promise<TransactionResponse> {
    return isBurn
      ? this.sellBurn(indexToken, sellAmount, buyToken, zeroExOptions)
      : this.sellSwap(indexToken, sellAmount, buyToken, zeroExOptions);
  }

  public async sellBurn(
    indexToken: string,
    sellAmount: string,
    buyToken: string,
    zeroExOptions?: Partial<ZeroExRequest>,
  ): Promise<TransactionResponse> {
    const recipient = await this.indexRouter.signer.getAddress();
    const chainId = await this.indexRouter.signer.getChainId();

    const isBuyingNative = buyToken.toLowerCase() === NATIVE.toLowerCase();
    const routerBuyToken = isBuyingNative ? await this.indexRouter.contract.WETH() : buyToken;

    const amounts = await this.indexRouter.burnAmount(indexToken, sellAmount);

    const quotes = await Promise.all(
      amounts.map(async ({ amount, asset }) => {
        if (!amount || amount.isZero() || asset.toLowerCase() === routerBuyToken.toLowerCase()) {
          return {
            swapTarget: constants.AddressZero,
            assetQuote: [],
            buyAssetMinAmount: 0,
            estimatedGas: 0,
            allowanceTarget: constants.AddressZero,
          };
        }

        const data = await this.zeroExAggregator.allowanceHolderQuote({
          ...zeroExOptions,
          chainId,
          sellToken: asset,
          buyToken: routerBuyToken,
          sellAmount: amount.mul(999).div(1000).toString(),
          taker: this.indexRouter.contract.address,
        });

        return {
          swapTarget: data.transaction.to,
          buyAssetMinAmount: data.minBuyAmount,
          assetQuote: data.transaction.data,
          estimatedGas: data.transaction.gas,
          allowanceTarget: data.issues?.allowance?.spender ?? data.transaction.to,
        };
      }),
    );

    return isBuyingNative
      ? this.indexRouter.burnSwapValue(indexToken, sellAmount, recipient, routerBuyToken, quotes)
      : this.indexRouter.burnSwap(indexToken, sellAmount, recipient, routerBuyToken, quotes);
  }

  public async sellSwap(
    indexAddress: string,
    sellAmount: string,
    buyToken: string,
    zeroExOptions?: Partial<ZeroExRequest>,
  ): Promise<TransactionResponse> {
    const chainId = await this.indexRouter.signer.getChainId();
    const taker = await this.indexRouter.signer.getAddress();

    const data = await this.zeroExAggregator.allowanceHolderQuote({
      ...zeroExOptions,
      chainId,
      sellToken: indexAddress,
      sellAmount,
      buyToken,
      taker,
    });

    // TODO: catch InsufficientAllowanceError from ZeroExAggregator

    return this.indexRouter.signer.sendTransaction({
      to: data.transaction.to,
      data: data.transaction.data,
      gasLimit: BigNumber.from(data.transaction.gas).toHexString(),
    });
  }
}
