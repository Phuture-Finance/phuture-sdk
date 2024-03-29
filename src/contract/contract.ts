import { Contract as EthersContract } from 'ethers'

import { Account } from '../account'
import type { Address, ContractFactory } from '../types'
import { isAddress } from '../types'

/** ### Contract Instance */
export class Contract<C extends EthersContract> {
  /** ### Contract instance */
  public contract: C

  /**
   * ### Constructs an instance of the contract class
   *
   * @param _account Account used for interacting with the contract
   * @param contract Contract or contract address to interact with
   * @param contractFactory Factory for creating the contract
   *
   * @returns {Contract} The contract instance
   */
  constructor(
    private _account: Account,
    contract: C | Address,
    protected readonly contractFactory: ContractFactory,
  ) {
    this.contract = isAddress(contract)
      ? (contractFactory.connect(contract, _account.signer) as C)
      : contract
  }

  /**
   * ### Get the address of the contract
   *
   * @returns Address of the contract
   */
  get address(): Address {
    return this.contract.address
  }

  /**
   * ### Set the address of the contract
   *
   * @param address Address of the contract
   */
  set address(address: Address) {
    this.contract = this.contractFactory.connect(
      address,
      this._account.signer,
    ) as C
  }

  /**
   * ### Get the signer used for interacting with the contract
   *
   * @returns Signer used for interacting with the contract
   */
  get account(): Account {
    return this._account
  }

  /**
   * ### Set the signer used for interacting with the contract
   *
   * @param account Account used for interacting with the contract
   */
  set account(account: Account) {
    this._account = account
    this.contract = this.contractFactory.connect(
      this.address,
      account.signer,
    ) as C
  }
}
