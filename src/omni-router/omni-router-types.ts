import { Zero0xQuoteOptions } from '0x-aggregator'
import { BigNumber, ContractTransaction } from 'ethers'
import { Address } from 'types'

/** ### OmniRouterInterface Interface */
export interface OmniRouterInterface {
  /**
   * ### Remote redeem
   * @param ids
   * @param address
   * @returns remoteRedeem transaction
   */
  remoteRedeem(
    ids: BigNumber[],
    address: Address,
    options?: Partial<Zero0xQuoteOptions>,
  ): Promise<ContractTransaction>
}
