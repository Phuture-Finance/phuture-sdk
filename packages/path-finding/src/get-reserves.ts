import {PairReserves} from '@phuture/pair-reserves';
import {getPaths, PathInfo} from './get-paths';
import {getPairsMatrix} from './get-pairs-matrix';

export const getReserves = async (
	pairReservesContract: PairReserves,
	assetsAddresses: string[],
	isBuy: boolean,
	quote: string,
	quoteAssets: string[],
	factories: Array<{address: string; initCodeHash: string}>,
): Promise<PathInfo[][][]> => {
	const pairs = getPairsMatrix(assetsAddresses, quote, quoteAssets);

	const getPairReservesOfFactory = async (
		factoryAddress: string,
		codeHash: string,
	) =>
		Promise.all(
			pairs.map(async (p) =>
				pairReservesContract.getPairReserves(p, factoryAddress, codeHash),
			),
		);

	const factoriesPairs = await Promise.all(
		factories.map(async ({address, initCodeHash}) =>
			getPairReservesOfFactory(address, initCodeHash),
		),
	);

	return factoriesPairs.map((pairs) =>
		assetsAddresses.map((address, i) =>
			getPaths(
				pairs[i],
				isBuy ? quote : address,
				isBuy ? address : quote,
				quoteAssets,
			),
		),
	);
};
