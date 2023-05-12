export interface MessageProps {
  hash: string
  chainId: number
  status: MessageStatus
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

export type Required<T> = {
  [P in keyof T]-?: T[P]
}

export enum MessageStatus {
  INFLIGHT = 'INFLIGHT',
  DELIVERED = 'DELIVERED',
  FAILED = 'FAILED',
}

export type AvailableChainId = 1 | 109 | 110 | 106 | 10121 | 10109 | 10106

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

export const chainMappings: { [key in OFFICIAL_CHAIN_IDS]: number } = {
  [OFFICIAL_CHAIN_IDS.ETHEREUM]: LZ_CHAIN_IDS.ETHEREUM,
  [OFFICIAL_CHAIN_IDS.ARBITRUM]: LZ_CHAIN_IDS.ARBITRUM,
  [OFFICIAL_CHAIN_IDS.AVALANCHE]: LZ_CHAIN_IDS.AVALANCHE,
  [OFFICIAL_CHAIN_IDS.POLYGON]: LZ_CHAIN_IDS.POLYGON,
  [OFFICIAL_CHAIN_IDS.TEST_ETHEREUM]: LZ_CHAIN_IDS.TEST_ETHEREUM,
  [OFFICIAL_CHAIN_IDS.TEST_ARBITRUM]: LZ_CHAIN_IDS.TEST_ARBITRUM,
  [OFFICIAL_CHAIN_IDS.TEST_MUMBAI]: LZ_CHAIN_IDS.TEST_MUMBAI,
  [OFFICIAL_CHAIN_IDS.TEST_AVAX]: LZ_CHAIN_IDS.TEST_AVAX,
}
