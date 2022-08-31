import {Account} from "@phuture/account";
import {Address, ContractFactory, Network} from "@phuture/types";
import {FRPViews as FRPViewsContractInterface, FRPViews__factory} from '../types';
import {Contract} from "@phuture/contract";

/** ### FRPViews Contract */
export class FRPViews<
	C extends FRPViewsContractInterface = FRPViewsContractInterface
> extends Contract<C>  {
	/**
	 * ### Creates a new FRPViews instance
	 *
	 * @param account Account to use for interacting with the contract
	 * @param contract Contract instance or address of the FRPViews contract
	 * @param factory Contract factory to use for creating the contract
	 *
	 * @returns New FRPViews instance
	 */
	constructor(
		account: Account,
		contract: Address | C,
		factory: ContractFactory = FRPViews__factory
	) {
		super(account, contract, factory);
	}
}
/** ### Default FRPViews address for network */
export const DefaultFRPViewsAddress: Record<Network, Address> = {
	/** ### Default FRPViews address on mainnet. */
	[Network.Mainnet]: '...TBD', // TODO deploy an instance of the FRPViews
};
