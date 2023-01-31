import { Address } from 'types'
import {
  OmniRouter as OmniRouterInterface,
  OmniRouter__factory,
} from '../typechain'
import { Contract } from 'contract'
import { Account } from 'account'
import { PromiseOrValue } from 'typechain/common'

import { BigNumberish, ContractTransaction } from 'ethers'

export class OmniDepositRouter extends Contract<OmniRouterInterface> {
  /**
   * ### Creates a new OmniDepositRouter instance
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
   * ### Deposit
   *
   * @param index buy token address
   * @param sellAmount sell token's  amount
   * @param quotes (optional) quotes for deposits with USDC
   *
   * @returns deposit transaction
   */
  async deposit(
    index: PromiseOrValue<string>,
    sellAmount: BigNumberish,
  ): Promise<ContractTransaction> {
    const estimatedNativeGas = await this.contract.estimateGas.deposit(
      index,
      this.account.address(),
    )
    return this.contract.deposit(index, this.account.address(), {
      value: sellAmount,
      gasLimit: estimatedNativeGas,
    })
  }
}
