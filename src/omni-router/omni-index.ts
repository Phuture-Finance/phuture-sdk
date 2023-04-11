import { BigNumber, BigNumberish, ContractTransaction } from 'ethers'
import { SubIndexLib } from 'typechain/OmniIndex'

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
  [ChainIds.GoerliRollupTestnet]: '0xc22740db19545a74b049d5b19e6ab7938197e3b0',
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
   * ### Redeem tokens
   * @param indexShares
   * @param receiver
   * @param owner
   * @returns redeem transaction
   */
  async redeem(
    indexShares: PromiseOrValue<BigNumberish>,
    receiver: PromiseOrValue<string>,
    owner: PromiseOrValue<string>,
  ): Promise<ContractTransaction> {
    const anatomy = await this.contract.anatomy()
    return this.contract.redeem(indexShares, receiver, owner, anatomy)
  }

  /**
   * ### Preview redeeming tokens
   * @param indexShares
   * @returns
   */

  async previewRedeem(
    indexShares: PromiseOrValue<BigNumberish>,
  ): Promise<BigNumber> {
    return this.contract.previewRedeem(indexShares)
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
