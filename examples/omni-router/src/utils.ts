import { Address } from '../../../dist'

interface ProcessEnv {
  NODE_ENV: 'development' | 'production'
  PRIVATE_KEY: Address
  NODE_URL: string
  IS_DEPOSIT: 'true' | 'false'
  AMOUNT: string
  CHAIN_ID: number
  TOKEN_ADDRESS: Address
  INDEX_ADDRESS: Address
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
