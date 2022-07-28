import {BigNumber, ethers} from 'ethers';
import {ZeroExAggregator} from '../../../packages/0x-aggregator-';
import {IndexRouter} from '../../../packages/index-router-';
import {AutoRouter} from '../../../packages/auto-router-';
import dotenv from 'dotenv';
import {Account} from '../../../packages/account-';
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
