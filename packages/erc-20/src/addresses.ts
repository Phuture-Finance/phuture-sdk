import {Address, Network, Networkish, TokenSymbol} from '@phuture/types';

/** ### Default addresses for network ### */
export const setOfAssets: {
	[key in Networkish]: Record<TokenSymbol, Address>;
} = {
	/** ### Default addresses on mainnet. */
	[Network.Mainnet]: {
		usdc: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
		weth: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
	},
};
