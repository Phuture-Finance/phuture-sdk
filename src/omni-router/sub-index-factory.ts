import { BigNumberish } from 'ethers'
import { SubIndexLib } from 'typechain/OmniIndex'

import { Account } from '../account'
import { Contract } from '../contract'
import {
  SubIndexFactory as SubIndexInterface,
  SubIndexFactory__factory,
} from '../typechain'
import { PromiseOrValue } from '../typechain/common'
import { Address, ChainId, ChainIds } from '../types'

/** ### Default SubIndex address for network */
export const defaultSubIndexFactoryAddress: Record<ChainId, Address> = {
  /** ### Default SubIndex address on goerli rollup testnet. */
  [ChainIds.GoerliRollupTestnet]: '0x6f09fb6ea53226fb14c3b8639c4b101a4724d8eb',
}

export class SubIndex extends Contract<SubIndexInterface> {
  /**
   * ### Creates a new SubIndex instance
   *
   * @param account Account to use for signing
   * @param contract Contract instance or address of the SubIndexInterface contract
   *
   * @returns New SubIndexFactoryInterface token instance
   */
  constructor(account: Account, contract: SubIndexInterface | Address) {
    super(account, contract, SubIndexFactory__factory)
  }

  /**
   * ### indexesOf
   * @param ids
   * @returns sub-index struct
   */
  async indexesOf(
    ids: PromiseOrValue<BigNumberish>[],
  ): Promise<SubIndexLib.SubIndexStructOutput[]> {
    return await this.contract['subIndexesOf(uint256[])'](ids)
  }
}
