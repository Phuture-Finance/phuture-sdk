import {PairInfo} from '@phuture/types';

export interface PathInfo {
	path: string[];
	pairInfo: PairInfo[];
}

export const getPaths = (
	allPairsWithReserves: PairInfo[],
	tokenIn: string,
	tokenOut: string,
	quotes: string[],
): PathInfo[] => {
	const pathInfos: PathInfo[] = [...quotes].map<PathInfo>(() => ({
		path: [],
		pairInfo: [],
	}));

	for (const info of allPairsWithReserves) {
		const containsTokenIn =
			info.token0 === tokenIn.toLowerCase() ||
			info.token1 === tokenIn.toLowerCase();
		const containsTokenOut =
			info.token0 === tokenOut.toLowerCase() ||
			info.token1 === tokenOut.toLowerCase();
		if (containsTokenIn && containsTokenOut) {
			pathInfos[quotes.length] = {
				path: [tokenIn.toLowerCase(), tokenOut.toLowerCase()],
				pairInfo: [info],
			};
		} else {
			const isToken0Quote =
				info.token0 !== tokenIn.toLowerCase() &&
				info.token0 !== tokenOut.toLowerCase();
			const quote = isToken0Quote ? info.token0 : info.token1;
			const index = quotes.indexOf(quote);
			if (containsTokenIn) {
				pathInfos[index].pairInfo[0] = info;
				pathInfos[index].path[0] = tokenIn.toLowerCase();
				pathInfos[index].path[1] = quote;
			} else {
				pathInfos[index].pairInfo[1] = info;
				pathInfos[index].path[2] = tokenOut.toLowerCase();
				pathInfos[index].path[1] = quote;
			}
		}
	}

	return pathInfos.filter(
		({path}) =>
			path[0] === tokenIn.toLowerCase() &&
			path[path.length - 1] === tokenOut.toLowerCase(),
	);
};
