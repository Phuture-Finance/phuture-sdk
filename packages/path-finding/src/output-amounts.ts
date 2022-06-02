import {BigNumber, BigNumberish} from 'ethers';
import {Address} from '@phuture/types';
import {PathInfo} from './get-paths';

export interface OutputAmount {
	amountOut: BigNumberish;
	path: Address[];
}

export const getOutputAmount = (
	amountIn: BigNumberish,
	{pairInfo, path}: PathInfo,
): OutputAmount => {
	let amountInBN: BigNumber = BigNumber.from(amountIn);
	for (const [index, pair] of pairInfo.entries()) {
		const [reserve0, reserve1] =
			path[index] === pair.token0
				? [pair.reserve0, pair.reserve1]
				: [pair.reserve1, pair.reserve0];

		const amountInWithFee = amountInBN.mul(997);
		const numerator = amountInWithFee.mul(reserve1);
		const denominator = BigNumber.from(reserve0).mul(1000).add(amountInWithFee);
		amountInBN = numerator.div(denominator);
	}

	return {amountOut: amountInBN.toString(), path};
};

export const sortOutputAmounts = (
	outputsMatrix: OutputAmount[][],
): OutputAmount[][] =>
	outputsMatrix.map((outputsArray) =>
		outputsArray.sort((a, b) => {
			if (b.path[0].toLowerCase() !== a.path[1].toLowerCase()) {
				const aBigNumber = BigNumber.from(a.amountOut);
				const bBigNumber = BigNumber.from(b.amountOut);

				if (aBigNumber.gt(bBigNumber)) {
					return 1;
				}

				if (aBigNumber.lt(bBigNumber)) {
					return -1;
				}

				return 0;
			}

			return -1;
		}),
	);
