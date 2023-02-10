import { BigNumber, BigNumberish, ContractTransaction } from 'ethers'

import { Account } from '../account'
import { Contract } from '../contract'
import {
  OmniRouter as OmniRouterInterface,
  OmniRouter__factory,
} from '../typechain'
import { PromiseOrValue } from '../typechain/common'
import { Address, ChainId, ChainIds } from '../types'

/** ### Default OmniRouter address for network */
export const defaultOmniRouterAddress: Record<ChainId, Address> = {
  /** ### Default OmniRouter address on goerli rollup testnet. */
  [ChainIds.GoerliRollupTestnet]: '0x5888abe26e0b22fede3988f1b463625752245553',
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
   * ### Returns gas limit with 5% buffer
   * @param estimatedGas
   * @returns
   */
  private _getGasLimit(estimatedGas: BigNumberish): BigNumberish {
    return BigNumber.from(estimatedGas)
      .mul(100)
      .div(95)
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
    const estimatedGas = await this.contract.estimateGas.deposit(
      reserveTokens,
      this.account.address(),
    )
    return this.contract.deposit(reserveTokens, receiver, {
      gasLimit: this._getGasLimit(estimatedGas),
    })
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
    const estimatedGas = await this.contract.estimateGas.redeem(
      indexShares,
      this.account.address(),
      owner,
    )

    return this.contract.redeem(indexShares, receiver, owner, {
      gasLimit: this._getGasLimit(estimatedGas),
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
