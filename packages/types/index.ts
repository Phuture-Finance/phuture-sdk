import type {BigNumberish} from 'ethers';

/**
 * ### The unique identifier of the contract or an EAO.
 * Keccak hash of an ECDSA public key (160 bits).
 *
 * @see https://ethereum.org/en/glossary/#address
 *
 * @example
 * const addressZero: Address = "0x0000000000000000000000000000000000000000"
 *
 * @example
 * const phtrAddress: Address = "0xe1fc4455f62a6e89476f1072530c20cf1a0622da"
 */
export type Address = string; // `0x${string}`

/**
 * Pair of tokens represented by their addresses
 */
export interface TokensPair {
	/** Address of token0 */
	token0: Address;

	/** Address of token1 */
	token1: Address;
}

/**
 * Pair of tokens represented by their addresses and reserves
 */
export type PairInfo = {
	/** Liquidity of {@link TokensPair.token0} in pair */
	reserve0: BigNumberish;

	/** Liquidity of {@link TokensPair.token1} in pair */
	reserve1: BigNumberish;
} & TokensPair;
