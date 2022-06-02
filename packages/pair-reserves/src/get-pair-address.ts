import {Address, TokensPair} from '@phuture/types';
import {getAddress, keccak256, solidityPack} from 'ethers/lib/utils';

/**
 * ### Computes the address of a pair of tokens.
 *
 * @param tokens The tokens of pair.
 * @param factoryAddress The address of the factory contract.
 * @param codeHash The code hash of the factory contract.
 * @returns The address of the pair.
 */
export const getPairAddress = (
	tokens: TokensPair,
	factoryAddress: string,
	codeHash: string,
): Address => {
	const create2Inputs = [
		'0xff',
		factoryAddress,
		keccak256(solidityPack(['address', 'address'], [tokens.token0, tokens.token1])),
		codeHash,
	];
	const sanitizedInputs = `0x${create2Inputs
		.map((index) => index.slice(2))
		.join('')}`;

	return getAddress(`0x${keccak256(sanitizedInputs).slice(-40)}`);
};
