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
export const ChainIds = {
  /** ### Ethereum Mainnet */
  Mainnet: 1,

  /** ### Avalanche C-Chain */
  CChain: 43114,

  /** ### Arbitrum  */
  Arbitrum: 42161,

  /** ### Polygon Mainnet */
  Polygon: 137,

  /** ### Binance Smart Chain Mainnet */
  // BSC: 56,

  /** ### Ethereum Goerli Testnet */
  EthereumGoerli: 5,

  /** ### Arbitrum Goerli Rollup Testnet */
  ArbitrumGoerli: 421613,

  /** ### Polygon Mumbai Testnet */
  PolygonMumbai: 80001,

  /** ### Avalanche Fuji Testnet */
  AvalancheFuji: 43113,
} as const

export type ChainName = keyof typeof ChainIds

export type AvaliableChainId = typeof ChainIds[ChainName]

/**
 * ### Is the given chain id valid
 *
 * @param chainId Chain id
 *
 * @returns **true** if the chain id is valid, **false** otherwise
 */
export const isChainId = (chainId: unknown): chainId is ChainId =>
  typeof chainId === 'number' && chainId > 0
