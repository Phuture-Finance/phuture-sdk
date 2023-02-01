import {
  Account,
  AutoRouter,
  defaultIndexDepositRouterAddress,
  defaultIndexWithdrawRouterAddress,
  Erc20,
  Index,
  IndexDepositRouter,
  IndexWithdrawRouter,
  ZeroExAggregator,
  zeroExBaseUrl,
} from '@phuture/sdk'
import { ethers, providers } from 'ethers'
import {
  ReserveDepositRouter,
  ReserveDepositRouter__factory,
} from './abis/typings'
import { getEnv } from './utils'

interface PrepareProps {
  account: Account
  provider: providers.JsonRpcProvider
  index: Index
  autoRouter: AutoRouter
  amount: string
  isSell: 'true' | 'false'
  reserveDepositRouter: ReserveDepositRouter
  reserveToken: Erc20
  token?: Erc20
}

const prepare = async (): Promise<PrepareProps> => {
  const provider = new ethers.providers.JsonRpcProvider(getEnv('NODE_URL'))

  const account = new Account(
    new ethers.Wallet(getEnv('PRIVATE_KEY'), provider),
  )

  const [zeroEx] = ZeroExAggregator.fromUrl(
    zeroExBaseUrl[await account.chainId()],
  )

  const indexDepositRouter = new IndexDepositRouter(
    account,
    defaultIndexDepositRouterAddress[await account.chainId()],
  )

  const indexWithdrawRouter = new IndexWithdrawRouter(
    account,
    defaultIndexWithdrawRouterAddress[await account.chainId()],
  )

  const tokenAddress = getEnv('TOKEN_ADDRESS', false)

  const reserveDepositRouter = ReserveDepositRouter__factory.connect(
    getEnv('RESERVE_ROUTER_DEPOSIT_ADDRESS'),
    account.signer,
  )
  const reserveToken = new Erc20(account, await reserveDepositRouter.asset())

  const token = tokenAddress ? new Erc20(account, tokenAddress) : undefined

  const amount = getEnv('AMOUNT')

  return {
    account,
    provider,
    amount,
    token,
    reserveDepositRouter,
    reserveToken,
    index: new Index(account, getEnv('INDEX_ADDRESS')),
    autoRouter: new AutoRouter(indexDepositRouter, indexWithdrawRouter, zeroEx),
    isSell: getEnv('IS_SELL'),
  }
}

export default prepare
