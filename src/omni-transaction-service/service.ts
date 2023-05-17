import { Message } from '@layerzerolabs/scan-client'

import { LzChainId, LzScanClient, MessageStatus, OmniTxStatusProps } from './types'
import { ethers } from 'ethers'
import { getOmniRemoteUrl, errorTopics } from './constants'

export class OmniTransactionService {
  private defaultStatus = MessageStatus.INFLIGHT

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
            : [this.defaultStatus]
        const remoteStatuses =
          remoteToHome !== undefined
            ? await this.createStatus(remoteToHome)
            : this.defaultStatus

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
    if (!tx.dstTxHash) return this.defaultStatus

    if (tx.status === MessageStatus.FAILED)
      return tx.status as MessageStatus.FAILED

    return this.updateTransactionalStatuses(tx as Required<Message>)
  }

  private async updateTransactionalStatuses({
    dstTxHash,
    dstChainId,
    status,
  }: Required<Message>): Promise<MessageStatus> {
    const provider = ethers.getDefaultProvider(
      await getOmniRemoteUrl(dstChainId as LzChainId),
    )
    const { logs } = await provider.getTransactionReceipt(dstTxHash)

    const topicsArr = logs.flatMap(({ topics }) =>
      topics.filter((topic) => errorTopics.includes(topic.toLowerCase())),
    )

    const isError =
      status === MessageStatus.FAILED ||
      logs.length === 0 ||
      topicsArr.length !== 0

    const returnedStatus = isError
      ? MessageStatus.FAILED
      : status === MessageStatus.DELIVERED && topicsArr.length === 0
      ? MessageStatus.DELIVERED
      : MessageStatus.INFLIGHT

    return returnedStatus
  }
}
