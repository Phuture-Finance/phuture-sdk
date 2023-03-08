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
  isMocked = true,
}: {
  mainClient: LzScanClient
  testClient: LzScanClient
  ethApiKey: string
  maticApiKey: string
  isMocked: boolean
}) {
  return {
    getRemoteTransactionStatuses: async (
      hash: string,
    ): Promise<TxStatusProps> => {
      const inputOmniTransactions: Message[] = await testClient
        .getMessagesBySrcTxHash(hash)
        .then((result) => result.messages)

      let outputOmniTransactionHashes: string[] = []
      let outputTransactions: Message[] = []

      const deliveredTransactions = inputOmniTransactions.filter(
        (tx) => tx.dstTxHash && tx.status === 'DELIVERED',
      ) as RequiredDstMessage[]

      outputOmniTransactionHashes = [
        ...deliveredTransactions.map((tx) => tx.dstTxHash),
      ]

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

      if (
        outputOmniTransactionHashes &&
        outputOmniTransactionHashes.length > 0
      ) {
        const arr = isMocked
          ? [mockedRemoteTxHash]
          : outputOmniTransactionHashes

        await Promise.all(
          arr.map(async (tsHash: string) => {
            const messages = await mainClient
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
