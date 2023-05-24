import { Message } from '@layerzerolabs/scan-client'
import { ethers } from 'ethers'

import { getOmniRemoteUrl, errorTopics } from './constants'
import {
  LzChainId,
  LzScanClient,
  MessageStatus,
  OmniTx,
  OmniTxStatusProps,
} from './types'

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

    const outputMessages = await this.getOutputMessages(deliveredMessages)
    const transactions = await this.getTransactions(
      remoteChains,
      messages,
      outputMessages,
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

    const isError =
      logs.length === 0 ||
      logs.some(({ topics }) =>
        topics.some((topic) => errorTopics.includes(topic.toLowerCase())),
      )

    const returnedStatus = isError
      ? MessageStatus.FAILED
      : (status as MessageStatus)

    return returnedStatus
  }

  private async getOutputMessages(
    deliveredMessages: Required<Message>[],
  ): Promise<Message[]> {
    return Promise.all(
      deliveredMessages.map(async ({ dstTxHash }) => {
        const { messages } = await this.client.getMessagesBySrcTxHash(dstTxHash)
        return messages
      }),
    ).then((res) => res.flat())
  }

  private async getTransactions(
    remoteChains: number[],
    messages: Message[],
    outputMessages: Message[],
  ): Promise<OmniTx[]> {
    const transactions = await Promise.all(
      remoteChains.map(async (chain) => {
        const homeToRemote = messages.filter((msg) => msg.dstChainId === chain)
        const remoteToHome = outputMessages.find(
          (msg) => msg.srcChainId === chain,
        )
        const [homeStatuses, remoteStatuses] = await Promise.all([
          this.getStatuses(homeToRemote),
          this.getStatus(remoteToHome),
        ])

        return {
          chain,
          statuses: [...homeStatuses, remoteStatuses],
        }
      }),
    )

    return transactions
  }

  private async getStatuses(messages: Message[]): Promise<MessageStatus[]> {
    return messages.length !== 0
      ? await Promise.all(messages.map((tx) => this.createStatus(tx)))
      : [this.defaultStatus]
  }

  private async getStatus(
    message: Message | undefined,
  ): Promise<MessageStatus> {
    return message !== undefined
      ? await this.createStatus(message)
      : this.defaultStatus
  }
}
