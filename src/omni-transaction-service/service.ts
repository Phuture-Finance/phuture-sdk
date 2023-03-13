import { Message } from '@layerzerolabs/scan-client'

import { RequiredDstMessage, TxStatusProps } from './types'
import {
  defaultStatus,
  // mockedRemoteTxHash,
  updateTransactionalStatuses,
} from './utils'

interface LzScanClient {
  getMessagesBySrcTxHash(srcTxHash: string): Promise<{
    messages: Message[]
  }>
}

export function createOmniTransactionService({
  client,
  ethApiKey,
  maticApiKey,
}: {
  client: LzScanClient
  ethApiKey: string
  maticApiKey: string
}) {
  return {
    getRemoteTransactionStatuses: async (
      hash: string,
    ): Promise<TxStatusProps> => {
      const inputOmniTransactions: Message[] = await client
        .getMessagesBySrcTxHash(hash)
        .then((result) => result.messages)

      const deliveredTransactions = inputOmniTransactions.filter(
        (tx) => tx.dstTxHash && tx.status === 'DELIVERED',
      ) as RequiredDstMessage[]

      const outputOmniTransactionHashes = deliveredTransactions.map(
        (tx) => tx.dstTxHash,
      )

      const homeToRemoteStatuses = await Promise.all(
        inputOmniTransactions.map(async (tx) =>
          tx.dstTxHash
            ? await updateTransactionalStatuses(
                tx as RequiredDstMessage,
                tx.dstChainId === 137 ? maticApiKey : ethApiKey,
              )
            : defaultStatus,
        ),
      )

      let outputTransactions: Message[] = []

      if (
        outputOmniTransactionHashes &&
        outputOmniTransactionHashes.length > 0
      ) {
        await Promise.all(
          outputOmniTransactionHashes.map(async (tsHash: string) => {
            const messages = await client
              .getMessagesBySrcTxHash(tsHash)
              .then((result) => result.messages)
            outputTransactions = [...messages]
          }),
        )
      }

      const remoteToHomeStatuses = await Promise.all(
        outputTransactions !== null && outputTransactions.length > 0
          ? outputTransactions.map(async (tx) =>
              tx.dstTxHash
                ? await updateTransactionalStatuses(
                    tx as RequiredDstMessage,
                    tx.dstChainId === 137 ? maticApiKey : ethApiKey,
                  )
                : defaultStatus,
            )
          : [defaultStatus],
      )

      return {
        homeToRemote: homeToRemoteStatuses,
        remoteToHome: remoteToHomeStatuses,
      }
    },
  }
}

export default createOmniTransactionService
