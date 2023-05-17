import { Account } from '../account'
import { Contract } from '../contract'
import {
  OmniIndex as OmniIndexInterface,
  OmniIndex__factory,
} from '../typechain'
import { Address, ChainId, ChainIds } from '../types'

/** ### Default OmniIndex address for network */
export const defaultOmniIndexAddress: Record<ChainId, Address> = {
  /** ### Default OmniIndex address on goerli rollup testnet. */
  [ChainIds.EthereumGoerli]: '0xdc09ad66a7d93905e129200ab5439e09fa998f5d',
  [ChainIds.AvalancheFuji]: '0x5888abe26e0b22fede3988f1b463625752245553',
}

export class OmniIndex extends Contract<OmniIndexInterface> {
  /**
   * ### Creates a new OmniIndex instance
   *
   * @param account Account to use for signing
   * @param contract Contract instance or address of the OmniIndexInterface contract
   *
   * @returns New OmniIndexInterface token instance
   */
  constructor(account: Account, contract: OmniIndexInterface | Address) {
    super(account, contract, OmniIndex__factory)
  }
}
