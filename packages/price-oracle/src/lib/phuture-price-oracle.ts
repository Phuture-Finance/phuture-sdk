import { Account } from '@phuture/account'
import { Contract } from '@phuture/contract'
import { Address, ContractFactory, Network } from '@phuture/types'

import {
	PhuturePriceOracle as PhuturePriceOracleContractInterface,
	PhuturePriceOracle__factory,
} from '../types'

/** ### Default PhuturePriceOracle address for network */
export const defaultPhuturePriceOracleAddress: Record<Network, Address> = {
	/** ### Default PhuturePriceOracle address on mainnet. */
	[Network.Mainnet]: '0x384ac33558821383ff4fc73d1dee3539a74bf540',
	/** ### Default PhuturePriceOracle address on c-chain. */
	[Network.CChain]: '0x69e848b2f41019340cec3e6696d5c937e74da96b',
}

/** ### ERC20 Token Contract */
export class PhuturePriceOracle<
	C extends PhuturePriceOracleContractInterface = PhuturePriceOracleContractInterface,
> extends Contract<C> {
	/**
	 * ### Creates a new PhuturePriceOracle instance
	 *
	 * @param account Account to use for interacting with the contract
	 * @param contract Contract instance or address of the PhuturePriceOracle contract
	 * @param factory Contract factory to use for creating the contract
	 *
	 * @returns New PhuturePriceOracle token instance
	 */
	constructor(
		account: Account,
		contract: Address | C = defaultPhuturePriceOracleAddress[Network.Mainnet],
		factory: ContractFactory = PhuturePriceOracle__factory,
	) {
		super(account, contract, factory)
	}
}
