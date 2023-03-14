// import { createClient } from '@layerzerolabs/scan-client'
import { createClient } from '@layerzerolabs/scan-client'
import { createOmniTransactionService } from '@phuture/sdk'
import 'dotenv/config'
import prepare from './prepare'

const main = async () => {
  const { isTest, hash, ethApiKey, maticApiKey } = await prepare()

  const transactionClient = createOmniTransactionService({
    client: isTest ? createClient('testnet') : createClient('mainnet'),
    maticApiKey: maticApiKey,
    ethApiKey: ethApiKey,
  })
  console.dir('START')
  const result = await transactionClient.getRemoteTransactionStatuses(hash)
  console.log('HOME_TO_REMOTE: ')
  result.homeToRemote.map((el) => console.table(el))
  console.log('REMOTE_TO_HOME: ')
  result.remoteToHome.map((el) => console.table(el))
  console.dir('FINISH')
}

main().catch(console.error)
