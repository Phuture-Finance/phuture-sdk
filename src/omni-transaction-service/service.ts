import { createClient, Message } from '@layerzerolabs/scan-client'

import { RequiredDstMessage, TxStatusProps } from './types'
import {
  defaultStatus,
  setSuccessHashes,
  updateTransactionalStatuses,
} from './utils'

export const getRemoteTransactionStatuses = async (
  hash: string,
  ethApiKey: string,
  maticApiKey: string,
): Promise<TxStatusProps> => {
  const testnetClient = createClient('testnet')
  const mainnetClient = createClient('mainnet')

  const outputOmniTransactionHashes: string[] = []
  const transactionalStatuses: TxStatusProps = {
    homeToRemote: [],
    remoteToHome: [],
  }

  const inputOmniTransactions: Message[] = await testnetClient
    .getMessagesBySrcTxHash(hash)
    .then((result) => result.messages)

  //INFO: home-to-remote-transactions
  inputOmniTransactions.map(async (tx) => {
    if (tx.dstTxHash) {
      setSuccessHashes(tx as RequiredDstMessage, outputOmniTransactionHashes)

      await updateTransactionalStatuses(
        tx as RequiredDstMessage,
        transactionalStatuses.homeToRemote,
        tx.dstChainId === 137 ? maticApiKey : ethApiKey,
      )
    } else {
      transactionalStatuses.homeToRemote.push(defaultStatus)
    }
  })

  //INFO: remote-to-home-transactions
  if (outputOmniTransactionHashes.length > 0) {
    // outputOmniTransactionHashes.map(async (remoteHash) => {
    const mockTransactions = [
      '0x16a7d3e04a3e65d92dfb87009746a28501ffa26ce7953b744c9bb0655f0bc3cd',
    ]
    mockTransactions.map(async (remoteHash) => {
      const outputTransactions = await mainnetClient
        .getMessagesBySrcTxHash(remoteHash)
        .then((result) => result.messages)

      outputTransactions.map(async (tx) => {
        if (tx.dstTxHash) {
          await updateTransactionalStatuses(
            tx as RequiredDstMessage,
            transactionalStatuses.remoteToHome,
            tx.dstChainId === 137 ? maticApiKey : ethApiKey,
          )
        } else {
          transactionalStatuses.remoteToHome.push(defaultStatus)
        }
      })
    })
  } else {
    transactionalStatuses.remoteToHome.push(defaultStatus)
  }

  return transactionalStatuses
}

export const sum = (...a: number[]) => a.reduce((acc, val) => acc + val, 0)
