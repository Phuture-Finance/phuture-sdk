import { ethers } from 'ethers'
import {
	Account,
	AutoRouter,
	defaultIndexRouterAddress,
	Index,
	IndexRouter,
	ProductType,
	SavingsVault,
	SavingsVaultRouter,
	subgraphIndexRepo,
	ZeroExAggregator,
	zeroExBaseUrl,
} from '@phuture/sdk'
import 'dotenv/config'
import { MetaRouter } from '@phuture/meta-router'
import { getEnv } from './utils'

const prepare = async () => {
	const account = new Account(
		new ethers.Wallet(
			getEnv('PRIVATE_KEY'),
			new ethers.providers.JsonRpcProvider(getEnv('NODE_URL')),
		),
	)

	const [zeroEx] = ZeroExAggregator.fromUrl(
		zeroExBaseUrl[await account.chainId()],
	)

	const indexRouter = new IndexRouter(
		account,
		defaultIndexRouterAddress[await account.chainId()],
	)

	const index = new Index(account, getEnv('INDEX_ADDRESS')).withRepo(
		subgraphIndexRepo(await account.chainId()),
	)

	const savingsVault = new SavingsVault(
		account,
		getEnv('SAVINGS_VAULT_ADDRESS'),
	)

	const autoRouter = new AutoRouter(indexRouter, zeroEx)

	const metaRouter = new MetaRouter(new SavingsVaultRouter(), autoRouter, {
		[index.address]: ProductType.INDEX,
		[savingsVault.address]: ProductType.SAVINGS_VAULT,
	})

	return { account, index, savingsVault, autoRouter, metaRouter }
}

export default prepare
