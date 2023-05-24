import { Account, Erc20 } from '@phuture/sdk'
import { ethers, providers } from 'ethers'
import { Address } from '../../../dist'
import { getEnv } from './utils'

interface PrepareProps {
  account: Account
  provider: providers.JsonRpcProvider
  token: Erc20
  approvalAddress: Address
}

const prepare = async (): Promise<PrepareProps> => {
  const provider = new ethers.providers.JsonRpcProvider(getEnv('NODE_URL'))

  const account = new Account(
    new ethers.Wallet(getEnv('PRIVATE_KEY'), provider),
  )

  const token = new Erc20(account, getEnv('ASSET_APPROVAL_ADDRESS'))
  const approvalAddress = getEnv('CONTRACT_APPROVAL_ADDRESS')

  return {
    account,
    provider,
    token,
    approvalAddress,
  }
}

export default prepare
