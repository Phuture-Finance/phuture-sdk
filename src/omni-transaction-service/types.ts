import { Message } from '@layerzerolabs/scan-client'

export interface MessageProps {
  hash: string
  chainId: number
  status: 'INFLIGHT' | 'DELIVERED' | 'FAILED'
}

export interface OmniTxStatusProps {
  homeToRemote: MessageProps[]
  remoteToHome: MessageProps[]
}

export interface RemoteApiResponse {
  message: string
  result: { status: string }
  status: string
}

export interface RequiredDstMessage extends Omit<Message, 'dstTxHash'> {
  dstTxHash: string
}

export const enum LZ_CHAIN_IDS {
  ETHEREUM = 101,
  ARBITRUM = 110,
  AVALANCHE = 106,
  POLYGON = 109,
  TEST_ETHEREUM = 10121,
  TEST_ARBITRUM = 10143,
  TEST_MUMBAI = 10109,
  TEST_AVAX = 10106,
}

export const enum OFFICIAL_CHAIN_IDS {
  ETHEREUM = 1,
  ARBITRUM = 42161,
  AVALANCHE = 43114,
  POLYGON = 137,
  TEST_ETHEREUM = 5,
  TEST_ARBITRUM = 421613,
  TEST_MUMBAI = 80001,
  TEST_AVAX = 43113,
}
