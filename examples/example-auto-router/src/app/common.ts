import { ethers } from 'ethers';
import {
	Account,
	Index, IndexAutoRouter,
	IndexRouter, MetaRouter, ProductType, SavingsVault,
	ZeroExAggregator,
} from '@phuture/sdk';
import 'dotenv/config';
import { getEnv } from './utils';

export const account = new Account(
	new ethers.Wallet(
		getEnv('PRIVATE_KEY'),
		new ethers.providers.JsonRpcProvider(getEnv('NODE_URL'))
	)
);

const zeroEx = new ZeroExAggregator();
const indexRouter = new IndexRouter(account);

export const index = new Index(account, getEnv('INDEX_ADDRESS'));
export const savingVault = new SavingsVault(account, getEnv('SAVINGS_VAULT_ADDRESS'));

export const indexAutoRouter = new IndexAutoRouter(indexRouter, zeroEx);
export const metaRouter = new MetaRouter(indexRouter, zeroEx, {
	[ProductType.INDEX]: [index.address],
	[ProductType.SAVINGS_VAULT]: [savingVault.address]
});
