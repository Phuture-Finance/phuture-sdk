import {TokensPair} from "@phuture/types";
import {assetComparator} from "@phuture/comparators";

export const getPairsMatrix = (
    assets: Array<string>,
    currency: string,
    quoteAssets: Array<string>,
): Array<Array<TokensPair>> =>
    assets.map((externalAsset) => {
        const pairsArray: Array<TokensPair> = []
        for (const quoteAsset of quoteAssets) {
            if (externalAsset.toLowerCase() !== quoteAsset) {
                pairsArray.push(
                    assetComparator(externalAsset, quoteAsset) !== 1
                        ? {token0: externalAsset, token1: quoteAsset}
                        : {token0: quoteAsset, token1: externalAsset},
                )
            }

            if (currency.toLowerCase() !== quoteAsset) {
                pairsArray.push(
                    assetComparator(currency, quoteAsset) !== 1
                        ? {token0: currency, token1: quoteAsset}
                        : {token0: quoteAsset, token1: currency},
                )
            }
        }

        return pairsArray
    })
