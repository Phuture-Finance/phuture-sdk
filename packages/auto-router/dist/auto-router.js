import { Erc20 } from '@phuture/erc-20';
import { isAddress } from '@phuture/types';
import { BigNumber } from 'ethers';
export class AutoRouter {
    constructor(indexRouter, zeroExAggregator) {
        this.indexRouter = indexRouter;
        this.zeroExAggregator = zeroExAggregator;
    }
    async autoBuy(index, amountInInputToken, inputToken, permitOptions) {
        const inputTokenAddress = (inputToken === null || inputToken === void 0 ? void 0 : inputToken.address) || (await this.indexRouter.weth());
        const [{ buyAmount: zeroExAmount, to: swapTarget, data: indexQuote, gasPrice, estimatedGas: zeroExGas, }, { amounts, amountToSell }, indexPriceEth] = await Promise.all([
            this.zeroExAggregator.quote(inputTokenAddress, index.address, amountInInputToken),
            index.scaleAmount(amountInInputToken),
            index.priceEth()
        ]);
        const quotes = await Promise.all(Object.entries(amounts).map(async ([asset, amount]) => {
            const { buyAmount: buyAssetMinAmount, to: swapTarget, data: assetQuote, } = await this.zeroExAggregator.quote(inputTokenAddress, asset, amount);
            return {
                asset,
                swapTarget,
                buyAssetMinAmount,
                assetQuote,
            };
        }));
        const options = {
            index: index.address,
            recipient: await this.indexRouter.account.address(),
            quotes,
            amountInInputToken,
            inputToken: inputTokenAddress,
        };
        const { estimatedGas, outputAmount } = await this.indexRouter.mintSwapStatic(options, amountToSell, inputToken, permitOptions);
        if (estimatedGas
            .sub(zeroExGas)
            .mul(gasPrice)
            .gte(outputAmount.sub(zeroExAmount).mul(indexPriceEth)))
            return this.indexRouter.mintSwap(options, amountToSell, inputToken, permitOptions);
        return this.indexRouter.account.signer.call({
            to: swapTarget,
            data: indexQuote,
            value: inputToken ? 0 : zeroExAmount,
        });
    }
    async autoSell(index, indexAmount, outputToken, permitOptions) {
        let outputTokenAddress;
        let outputTokenPriceEth = BigNumber.from(10).pow(18);
        if (outputToken) {
            outputToken = isAddress(outputToken)
                ? new Erc20(this.indexRouter.account, outputToken)
                : outputToken;
            outputTokenAddress = outputToken.address;
            const { buyAmount } = await this.zeroExAggregator.price(outputToken.address, await this.indexRouter.weth(), BigNumber.from(10).pow(await outputToken.decimals()));
            outputTokenPriceEth = BigNumber.from(buyAmount);
        }
        else {
            outputToken = new Erc20(this.indexRouter.account, await this.indexRouter.weth());
        }
        const [{ buyAmount: zeroExAmount, to: swapTarget, data: assetQuote, gasPrice, estimatedGas: zeroExGas, }, { amounts, amountToSell },] = await Promise.all([
            this.zeroExAggregator.quote(index.address, outputToken.address, indexAmount),
            index.scaleAmount(indexAmount),
        ]);
        const quotes = await Promise.all(Object.entries(amounts).map(async ([asset, amount]) => {
            const { buyAmount: buyAssetMinAmount, to: swapTarget, data: assetQuote, } = await this.zeroExAggregator.quote(index.address, asset, amount);
            return {
                asset,
                swapTarget,
                buyAssetMinAmount,
                assetQuote,
            };
        }));
        const options = {
            outputAsset: outputTokenAddress,
            quotes,
            permitOptions,
        };
        const { outputAmount, estimatedGas } = await this.indexRouter.burnSwapStatic(index.address, amountToSell, await this.indexRouter.account.address(), options);
        if (estimatedGas
            .sub(zeroExGas)
            .mul(gasPrice)
            .gte(outputAmount.sub(zeroExAmount).mul(outputTokenPriceEth)))
            return this.indexRouter.burnSwap(index.address, amountToSell, await this.indexRouter.account.address(), options);
        return this.indexRouter.account.signer.call({
            to: swapTarget,
            data: assetQuote,
        });
    }
}
//# sourceMappingURL=auto-router.js.map