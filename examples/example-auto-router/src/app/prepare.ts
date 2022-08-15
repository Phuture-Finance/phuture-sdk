import { ethers } from 'ethers';
import {
	Account,
	AutoRouter, defaultIndexRouterAddress,
	Index,
	IndexRouter,
	subgraphIndexRepo,
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

	const [zeroEx] = ZeroExAggregator.fromUrl(
		zeroExBaseUrl[await account.chainId()]
	);

	const indexRouter = new IndexRouter(
		account,
		defaultIndexRouterAddress[await account.chainId()]
	);

	const index = new Index(account, getEnv('INDEX_ADDRESS')).withRepo(
		subgraphIndexRepo(await account.chainId())
	);

	const autoRouter = new AutoRouter(indexRouter, zeroEx);

	return { account, index, autoRouter };
};

export default prepare;
