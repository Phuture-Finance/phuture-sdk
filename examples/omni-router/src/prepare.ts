import { Account, defaultOmniRouterAddress, OmniRouter } from '@phuture/sdk'
import { ethers, providers } from 'ethers'
import { getEnv } from './utils'

interface PrepareProps {
  account: Account
  provider: providers.JsonRpcProvider
  amount: string
  isDeposit: 'true' | 'false'
  omniRouter: OmniRouter
}

const prepare = async (): Promise<PrepareProps> => {
  const provider = new ethers.providers.JsonRpcProvider(getEnv('NODE_URL'))

  const account = new Account(
    new ethers.Wallet(getEnv('PRIVATE_KEY'), provider),
  )

  const omniRouter = new OmniRouter(
    account,
    defaultOmniRouterAddress[await account.chainId()],
  )

  const amount = getEnv('AMOUNT')
  //TODO create erc20(USDC) obj and return
  //TODO create erc20(index) obj and return

  return {
    account,
    provider,
    amount,
    omniRouter,
    isDeposit: getEnv('IS_DEPOSIT'),
  }
}

export default prepare
