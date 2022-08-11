import { ethers } from 'ethers';
import {
	Account,
	AutoRouter,
	Index,
	IndexRouter,
	subgraphIndexRepo,
	SubgraphIndexRepo,
	ZeroExAggregator,
	zeroExBaseUrl,
} from '@phuture/sdk';
import 'dotenv/config';
import { getEnv } from './utils';

const prepare = async () => {
	const account = new Account(
		new ethers.Wallet(
			getEnv('PRIVATE_KEY'),
			new ethers.providers.JsonRpcProvider(getEnv('NODE_URL'))
		)
	);

	const zeroEx = new ZeroExAggregator(zeroExBaseUrl[await account.chainId()]);

	const indexRouter = new IndexRouter(
		account,
		'0x2ca1bA7fF498DB460DD40F43e596c9A2eF35a066'
	);

	const index = new Index(account, getEnv('INDEX_ADDRESS')).withRepo(
		subgraphIndexRepo(await account.chainId())
	);

	const autoRouter = new AutoRouter(indexRouter, zeroEx);

	return { account, index, autoRouter };
};

export default prepare;
