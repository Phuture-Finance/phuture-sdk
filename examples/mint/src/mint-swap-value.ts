import {ZeroExAggregator} from '@phuture/0x-aggregator';
import {Index} from '@phuture/index';
import {IndexRouter} from '@phuture/index-router';
import 'dotenv/config';
import {BigNumber, ethers, utils} from 'ethers';
import * as process from 'node:process';

/**
 * This example looks at minting 1ETH
 */

const amountToSellDesired = BigNumber.from(utils.parseEther('1'));

async function main() {
	const privateKey = process.env.PRIVATE_KEY;
	if (!privateKey) throw new Error('PRIVATE_KEY is not set');

	const nodeUrl = process.env.NODE_URL;
	if (!nodeUrl) throw new Error('NODE_URL is not set');

	const wallet = new ethers.Wallet(
		privateKey,
		new ethers.providers.JsonRpcProvider(nodeUrl),
	);

	const index = new Index(wallet, '0x778b8cc9d9d8e97ab7f6e100e45c1e576bb1d6d4');

	/**
	 * The index will be made up of multiple tokens, and their weighted value might not be the same.
	 * So to get the correct amounts, we call scaleAmount
	 */
	const {amounts, amountToSellQuoted} = await index.scaleAmount(
		amountToSellDesired,
	);

	const zeroEx = new ZeroExAggregator();

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
			} = await zeroEx.quote('ETH', asset, amount);

			return {
				asset,
				swapTarget,
				buyAssetMinAmount,
				assetQuote,
			};
		}),
	);

	const indexRouter = new IndexRouter(
		wallet,
		'0xb3a9b7b5728416227cb09d047fae2df36df04819',
	);

	/**
	 * Once we have our quotes in the form of an array of {@see Zero0xQuoteResponse}
	 * We can then perform the mint.
	 */
	await indexRouter.mint(
		{
			index: index.address,
			recipient: wallet.address,
			quotes,
		},
		amountToSellQuoted,
	);
}

main().catch((error) => {
	console.error(error);
	process.exit(1);
});
