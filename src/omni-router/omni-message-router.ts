import { BigNumber } from 'ethers'

import { Account } from '../account'
import { Contract } from '../contract'
import {
  OmniMessageRouter as OmniMessageRouterInterface,
  OmniMessageRouter__factory,
} from '../typechain'
import { Address, ChainId, ChainIds } from '../types'

/** ### Default OmniMessageRouter address for network */
export const defaultOmniMessageRouterAddress: Record<ChainId, Address> = {
  /** ### Default OmniRouter address on goerli rollup testnet. */
  [ChainIds.GoerliRollupTestnet]: '0x76e1dbaee729a215509103c0c1dd6d349240642b',
}

export class OmniMessageRouter extends Contract<OmniMessageRouterInterface> {
  /**
   * ### Creates a new OmniMessageRouter instance
   *
   * @param account Account to use for signing
   * @param contract Contract instance or address of the OmniMessageRouterInterface contract
   *
   * @returns New OmniMessageRouterInterface token instance
   */
  constructor(
    account: Account,
    contract: OmniMessageRouterInterface | Address,
  ) {
    super(account, contract, OmniMessageRouter__factory)
  }

  /**
   * ### estimateFee
   * @returns object with fees
   */
  async estimateFee(): Promise<{ nativeFee: BigNumber; zroFee: BigNumber }> {
    return await this.contract.estimateFee()
  }
}
