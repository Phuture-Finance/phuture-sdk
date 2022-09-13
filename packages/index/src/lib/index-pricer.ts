import { Address, ContractFactory, Network, Networkish } from '@phuture/types';
import { Contract } from '@phuture/contract';
import { Account } from '@phuture/account';
import {
	IndexPricer as IndexPricerContractInterface,
	IndexPricer__factory,
} from '../types';

/** ### Default IndexPricer address for network */
export const defaultIndexPricerAddress: Record<Networkish, Address> = {
	/** ### Default IndexPricer address on mainnet. */
	[Network.Mainnet]: '0xd0F05E1f57f917A92380a1a591E09F05f4671010',
	/** ### Default IndexPricer address on c-chain. */
	[Network.CChain]: '0xfd41449A8CE634b6Aa5C006d0204f88Ea83EF263',
};

export class IndexPricer<
	C extends IndexPricerContractInterface = IndexPricerContractInterface
> extends Contract<C> {
	constructor(
		account: Account,
		contract: Address | C = defaultIndexPricerAddress[Network.Mainnet],
		factory: ContractFactory = IndexPricer__factory
	) {
		super(account, contract, factory);
	}
}
