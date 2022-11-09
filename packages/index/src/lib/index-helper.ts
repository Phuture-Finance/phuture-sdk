import { Account } from '@phuture/account'
import { Contract } from '@phuture/contract'
import { Address, ContractFactory, Network } from '@phuture/types'

import {
	IndexHelper as IndexHelperContractInterface,
	IndexHelper__factory,
} from '../types'

/** ### Default IndexHelper address for network */
export const defaultIndexHelperAddress: Record<Network, Address> = {
	/** ### Default IndexHelper address on mainnet. */
	[Network.Mainnet]: '0x76dd4189d73f07e7b11350cffc9b503627fc7a3b',
	/** ### Default IndexHelper address on c-chain. */
	[Network.CChain]: '0xacef72ef3afeb044845f0869586445e5c6c2504a',
}

export class IndexHelper<
	C extends IndexHelperContractInterface = IndexHelperContractInterface,
> extends Contract<C> {
	constructor(
		account: Account,
		contract: Address | C = defaultIndexHelperAddress[Network.Mainnet],
		factory: ContractFactory = IndexHelper__factory,
	) {
		super(account, contract, factory)
	}
}
