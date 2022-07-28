/**
 * ### Is the given chain id valid
 *
 * @param chainId Chain id
 *
 * @returns **true** if the chain id is valid, **false** otherwise
 */
export const isChainId = (chainId) => typeof chainId === 'number' && chainId > 0;
//# sourceMappingURL=chain-id.js.map