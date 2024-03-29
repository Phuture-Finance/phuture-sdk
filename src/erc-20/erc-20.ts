import { BigNumberish } from 'ethers'
import { formatUnits } from 'ethers/lib/utils'

import { Account } from '../account'
import { Contract } from '../contract'
import { InsufficientAllowanceError } from '../errors'
import { ERC20 as ERC20ContractInterface, ERC20__factory } from '../typechain'
import { Address, ContractFactory } from '../types'

/** ### ERC20 Token Contract */
export class Erc20<
  C extends ERC20ContractInterface = ERC20ContractInterface,
> extends Contract<C> {

  /** ### Decimals of the token */
  private _decimals?: number

  /** ### Symbol of the token */
  private _symbol?: string

  /** ### Name of the token */
  private _name?: string

  /**
   * ### Creates a new ERC20 instance
   *
   * @param account Account to use for interacting with the contract
   * @param contract Contract instance or address of the ERC20 token contract
   * @param factory Contract factory to use for creating the contract
   *
   * @returns New ERC20 token instance
   */
  constructor(
    account: Account,
    contract: Address | C,
    factory: ContractFactory = ERC20__factory,
  ) {
    super(account, contract, factory)
  }

  /**
   * ### Get the decimals of the token
   *
   * @returns Decimals of the token
   */
  public async decimals(): Promise<number> {
    if (!this._decimals) this._decimals = await this.contract.decimals()

    return this._decimals
  }

  /**
   * ### Get the symbol of the token
   *
   * @returns Symbol of the token
   */
  public async symbol(): Promise<string> {
    if (!this._symbol) this._symbol = await this.contract.symbol()

    return this._symbol
  }

  /**
   * ### Get the name of the token
   *
   * @returns Name of the token
   */
  public async name(): Promise<string> {
    if (!this._name) this._name = await this.contract.name()

    return this._name
  }

  /**
   * ### Get the formatted total supply of the token
   *
   * @returns Formatted total supply of the token
   */
  public async formattedTotalSupply(): Promise<string> {
    const totalSupply = await this.contract.totalSupply()
    const decimals = await this.decimals()

    return formatUnits(totalSupply, decimals)
  }

  /**
   * ### Get the formatted balance of the account
   *
   * @param account Address of the account
   *
   * @returns Formatted balance of the account
   */
  public async formattedBalanceOf(account: Address): Promise<string> {
    const balance = await this.contract.balanceOf(account)
    const decimals = await this.decimals()

    return formatUnits(balance, decimals)
  }

  /**
   * ### Check Allowance
   *
   * @param account Address of the account
   * @param expectedAmount Amount of tokens to check
   *
   * @returns true if the account has enough tokens to transfer the amount
   */
  public async checkAllowance(
    account: Address,
    expectedAmount: BigNumberish,
  ): Promise<true> {
    const allowance = await this.contract.allowance(
      await this.account.address(),
      account,
    )

    if (allowance.lt(expectedAmount))
      throw new InsufficientAllowanceError(account, expectedAmount, allowance)

    return true
  }
}
