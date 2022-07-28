import {ethers} from 'ethers';
import {Account, AutoRouter, Index, IndexRouter, ZeroExAggregator} from '@phuture/sdk';
import 'dotenv/config';
import {getEnv} from './utils';

const account = new Account(
	new ethers.Wallet(
		getEnv('PRIVATE_KEY'),
		new ethers.providers.JsonRpcProvider(getEnv('NODE_URL')),
	),
);

const zeroEx = new ZeroExAggregator();
const indexRouter = new IndexRouter(account, getEnv('INDEX_ROUTER_ADDRESS'));

export const index = new Index(account, getEnv('INDEX_ADDRESS'));

export const autoRouter = new AutoRouter(indexRouter, zeroEx);
