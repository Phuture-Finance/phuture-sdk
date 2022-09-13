import { Network, Networkish } from '@phuture/types';
import { Account } from '@phuture/account';
import { defaultIndexPricerAddress, IndexPricer } from './index-pricer';

const defaultIndexPricers: Record<Networkish, IndexPricer | undefined> = {
	[Network.Mainnet]: undefined,
	[Network.CChain]: undefined,
};

export const getDefaultIndexPricer = async (
	account: Account
): Promise<IndexPricer> => {
	const network = await account.chainId();

	const indexPricer = defaultIndexPricers[network];
	if (indexPricer) {
		return indexPricer;
	}

	const newIndexPricer = new IndexPricer(
		account,
		defaultIndexPricerAddress[network]
	);
	defaultIndexPricers[network] = newIndexPricer;

	return newIndexPricer;
};
