import { Address, TokenSymbol, Url } from "@phuture/types";
import axios, { AxiosInstance } from "axios";
import { BigNumber, BigNumberish } from "ethers";
import newDebug from "debug";
import {
	Zero0xPriceOptions,
	Zero0xPriceResponse,
	Zero0xQuoteOptions,
	Zero0xQuoteResponse,
	Zero0xSourcesResponse
} from "./types";

const debug = newDebug("@phuture:0x-aggregator");

/** ### Addresses of the ZeroX API endpoint */
export enum ZeroExBaseUrl {
	Mainnet = "https://api.0x.org/",
}

/** ### Facilitates swaps for end user */
export class ZeroExAggregator {
	/** ### Client instance for doing calls to the ZeroX API */
	private readonly client: AxiosInstance;

	/**
	 * ### Constructs an instance of the swap class
	 *
	 * @param baseUrl The base endpoint to query
	 *
	 * @returns {ZeroExAggregator} The 0x Aggregator instance
	 */
	constructor(baseUrl: Url = ZeroExBaseUrl.Mainnet) {
		this.client = axios.create({
			// eslint-disable-next-line @typescript-eslint/naming-convention
			baseURL: baseUrl,
			headers: {
				"Content-Type": "application/json"
			}
		});

		debug("Created client with base URL: %s", baseUrl);
	}

	/**
	 * ### Makes a call to the quote endpoint and returns
	 * a transaction request for the best price
	 *
	 * @param sellToken Token to sell
	 * @param buyToken Token to buy
	 * @param sellAmount Amount of sellToken to sell
	 * @param options Options to pass to the quote endpoint
	 *
	 * @returns Promise transaction response
	 */
	async quote(
		sellToken: Address,
		buyToken: Address,
		sellAmount: BigNumberish,
		options?: Partial<Zero0xQuoteOptions>
	): Promise<Zero0xQuoteResponse> {
		debug(
			"Making quote call for sellToken: %s, buyToken: %s, sellAmount: %s",
			sellToken,
			buyToken,
			sellAmount
		);
		const { data } = await this.client.get<Zero0xQuoteResponse>("swap/v1/quote", {
			params: {
				sellToken,
				buyToken,
				sellAmount: BigNumber.from(sellAmount).toString(),
				...options
			}
		});

		debug(
			"Received quote buyAmount: %s for buyToken: %s",
			data.buyAmount,
			buyToken
		);

		return data;
	}

	/**
	 * ### Makes a call to the price endpoint and returns the pricing
	 * that would be a available for an analogous call to /quote
	 *
	 * @param sellToken Token to sell
	 * @param buyToken Token to buy
	 * @param sellAmount Amount of sellToken to sell
	 * @param options Options to pass to the price endpoint
	 *
	 * @returns Promise transaction response
	 */
	async price(
		sellToken: Address | TokenSymbol,
		buyToken: Address,
		sellAmount: BigNumberish,
		options?: Partial<Zero0xPriceOptions>
	): Promise<Zero0xPriceResponse> {
		debug(
			"Making price call for sellToken: %s, buyToken: %s, sellAmount: %s",
			sellToken,
			buyToken,
			sellAmount
		);
		const { data } = await this.client.get<Zero0xPriceResponse>("swap/v1/price", {
			params: {
				sellToken,
				buyToken,
				sellAmount: BigNumber.from(sellAmount).toString(),
				...options
			}
		});

		debug(
			"Received price buyAmount: %s for buyToken: %s",
			data.buyAmount,
			buyToken
		);

		return data;
	}

	/**
	 * Returns the liquidity sources enabled for the chain
	 *
	 * @returns Promise transaction response
	 */
	async sources(): Promise<Zero0xSourcesResponse> {
		debug("Making sources call");
		const { data } = await this.client.get<Zero0xSourcesResponse>(
			"swap/v1/sources"
		);

		debug("Received %d sources", data.records.length);

		return data;
	}
}
