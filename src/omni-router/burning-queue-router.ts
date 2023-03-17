import { BigNumber, ContractTransaction } from 'ethers'

import { Account } from '../account'
import { Contract } from '../contract'
import {
  BurningQueue as BurningQueueInterface,
  BurningQueue__factory,
} from '../typechain'
import { Address, ChainId, ChainIds } from '../types'

/** ### Default BurningQueue address for network */
export const defaultBurningQueueAddress: Record<ChainId, Address> = {
  /** ### Default BurningQueue address on goerli rollup testnet. */
  [ChainIds.GoerliRollupTestnet]: '0xd8a054a1f2cb9e6bef07d69b570819d5968811e1',
}

export class BurningQueueRouter extends Contract<BurningQueueInterface> {
  /**
   * ### Creates a new BurningQueueRouter instance
   *
   * @param account Account to use for signing
   * @param contract Contract instance or address of the OmniRouterInterface contract
   *
   * @returns New BurningQueueRouterInterface token instance
   */
  constructor(account: Account, contract: BurningQueueInterface | Address) {
    super(account, contract, BurningQueue__factory)
  }

  /**
   * ### Get IDs
   * @param address
   * @returns array of IDs
   */
  async getIDs(address: Address): Promise<BigNumber[]> {
    return await this.contract.ids(address)
  }

  /**
   * ### Remote redeem
   * @param ids
   * @param quotes
   * @returns remoteRedeem transaction
   */
  async remoteRedeem(
    ids: BigNumber[],
    quotes: BurningQueueInterface.QuoteParamsStruct[][] = [],
  ): Promise<ContractTransaction> {
    return this.contract['remoteRedeem(uint256[],tuple[][])'](ids, quotes)
  }
}
