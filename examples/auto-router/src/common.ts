import {ethers} from 'ethers';
import {ZeroExAggregator} from '@phuture/0x-aggregator';
import {IndexRouter} from '@phuture/index-router';
import {AutoRouter} from '@phuture/auto-router';
import dotenv from 'dotenv';
import {getEnv} from './utils';

dotenv.config();

const wallet = new ethers.Wallet(
	getEnv('PRIVATE_KEY'),
	new ethers.providers.JsonRpcProvider(getEnv('NODE_URL')),
);

const zeroEx = new ZeroExAggregator(getEnv('ZERO_EX_AGGREGATOR_URL'));
const indexRouter = new IndexRouter(wallet, getEnv('INDEX_ROUTER_ADDRESS'));

export const autoRouter = new AutoRouter(wallet, indexRouter, zeroEx, {
	amount: 100,
	tokenAddress: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', // Usdc
});
