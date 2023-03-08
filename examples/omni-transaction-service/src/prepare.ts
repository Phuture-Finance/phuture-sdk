import { getEnv } from './utils'
interface PrepareProps {
  ethApiKey: string
  maticApiKey: string
  hash: string
  isMocked: boolean
}

const prepare = async (): Promise<PrepareProps> => {
  return {
    ethApiKey: getEnv('ETH_API_KEY'),
    maticApiKey: getEnv('MATIC_API_KEY'),
    hash: getEnv('TRANSACTION_HASH'),
    isMocked: getEnv('IS_MOCKED') === 'true',
  }
}

export default prepare
