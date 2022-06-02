import {TokensPair} from '@phuture/types';
import {addressComparator} from '@phuture/comparators';

export const getPairsMatrix = (
	assets: string[],
	currency: string,
	quoteAssets: string[],
): TokensPair[][] =>
	assets.map((asset) => {
		const pairsArray: TokensPair[] = [];
		for (const quoteAsset of quoteAssets) {
			if (asset !== quoteAsset) {
				pairsArray.push(
					addressComparator(asset, quoteAsset) !== 1
						? {token0: asset, token1: quoteAsset}
						: {token0: quoteAsset, token1: asset},
				);
			}

			if (currency !== quoteAsset) {
				pairsArray.push(
					addressComparator(currency, quoteAsset) !== 1
						? {token0: currency, token1: quoteAsset}
						: {token0: quoteAsset, token1: currency},
				);
			}
		}

		return pairsArray;
	});
