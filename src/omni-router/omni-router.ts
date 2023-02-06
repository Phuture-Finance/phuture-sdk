import { Address } from 'types'
import {
  OmniRouter as OmniRouterInterface,
  OmniRouter__factory,
} from '../typechain'
import { Contract } from 'contract'
import { Account } from 'account'
import { PromiseOrValue } from 'typechain/common'

import { BigNumber, BigNumberish, ContractTransaction } from 'ethers'

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
   * Returns gas limit with 5% buffer
   * @param estimatedGas
   * @returns
   */
  private _getGasLimit(estimatedGas: BigNumberish): BigNumberish {
    return BigNumber.from(estimatedGas).mul(100).div(95)
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
   *  ## Redeem tokens
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
   * ### Transfer tokens
   * @param to address
   * @param value amount
   */
  async transfer(
    to: PromiseOrValue<string>,
    value: PromiseOrValue<BigNumberish>,
  ): Promise<ContractTransaction> {
    const estimatedGas = await this.contract.estimateGas.transfer(to, value)
    return this.contract.transfer(to, value, {
      gasLimit: this._getGasLimit(estimatedGas),
    })
  }
}
