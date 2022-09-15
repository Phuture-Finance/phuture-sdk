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
	[Network.Mainnet]: '0x76Dd4189d73f07e7B11350CfFc9B503627fc7a3b',
	/** ### Default IndexHelper address on c-chain. */
	[Network.CChain]: '0xaCef72ef3AFEb044845f0869586445e5C6c2504a',
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
