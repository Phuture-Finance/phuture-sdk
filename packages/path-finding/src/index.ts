import {PairReserves} from '@phuture/pair-reserves';
import {getPairsMatrix} from './get-pairs-matrix';
import {getPaths, PathInfo} from './get-paths';
import {OutputAmount} from './output-amounts';

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

export const findBestPaths = (
	outputsMatrixSource: Array<{
		factory: string;
		outputAmountsMatrix: OutputAmount[][];
	}>,
): {
	paths: string[][];
	factories: string[];
	minOutputAmounts: string[];
} => {
	const paths: string[][] = Array.from({
		length: outputsMatrixSource[0].outputAmountsMatrix.length,
	});
	const factories: string[] = Array.from({
		length: outputsMatrixSource[0].outputAmountsMatrix.length,
	});
	const minOutputAmounts: string[] = Array.from({
		length: outputsMatrixSource[0].outputAmountsMatrix.length,
	});

	// For (let index = 1; index < outputsMatrixSource.length; index++) {
	//     const outputs = outputsMatrixSource[index].outputAmountsMatrix
	//     const prevOutputs = outputsMatrixSource[index - 1].outputAmountsMatrix
	//
	//     if (
	//         BigNumber.from(outputs.length > 0 ? outputs[0].amountOut : 0).gte(
	//             uniOutputs.length > 0 ? uniOutputs[0].amountOut : 0,
	//         )
	//     ) {
	//         factories.push(sets[network].SushiV2Factory)
	//         minOutputAmounts.push(BigNumber.from(outputs[0].amountOut).div(100).mul(95).toString())
	//
	//         return outputs[0].path
	//     }
	//
	//     factories.push(sets[network].UniswapV2Factory)
	//     minOutputAmounts.push(BigNumber.from(uniOutputs[0].amountOut).div(100).mul(95).toString())
	//
	// }

	return {paths, factories, minOutputAmounts};
};
