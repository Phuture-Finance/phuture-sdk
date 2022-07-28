import {ChainId} from './chain-id';

/** ### Collection of ChainIds mapped to their network name */
export enum Network {
	/** ### Ethereum Mainnet */
	Mainnet = 1,
}

/** ### Network enum value of the chainId */
export type Networkish = Network | ChainId;
