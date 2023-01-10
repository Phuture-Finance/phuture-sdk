import { Address, ChainIds, TokenSymbol } from '../types'

/** ### Default addresses for network ### */
export const Addresses: {
  [K: string]: Record<TokenSymbol, Address>
} = {
  /** ### Default addresses on mainnet. */
  [ChainIds.Mainnet]: {
    USDC: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
    WETH: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
  },
  [ChainIds.CChain]: {
    USDC: '0xb97ef9ef8734c71904d8002f8b6bc66dd9c48a6e',
  },
}
