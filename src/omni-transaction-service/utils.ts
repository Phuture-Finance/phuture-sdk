import { Message } from '@layerzerolabs/scan-client'
import { ethers } from 'ethers'

import { Account } from '../account'
import { OmniIndex, defaultOmniIndexAddress } from '../omni-router'

import {
  LZ_CHAIN_IDS,
  MessageProps,
  OFFICIAL_CHAIN_IDS,
  RequiredDstMessage,
} from './types'

export const getLayerZeroChain = (chain: OFFICIAL_CHAIN_IDS): number => {
  switch (chain) {
    case OFFICIAL_CHAIN_IDS.ETHEREUM:
      return LZ_CHAIN_IDS.ETHEREUM
    case OFFICIAL_CHAIN_IDS.ARBITRUM:
      return LZ_CHAIN_IDS.ARBITRUM
    case OFFICIAL_CHAIN_IDS.AVALANCHE:
      return LZ_CHAIN_IDS.AVALANCHE
    case OFFICIAL_CHAIN_IDS.POLYGON:
      return LZ_CHAIN_IDS.POLYGON
    case OFFICIAL_CHAIN_IDS.TEST_ETHEREUM:
      return LZ_CHAIN_IDS.TEST_ETHEREUM
    case OFFICIAL_CHAIN_IDS.TEST_ARBITRUM:
      return LZ_CHAIN_IDS.TEST_ARBITRUM
    case OFFICIAL_CHAIN_IDS.TEST_MUMBAI:
      return LZ_CHAIN_IDS.TEST_MUMBAI
    case OFFICIAL_CHAIN_IDS.TEST_AVAX:
      return LZ_CHAIN_IDS.TEST_AVAX
    default:
      throw new Error(`Unknown chain id: ${chain}`)
  }
}

export const mockedRemoteTxHash =
  '0x16a7d3e04a3e65d92dfb87009746a28501ffa26ce7953b744c9bb0655f0bc3cd'

export const errorTopics = [
  '0xe183f33de2837795525b4792ca4cd60535bd77c53b7e7030060bfcf5734d6b0c', //execution reverted
] //TODO: update

export enum MessageStatus {
  INFLIGHT = 'INFLIGHT',
  DELIVERED = 'DELIVERED',
  FAILED = 'FAILED',
}

export const getOmniChains = async (
  acc: Account,
  chain: number,
): Promise<number[]> => {
  const omniIndex = new OmniIndex(acc, defaultOmniIndexAddress[chain])
  const anatomy = await omniIndex.contract.anatomy()
  return anatomy.map(({ chainId }) => getLayerZeroChain(chainId.toNumber()))
}

export const getDefaultStatus = (chainId: number): MessageProps => ({
  hash: ethers.constants.AddressZero,
  chainId: chainId,
  status: MessageStatus.INFLIGHT,
})

type AvailableChainId = 1 | 109 | 110 | 106 | 10121 | 10109 | 10106

const rpcByChainId: Record<AvailableChainId, string> = {
  1: 'https://ethereum.publicnode.com',
  109: 'https://polygon-rpc.com',
  110: 'https://rpc.ankr.com/arbitrum',
  106: 'https://avalanche.public-rpc.com',
  //TESTNETS
  10121: 'https://rpc.ankr.com/eth_goerli',
  10109: 'https://polygon-mumbai.blockpi.network/v1/rpc/public',
  10106: 'https://endpoints.omniatech.io/v1/avax/fuji/public',
}

const getOmniRemoteUrl = (chainId: AvailableChainId) => rpcByChainId[chainId]

export const updateTransactionalStatuses = async ({
  dstTxHash,
  dstChainId,
  status,
}: RequiredDstMessage): Promise<MessageProps> => {
  const provider = ethers.getDefaultProvider(
    await getOmniRemoteUrl(dstChainId as AvailableChainId),
  )
  const { logs } = await provider.getTransactionReceipt(dstTxHash)

  const topicsArr = logs.flatMap(({ topics }) =>
    topics.filter((topic) => errorTopics.includes(topic.toLowerCase())),
  )

  const isError =
    status === 'FAILED' || logs.length === 0 || topicsArr.length !== 0

  return {
    hash: dstTxHash,
    chainId: dstChainId,
    status: isError
      ? MessageStatus.FAILED
      : status === 'DELIVERED' && topicsArr.length === 0
      ? MessageStatus.DELIVERED
      : MessageStatus.INFLIGHT,
  }
}

export const updateFailedTransaction = ({
  status,
  dstTxHash,
  dstChainId,
}: Message): MessageProps => ({
  hash: dstTxHash || ethers.constants.AddressZero,
  chainId: dstChainId,
  status: status as MessageStatus,
})
