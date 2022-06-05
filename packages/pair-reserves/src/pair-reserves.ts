import {ethers, Signer, utils} from 'ethers';
import {PairInfo, TokensPair} from '@phuture/types';
import {
	PairReserves as PairReservesContract,
	PairReserves__factory,
} from './types';
import {getPairAddress} from './get-pair-address';

/**
 * ### Addresses of the PairReserves contract on different networks
 */
export enum PairReservesContractAddress {
	/** ### Address of the PairReserves contract on mainnet. */
	Mainnet = '0x920FA7ba74423D7b8b1B347259dbbce95C12ee76',
}

/**
 * ### Class for interacting with the PairReserves contract
 */
export class PairReserves {
	/** ### PairReserves contract instance */
	public readonly contract: PairReservesContract;

	/**
	 * ### Creates a new PairReserves instance
	 *
	 * @param contractAddress Address of the PairReserves contract
	 * @param signerOrProvider Signer or provider to use for interacting with the contract
	 * @returns New PairReserves instance
	 */
	constructor(
		contractAddress: string = PairReservesContractAddress.Mainnet,
		signerOrProvider?: Signer | ethers.providers.Provider,
	) {
		signerOrProvider ??= ethers.providers.getDefaultProvider();

		if (!utils.isAddress(contractAddress))
			throw new TypeError(`Invalid contract address: ${contractAddress}`);

		this.contract = PairReserves__factory.connect(
			contractAddress,
			signerOrProvider,
		);
	}

	/**
	 * ### Get reserves for a list of pairs.
	 *
	 * @param tokensPairs List of pairs.
	 * @param factoryAddress Address of the factory contract.
	 * @param codeHash Hash of the factory contract's code.
	 * @returns Reserves for the pairs.
	 */
	async getPairReserves(
		tokensPairs: TokensPair[],
		factoryAddress: string,
		codeHash: string,
	): Promise<PairInfo[]> {
		const pairAddresses = tokensPairs.map((tokenPair) =>
			getPairAddress(tokenPair, factoryAddress, codeHash),
		);
		const reserves = await this.contract.getReserves(pairAddresses);

		return reserves
			.filter(([token]) => token !== ethers.constants.AddressZero)
			.map(([token, reserve0, reserve1], index) => ({
				reserve0,
				reserve1,
				token0: token.toLowerCase(),
				token1:
					token.toLowerCase() === tokensPairs[index].token1.toLowerCase()
						? tokensPairs[index].token0.toLowerCase()
						: tokensPairs[index].token1.toLowerCase(),
			}));
	}
}
