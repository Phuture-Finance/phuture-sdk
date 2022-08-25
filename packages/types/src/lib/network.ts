import { ChainId } from './chain-id';

/** ### Collection of ChainIds mapped to their network name */
export enum Network {
	/** ### Ethereum Mainnet */
	Mainnet = 1,
	/** ### Avalanche C-Chain */
	CChain = 43114,
}

/** ### Network enum value of the chainId */
export type Networkish = Network | ChainId;
