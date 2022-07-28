import process from 'node:process';
import {ZeroExAggregator} from '../../../packages/0x-aggregator-';
import {Index} from '../../../packages/index-';
import {IndexRouter} from '../../../packages/index-router-';
import dotenv from 'dotenv';
import {BigNumber, ethers, utils} from 'ethers';
import {Account} from '../../../packages/account-';

dotenv.config();

/**
 * This example looks at minting 1ETH
 */

async function main() {
	const privateKey = process.env.PRIVATE_KEY;
	if (!privateKey) throw new Error('PRIVATE_KEY is not set');

	const nodeUrl = process.env.NODE_URL;
	if (!nodeUrl) throw new Error('NODE_URL is not set');

	const account = new Account(
		new ethers.Wallet(
			privateKey,
			new ethers.providers.JsonRpcProvider(nodeUrl),
		),
	);

	const indexAddress = process.env.INDEX_ADDRESS;
	if (!indexAddress) throw new Error('INDEX_ADDRESS is not set');

	const index = new Index(account, indexAddress);

	const amountToSellDesired = await index.contract.balanceOf(account.address())

	const {amounts, amountToSell} = await index.scaleAmount(amountToSellDesired);

	const zeroExAggregatorUrl = process.env.ZERO_EX_AGGREGATOR_URL;
	if (!zeroExAggregatorUrl)
		throw new Error('ZERO_EX_AGGREGATOR_URL is not set');

	const zeroEx = new ZeroExAggregator(zeroExAggregatorUrl);

	/**
	 * After we have the correctly scaled amounts, we can then get quotes for each amount.
	 * This will return a {@see Zero0xQuoteResponse} that can be passed straight into the mint method
	 */
	const quotes = await Promise.all(
		Object.entries(amounts).map(async ([asset, amount]) => {
			const {
				buyAmount: buyAssetMinAmount,
				to: swapTarget,
				data: assetQuote,
			} = await zeroEx.quote(
				'0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2', // WETH
				asset,
				amount,
			);

			return {
				asset,
				swapTarget,
				buyAssetMinAmount,
				assetQuote,
			};
		}),
	);

	const indexRouterAddress = process.env.INDEX_ROUTER_ADDRESS;
	if (!indexRouterAddress) throw new Error('INDEX_ROUTER_ADDRESS is not set');

	const indexRouter = new IndexRouter(account, indexRouterAddress);

	/**
	 * Once we have our quotes in the form of an array of {@see Zero0xQuoteResponse}
	 * We can then perform the mint.
	 */
	await indexRouter.burnSwap(
		index,
		amountToSell,
		await account.address(),
		{
			index: index.address,
			recipient: await account.address(),
			quotes,
		},
	);
}

main().catch((error) => {
	console.error(error);
});
