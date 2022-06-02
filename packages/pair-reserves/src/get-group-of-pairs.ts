import {TokensPair} from '@phuture/types';
import {getAddress, keccak256, solidityPack} from 'ethers/lib/utils';

export const getGroupOfPairs = (
	assets: TokensPair[],
	factoryAddress: string,
	codeHash: string,
): string[] =>
	assets.map((asset) => {
		const create2Inputs = [
			'0xff',
			factoryAddress,
			keccak256(
				solidityPack(['address', 'address'], [asset.token0, asset.token1]),
			),
			codeHash,
		];
		const sanitizedInputs = `0x${create2Inputs
			.map((index) => index.slice(2))
			.join('')}`;

		return getAddress(`0x${keccak256(sanitizedInputs).slice(-40)}`);
	});
