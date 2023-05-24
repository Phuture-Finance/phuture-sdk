import { getEnv } from './utils'
interface PrepareProps {
  hash: string
  isTest: boolean
}

const prepare = async (): Promise<PrepareProps> => {
  return {
    hash: getEnv('TRANSACTION_HASH'),
    isTest: getEnv('IS_TEST') === 'true',
  }
}

export default prepare
