import { Message } from '@layerzerolabs/scan-client'

import { Account } from '../account'

import { MessageStatus, OmniTxStatusProps } from './types'
import {
  getDefaultStatus,
  getLayerZeroChain,
  getOmniChains,
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
    account: Account,
    homeChain: number,
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

    const homeToRemote =
      messages.length !== 0
        ? await Promise.all(
            messages.map(async (tx) => {
              if (tx.status === MessageStatus.FAILED)
                return updateFailedTransaction(tx)

              if (!tx.dstTxHash) return getDefaultStatus(tx.dstChainId)

              return updateTransactionalStatuses(tx as Required<Message>)
            }),
          )
        : (await getOmniChains(account, homeChain)).map(getDefaultStatus)

    const remoteToHome =
      outputMessages.length !== 0
        ? await Promise.all(
            outputMessages.flat().map(async (tx) => {
              if (tx.status === MessageStatus.FAILED)
                return updateFailedTransaction(tx)

              if (!tx.dstTxHash) return getDefaultStatus(tx.dstChainId)

              return updateTransactionalStatuses(tx as Required<Message>)
            }),
          )
        : Array((await getOmniChains(account, homeChain)).length).fill(
            getDefaultStatus(getLayerZeroChain(homeChain)),
          )

    return {
      homeToRemote,
      remoteToHome,
    }
  }
}
