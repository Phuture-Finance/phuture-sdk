import { Account } from '@phuture/account'
import { Contract } from '@phuture/contract'
import type { Address, ContractFactory } from '@phuture/types'

import {
	IHarvestingJob as HarvestingJobInterface,
	IHarvestingJob__factory,
} from '../typechain'

/**
 * ### HarvestingJob Contract
 */
export class HarvestingJob extends Contract<HarvestingJobInterface> {
	/**
	 * ### Creates a new HarvestingJob instance
	 *
	 * @param account Account to use for interacting with the contract
	 * @param contract Contract instance or address of the HarvestingJob contract
	 * @param factory Contract factory to use for creating the contract
	 *
	 * @returns New HarvestingJob instance
	 */
	constructor(
		account: Account,
		contract: Address | HarvestingJobInterface,
		factory: ContractFactory = IHarvestingJob__factory,
	) {
		super(account, contract, factory)
	}
}
