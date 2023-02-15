import { BigNumber, BigNumberish, ContractTransaction } from 'ethers'

import { Account } from '../account'
import { Contract } from '../contract'
import {
  OmniRouter as OmniRouterInterface,
  OmniRouter__factory,
} from '../typechain'
import { PromiseOrValue } from '../typechain/common'
import { Address, ChainId, ChainIds } from '../types'

import {
  defaultOmniMessageRouterAddress,
  OmniMessageRouter,
} from './omni-message-router'

/** ### Default OmniRouter address for network */
export const defaultOmniRouterAddress: Record<ChainId, Address> = {
  /** ### Default OmniRouter address on goerli rollup testnet. */
  [ChainIds.GoerliRollupTestnet]: '0xbce372299dab3c06287fee4b313a082181ebe96c',
}

export class OmniRouter extends Contract<OmniRouterInterface> {
  /**
   * ### Creates a new OmniRouter instance
   *
   * @param account Account to use for signing
   * @param contract Contract instance or address of the OmniRouterInterface contract
   *
   * @returns New OmniRouterInterface token instance
   */
  constructor(account: Account, contract: OmniRouterInterface | Address) {
    super(account, contract, OmniRouter__factory)
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
    return this.contract.deposit(reserveTokens, receiver)
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
    const omniMessageRouter = new OmniMessageRouter(
      this.account,
      defaultOmniMessageRouterAddress[ChainIds.GoerliRollupTestnet],
    )
    const feeAmount = await omniMessageRouter.estimateFee()

    return this.contract.redeem(indexShares, receiver, owner, {
      value: feeAmount.nativeFee,
    })
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
