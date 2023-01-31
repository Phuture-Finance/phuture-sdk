import { Address } from 'types'
import {
  OmniRouter as OmniRouterInterface,
  OmniRouter__factory,
} from '../typechain'
import { Contract } from 'contract'
import { Account } from 'account'

export class OmniDepositRouter extends Contract<OmniRouterInterface> {
  /**
   * ### Creates a new OmniDepositRouter instance
   *
   * @param account Account to use for signing
   * @param contract Contract instance or address of the IndexDepositRouter contract
   *
   * @returns New IndexDepositRouter token instance
   */
  constructor(account: Account, contract: OmniRouterInterface | Address) {
    super(account, contract, OmniRouter__factory)
  }
}
