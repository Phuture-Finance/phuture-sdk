import { Address, ContractFactory, Network, PriceSource } from '@phuture/types';
import { Contract } from '@phuture/contract';
import { Account } from '@phuture/account';

import {
	PhuturePriceOracle as PhuturePriceOracleContractInterface,
	PhuturePriceOracle__factory,
} from '../types';

/** ### Default PhuturePriceOracle address for network */
export const DefaultPhuturePriceOracleAddress: Record<Network, Address> = {
	/** ### Default PhuturePriceOracle address on mainnet. */
	[Network.Mainnet]: '0x7b6c3e5486d9e6959441ab554a889099eed76290',
};

/** ### ERC20 Token Contract */
export class PhuturePriceOracle<
	C extends PhuturePriceOracleContractInterface = PhuturePriceOracleContractInterface
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
		contract: Address | C = DefaultPhuturePriceOracleAddress[Network.Mainnet],
		factory: ContractFactory = PhuturePriceOracle__factory
	) {
		super(account, contract, factory);
	}
}
