import { Message } from '@layerzerolabs/scan-client'

export interface LzScanClient {
  getMessagesBySrcTxHash(srcTxHash: string): Promise<{
    messages: Message[]
  }>
}

export enum MessageStatus {
  INFLIGHT = 'INFLIGHT',
  DELIVERED = 'DELIVERED',
  FAILED = 'FAILED',
}

export interface OmniTx {
  chain: number
  statuses: MessageStatus[]
}

export interface OmniTxStatusProps {
  transactions: OmniTx[]
}

export const enum LzChainId {
  Ethereum = 101,
  Arbitrum = 110,
  Avalanche = 106,
  Polygon = 109,
  EthereumGoerli = 10121,
  ArbitrumGoerli = 10143,
  PolygonMumbai = 10109,
  AvalancheFuji = 10106,
}
