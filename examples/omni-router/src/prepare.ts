import {
  Account,
  defaultOmniRouterAddress,
  OmniRouter,
  Erc20,
  Index,
} from '@phuture/sdk'
import { ethers, providers } from 'ethers'
import { getEnv } from './utils'
import { Address } from '../../../dist'
interface PrepareProps {
  account: Account
  provider: providers.JsonRpcProvider
  omniRouter: OmniRouter
  amount: string
  reserveToken: Erc20
  index: Index
  token?: Erc20
  isDeposit: 'true' | 'false'
  createErc20: (address: Address) => Promise<Erc20>
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

  const reserveToken = new Erc20(account, omniRouter.address)
  const token = tokenAddress ? new Erc20(account, tokenAddress) : undefined

  const amount = getEnv('AMOUNT')

  const createErc20 = async (address: Address) =>
    await new Erc20(account, address)

  return {
    account,
    provider,
    omniRouter,
    amount,
    reserveToken,
    token,
    createErc20,
    isDeposit: getEnv('IS_DEPOSIT'),
    index: new Index(account, getEnv('INDEX_ADDRESS')),
  }
}

export default prepare
