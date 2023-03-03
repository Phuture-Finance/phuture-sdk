import { createOmniTransactionService } from '../omni-transaction-service'
import { MessageStatus } from '../omni-transaction-service/utils'

const mockTestStatus = (
  isDstTx?: boolean,
  isStatusSuccess?: boolean,
  isMatic?: boolean,
  isTxFailed?: boolean,
) => [
  {
    created: 1677580103,
    dstChainId: isMatic ? 137 : 10121,
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
    status: isStatusSuccess ? MessageStatus.DELIVERED : MessageStatus.INFLIGHT,
    updated: 1677580247,
  },
]

const mockMainStatus = (isDstTx: boolean, isMatic: boolean) => [
  {
    created: 1676930108,
    dstChainId: isMatic ? 137 : 110,
    dstTxHash: isDstTx
      ? '0xbdd249d586cb7f3bd20f4ad8132ad48f35d9f5edfe96042394b36a39ebf35b6f'
      : undefined,
    dstUaAddress: '0x352d8275aae3e0c2404d9f68f6cee084b5beb3dd',
    srcBlockHash:
      '0xdf022d448c1672389cabc8cdf41124d06fdc9ccbf753339a8c50e6fd6b224e14',
    srcBlockNumber: '26519046',
    srcChainId: 106,
    srcTxHash:
      '0x16a7d3e04a3e65d92dfb87009746a28501ffa26ce7953b744c9bb0655f0bc3cd',
    srcUaAddress: '0x9d1b1669c73b033dfe47ae5a0164ab96df25b944',
    srcUaNonce: 12041,
    status: MessageStatus.DELIVERED,
    updated: 1676930259,
  },
]

test('Case with all "DELIVERED" statuses', async () => {
  const client = createOmniTransactionService({
    mainClient: {
      getMessagesBySrcTxHash: async () => ({
        messages: mockMainStatus(true, false),
      }),
    },
    testClient: {
      getMessagesBySrcTxHash: async () => ({
        messages: mockTestStatus(true, true, false),
      }),
    },
    maticApiKey: 'HRY5PB899EMPXQ38Y2EHZVRA44CBF1MC73',
    ethApiKey: '1CRQMKJVWNBV5QJ5X1P7JRYTWR5G3AHRMW',
  })

  const result = await client.getRemoteTransactionStatuses(
    '0x5c1579e481904b6b601a8655bd632bcb1786564a13e0c540ed49fd879299779e',
  )

  expect(result.homeToRemote[0].status).toBe(MessageStatus.DELIVERED)
  expect(result.remoteToHome[0].status).toBe(MessageStatus.DELIVERED)
})

test.failing(
  'Case with incorrect hashID in getRemoteTransactionStatuses function',
  async () => {
    const client = createOmniTransactionService({
      mainClient: {
        getMessagesBySrcTxHash: async () => ({
          messages: mockMainStatus(true, false),
        }),
      },
      testClient: {
        getMessagesBySrcTxHash: async () => ({
          messages: mockTestStatus(true, true, false),
        }),
      },
      maticApiKey: 'fail',
      ethApiKey: 'fail',
    })

    const result = await client.getRemoteTransactionStatuses('test')

    expect(result.homeToRemote[0].status).toBe(!MessageStatus.INFLIGHT)
  },
)

test('Case when home-to-remote TX still wasn`t created ', async () => {
  const client = createOmniTransactionService({
    mainClient: {
      getMessagesBySrcTxHash: async () => ({
        messages: mockMainStatus(true, false),
      }),
    },
    testClient: {
      getMessagesBySrcTxHash: async () => ({
        messages: mockTestStatus(false, true, false),
      }),
    },
    maticApiKey: 'fail',
    ethApiKey: 'fail',
  })

  const result = await client.getRemoteTransactionStatuses('test')

  expect(result.homeToRemote[0].status).toBe(MessageStatus.INFLIGHT)
  expect(result.remoteToHome[0].status).toBe(MessageStatus.INFLIGHT)
})

test('Case when remote-to-home TX still wasn`t created ', async () => {
  const client = createOmniTransactionService({
    mainClient: {
      getMessagesBySrcTxHash: async () => ({
        messages: mockMainStatus(false, false),
      }),
    },
    testClient: {
      getMessagesBySrcTxHash: async () => ({
        messages: mockTestStatus(true, true, false),
      }),
    },
    maticApiKey: 'fail',
    ethApiKey: 'fail',
  })

  const result = await client.getRemoteTransactionStatuses(
    '0x5c1579e481904b6b601a8655bd632bcb1786564a13e0c540ed49fd879299779e',
  )

  expect(result.homeToRemote[0].status).toBe(MessageStatus.INFLIGHT)
  expect(result.remoteToHome[0].status).toBe(MessageStatus.INFLIGHT)
})

test('Case when one of the transactions was on matic network', async () => {
  const client = createOmniTransactionService({
    mainClient: {
      getMessagesBySrcTxHash: async () => ({
        messages: mockMainStatus(true, true),
      }),
    },
    testClient: {
      getMessagesBySrcTxHash: async () => ({
        messages: mockTestStatus(true, true, true),
      }),
    },
    maticApiKey: 'fail',
    ethApiKey: 'fail',
  })

  const result = await client.getRemoteTransactionStatuses(
    '0x5c1579e481904b6b601a8655bd632bcb1786564a13e0c540ed49fd879299779e',
  )

  expect(result.homeToRemote[0].status).toBe(MessageStatus.INFLIGHT)
  expect(result.remoteToHome[0].status).toBe(MessageStatus.INFLIGHT)
})

test('Case when one of the transactions was failed', async () => {
  const client = createOmniTransactionService({
    mainClient: {
      getMessagesBySrcTxHash: async () => ({
        messages: mockMainStatus(true, true),
      }),
    },
    testClient: {
      getMessagesBySrcTxHash: async () => ({
        messages: mockTestStatus(true, true, false, true),
      }),
    },
    maticApiKey: 'HRY5PB899EMPXQ38Y2EHZVRA44CBF1MC73',
    ethApiKey: '1CRQMKJVWNBV5QJ5X1P7JRYTWR5G3AHRMW',
  })

  const result = await client.getRemoteTransactionStatuses(
    '0x707623b16d84193836dcca3bfba5bc4098e8686f80d8fecf838a913657cc5987',
  )

  expect(result.homeToRemote[0].status).toBe(MessageStatus.FAILED)
})
