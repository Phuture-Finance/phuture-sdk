import {
	defaultPhuturePriceOracleAddress,
	PhuturePriceOracle,
} from './phuture-price-oracle';
import {Network, Networkish} from '@phuture/types';
import { Account } from '@phuture/account';

const defaultPriceOracles: Record<Networkish, PhuturePriceOracle | undefined> = {
	[Network.Mainnet]: undefined,
	[Network.CChain]: undefined,
};

export const getDefaultPriceOracle = (
	account: Account,
	network: Network = Network.Mainnet
): PhuturePriceOracle => {
	const priceOracle = defaultPriceOracles[network];
	if (priceOracle) {
		return priceOracle;
	}

	const newPriceOracle = new PhuturePriceOracle(
		account,
		defaultPhuturePriceOracleAddress[network]
	);
	defaultPriceOracles[network] = newPriceOracle;

	return newPriceOracle;
};
