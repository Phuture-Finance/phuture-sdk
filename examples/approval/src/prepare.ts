import { Account, Erc20 } from '@phuture/sdk'
import { BigNumber, constants, ethers, providers } from 'ethers'
import { Address } from '../../../dist'
import { getEnv } from './utils'

interface PrepareProps {
  account: Account
  provider: providers.JsonRpcProvider
  token: Erc20
  approvalAddress: Address
  approvalAmount: BigNumber
}

const prepare = async (): Promise<PrepareProps> => {
  const zero = BigNumber.from(0)
  const provider = new ethers.providers.JsonRpcProvider(getEnv('NODE_URL'))

  const account = new Account(
    new ethers.Wallet(getEnv('PRIVATE_KEY'), provider),
  )

  const token = new Erc20(account, getEnv('ASSET_APPROVAL_ADDRESS'))
  const approvalAddress = getEnv('CONTRACT_APPROVAL_ADDRESS')
  const approvalAmount =
    getEnv('APPROVAL_AMOUNT') === 'zero' ? zero : constants.MaxUint256

  return {
    account,
    provider,
    token,
    approvalAddress,
    approvalAmount,
  }
}

export default prepare
