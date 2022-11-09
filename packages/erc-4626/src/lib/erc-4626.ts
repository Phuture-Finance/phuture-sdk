import { Account } from '@phuture/account'
import { Erc20Permit } from '@phuture/erc-20'
import { Address, ContractFactory } from '@phuture/types'

import {
	ERC4626Upgradeable__factory as ERC4626__factory,
	ERC4626WithPermit as ERC4626WithPermitContractInterface,
} from '../types'

/** ### ERC4626 Token Contract */
export class Erc4626<
	C extends ERC4626WithPermitContractInterface = ERC4626WithPermitContractInterface,
> extends Erc20Permit<C> {
	/**
	 * ### Creates a new ERC4626 instance
	 *
	 * @param account Account to use for interacting with the contract
	 * @param contract Contract instance or address of the ERC4626 token contract
	 * @param factory Contract factory to use for creating the contract
	 *
	 * @returns New ERC4626 token instance
	 */
	constructor(
		account: Account,
		contract: Address | C,
		factory: ContractFactory = ERC4626__factory,
	) {
		super(account, contract, factory)
	}
}
