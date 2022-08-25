import {
	Address,
	ContractFactory,
	Network,
	Networkish,
	PriceSource,
} from '@phuture/types';
import { Contract } from '@phuture/contract';
import { Account } from '@phuture/account';

import {
	PhuturePriceOracle as PhuturePriceOracleContractInterface,
	PhuturePriceOracle__factory,
} from '../types';

/** ### Default PhuturePriceOracle address for network */
export const defaultPhuturePriceOracleAddress: Record<Networkish, Address> = {
	/** ### Default PhuturePriceOracle address on mainnet. */
	[Network.Mainnet]: '0x384ac33558821383fF4fC73D1DEe3539a74bf540',
	/** ### Default PhuturePriceOracle address on c-chain. */
	[Network.CChain]: '0xee53039D099Fc73171Ee94386d59F24B05Ceb68A',
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
		contract: Address | C = defaultPhuturePriceOracleAddress[Network.Mainnet],
		factory: ContractFactory = PhuturePriceOracle__factory
	) {
		super(account, contract, factory);
	}
}
