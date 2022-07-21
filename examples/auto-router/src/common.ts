import {BigNumber, ethers} from 'ethers';
import {ZeroExAggregator} from '@phuture/0x-aggregator';
import {IndexRouter} from '@phuture/index-router';
import {AutoRouter} from '@phuture/auto-router';
import dotenv from 'dotenv';
import {Account} from '@phuture/account';
import {getEnv} from './utils';

dotenv.config();

const account = new Account(
	new ethers.Wallet(
		getEnv('PRIVATE_KEY'),
		new ethers.providers.JsonRpcProvider(getEnv('NODE_URL')),
	),
);

const zeroEx = new ZeroExAggregator(getEnv('ZERO_EX_AGGREGATOR_URL'));
const indexRouter = new IndexRouter(account, getEnv('INDEX_ROUTER_ADDRESS'));

export const autoRouter = new AutoRouter(indexRouter, zeroEx);
