import { Zero0xQuoteOptions, ZeroExAggregator } from '@phuture/0x-aggregator';
import { Erc20, StandardPermitArguments } from '@phuture/erc-20';
import { Index } from '@phuture/index';
import { IndexRouter } from '@phuture/index-router';
import { Address } from '@phuture/types';
import {BigNumber, BigNumberish, constants} from 'ethers';
import { TransactionResponse } from '@ethersproject/abstract-provider';
import { InsufficientAllowanceError } from '@phuture/errors';
import { getDefaultPriceOracle } from '@phuture/price-oracle';
import {AutoRouter} from "./interfaces";

const baseMintGas = 260_000;
const additionalMintGasPerAsset = 135_000;

const baseBurnGas = 100_000;
const additionalBurnGasPerAsset = 300_000;

/** ### IndexAutoRouter class */
export class IndexAutoRouter implements AutoRouter {
    /**
     * ### Creates a new IndexAutoRouter instance
     *
     * @param indexRouter IndexRouter package
     * @param zeroExAggregator ZeroExAggregator package
     *
     * @returns New IndexAutoRouter instance
     */
    constructor(
        public readonly indexRouter: IndexRouter,
        public readonly zeroExAggregator: ZeroExAggregator
    ) { }

    /**
     * ### Select Buy
     *
     * @param index Contract which implements the Index interface
     * @param amountInInputToken Amount in input token
     * @param inputToken Erc20 or Erc20Permit interface of input token
     * @param options 0x request options
     *
     * @returns isMint True if minting selected
     * @returns target Address of the target contract
     * @returns output Amount of Index shares
     * @returns expectedAllowance Allowance for the input token
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
        const [zeroExSwap, amounts, indexPriceEth] = await Promise.all([
            this.zeroExAggregator.quote(
                inputToken?.address || 'ETH',
                index.address,
                amountInInputToken,
                options
            ),
            index.scaleAmount(amountInInputToken),
            index.priceEth()
        ]);

        const quotes = await Promise.all(
            Object.entries(amounts).map(async ([asset, { amount }]) => {
                const { to, buyAmount, data, estimatedGas } =
                    await this.zeroExAggregator.quote(
                        inputToken?.address ?? (await this.indexRouter.weth()),
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

        const isMint = totalMintGas
            .sub(zeroExSwap.estimatedGas)
            .mul(zeroExSwap.gasPrice)
            .lte(
                indexRouterMintOutputAmount
                    .sub(zeroExSwap.buyAmount)
                    .mul(indexPriceEth)
                    .div(BigNumber.from(10).pow(18))
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
     * @param isMint True if minting, false if swapping
     * @param index Contract which implements the Index interface
     * @param amountInInputToken Amount in input token
     * @param inputTokenAddress Address of input token
     * @param options 0x request options and permit options for transaction
     *
     * @returns mint or swap transaction
     */
    async buy(
        isMint: boolean,
        index: Index,
        amountInInputToken: BigNumberish,
        inputTokenAddress?: Address,
        options?: Partial<{
            permitOptions: Omit<StandardPermitArguments, 'amount'>,
            zeroExOptions: Partial<Zero0xQuoteOptions>
        }>
    ): Promise<TransactionResponse> {
        if (isMint)
            return this.buyMint(index, amountInInputToken, inputTokenAddress, options);

        return this.buySwap(index.address, amountInInputToken, inputTokenAddress, options?.zeroExOptions);
    }

