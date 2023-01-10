import { Account } from "@phuture/account";
import { Address, ChainId } from "@phuture/types";

import { defaultIndexHelperAddress, IndexHelper } from "./index-helper";

const defaultIndexHelpers: Record<ChainId, IndexHelper | undefined> = {};

export const getDefaultIndexHelper = async (
	account: Account,
	network?: ChainId
): Promise<IndexHelper> => {
	if (!network) {
		network = await account.chainId();
	}

	const indexHelper = defaultIndexHelpers[network];
	if (indexHelper) {
		return indexHelper;
	}

	const newIndexHelper = new IndexHelper(
		account,
		defaultIndexHelperAddress[network] as Address
	);
	defaultIndexHelpers[network] = newIndexHelper;

	return newIndexHelper;
};
