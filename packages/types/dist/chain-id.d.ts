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
export declare type ChainId = number;
/**
 * ### Is the given chain id valid
 *
 * @param chainId Chain id
 *
 * @returns **true** if the chain id is valid, **false** otherwise
 */
export declare const isChainId: (chainId: unknown) => chainId is number;
