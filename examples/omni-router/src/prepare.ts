import {
  Account,
  Erc20,
  Index,
  OmniIndex,
  OmniRouter,
  RedeemRouter,
} from '@phuture/sdk'
import { ethers } from 'ethers'
import { getEnv } from './utils'
interface PrepareProps {
  account: Account
  omniRouter: OmniRouter
  omniIndex: OmniIndex
  amount: string
  index: Index
  token?: Erc20
  isDeposit: boolean
  additionalTime: number
}

const prepare = async (): Promise<PrepareProps> => {
  const provider = new ethers.providers.JsonRpcProvider(getEnv('NODE_URL'))

  const account = await new Account(
    new ethers.Wallet(getEnv('PRIVATE_KEY'), provider),
  )

  const tokenAddress = getEnv('TOKEN_ADDRESS', false)
  const indexAddress = getEnv('INDEX_ADDRESS', false)
  const redeemRouterAddress = getEnv('REDEEM_ROUTER_ADDRESS', false)

  const omniIndex = new OmniIndex(account, indexAddress)
  const redeemRouter = new RedeemRouter(account, redeemRouterAddress)

  const omniRouter = new OmniRouter(omniIndex, redeemRouter)

  const token = tokenAddress ? new Erc20(account, tokenAddress) : undefined

  const amount = getEnv('AMOUNT')

  const additionalTime = getEnv('ADDITIONAL_REDEEM_TIME')

  return {
    additionalTime,
    account,
    omniRouter,
    omniIndex,
    amount,
    token,
    isDeposit: getEnv('IS_DEPOSIT') === 'true',
    index: new Index(account, getEnv('INDEX_ADDRESS')),
  }
}

export default prepare
