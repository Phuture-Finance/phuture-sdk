import fetch from 'cross-fetch'
import { ethers } from 'ethers'

import { MessageProps, RemoteApiResponse, RequiredDstMessage } from './types'

export const mockedRemoteTxHash =
  '0x16a7d3e04a3e65d92dfb87009746a28501ffa26ce7953b744c9bb0655f0bc3cd'

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

type AvailableChainId = 1 | 109 | 110 | 106 | 10121

const endpointByChainId: Record<AvailableChainId, string> = {
  1: 'https://api.etherscan.io',
  109: 'https://api.polygonscan.com',
  110: 'https://api.arbiscan.io',
  106: 'https://api.snowtrace.io',
  10121: 'https://api-goerli.etherscan.io',
}

const getOmniRemoteUrl = (chainId: AvailableChainId) =>
  endpointByChainId[chainId] || endpointByChainId[10121]

const getTxReceiptStatus = async (
  chainId: AvailableChainId,
  txHash: string,
  key: string,
): Promise<RemoteApiResponse> => {
  const endpoint = `${getOmniRemoteUrl(
    chainId,
  )}/api?module=transaction&action=gettxreceiptstatus&txhash=${txHash}&apikey=${key}`

  return fetch(endpoint).then((response) => response.json())
}

export const updateTransactionalStatuses = async (
  { dstTxHash, dstChainId }: RequiredDstMessage,
  apiKey: string,
): Promise<MessageProps> => {
  const transactionResponse = await getTxReceiptStatus(
    dstChainId as AvailableChainId,
    dstTxHash,
    apiKey,
  )

  return {
    hash: dstTxHash,
    chainId: dstChainId,
    status:
      transactionResponse.result.status === '0'
        ? MessageStatus.FAILED
        : transactionResponse.result.status === '1'
        ? MessageStatus.DELIVERED
        : MessageStatus.INFLIGHT,
  }
}
