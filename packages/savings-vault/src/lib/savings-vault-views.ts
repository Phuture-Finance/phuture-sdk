import { Account } from '@phuture/account';
import { Address, ContractFactory } from '@phuture/types';
import { Contract } from '@phuture/contract';
import {
	SavingsVaultViews as SavingsVaultViewsContractInterface,
	SavingsVaultViews__factory,
} from '../types';

/** ### SavingsVaultViews Contract */
export class SavingsVaultViews<
	C extends SavingsVaultViewsContractInterface = SavingsVaultViewsContractInterface
> extends Contract<C> {
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
