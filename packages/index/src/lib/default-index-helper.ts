import { Network, Networkish } from '@phuture/types';
import { Account } from '@phuture/account';
import { defaultIndexHelperAddress, IndexHelper } from './index-helper';

const defaultIndexHelpers: Record<Networkish, IndexHelper | undefined> = {
	[Network.Mainnet]: undefined,
	[Network.CChain]: undefined,
};

export const getDefaultIndexHelper = async (
	account: Account
): Promise<IndexHelper> => {
	const network = await account.chainId();

	const indexHelper = defaultIndexHelpers[network];
	if (indexHelper) {
		return indexHelper;
	}

	const newIndexHelper = new IndexHelper(
		account,
		defaultIndexHelperAddress[network]
	);
	defaultIndexHelpers[network] = newIndexHelper;

	return newIndexHelper;
};
