import { ethers } from 'ethers'

import { MessageProps, RequiredDstMessage } from './types'

export const mockedRemoteTxHash =
  '0x16a7d3e04a3e65d92dfb87009746a28501ffa26ce7953b744c9bb0655f0bc3cd'

export const errorTopics = [
  '0xe183f33de2837795525b4792ca4cd60535bd77c53b7e7030060bfcf5734d6b0c',
] //TODO: update

export enum MessageStatus {
  INFLIGHT = 'INFLIGHT',
  DELIVERED = 'DELIVERED',
  FAILED = 'FAILED',
}

export const defaultStatus: MessageProps = {
  hash: ethers.constants.AddressZero,
  chainId: 0,
  status: MessageStatus.INFLIGHT,
}

type AvailableChainId = 1 | 109 | 110 | 106 | 10121 | 10109

const rpcByChainId: Record<AvailableChainId, string> = {
  1: 'https://ethereum.publicnode.com',
  109: 'https://polygon-rpc.com',
  110: 'https://rpc.ankr.com/arbitrum',
  106: 'https://avalanche.public-rpc.com',
  //TESTNETS
  10121: 'https://rpc.ankr.com/eth_goerli',
  10109: 'https://polygon-testnet.public.blastapi.io',
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
  const transactionLogs = await (
    await provider.getTransactionReceipt(dstTxHash)
  ).logs

  const topicsArr = transactionLogs
    .map(({ topics }) =>
      topics.filter((topic) => errorTopics.includes(topic.toLowerCase())),
    )
    .flat()

  return {
    hash: dstTxHash,
    chainId: dstChainId,
    status:
      status === 'FAILED' ||
      transactionLogs.length === 0 ||
      topicsArr.length !== 0
        ? MessageStatus.FAILED
        : status === 'DELIVERED' && topicsArr.length === 0
        ? MessageStatus.DELIVERED
        : MessageStatus.INFLIGHT,
  }
}