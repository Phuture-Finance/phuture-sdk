import { BigNumberish, ContractTransaction } from 'ethers'

import { Account } from '../account'
import { Contract } from '../contract'
import {
  RedeemRouter as RedeemRouterInterface,
  RedeemRouter__factory,
} from '../typechain'
import { PromiseOrValue } from '../typechain/common'
import { Address, ChainId, ChainIds } from '../types'

import { OmniIndex } from './omni-index'

/** ### Default RedeemRouter address for network */
export const defaultRedeemRouterAddress: Record<ChainId, Address> = {
  /** ### Default RedeemRouter address on goerli rollup testnet. */
  [ChainIds.GoerliRollupTestnet]: '0x22133c0b1448a484d22e00c33ed83ea3c5a50881',
  [ChainIds.Mumbai]: '0x54cc05d2ba472cad2ed896bdcd5761e14aaec0fb',
}

export class RedeemRouter extends Contract<RedeemRouterInterface> {
  /**
   * ### Creates a new OmniIndex instance
   *
   * @param account Account to use for signing
   * @param contract Contract instance or address of the OmniIndexInterface contract
   *
   * @returns New OmniIndexInterface token instance
   */
  constructor(account: Account, contract: RedeemRouterInterface | Address) {
    super(account, contract, RedeemRouter__factory)
  }

  /**
   * ### Redeem tokens
   * @param omniIndex
   * @param indexShares
   * @param receiver
   * @param owner
   * @param batchInfo
   * @returns redeem transaction
   */
  async redeem(
    omniIndex: OmniIndex,
    indexShares: PromiseOrValue<BigNumberish>,
    receiver: PromiseOrValue<string>,
    owner: PromiseOrValue<string>,
    batchInfo: {
      remoteData: RedeemRouterInterface.BatchStruct[]
      localData: RedeemRouterInterface.LocalQuotesStruct[]
    },
  ): Promise<ContractTransaction> {
    const redeemData = {
      localData: batchInfo.localData,
      remoteData: batchInfo.remoteData,
    }

    const reserveCached = await omniIndex.contract.reserve() //INFO: change to 0 for testing
    const estimatedRedeemFee = await this.contract.estimateRedeemFee(
      batchInfo.remoteData,
    )

    const anatomy = await omniIndex.contract.anatomy()

    return this.contract.redeem(
      omniIndex.address,
      indexShares,
      receiver,
      owner,
      reserveCached,
      redeemData,
      anatomy,
      {
        value: estimatedRedeemFee,
      },
    )
  }
}
