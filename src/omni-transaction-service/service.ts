import { Message } from '@layerzerolabs/scan-client'

import { RequiredDstMessage, TxStatusProps } from './types'
import {
  defaultStatus,
  mockedRemoteTxHash,
  updateTransactionalStatuses,
} from './utils'

interface LzScanClient {
  getMessagesBySrcTxHash(srcTxHash: string): Promise<{
    messages: Message[]
  }>
}

export function createOmniTransactionService({
  mainClient,
  testClient,
  ethApiKey,
  maticApiKey,
}: {
  mainClient: LzScanClient
  testClient: LzScanClient
  ethApiKey: string
  maticApiKey: string
}) {
  return {
    getRemoteTransactionStatuses: async (
      hash: string,
    ): Promise<TxStatusProps> => {
      const inputOmniTransactions: Message[] = await testClient
        .getMessagesBySrcTxHash(hash)
        .then((result) => result.messages)

      const outputOmniTransactionHashes = inputOmniTransactions
        .filter((tx) => tx.dstTxHash && tx.status === 'DELIVERED')
        .map((tx) => tx.dstTxHash)

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

      const outputTransactions: Message[] | null =
        outputOmniTransactionHashes.length > 0
          ? await mainClient
              .getMessagesBySrcTxHash(mockedRemoteTxHash) //TODO
              .then((result) => result.messages)
          : null

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
