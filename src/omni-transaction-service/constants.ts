import { ChainId, ChainIds } from '../types'

import { LzChainId } from './types'

export const chainMappings: Record<ChainId, LzChainId> = {
  [ChainIds.Mainnet]: LzChainId.Ethereum,
  [ChainIds.Arbitrum]: LzChainId.Arbitrum,
  [ChainIds.CChain]: LzChainId.Avalanche,
  [ChainIds.Polygon]: LzChainId.Polygon,
  //TESTNETS
  [ChainIds.EthereumGoerli]: LzChainId.EthereumGoerli,
  [ChainIds.ArbitrumGoerli]: LzChainId.ArbitrumGoerli,
  [ChainIds.PolygonMumbai]: LzChainId.PolygonMumbai,
  [ChainIds.AvalancheFuji]: LzChainId.AvalancheFuji,
}

export const getLayerZeroChain = (chain: ChainId): number => {
  if (chain in chainMappings) {
    return chainMappings[chain]
  }

  throw new Error(`Unknown chain id: ${chain}`)
}

const rpcByLzChainId: Record<LzChainId, string> = {
  [LzChainId.Ethereum]: 'https://ethereum.publicnode.com',
  [LzChainId.Avalanche]: 'https://avalanche.public-rpc.com',
  [LzChainId.Polygon]: 'https://polygon-rpc.com',
  [LzChainId.Arbitrum]: 'https://rpc.ankr.com/arbitrum',
  //TESTNETS
  [LzChainId.EthereumGoerli]: 'https://rpc.ankr.com/eth_goerli',
  [LzChainId.AvalancheFuji]: 'https://rpc.ankr.com/avalanche_fuji',
  [LzChainId.PolygonMumbai]:
    'https://polygon-mumbai.blockpi.network/v1/rpc/public',
  [LzChainId.ArbitrumGoerli]:
    'https://endpoints.omniatech.io/v1/arbitrum/goerli/public',
}

export const getOmniRemoteUrl = (lzChainId: LzChainId) =>
  rpcByLzChainId[lzChainId]

export const errorTopics = [
  '0xe183f33de2837795525b4792ca4cd60535bd77c53b7e7030060bfcf5734d6b0c', //execution reverted
] //TODO: update
