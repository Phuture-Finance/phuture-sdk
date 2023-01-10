import { Account } from "@phuture/account";
import { Address, ChainId } from "@phuture/types";

import {
	defaultPhuturePriceOracleAddress,
	PhuturePriceOracle
} from "./phuture-price-oracle";

const defaultPriceOracles: Record<ChainId, PhuturePriceOracle | undefined> = {};

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
		defaultPhuturePriceOracleAddress[network] as Address
	);
	defaultPriceOracles[network] = newPriceOracle;

	return newPriceOracle;
};
