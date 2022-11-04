import { Erc20Permit } from '@phuture/erc-20';
import { Account } from '@phuture/account';
import { Address, ContractFactory } from '@phuture/types';
import {
	IndexBetting as IndexBettingInterface,
	IndexBetting__factory,
} from '../types';

/**
 * ### Index Betting Contract
 */
export class IndexBetting extends Erc20Permit<IndexBettingInterface> {
	/**
	 * ### Creates a new IndexBetting instance
	 *
	 * @param account Account to use for interacting with the contract
	 * @param contract Contract instance or address of the IndexBetting contract
	 * @param factory Contract factory to use for creating the contract
	 *
	 * @returns New IndexBetting instance
	 */
	constructor(
		account: Account,
		contract: Address | IndexBettingInterface,
		factory: ContractFactory = IndexBetting__factory
	) {
		super(account, contract, factory);
	}
}
