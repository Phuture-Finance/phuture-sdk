import { Network, Networkish } from '@phuture/types';
import { Account } from '@phuture/account';
import {
	defaultPhuturePriceOracleAddress,
	PhuturePriceOracle,
} from './phuture-price-oracle';

const defaultPriceOracles: Record<Networkish, PhuturePriceOracle | undefined> =
	{
		[Network.Mainnet]: undefined,
		[Network.CChain]: undefined,
	};

export const getDefaultPriceOracle = async (
	account: Account
): Promise<PhuturePriceOracle> => {
	const network = await account.chainId();

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
