import { Message } from '@layerzerolabs/scan-client'
import { ethers } from 'ethers'

import { Account } from '../account'
import { OmniIndex, defaultOmniIndexAddress } from '../omni-router'

import { errorTopics } from './constants'
import {
  AvailableChainId,
  MessageStatus,
  OFFICIAL_CHAIN_IDS,
  chainMappings,
} from './types'

export const getLayerZeroChain = (chain: OFFICIAL_CHAIN_IDS): number => {
  if (chain in chainMappings) {
    return chainMappings[chain]
  }

  throw new Error(`Unknown chain id: ${chain}`)
}

export const getOmniChains = async (
  acc: Account,
  chain: number,
): Promise<number[]> => {
  const omniIndex = new OmniIndex(acc, defaultOmniIndexAddress[chain])
  const anatomy = await omniIndex.contract.anatomy()
  return anatomy.map(({ chainId }) => getLayerZeroChain(chainId.toNumber()))
}

export const defaultStatus = MessageStatus.INFLIGHT

const rpcByChainId: Record<AvailableChainId, string> = {
  1: 'https://ethereum.publicnode.com',
  109: 'https://polygon-rpc.com',
  110: 'https://rpc.ankr.com/arbitrum',
  106: 'https://avalanche.public-rpc.com',
  //TESTNETS
  10121: 'https://rpc.ankr.com/eth_goerli',
  10109: 'https://polygon-mumbai.blockpi.network/v1/rpc/public',
  10106: 'https://rpc.ankr.com/avalanche_fuji',
}

const getOmniRemoteUrl = (chainId: AvailableChainId) => rpcByChainId[chainId]

export const updateTransactionalStatuses = async ({
  dstTxHash,
  dstChainId,
  status,
}: Required<Message>): Promise<MessageStatus> => {
  const provider = ethers.getDefaultProvider(
    await getOmniRemoteUrl(dstChainId as AvailableChainId),
  )
  const { logs } = await provider.getTransactionReceipt(dstTxHash)

  const topicsArr = logs.flatMap(({ topics }) =>
    topics.filter((topic) => errorTopics.includes(topic.toLowerCase())),
  )

  const isError =
    status === MessageStatus.FAILED ||
    logs.length === 0 ||
    topicsArr.length !== 0

  const returnedStatus = isError
    ? MessageStatus.FAILED
    : status === MessageStatus.DELIVERED && topicsArr.length === 0
    ? MessageStatus.DELIVERED
    : MessageStatus.INFLIGHT

  return returnedStatus
}

export const updateFailedTransaction = ({ status }: Message): MessageStatus =>
  status as MessageStatus
