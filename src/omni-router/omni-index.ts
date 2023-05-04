import { BigNumber, BigNumberish, ContractTransaction } from 'ethers'
import { IIndexViewer, SubIndexLib } from 'typechain/OmniIndex'

import { Account } from '../account'
import { Contract } from '../contract'
import {
  OmniIndex as OmniIndexInterface,
  OmniIndex__factory,
} from '../typechain'
import { PromiseOrValue } from '../typechain/common'
import { Address, ChainId, ChainIds } from '../types'

/** ### Default OmniIndex address for network */
export const defaultOmniIndexAddress: Record<ChainId, Address> = {
  /** ### Default OmniIndex address on goerli rollup testnet. */
  [ChainIds.GoerliRollupTestnet]: '0xdc09ad66a7d93905e129200ab5439e09fa998f5d',
  [ChainIds.AvalancheFuji]: '0x5888abe26e0b22fede3988f1b463625752245553',
}

export class OmniIndex extends Contract<OmniIndexInterface> {
  /**
   * ### Creates a new OmniIndex instance
   *
   * @param account Account to use for signing
   * @param contract Contract instance or address of the OmniIndexInterface contract
   *
   * @returns New OmniIndexInterface token instance
   */
  constructor(account: Account, contract: OmniIndexInterface | Address) {
    super(account, contract, OmniIndex__factory)
  }

  /**
   * ### Deposit tokens
   * @param reserveTokens Amount of tokens used for minting
   * @param receiver
   * @returns deposit transaction
   */
  async deposit(
    reserveTokens: PromiseOrValue<BigNumberish>,
    receiver: PromiseOrValue<string>,
  ): Promise<ContractTransaction> {
    const anatomy: SubIndexLib.SubIndexStructOutput[] =
      await this.contract.anatomy()
    return this.contract.deposit(reserveTokens, receiver, anatomy)
  }

  /**
   * ### Preview redeeming tokens
   * @param indexShares
   * @returns
   */

  async previewRedeem(
    indexShares: PromiseOrValue<BigNumberish>,
    executionTimestamp: PromiseOrValue<BigNumberish>,
  ): Promise<IIndexViewer.RedeemInfoStructOutput> {
    return this.contract.previewRedeem(indexShares, executionTimestamp)
  }

  /**
   * ### Preview depositing tokens
   * @param reserveTokens
   * @returns
   */
  async previewDeposit(
    reserveTokens: PromiseOrValue<BigNumberish>,
  ): Promise<BigNumber> {
    return this.contract.previewDeposit(reserveTokens)
  }
}
