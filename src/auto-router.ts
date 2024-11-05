import type { TransactionResponse } from "@ethersproject/abstract-provider";
import { BigNumber } from "ethers";
import { type Address, isAddressEqual, zeroAddress } from "viem";

import type { ZeroExAggregator2, ZeroExRequest } from "./0x-aggregator-2";
import { Erc20 } from "./erc-20";
import type { IndexRouter } from "./index-router";
import { InsufficientAllowanceError } from "./insufficient-allowance.error";
import { IndexHelper__factory, PhuturePriceOracle__factory } from "./typechain";

const NATIVE = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";
const WAD = BigNumber.from(10).pow(18);
const UQ112 = BigNumber.from(2).pow(112);
const MAX_WEIGHT = 255;

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

const isNative = (token: Address): token is typeof NATIVE => isAddressEqual(token, NATIVE);

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
   * @param indexToken index address or it's Index interface
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
    sellAmount: BigNumber;
    expectedAllowance?: string;
  }> {
    const chainId = await this.indexRouter.signer.getChainId();
    const recipient = await this.indexRouter.signer.getAddress();

    const isNativeSell = isNative(sellToken as Address);
    const sellTokenInstance = new Erc20(this.indexRouter.signer, sellToken);

    const [zeroExSwap, indexAnatomy, wethAddress] = await Promise.all([
      this.zeroExAggregator.allowanceHolderQuote({
        ...zeroExOptions,
        chainId,
        sellToken,
        sellAmount,
        buyToken: indexToken,
        taker: recipient,
      }),
      this.indexRouter.getIndexAnatomy(indexToken),
      this.indexRouter.contract.WETH(),
    ]);

    const initialBuyAmounts = indexAnatomy.map(({ asset, weight }) => ({
      asset,
      amount: BigNumber.from(sellAmount).mul(weight).div(MAX_WEIGHT),
      weight,
    }));

    const quotes = await Promise.all(
      initialBuyAmounts.map(async ({ amount, asset }) => {
        if (isAddressEqual(asset as Address, sellToken as Address))
          return {
            asset,
            swapTarget: zeroAddress,
            buyAssetMinAmount: amount,
            assetQuote: [],
            estimatedGas: 0,
            allowanceTarget: zeroAddress,
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
          buyAssetMinAmount: data.buyAmount,
          assetQuote: data.transaction.data,
          estimatedGas: data.gas || 0,
          allowanceTarget: data.issues?.allowance?.spender ?? data.transaction.to,
        };
      }),
    );

    const indexHelperAddress = defaultIndexHelperAddress[chainId];
    if (!indexHelperAddress) throw new Error("No default IndexHelper found for chain");
    const indexHelper = IndexHelper__factory.connect(indexHelperAddress, this.indexRouter.signer);

    const priceOracleAddress = defaultPhuturePriceOracleAddress[chainId];
    if (!priceOracleAddress) throw new Error("No default PhuturePriceOracle found for chain");
    const priceOracle = PhuturePriceOracle__factory.connect(priceOracleAddress, this.indexRouter.signer);

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

    const gasDiffInEth = totalMintGas.sub(zeroExSwap.transaction.gas || 0).mul(zeroExSwap.transaction.gasPrice);

    const buyAmountDiffInEth = indexRouterMintOutputAmount
      .sub(zeroExSwap.buyAmount)
      .mul(totalEvaluation._indexPriceInBase)
      .div(WAD)
      .mul(ethBasePrice)
      .div(UQ112);

    const isMint = gasDiffInEth.lte(buyAmountDiffInEth);
    if (isMint) {
      const buyAmountsInBase = await Promise.all(
        quotes.map(async ({ asset, buyAssetMinAmount }, amountIndex) => {
          const price = await priceOracle.callStatic.refreshedAssetPerBaseInUQ(asset);
          return {
            asset,
            buyAmount: BigNumber.from(buyAssetMinAmount)
              .mul(UQ112)
              .mul(MAX_WEIGHT)
              .div(price.mul(indexAnatomy[amountIndex].weight)),
          };
        }),
      );

      const minAmount = buyAmountsInBase.reduce((min, curr) => (min.buyAmount.lte(curr.buyAmount) ? min : curr));

      const scaledSellAmounts = initialBuyAmounts.map(({ amount }, i) =>
        amount.mul(minAmount.buyAmount).div(buyAmountsInBase[i].buyAmount),
      );
      const totalSellAmount = scaledSellAmounts.reduce((sum, curr) => sum.add(curr), BigNumber.from(0));

      let expectedAllowance: string | undefined;
      if (!isNativeSell) {
        try {
          await sellTokenInstance.checkAllowance(recipient, this.indexRouter.contract.address, sellAmount);
        } catch (error) {
          if (error instanceof InsufficientAllowanceError) {
            expectedAllowance = error.expectedAllowance;
          } else {
            throw error;
          }
        }
      }

      return {
        isMint: true,
        target: this.indexRouter.contract.address,
        sellAmount: totalSellAmount,
        buyAmount: indexRouterMintOutputAmount,
        expectedAllowance,
      };
    }

    let expectedAllowance: string | undefined;
    if (!isNativeSell) {
      try {
        await sellTokenInstance.checkAllowance(recipient, zeroExSwap.transaction.to, sellAmount);
      } catch (error) {
        if (error instanceof InsufficientAllowanceError) {
          expectedAllowance = error.expectedAllowance;
        } else {
          throw error;
        }
      }
    }

    return {
      isMint: false,
      target: zeroExSwap.transaction.to,
      sellAmount: BigNumber.from(zeroExSwap.sellAmount),
      buyAmount: BigNumber.from(zeroExSwap.buyAmount),
      expectedAllowance,
    };
  }

  /**
   * ### Auto Buy
   *
   * @param isMint true if minting, false if swapping
   * @param indexToken index address or it's Index interface
   * @param sellAmount amount in input token
   * @param sellToken Erc20 or Erc20Permit interface of input token
   * @param zeroExOptions 0x request options and permit options for transaction
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
    return await (isMint
      ? this.buyMint(indexToken, sellAmount, sellToken, zeroExOptions)
      : this.buySwap(indexToken, sellAmount, sellToken, zeroExOptions));
  }

  public async buyMint(
    indexToken: string,
    sellAmount: string,
    sellToken: string,
    zeroExOptions?: Partial<ZeroExRequest>,
  ): Promise<TransactionResponse> {
    const chainId = await this.indexRouter.signer.getChainId();
    const recipient = await this.indexRouter.signer.getAddress();

    const isNativeSell = isNative(sellToken as Address);
    const routerSellTokenAddress = isNativeSell ? await this.indexRouter.contract.WETH() : sellToken;

    const indexAnatomy = await this.indexRouter.getIndexAnatomy(indexToken);

    const initialBuyAmounts = indexAnatomy.map(({ asset, weight }) => ({
      asset,
      amount: BigNumber.from(sellAmount).mul(weight).div(MAX_WEIGHT),
      weight,
    }));

    const buyAmounts = await Promise.all(
      initialBuyAmounts.map(async ({ asset, amount }) => {
        if (isAddressEqual(asset as Address, sellToken as Address) || amount.isZero()) {
          return {
            asset,
            minBuyAmount: amount,
          };
        }

        const { minBuyAmount } = await this.zeroExAggregator.allowanceHolderQuote({
          ...zeroExOptions,
          chainId,
          sellToken: routerSellTokenAddress,
          buyToken: asset,
          sellAmount: amount.toString(),
          taker: this.indexRouter.contract.address,
        });

        return {
          asset,
          minBuyAmount,
        };
      }),
    );

    const priceOracleAddress = defaultPhuturePriceOracleAddress[chainId];
    if (!priceOracleAddress) throw new Error("No default PhuturePriceOracle found for chain");
    const priceOracle = PhuturePriceOracle__factory.connect(priceOracleAddress, this.indexRouter.signer);

    const buyAmountsInBase = await Promise.all(
      buyAmounts.map(async ({ asset, minBuyAmount }, amountIndex) => {
        const price = await priceOracle.callStatic.refreshedAssetPerBaseInUQ(asset);
        return {
          asset,
          buyAmount: BigNumber.from(minBuyAmount)
            .mul(UQ112)
            .mul(MAX_WEIGHT)
            .div(price.mul(indexAnatomy[amountIndex].weight)),
        };
      }),
    );

    const minAmount = buyAmountsInBase.reduce((min, curr) => (min.buyAmount.lte(curr.buyAmount) ? min : curr));

    const scaledSellAmounts = initialBuyAmounts.map(({ amount }, i) =>
      amount.mul(minAmount.buyAmount).div(buyAmountsInBase[i].buyAmount),
    );

    const totalSellAmount = scaledSellAmounts.reduce((sum, curr) => sum.add(curr), BigNumber.from(0)).toString();

    const finalQuotes = await Promise.all(
      indexAnatomy.map(async ({ asset }, i) => {
        const scaledAmount = scaledSellAmounts[i] as BigNumber;

        // If asset is sell token or amount is zero, no swap needed
        if (isAddressEqual(asset as Address, sellToken as Address) || scaledAmount.isZero()) {
          return {
            asset,
            swapTarget: zeroAddress,
            buyAssetMinAmount: scaledAmount,
            assetQuote: [],
            estimatedGas: 0,
            allowanceTarget: zeroAddress,
          };
        }

        // Get quote from 0x aggregator
        const quote = await this.zeroExAggregator.allowanceHolderQuote({
          ...zeroExOptions,
          chainId,
          sellToken: routerSellTokenAddress,
          sellAmount: scaledAmount.toString(),
          buyToken: asset,
          taker: this.indexRouter.contract.address,
        });

        return {
          asset,
          swapTarget: quote.transaction.to,
          buyAssetMinAmount: quote.minBuyAmount,
          assetQuote: quote.transaction.data,
          estimatedGas: quote.gas || "0",
          allowanceTarget: quote.issues?.allowance?.spender ?? quote.transaction.to,
        };
      }),
    );

    const mintOptions = {
      index: indexToken,
      recipient,
      quotes: finalQuotes,
      amountInInputToken: totalSellAmount,
      inputToken: routerSellTokenAddress,
    };

    return await (isNativeSell
      ? this.indexRouter.mintSwapValue(mintOptions, sellAmount)
      : this.indexRouter.mintSwap(mintOptions, sellAmount, sellToken));
  }

  public async buySwap(
    indexToken: string,
    sellAmount: string,
    sellToken: string,
    zeroExOptions?: Partial<ZeroExRequest>,
  ): Promise<TransactionResponse> {
    const chainId = await this.indexRouter.signer.getChainId();
    const taker = await this.indexRouter.signer.getAddress();
    const isNativeSell = isNative(sellToken as Address);

    const data = await this.zeroExAggregator.allowanceHolderQuote({
      ...zeroExOptions,
      chainId,
      sellToken,
      sellAmount,
      buyToken: indexToken,
      taker,
    });

    return await this.indexRouter.signer.sendTransaction({
      to: data.transaction.to,
      data: data.transaction.data,
      gasLimit: BigNumber.from(data.transaction.gas).toHexString(),
      ...(isNativeSell ? { value: data.transaction.value } : {}), // TODO
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
    const recipient = await this.indexRouter.signer.getAddress();
    const isNativeBuy = isNative(buyToken as Address);
    const indexTokenInstance = new Erc20(this.indexRouter.signer, indexToken);

    let buyTokenInstance: Erc20;
    let buyTokenPriceEth = WAD.toString();
    let buyTokenDecimals = 18;

    if (isNativeBuy) {
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

      buyTokenPriceEth = data.buyAmount;
    }

    const [zeroExSwap, amounts] = await Promise.all([
      this.zeroExAggregator.allowanceHolderQuote({
        ...zeroExOptions,
        chainId,
        sellToken: indexToken,
        buyToken,
        sellAmount,
        taker: recipient,
      }),
      this.indexRouter.burnTokensAmount(indexToken, sellAmount),
    ]);

    const prices = await Promise.all(
      amounts.map(async ({ amount, asset }) => {
        if (isAddressEqual(asset as Address, buyToken as Address) || amount.isZero()) {
          return {
            buyAmount: 0,
            gas: 0,
          };
        }

        return await this.zeroExAggregator.allowanceHolderPrice({
          ...zeroExOptions,
          chainId,
          sellToken: asset,
          buyToken,
          sellAmount: amount.mul(999).div(1000).toString(),
        });
      }),
    );

    const indexRouterBurnOutputAmount = prices.reduce((acc, { buyAmount }) => acc.add(buyAmount), BigNumber.from(0));

    const totalBurnGas = BigNumber.from(
      prices
        .reduce((curr, { gas }) => curr.add(gas ?? 0), BigNumber.from(0))
        .add(baseBurnGas + prices.length * additionalBurnGasPerAsset),
    );

    const gasDiffInEth = totalBurnGas.sub(zeroExSwap.transaction.gas || 0).mul(zeroExSwap.transaction.gasPrice);

    const buyAmountDiffInEth = indexRouterBurnOutputAmount
      .sub(zeroExSwap.buyAmount)
      .mul(buyTokenPriceEth)
      .div(BigNumber.from(10).pow(buyTokenDecimals));

    const isBurn = gasDiffInEth.lte(buyAmountDiffInEth);

    const target = isBurn ? this.indexRouter.contract.address : zeroExSwap.transaction.to;
    let expectedAllowance: string | undefined;
    try {
      await indexTokenInstance.checkAllowance(recipient, target, sellAmount);
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
    return await (isBurn
      ? this.sellBurn(indexToken, sellAmount, buyToken, zeroExOptions)
      : this.sellSwap(indexToken, sellAmount, buyToken, zeroExOptions));
  }

  public async sellBurn(
    indexToken: string,
    sellAmount: string,
    buyToken: string,
    zeroExOptions?: Partial<ZeroExRequest>,
  ): Promise<TransactionResponse> {
    const recipient = await this.indexRouter.signer.getAddress();
    const chainId = await this.indexRouter.signer.getChainId();

    const isNativeBuy = isNative(buyToken as Address);
    const routerBuyToken = isNativeBuy ? await this.indexRouter.contract.WETH() : buyToken;

    const amounts = await this.indexRouter.burnAmount(indexToken, sellAmount);

    const quotes = await Promise.all(
      amounts.map(async ({ amount, asset }) => {
        if (isAddressEqual(asset as Address, routerBuyToken as Address) || amount.isZero()) {
          return {
            swapTarget: zeroAddress,
            assetQuote: [],
            buyAssetMinAmount: 0,
            estimatedGas: 0,
            allowanceTarget: zeroAddress,
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

    return await (isNativeBuy
      ? this.indexRouter.burnSwapValue(indexToken, sellAmount, recipient, routerBuyToken, quotes)
      : this.indexRouter.burnSwap(indexToken, sellAmount, recipient, routerBuyToken, quotes));
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

    return await this.indexRouter.signer.sendTransaction({
      to: data.transaction.to,
      data: data.transaction.data,
      gasLimit: BigNumber.from(data.transaction.gas).toHexString(),
    });
  }
}
