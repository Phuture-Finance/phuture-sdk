import {BigNumberish} from 'ethers';
import {Address} from './address';

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
