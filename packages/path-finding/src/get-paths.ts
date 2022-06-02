import {PairInfo} from '@phuture/types';

export interface PathInfo {
	path: string[];
	pairInfo: PairInfo[];
}

export const getPaths = (
	pairsWithReserves: PairInfo[],
	tokenIn: string,
	tokenOut: string,
	quotes: string[],
): PathInfo[] => {
	const pathInfos: PathInfo[] = [...quotes].map<PathInfo>(() => ({
		path: [],
		pairInfo: [],
	}));

	for (const info of pairsWithReserves) {
		const {token0, token1} = info;
		const containsTokenIn = token0 === tokenIn || token1 === tokenIn;
		const containsTokenOut = token0 === tokenOut || token1 === tokenOut;

		if (containsTokenIn && containsTokenOut) {
			pathInfos[quotes.length] = {path: [tokenIn, tokenOut], pairInfo: [info]};
		} else {
			const isToken0Quote = token0 !== tokenIn && token0 !== tokenOut;
			const quote = isToken0Quote ? token0 : token1;

			const index = quotes.indexOf(quote);
			if (containsTokenIn) {
				pathInfos[index].pairInfo[0] = info;
				pathInfos[index].path[0] = tokenIn;
			} else {
				pathInfos[index].pairInfo[1] = info;
				pathInfos[index].path[2] = tokenOut;
			}

			pathInfos[index].path[1] = quote;
		}
	}

	return pathInfos.filter(
		({path}) => path[0] === tokenIn && path[path.length - 1] === tokenOut,
	);
};
