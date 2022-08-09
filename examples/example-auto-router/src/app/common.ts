import { ethers } from 'ethers';
import {
	Account,
	AutoRouter,
	Index,
	IndexRouter,
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

const zeroEx = new ZeroExAggregator("https://avalanche.api.0x.org");
const indexRouter = new IndexRouter(account, "0x2ca1bA7fF498DB460DD40F43e596c9A2eF35a066");

export const index = new Index(account, getEnv('INDEX_ADDRESS'));

export const autoRouter = new AutoRouter(indexRouter, zeroEx);
