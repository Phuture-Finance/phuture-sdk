import { ethers } from 'ethers';
import {
	Account,
	Index, AutoRouter,
	IndexRouter, MetaRouter, ProductType, SavingsVault,
	ZeroExAggregator, SavingsVaultRouter,
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

export const autoRouter = new AutoRouter(indexRouter, zeroEx);
export const metaRouter = new MetaRouter(new SavingsVaultRouter(), autoRouter, {
	[ProductType.INDEX]: [index.address],
	[ProductType.SAVINGS_VAULT]: [savingVault.address]
});