    /**
     * ### Buy mint
     *
     * @param index Contract which implements the Index interface
     * @param amountInInputToken Amount in input token
     * @param inputTokenAddress Address of input token
     * @param options 0x request options and permit options for transaction
     *
     * @returns mint transaction
     */
    public async buyMint(
        index: Index,
        amountInInputToken: BigNumberish,
        inputTokenAddress?: Address,
        options?: Partial<{
            permitOptions: Omit<StandardPermitArguments, 'amount'>,
            zeroExOptions: Partial<Zero0xQuoteOptions>
        }>
    ): Promise<TransactionResponse> {
        const amounts = await index.scaleAmount(amountInInputToken);

        const buyAmounts = await Promise.all(
            Object.entries(amounts).map(async ([asset, { amount }]) => {
                const { to, buyAmount, data, estimatedGas } =
                    await this.zeroExAggregator.quote(
                        inputTokenAddress ?? (await this.indexRouter.weth()),
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
            inputTokenAddress ?? (await this.indexRouter.weth());

        const quotes = await Promise.all(
            Object.keys(amounts).map(async (asset, i) => {
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
                    ? BigNumber.from(buyAmount).mul(1000 - options?.zeroExOptions?.slippagePercentage * 1000).div(1000)
                    : buyAmount
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

    /**
     * ### Buy swap
     *
     * @param indexAddress Address of the Index
     * @param amountInInputToken amount in input token
     * @param inputTokenAddress Address of input token
     * @param zeroExOptions 0x request options and permit options for transaction
     *
     * @returns swap transaction
     */
    public async buySwap(
        indexAddress: Address,
        amountInInputToken: BigNumberish,
        inputTokenAddress?: Address,
        zeroExOptions?: Partial<Zero0xQuoteOptions>
    ): Promise<TransactionResponse> {
        const { to, sellAmount, data, estimatedGas } =
            await this.zeroExAggregator.quote(
                inputTokenAddress ?? 'ETH',
                indexAddress,
                amountInInputToken,
                { ...zeroExOptions, takerAddress: await this.indexRouter.account.address() }
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
     * ### Select sell
     *
     * @param index Contract which implements the Index interface
     * @param indexAmount Amount of index token
     * @param outputToken Contract which implements the ERC20 interface
     * @param options 0x request options
     *
     * @returns isBurn true if burn is selected
     * @returns indexAmount Amount of index
     * @returns outputToken Amount of output token
     * @returns expectedAllowance Allowance for the output token
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
        let outputTokenAddress: Address | undefined;
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
            outputToken = new Erc20(
                this.indexRouter.account,
                await this.indexRouter.weth()
            );
        }

        const [zeroExSwap, anatomy, inactiveAnatomy, amounts] = await Promise.all([
            this.zeroExAggregator.quote(
                index.address,
                outputTokenAddress ?? 'ETH',
                indexAmount,
                options
            ),
            index.contract.anatomy(),
            index.contract.inactiveAnatomy(),
            this.indexRouter.contract.burnTokensAmount(index.address, indexAmount),
        ]);

        const assets: Address[] = [...anatomy._assets, ...inactiveAnatomy];

        const quotes = await Promise.all(
            amounts.map(async (amount, i) => {
                if(amount.isZero()) {
                    return {
                        buyAmount: 0,
                        estimatedGas: 0,
                    }
                }

                const { buyAmount, estimatedGas } = await this.zeroExAggregator.price(
                    assets[i],
                    outputTokenAddress ?? (await this.indexRouter.weth()),
                    amount.mul(999).div(1000),
                    options
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
     * @param index Contract which implements the Index interface
     * @param indexAmount Amount of index shares
     * @param outputTokenAddress Address of output token
     * @param permitOptions permit options for transaction
     * @param options 0x request options
     *
     * @returns burn or swap transaction
     */
    async sell(
        isBurn: boolean,
        index: Index,
        indexAmount: BigNumberish,
        outputTokenAddress?: Address,
        permitOptions?: Omit<StandardPermitArguments, 'amount'>,
        options?: Partial<Zero0xQuoteOptions>
    ): Promise<TransactionResponse> {
        if (isBurn)
            return this.sellBurn(
                index,
                indexAmount,
                outputTokenAddress,
                permitOptions,
                options
            );

        return this.sellSwap(index.address, indexAmount, outputTokenAddress, options);
    }

    /**
     * ### Sell Burn
     *
     * @param index Contract which implements the Index interface
     * @param indexAmount Amount of index shares
     * @param outputTokenAddress Address of output token
     * @param permitOptions permit options for transaction
     * @param options 0x request options
     *
     * @returns burn transaction
     */
    public async sellBurn(
        index: Index,
        indexAmount: BigNumberish,
        outputTokenAddress?: Address,
        permitOptions?: Omit<StandardPermitArguments, 'amount'>,
        options?: Partial<Zero0xQuoteOptions>
    ): Promise<TransactionResponse> {
        const [anatomy, inactiveAnatomy, amounts] = await Promise.all([
            index.contract.anatomy(),
            index.contract.inactiveAnatomy(),
            this.indexRouter.burnAmount(index.address, indexAmount),
        ]);

        const assets: Address[] = [...anatomy._assets, ...inactiveAnatomy];

        const quotes = await Promise.all(
            amounts.map(async (amount, i) => {
                if(amount.isZero()) {
                    return {
                        swapTarget: constants.AddressZero,
                        buyAssetMinAmount: 0,
                        assetQuote: [],
                        estimatedGas: 0,
                    }
                }

                const {
                    buyAmount,
                    to: swapTarget,
                    data: assetQuote,
                    estimatedGas,
                } = await this.zeroExAggregator.quote(
                    assets[i],
                    outputTokenAddress ?? (await this.indexRouter.weth()),
                    amount.mul(999).div(1000),
                    options
                );

                const buyAssetMinAmount = options?.slippagePercentage
                    ? BigNumber.from(buyAmount).mul(1000 - options?.slippagePercentage * 1000).div(1000)
                    : buyAmount
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
                permitOptions,
            }
        );
    }

    /**
     * ### Sell Swap
     *
     * @param indexAddress Address of the index
     * @param indexAmount Amount of index shares
     * @param outputTokenAddress Address of output token
     * @param options permit options for transaction
     *
     * @returns burn transaction
     */
    public async sellSwap(
        indexAddress: Address,
        indexAmount: BigNumberish,
        outputTokenAddress?: Address,
        options?: Partial<Zero0xQuoteOptions>
    ): Promise<TransactionResponse> {
        const { to, data, estimatedGas } = await this.zeroExAggregator.quote(
            indexAddress,
            outputTokenAddress ?? 'ETH',
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
