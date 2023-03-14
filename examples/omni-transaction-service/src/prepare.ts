import { getEnv } from './utils'
interface PrepareProps {
  ethApiKey: string
  maticApiKey: string
  hash: string
  isTest: boolean
}

const prepare = async (): Promise<PrepareProps> => {
  return {
    ethApiKey: getEnv('ETH_API_KEY'),
    maticApiKey: getEnv('MATIC_API_KEY'),
    hash: getEnv('TRANSACTION_HASH'),
    isTest: getEnv('IS_TEST') === 'true',
  }
}

export default prepare
