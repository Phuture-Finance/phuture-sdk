import { Message } from '@layerzerolabs/scan-client'

import { createOmniTransactionService } from '../omni'
import { MessageStatus } from '../omni'

const mockTestStatus = (
  isDstTx: boolean,
  isStatusSuccess: boolean,
  isTxFailed?: boolean,
  isEmpty = false,
) =>
  !isEmpty
    ? [
        {
          created: 1677580103,
          dstChainId: 10121,
          dstTxHash: isTxFailed
            ? '0x791ab18bcfb2a719fe71998f41be540ac3f8c0d2c1a53dfa820f88b4363db970'
            : isDstTx
            ? '0x728ad57658b7789347e32856af404949ef200b28c0e5662c16d140af6adb03df'
            : undefined,
          dstUaAddress: '0x4cfe64f6a7a2a382323bae2be883c10964bdb737',
          srcBlockHash:
            '0x4879125caf96f109de6d91e7485e6c1e7ea3e3bb9c6f7662f28349f337daf852',
          srcBlockNumber: '9447087',
          srcChainId: 10143,
          srcTxHash:
            '0x5c1579e481904b6b601a8655bd632bcb1786564a13e0c540ed49fd879299779e',
          srcUaAddress: '0x76e1dbaee729a215509103c0c1dd6d349240642b',
          srcUaNonce: 25,
          status: isStatusSuccess
            ? MessageStatus.DELIVERED
            : isTxFailed
            ? MessageStatus.FAILED
            : MessageStatus.INFLIGHT,
          updated: 1677580247,
        },
      ]
    : ([] as unknown as Message[])

test('Case with all "DELIVERED" statuses', async () => {
  const client = createOmniTransactionService({
    client: {
      getMessagesBySrcTxHash: async () => ({
        messages: mockTestStatus(true, true),
      }),
    },
  })

  const result = await client.getRemoteTransactionStatuses(
    '0x5c1579e481904b6b601a8655bd632bcb1786564a13e0c540ed49fd879299779e',
  )
  console.log('result: ', result)

  expect(result.homeToRemote[0].status).toBe(MessageStatus.DELIVERED)
  expect(result.remoteToHome[0].status).toBe(MessageStatus.DELIVERED)
})

test.failing(
  'Case with incorrect hashID in getRemoteTransactionStatuses function',
  async () => {
    const client = createOmniTransactionService({
      client: {
        getMessagesBySrcTxHash: async () => ({
          messages: mockTestStatus(true, true),
        }),
      },
    })

    const result = await client.getRemoteTransactionStatuses('test')

    expect(result.homeToRemote[0].status).toBe(!MessageStatus.INFLIGHT)
  },
)

test('Case when home-to-remote TX still wasn`t created ', async () => {
  const client = createOmniTransactionService({
    client: {
      getMessagesBySrcTxHash: async () => ({
        messages: mockTestStatus(false, true),
      }),
    },
  })

  const result = await client.getRemoteTransactionStatuses('test')
  expect(result.homeToRemote[0].status).toBe(MessageStatus.INFLIGHT)
  expect(result.remoteToHome[0].status).toBe(MessageStatus.INFLIGHT)
})

test('Case when remote-to-home TX still wasn`t created ', async () => {
  const client = createOmniTransactionService({
    client: {
      getMessagesBySrcTxHash: async () => ({
        messages: mockTestStatus(false, true, false, true),
      }),
    },
  })

  const result = await client.getRemoteTransactionStatuses(
    '0x5c1579e481904b6b601a8655bd632bcb1786564a13e0c540ed49fd879299779e',
  )

  expect(result.homeToRemote[0].status).toBe(MessageStatus.INFLIGHT)
  expect(result.remoteToHome[0].status).toBe(MessageStatus.INFLIGHT)
})

test('Case when one of the transactions was failed', async () => {
  const client = createOmniTransactionService({
    client: {
      getMessagesBySrcTxHash: async () => ({
        messages: mockTestStatus(true, false, true),
      }),
    },
  })

  const result = await client.getRemoteTransactionStatuses(
    '0x707623b16d84193836dcca3bfba5bc4098e8686f80d8fecf838a913657cc5987',
  )

  expect(result.homeToRemote[0].status).toBe(MessageStatus.FAILED)
})
