import {Buffer} from 'node:buffer';
import {keccak256} from '@ethersproject/keccak256';
import {toUtf8Bytes} from '@ethersproject/strings';
import {ethers, Signer, utils} from 'ethers';
import {Erc165 as ERC165ContractInterface, Erc165__factory} from './types';

/**
 * Method than creates interface id from function string signature(s)
 * @see {@link https://github.com/OpenZeppelin/openzeppelin-test-helpers/blob/master/src/makeInterfaceId.js)}
 */

export class Erc165 {
	static makeInterfaceId(functionSignatures: string[] = []) {
		const interfaceIdLength = 4;

		const interfaceIdBuffer = functionSignatures
			.map((signature) => keccak256(toUtf8Bytes(signature))) // Keccak256
			.map(
				(h) => Buffer.from(h.slice(2), 'hex').slice(0, 4), // Bytes4()
			)
			// eslint-disable-next-line unicorn/no-array-reduce
			.reduce((memo, bytes) => {
				for (let index = 0; index < interfaceIdLength; index++) {
					// eslint-disable-next-line no-bitwise
					memo[index] ^= bytes[index]; // Xor
				}

				return memo;
			}, Buffer.alloc(interfaceIdLength));

		return `0x${interfaceIdBuffer.toString('hex')}`;
	}

	/** ### ERC165 contract instance */
	public contract: ERC165ContractInterface;
	/** ### Decimals of the token */
	// private _decimals?: number;??

	constructor(contract: ERC165ContractInterface);
	constructor(
		contractAddress: string,
		signerOrProvider?: Signer | ethers.providers.Provider,
	);

	/**
	 * ### Creates a new ERC165 instance
	 *
	 * @param contract Contract instance or address of the ERC165 token contract
	 * @param signerOrProvider Signer or provider to use for interacting with the contract
	 * @returns New ERC165 token instance
	 */
	constructor(
		contract: string | ERC165ContractInterface,
		signerOrProvider?: Signer | ethers.providers.Provider,
	) {
		if (typeof contract === 'string') {
			signerOrProvider ??= ethers.providers.getDefaultProvider();

			if (!utils.isAddress(contract))
				throw new TypeError(`Invalid contract address: ${contract}`);

			this.contract = Erc165__factory.connect(contract, signerOrProvider);
		} else {
			this.contract = contract;
		}
	}
}

export const interfaces = {
	erc165Interface: Erc165.makeInterfaceId(['supportsInterface(bytes4)']),
};
