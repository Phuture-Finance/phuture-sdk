import {BigNumberish} from 'ethers';

export interface TokensPair {
	token0: string;
	token1: string;
}

export type PairInfo = {
	reserve0: BigNumberish;
	reserve1: BigNumberish;
} & TokensPair;
