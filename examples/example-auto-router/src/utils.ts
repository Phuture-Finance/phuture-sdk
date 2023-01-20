import { Address } from '../../../src'
import { BigNumberish } from 'ethers'

interface ProcessEnv {
  NODE_ENV: 'development' | 'production'
  PRIVATE_KEY: Address
  NODE_URL: string
  ZERO_EX_AGGREGATOR_URL: URL
  IS_SELL: boolean
  INDEX_ADDRESS: Address
  INDEX_DEPOSIT_ROUTER_ADDRESS: Address
  INDEX_WITHDRAW_ROUTER_ADDRESS: Address
  AMOUNT: BigNumberish
  TOKEN_ADDRESS?: Address
}

export function getEnv<K extends keyof ProcessEnv>(key: K): ProcessEnv[K] {
  const value = process.env[key]
  if (!value) {
    throw new Error(`Missing environment variable ${key}`)
  }

  return value as ProcessEnv[K]
}
