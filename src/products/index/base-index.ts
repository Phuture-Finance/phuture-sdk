import { BigNumber, BigNumberish } from 'ethers'

import { Account } from '../../account'
import { Erc20Permit } from '../../erc-20'
import { BaseIndex, BaseIndex__factory } from '../../typechain'
import type { Address, Anatomy, ContractFactory } from '../../types'

/**
 * ### Index Contract
 */
export class Index extends Erc20Permit<BaseIndex> {
  /** ### List of assets of the index */
  private _anatomy?: Anatomy

  /** ### List of inactive (with 0 weight) assets of the index */
  private _inactiveAnatomy?: Anatomy

  /**
   * ### Creates a new Index instance
   *
   * @param account Account to use for interacting with the contract
   * @param contract Contract instance or address of the Index token contract
   * @param factory Contract factory to use for creating the contract
   *
   * @returns New Index token instance
   */
  constructor(
    account: Account,
    contract: Address | BaseIndex,
    factory: ContractFactory = BaseIndex__factory,
  ) {
    super(account, contract, factory)
  }

  /**
   * ### Scale amount of input tokens to set underlying tokens amount in baseToken
   *
   * @param amountDesired Amount of input tokens to scale
   *
   * @returns Scaled amounts of underlying tokens and total amount in baseToken
   */
  public async scaleAmount(
    amountDesired: BigNumberish,
  ): Promise<{ asset: Address; amount: BigNumber; weight: number }[]> {
    const anatomy = await this.anatomy()

    return anatomy.map(({ asset, weight }) => ({
      asset,
      amount: BigNumber.from(amountDesired).mul(weight).div(255),
      weight,
    }))
  }

  public async anatomy(): Promise<Anatomy> {
    if (!this._anatomy) this._anatomy = await this.getAnatomy()

    return this._anatomy
  }

  public async inactiveAnatomy(): Promise<Anatomy> {
    if (!this._inactiveAnatomy)
      this._inactiveAnatomy = await this.getInactiveAnatomy()

    return this._inactiveAnatomy
  }

  public async constituents(): Promise<Anatomy> {
    const [anatomy, inactiveAnatomy] = await Promise.all([
      this.anatomy(),
      this.inactiveAnatomy(),
    ])

    return [...anatomy, ...inactiveAnatomy]
  }

  private async getAnatomy(): Promise<Anatomy> {
    const { _assets, _weights } = await this.contract.anatomy()
    if (_assets.length !== _weights.length)
      throw new Error('Anatomy assets and weights length mismatch')

    return _assets.map((asset, i) => ({ asset, weight: Number(_weights[i]) }))
  }

  private async getInactiveAnatomy(): Promise<Anatomy> {
    const _assets = await this.contract.inactiveAnatomy()
    return _assets.map((asset) => ({ asset, weight: 0 }))
  }
}
