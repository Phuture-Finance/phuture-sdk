import { Message } from '@layerzerolabs/scan-client'

import { MessageStatus, OmniTxStatusProps } from './types'
import {
  defaultStatus,
  updateFailedTransaction,
  updateTransactionalStatuses,
} from './utils'

export interface LzScanClient {
  getMessagesBySrcTxHash(srcTxHash: string): Promise<{
    messages: Message[]
  }>
}

export class OmniTransactionService {
  constructor(private client: LzScanClient) {}

  async getRemoteTransactionStatuses(
    hash: string,
    remoteChains: number[],
  ): Promise<OmniTxStatusProps> {
    const { messages } = await this.client.getMessagesBySrcTxHash(hash)
    const deliveredMessages = messages.filter(
      (tx) => tx.dstTxHash && tx.status === MessageStatus.DELIVERED,
    ) as Required<Message>[]

    const outputMessages = await Promise.all(
      deliveredMessages.map(async ({ dstTxHash }) => {
        const result = await this.client.getMessagesBySrcTxHash(dstTxHash)
        return result.messages
      }),
    ).then((res) => res.flat())

    const transactions = await Promise.all(
      remoteChains.map(async (chain) => {
        const homeToRemote = messages.filter((msg) => msg.dstChainId === chain)
        const remoteToHome = outputMessages.find(
          (msg) => msg.srcChainId === chain,
        )

        const homeStatuses =
          homeToRemote.length !== 0
            ? await Promise.all(homeToRemote.map(this.createStatus))
            : [defaultStatus]
        const remoteStatuses =
          remoteToHome !== undefined
            ? await this.createStatus(remoteToHome)
            : defaultStatus

        return {
          chain,
          statuses: [...homeStatuses, remoteStatuses],
        }
      }),
    )

    return {
      transactions,
    }
  }
  private async createStatus(tx: Message) {
    if (tx.status === MessageStatus.FAILED) return updateFailedTransaction(tx)

    if (!tx.dstTxHash) return defaultStatus

    return updateTransactionalStatuses(tx as Required<Message>)
  }
}
