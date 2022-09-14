import { Address, ContractFactory, Network, Networkish } from '@phuture/types';
import { Contract } from '@phuture/contract';
import { Account } from '@phuture/account';
import {
	IndexHelper as IndexHelperContractInterface,
	IndexHelper__factory,
} from '../types';

/** ### Default IndexHelper address for network */
export const defaultIndexHelperAddress: Record<Networkish, Address> = {
	/** ### Default IndexHelper address on mainnet. */
	[Network.Mainnet]: '0xd0F05E1f57f917A92380a1a591E09F05f4671010',
	/** ### Default IndexHelper address on c-chain. */
	[Network.CChain]: '' +
	'',
};

export class IndexHelper<
	C extends IndexHelperContractInterface = IndexHelperContractInterface
> extends Contract<C> {
	constructor(
		account: Account,
		contract: Address | C = defaultIndexHelperAddress[Network.Mainnet],
		factory: ContractFactory = IndexHelper__factory
	) {
		super(account, contract, factory);
	}
}
