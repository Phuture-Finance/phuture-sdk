import { BigNumber, BigNumberish, ContractTransaction } from 'ethers'

import { Account } from '../../account'
import { Erc4626 } from '../../erc-4626'
import {
  SavingsVault as SavingsVaultContractInterface,
  SavingsVault__factory,
} from '../../typechain'
import { Address, ContractFactory } from '../../types'

/**
 * ### SavingsVault Contract
 */
export class SavingsVault extends Erc4626<SavingsVaultContractInterface> {
  /**
   * ### Creates a new SavingsVault instance
   *
   * @param account Account to use for interacting with the contract
   * @param contract Contract instance or address of the SavingsVault contract
   * @param factory Contract factory to use for creating the contract
   *
   * @returns New SavingsVault instance
   */
  constructor(
    account: Account,
    contract: Address | SavingsVaultContractInterface,
    factory: ContractFactory = SavingsVault__factory,
  ) {
    super(account, contract, factory)
  }

  public async redeem(
    shares: BigNumberish,
    _receiver: Address,
    owner: Address,
  ): Promise<ContractTransaction> {
    const estimatedGas = await this.contract.estimateGas.redeem(
      shares,
      owner,
      owner,
    )

    return this.contract.redeem(shares, owner, owner, {
      gasLimit: estimatedGas.mul(100).div(80),
    })
  }

  public async redeemWithMinOutputAmount(
    shares: BigNumberish,
    receiver: Address,
    owner: Address,
    minOutputAmount: BigNumber,
  ): Promise<ContractTransaction> {
    const estimatedGas = await this.contract.estimateGas.redeemWithMinOutputAmount(
      shares,
      receiver,
      owner,
      minOutputAmount,
    )

    return this.contract.redeemWithMinOutputAmount(
      shares,
      receiver,
      owner,
      minOutputAmount,
      {
        gasLimit: estimatedGas.mul(100).div(80),
      },
    )
  }
}
