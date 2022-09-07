import {Account} from "@phuture/account";
import {Address, ContractFactory, Network} from "@phuture/types";
import {SavingsVaultViews as SavingsVaultViewsContractInterface, SavingsVaultViews__factory} from '../types';
import {Contract} from "@phuture/contract";

/** ### SavingsVaultViews Contract */
export class SavingsVaultViews<
	C extends SavingsVaultViewsContractInterface = SavingsVaultViewsContractInterface
> extends Contract<C>  {
	/**
	 * ### Creates a new SavingsVaultViews instance
	 *
	 * @param account Account to use for interacting with the contract
	 * @param contract Contract instance or address of the SavingsVaultViews contract
	 * @param factory Contract factory to use for creating the contract
	 *
	 * @returns New SavingsVaultViews instance
	 */
	constructor(
		account: Account,
		contract: Address | C,
		factory: ContractFactory = SavingsVaultViews__factory
	) {
		super(account, contract, factory);
	}
}
/** ### Default SavingsVaultViews address for network */
export const DefaultSavingsVaultViewsAddress: Record<Network, Address> = {
	/** ### Default SavingsVaultViews address on mainnet. */
	[Network.Mainnet]: '0x1344A36A1B56144C3Bc62E7757377D288fDE0369', // TODO deploy an instance of the SavingsVaultViews
};
