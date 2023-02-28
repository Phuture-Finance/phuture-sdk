import { createClient, Message } from '@layerzerolabs/scan-client'

import { RequiredDstMessage, TxStatusProps } from './types'
import {
  defaultStatus,
  setSuccessHashes,
  updateTransactionalStatuses,
} from './utils'

const client = createClient('testnet')

export const getTransactionRemoteStatuses = async (
  hash: string,
  apiKey: string,
): Promise<TxStatusProps> => {
  const outputOmniTransactionHashes: string[] = []
  const transactionalStatuses: TxStatusProps = {
    homeToRemote: [],
    remoteToHome: [],
  }

  const inputOmniTransactions: Message[] = await client
    .getMessagesBySrcTxHash(hash)
    .then((result) => result.messages)

  //INFO: home-to-remote-transactions
  inputOmniTransactions.map(async (tx) => {
    if (tx.dstTxHash) {
      setSuccessHashes(tx as RequiredDstMessage, outputOmniTransactionHashes)

      await updateTransactionalStatuses(
        tx as RequiredDstMessage,
        transactionalStatuses.homeToRemote,
        apiKey,
      )
    } else {
      transactionalStatuses.homeToRemote.push(defaultStatus)
    }
  })

  //INFO: remote-to-home-transactions
  if (outputOmniTransactionHashes.length > 0) {
    outputOmniTransactionHashes.map(async (remoteHash) => {
      const outputTransactions = await client
        .getMessagesBySrcTxHash(remoteHash)
        .then((result) => result.messages)

      outputTransactions.map(async (tx) => {
        if (tx.dstTxHash) {
          await updateTransactionalStatuses(
            tx as RequiredDstMessage,
            transactionalStatuses.remoteToHome,
            apiKey,
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
