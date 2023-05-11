import { Message } from '@layerzerolabs/scan-client'

import { Account } from '../account'

import { RequiredDstMessage, OmniTxStatusProps } from './types'
import {
  getDefaultStatus,
  getLayerZeroChain,
  getOmniChains,
  MessageStatus,
  updateFailedTransaction,
  updateTransactionalStatuses,
} from './utils'

interface LzScanClient {
  getMessagesBySrcTxHash(srcTxHash: string): Promise<{
    messages: Message[]
  }>
}

export function createOmniTransactionService({
  client,
}: {
  client: LzScanClient
}) {
  return {
    getRemoteTransactionStatuses: async (
      hash: string,
      account: Account,
      homeChain: number,
    ): Promise<OmniTxStatusProps> => {
      //INFO: Fetch all messages with given hash as source on the home chain
      const inputMessages: Message[] = (
        await client.getMessagesBySrcTxHash(hash)
      ).messages

      //INFO: Filter delivered messages with a valid destination hash on the remote chain
      const deliveredMessages = inputMessages.filter(
        (tx) => tx.dstTxHash && tx.status === MessageStatus.DELIVERED,
      ) as RequiredDstMessage[]

      //INFO: Get the destination transaction hashes of the delivered messages
      const outputTxHashes = deliveredMessages.map((tx) => tx.dstTxHash)

      //INFO: Retrieve the messages of each output transaction on the remote chain
      const outputMessages = await Promise.all(
        outputTxHashes.map(async (tsHash: string) => {
          const result = await client.getMessagesBySrcTxHash(tsHash)
          return result.messages
        }),
      ).then((res) => res.flat())

      //INFO: Retrieve the transactional status of each input transaction on the home chain
      const homeToRemoteStatuses =
        inputMessages.length !== 0
          ? await Promise.all(
              inputMessages.map(async (tx) => {
                if (tx.status === 'FAILED') return updateFailedTransaction(tx)

                if (!tx.dstTxHash) return getDefaultStatus(tx.dstChainId)

                return await updateTransactionalStatuses(
                  tx as RequiredDstMessage,
                )
              }),
            )
          : await (
              await getOmniChains(account, homeChain)
            ).map((chain) => getDefaultStatus(chain))

      //INFO: Retrieve the transactional status of each input transaction on the remote chain
      const remoteToHomeStatuses =
        outputMessages.length !== 0
          ? await Promise.all(
              outputMessages.flat().map(async (tx) => {
                if (tx.status === 'FAILED') return updateFailedTransaction(tx)

                if (!tx.dstTxHash) return getDefaultStatus(tx.dstChainId)

                return await updateTransactionalStatuses(
                  tx as RequiredDstMessage,
                )
              }),
            )
          : Array(await (await getOmniChains(account, homeChain)).length).fill(
              getDefaultStatus(getLayerZeroChain(homeChain)),
            )

      return {
        homeToRemote: homeToRemoteStatuses,
        remoteToHome: remoteToHomeStatuses,
      }
    },
  }
}
