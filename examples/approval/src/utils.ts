import { Address } from '../../../dist'

interface ProcessEnv {
  NODE_ENV: 'development' | 'production'
  PRIVATE_KEY: Address
  NODE_URL: string
  APPROVAL_AMOUNT: 'zero' | 'max'
  CONTRACT_APPROVAL_ADDRESS: Address
  ASSET_APPROVAL_ADDRESS: Address
  CHAIN_ID: number
}

export function getEnv<K extends keyof ProcessEnv>(
  key: K,
  required = true,
): ProcessEnv[K] {
  const value = process.env[key]
  if (!value && required) {
    throw new Error(`Missing environment variable ${key}`)
  }

  return value as ProcessEnv[K]
}
