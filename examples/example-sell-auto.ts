import { JsonRpcProvider, type JsonRpcSigner } from "@ethersproject/providers";
import { Wallet } from "ethers";
import { AutoRouter, Index, IndexRouter, ZeroExAggregator2 } from "../src";

/// ENVIRONMENT VARIABLES

/// Avalanche HTTP RPC URL
const RPC_URL = process.env.RPC_URL!;
if (!RPC_URL) throw new Error("Missing RPC_URL");

/// Private key
const PRIVATE_KEY = process.env.PRIVATE_KEY!;
if (!PRIVATE_KEY) throw new Error("Missing PRIVATE_KEY");

/// 0x API URL and API key
/// can be obtained from https://0x.org/pricing
const ZERO_EX_API_URL = process.env.ZERO_EX_API_URL!;
const ZERO_EX_API_KEY = process.env.ZERO_EX_API_KEY!;
if (!ZERO_EX_API_URL || !ZERO_EX_API_KEY)
	throw new Error("Missing ZERO_EX_API_URL or ZERO_EX_API_KEY");

/// 0x48f88A3fE843ccb0b5003e70B4192c1d7448bEf0 on Production
/// new 0x6A74b8C452f36ad3a9a162D2710BA012C3E5eB82
const INDEX_ADDRESS = process.env.INDEX_ADDRESS!;
if (!INDEX_ADDRESS) throw new Error("Missing INDEX_ADDRESS");

/// 0xD6dd95610fC3A3579a2C32fe06158d8bfB8F4eE9 on Production
const INDEX_ROUTER_ADDRESS = process.env.INDEX_ROUTER_ADDRESS!;
if (!INDEX_ROUTER_ADDRESS) throw new Error("Missing INDEX_ROUTER_ADDRESS");

/// Address of the input token, Use 0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE for Native
const OUTPUT_TOKEN = process.env.OUTPUT_TOKEN!;
if (!OUTPUT_TOKEN) throw new Error("Missing OUTPUT_TOKEN");

/// Amount of input token to sell
const SELL_AMOUNT = process.env.SELL_AMOUNT!;
if (!SELL_AMOUNT) throw new Error("Missing SELL_AMOUNT");

/// PREPARE ENTITIES
const provider = new Wallet(PRIVATE_KEY, new JsonRpcProvider(RPC_URL));

/// Instantiate the 0x Aggregator
/// For more customizations, you can use the constructor directly
const zeroExAggregator = new ZeroExAggregator2(
	ZERO_EX_API_URL,
	ZERO_EX_API_KEY,
);

const index = new Index(provider as unknown as JsonRpcSigner, INDEX_ADDRESS);
const indexRouter = new IndexRouter(
	provider as unknown as JsonRpcSigner,
	INDEX_ROUTER_ADDRESS,
);
const autoRouter = new AutoRouter(indexRouter, zeroExAggregator);

/// MAIN FUNCTION

async function main() {
	const select = await autoRouter.selectSell(index, SELL_AMOUNT, OUTPUT_TOKEN);
	console.log("IS BURN: ", select);
	const tx = await autoRouter.sell(true, index, SELL_AMOUNT, OUTPUT_TOKEN);

	console.log("tx: ", tx);
	return tx;
}

main().then(console.info, console.error);
