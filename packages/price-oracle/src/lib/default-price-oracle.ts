import {
	DefaultPhuturePriceOracleAddress,
	PhuturePriceOracle,
} from './phuture-price-oracle';
import { Network } from '@phuture/types';
import { Account } from '@phuture/account';

const defaultPriceOracles: Record<Network, PhuturePriceOracle | undefined> = {
	[Network.Mainnet]: undefined,
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
		DefaultPhuturePriceOracleAddress[network]
	);
	defaultPriceOracles[network] = newPriceOracle;

	return newPriceOracle;
};
