import { ethers } from 'ethers'

import { MessageProps, RemoteApiResponse, RequiredDstMessage } from './types'

export const mockRemoteTransactions = [
  {
    created: 1677580103,
    dstChainId: 10121,
    dstTxHash:
      '0x728ad57658b7789347e32856af404949ef200b28c0e5662c16d140af6adb03df',
    dstUaAddress: '0x4cfe64f6a7a2a382323bae2be883c10964bdb737',
    srcBlockHash:
      '0x4879125caf96f109de6d91e7485e6c1e7ea3e3bb9c6f7662f28349f337daf852',
    srcBlockNumber: '9447087',
    srcChainId: 10143,
    srcTxHash:
      '0x5c1579e481904b6b601a8655bd632bcb1786564a13e0c540ed49fd879299779e',
    srcUaAddress: '0x76e1dbaee729a215509103c0c1dd6d349240642b',
    srcUaNonce: 25,
    status: 'DELIVERED',
    updated: 1677580247,
  },
]

export const defaultStatus: MessageProps = {
  hash: ethers.constants.AddressZero,
  chainId: 0,
  status: 'INFLIGHT',
}

const getOmniRemoteUrl = (chainId: number, hash: string, key: string) => {
  switch (chainId) {
    //ETH MAINNET
    case 1: {
      return `https://api.etherscan.io/api?module=transaction&action=gettxreceiptstatus&txhash=${hash}&apikey=${key}`
    }
    //MATIC MAINNET(use other key)
    case 137: {
      return `https://api.polygonscan.com/api?module=transaction&action=gettxreceiptstatus&txhash=${hash}&apikey=${key}`
    }
    //ARBITRUM MAINNET
    case 42161: {
      return `https://api.arbiscan.io/api?module=transaction&action=gettxreceiptstatus&txhash=${hash}&apikey=${key}`
    }
    //AVALANCHE MAINNET
    case 43114: {
      return `https://api.snowtrace.io/api?module=transaction&action=gettxreceiptstatus&txhash=${hash}&apikey=${key}`
    }

    //GOERLI TESTNET
    case 10121: {
      return `https://api-goerli.etherscan.io/api?module=transaction&action=gettxreceiptstatus&txhash=${hash}&apikey=${key}`
    }
    default: {
      return `https://api-goerli.etherscan.io/api?module=transaction&action=gettxreceiptstatus&txhash=${hash}&apikey=${key}`
    }
  }
}

const getRemoteResponse = async (
  tx: RequiredDstMessage,
  key: string,
): Promise<RemoteApiResponse> =>
  await fetch(
    getOmniRemoteUrl(tx.dstChainId, tx.dstTxHash, key),
  ).then((response) => response.json())

export const setSuccessHashes = (
  tx: RequiredDstMessage,
  arr: string[],
): void => {
  if (tx.status === 'DELIVERED') {
    arr.push(tx.dstTxHash)
  } else {
    arr.push(defaultStatus.hash)
  }
}

export const updateTransactionalStatuses = async (
  tx: RequiredDstMessage,
  arr: MessageProps[],
  apiKey: string,
): Promise<void> => {
  const transactionResponse = await getRemoteResponse(tx, apiKey)

  arr.push({
    hash: tx.dstTxHash,
    chainId: tx.dstChainId,
    status:
      transactionResponse.result.status === '0'
        ? 'FAILED'
        : transactionResponse.result.status === '1'
        ? 'DELIVERED'
        : 'INFLIGHT',
  })
}
