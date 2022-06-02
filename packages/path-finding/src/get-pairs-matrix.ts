import {TokensPair} from '@phuture/types';
import {addressComparator} from '@phuture/comparators';

export const getPairsMatrix = (
	assets: string[],
	currency: string,
	quoteAssets: string[],
): TokensPair[][] =>
	assets.map((externalAsset) => {
		const pairsArray: TokensPair[] = [];
		for (const quoteAsset of quoteAssets) {
			if (externalAsset.toLowerCase() !== quoteAsset) {
				pairsArray.push(
					addressComparator(externalAsset, quoteAsset) !== 1
						? {token0: externalAsset, token1: quoteAsset}
						: {token0: quoteAsset, token1: externalAsset},
				);
			}

			if (currency.toLowerCase() !== quoteAsset) {
				pairsArray.push(
					addressComparator(currency, quoteAsset) !== 1
						? {token0: currency, token1: quoteAsset}
						: {token0: quoteAsset, token1: currency},
				);
			}
		}

		return pairsArray;
	});
