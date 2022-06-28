import { ZeroExAggregator } from "@phuture/0x-aggregator";
import { Index } from "@phuture/index";
import { IndexRouter } from "@phuture/index-router";
import "dotenv/config";
import { BigNumber, ethers, utils } from "ethers";
import * as process from "process";

const amountToSellDesired = BigNumber.from(utils.parseEther("1"));

async function main() {
	const privateKey = process.env.PRIVATE_KEY;
	if (!privateKey) throw new Error("PRIVATE_KEY is not set");

	const nodeUrl = process.env.NODE_URL;
	if (!nodeUrl) throw new Error("NODE_URL is not set");

	const wallet = new ethers.Wallet(
		privateKey,
		new ethers.providers.JsonRpcProvider(nodeUrl)
	);

	const index = new Index(wallet, "0x778b8cc9d9d8e97ab7f6e100e45c1e576bb1d6d4");

	const { amounts, amountToSellQuoted } = await index.scaleAmount(
		amountToSellDesired
	);

	const zeroEx = new ZeroExAggregator();

	const quotes = await Promise.all(
		Object.entries(amounts).map(async ([asset, amount]) => {
			const {
				buyAmount: buyAssetMinAmount,
				to: swapTarget,
				data: assetQuote,
			} = await zeroEx.quote("ETH", asset, amount);

			return {
				asset,
				swapTarget,
				buyAssetMinAmount,
				assetQuote,
			};
		})
	);

	const indexRouter = new IndexRouter(
		wallet,
		"0xb3a9b7b5728416227cb09d047fae2df36df04819"
	);

	await indexRouter.mint(
		{
			index: index.address,
			recipient: wallet.address,
			quotes,
		},
		amountToSellQuoted
	);
}

main().catch((error) => {
	console.error(error);
	process.exit(1);
});
