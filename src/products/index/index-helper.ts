import { Account } from '../../account'
import { Contract } from '../../contract'
import {
  IndexHelper as IndexHelperContractInterface,
  IndexHelper__factory,
} from '../../typechain'
import { Address, ContractFactory, ChainId, ChainIds } from '../../types'

/** ### Default IndexHelper address for network */
export const defaultIndexHelperAddress: Record<ChainId, Address> = {
  /** ### Default IndexHelper address on mainnet. */
  [ChainIds.Mainnet]: '0x76dd4189d73f07e7b11350cffc9b503627fc7a3b',
  /** ### Default IndexHelper address on c-chain. */
  // INFO: [ChainIds.CChain]: '0xacef72ef3afeb044845f0869586445e5c6c2504a', //CChain main
  [ChainIds.CChain]: '0x564b7462b0befbc0296b1230cb5ca8753d633f9a', //INFO: CChain staging
}

export class IndexHelper<
  C extends IndexHelperContractInterface = IndexHelperContractInterface
> extends Contract<C> {
  constructor(
    account: Account,
    contract: Address | C,
    factory: ContractFactory = IndexHelper__factory,
  ) {
    super(account, contract, factory)
  }
}
