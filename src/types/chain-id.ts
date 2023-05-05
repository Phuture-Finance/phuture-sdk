/**
 * Unique identifier of a chain
 *
 * @see https://eips.ethereum.org/EIPS/eip-155
 * @see https://eips.ethereum.org/EIPS/eip-1344
 * @see https://chainlist.org
 *
 * @example
 * const mainnetChainId: ChainId = 1
 *
 * @example
 * const avalancheChainId: ChainId = 43114
 */
export type ChainId = number

/** ### Collection of ChainIds mapped to their network name */
export const ChainIds: Record<
  | 'Mainnet'
  | 'CChain'
  | 'Arbitrum'
  | 'Polygon'
  | 'BSC'
  | 'GoerliRollupTestnet'
  | 'GoerliTestnet'
  | 'Mumbai'
  | 'AvalancheFuji',
  ChainId
> = {
  /** ### Ethereum Mainnet */
  Mainnet: 1,

  /** ### Avalanche C-Chain */
  CChain: 43114,

  /** ### Arbitrum  */
  Arbitrum: 42161,

  /** ### Polygon Mainnet */
  Polygon: 137,

  /** ### Binance Smart Chain Mainnet */
  BSC: 56,

  /** ### Arbitrum Goerli Rollup Testnet */
  GoerliRollupTestnet: 421613,

  /** ### Ethereum Goerli Testnet */
  GoerliTestnet: 5,

  /** ### Polygon Mumbai Testnet */
  Mumbai: 80001,

  /** ### Avalanche Fuji Testnet */
  AvalancheFuji: 43113,
} as const

/**
 * ### Is the given chain id valid
 *
 * @param chainId Chain id
 *
 * @returns **true** if the chain id is valid, **false** otherwise
 */
export const isChainId = (chainId: unknown): chainId is ChainId =>
  typeof chainId === 'number' && chainId > 0
