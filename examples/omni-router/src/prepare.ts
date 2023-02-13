import {
  Account,
  defaultOmniRouterAddress,
  OmniRouter,
  Erc20,
  Index,
} from '@phuture/sdk'
import { ethers } from 'ethers'
import { getEnv } from './utils'
interface PrepareProps {
  account: Account
  omniRouter: OmniRouter
  amount: string
  index: Index
  token?: Erc20
  isDeposit: boolean
}

const prepare = async (): Promise<PrepareProps> => {
  const provider = new ethers.providers.JsonRpcProvider(getEnv('NODE_URL'))

  const account = await new Account(
    new ethers.Wallet(getEnv('PRIVATE_KEY'), provider),
  )

  const tokenAddress = getEnv('TOKEN_ADDRESS', false)

  const omniRouter = new OmniRouter(
    account,
    defaultOmniRouterAddress[await account.chainId()],
  )

  const token = tokenAddress ? new Erc20(account, tokenAddress) : undefined

  const amount = getEnv('AMOUNT')

  return {
    account,
    omniRouter,
    amount,
    token,
    isDeposit: getEnv('IS_DEPOSIT') === 'true',
    index: new Index(account, getEnv('INDEX_ADDRESS')),
  }
}

export default prepare
