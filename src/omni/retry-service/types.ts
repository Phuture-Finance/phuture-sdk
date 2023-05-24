import { BigNumber } from 'ethers'

import { Address, ChainId } from '../../types'

interface BalanceData {
  address: Address
  balance: BigNumber
}

export interface EscrowData {
  chainId: ChainId
  balances: BalanceData[]
}
