interface ProcessEnv {
  TRANSACTION_HASH: string
  MATIC_API_KEY: string
  ETH_API_KEY: string
  IS_MOCKED: 'true' | 'false'
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
