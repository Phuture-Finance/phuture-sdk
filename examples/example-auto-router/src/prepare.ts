import { BigNumber, ethers } from 'ethers'
import {
  Account,
  AutoRouter,
  defaultIndexWithdrawRouterAddress,
  Index,
  IndexWithdrawRouter,
  IndexDepositRouter,
  ZeroExAggregator,
  zeroExBaseUrl,
  defaultIndexDepositRouterAddress,
  Erc20,
} from '../../../src'
import { getEnv } from './utils'

const prepare = async () => {
  const account = new Account(
    new ethers.Wallet(
      getEnv('PRIVATE_KEY'),
      new ethers.providers.JsonRpcProvider(getEnv('NODE_URL')),
    ),
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

  const tokenAddress = getEnv('TOKEN_ADDRESS')

  return {
    account,
    index: new Index(account, getEnv('INDEX_ADDRESS')),
    autoRouter: new AutoRouter(indexDepositRouter, indexWithdrawRouter, zeroEx),
    desiredAmount: BigNumber.from(getEnv('AMOUNT')),
    isSell: getEnv('IS_SELL'),
    token: tokenAddress ? new Erc20(account, tokenAddress) : undefined,
  }
}

export default prepare
