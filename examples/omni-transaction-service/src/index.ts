// import { createClient } from '@layerzerolabs/scan-client'
import { createClient } from '@layerzerolabs/scan-client'
import { createOmniTransactionService } from '@phuture/sdk'
import 'dotenv/config'
import prepare from './prepare'

const main = async () => {
  const { isMocked, hash, ethApiKey, maticApiKey } = await prepare()

  const transactionClient = createOmniTransactionService({
    mainClient: createClient('mainnet'),
    testClient: isMocked ? createClient('testnet') : createClient('mainnet'),
    maticApiKey: maticApiKey,
    ethApiKey: ethApiKey,
    isMocked: isMocked,
  })
  console.dir('START')
  console.log(
    'isMocked: ',
    isMocked,
    'ethApiKey: ',
    ethApiKey,
    'maticApiKey: ',
    maticApiKey,
  )
  // 0x246055f599ff0b682054737d12cefa021c846ec8ecc271bb322160b5207f0899
  const statuses = await transactionClient.getRemoteTransactionStatuses(hash)
  console.table(statuses)
  console.dir('FINISH')
}

main().catch(console.error)
