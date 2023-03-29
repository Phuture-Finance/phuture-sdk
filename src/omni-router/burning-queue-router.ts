import { BigNumber, BigNumberish, BytesLike, ContractTransaction } from 'ethers'
import { PromiseOrValue } from 'typechain/common'

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
  [ChainIds.GoerliRollupTestnet]: '0xa3e7e371779573214029c9597a323a740825ff0c',
}

export interface BatchStruct {
  quotes: BurningQueueInterface.QuoteParamsStruct[]
  chainId: PromiseOrValue<BigNumberish>
  payload: PromiseOrValue<BytesLike>
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
   * ### pickBalance
   * @param subIndexId
   * @param receiver
   * @returns returns balance of sub-index
   */
  async pickBalance(
    subIndexId: PromiseOrValue<BigNumberish>,
    receiver: PromiseOrValue<string>,
  ): Promise<BigNumber> {
    return await this.contract['pick(uint256,address)'](subIndexId, receiver)
  }

  /**
   * ### Remote multiple redeem
   * @param ids
   * @param quotes
   * @returns remoteRedeem transaction
   */
  async remoteMultipleRedeem(
    ids: BigNumber[],
    localQuotes: BurningQueueInterface.LocalQuotesStruct[] = [],
    batches: BurningQueueInterface.BatchStruct[],
  ): Promise<ContractTransaction> {
    const value = await this.contract.estimateFee(batches)
    return this.contract.functions[
      'remoteRedeem(uint256[],((address,address,uint256,uint256,uint256,bytes)[])[],((address,address,uint256,uint256,uint256,bytes)[],uint256,bytes)[])'
    ](ids, localQuotes, batches, { value })
  }
}
