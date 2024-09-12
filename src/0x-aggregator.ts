import axios, { type AxiosInstance } from "axios";
import { BigNumber, type BigNumberish, type BytesLike } from "ethers";

/** ### Options for 0x price endpoint */
export interface Zero0xPriceOptions {
	/** ### Address of account to use for the quote */
	takerAddress: string;
	/** ### Sources to exclude from the quote endpoint call */
	excludedSources: string[];
	/** ### Slippage percentage to use for the quote */
	slippagePercentage: number;
	/** ### Skip validation of the quote */
	skipValidation: boolean;
	/** ### Gas price to use for the quote */
	gasFee: number;
}

/** ### Response from the 0x price endpoint */
export interface Zero0xPriceResponse {
	/** ### Amount of tokens to buy */
	buyAmount: BigNumberish;
	/** ### Amount of tokens to sell */
	sellAmount: BigNumberish;
	/** ### Estimated Gas */
	estimatedGas: BigNumberish;
	/** ### Gas price */
	gasPrice: BigNumberish;
}

/** ### Options for 0x quote endpoint */
export type Zero0xQuoteOptions = Zero0xPriceOptions;

/** ### Response from the 0x quote endpoint */
export interface Zero0xQuoteResponse extends Zero0xPriceResponse {
	/** ### Address of the contract to call with data */
	to: string;
	/** ### Raw call data */
	data: BytesLike;
}

/** ### Addresses of the ZeroX API endpoint */
export const zeroExBaseUrl: Record<number, string> = {
	1: "https://api.0x.org/",
	43114: "https://avalanche.api.0x.org/",
};

/** ### Facilitates swaps for end user */
export class ZeroExAggregator {
	/** ### Default options for the 0x endpoints */
	private _defaultQueryParams = {
		/** ### Slippage protection for the aggregator */
		enableSlippageProtection: true,
		affiliateAddress: "0x6575a93abdff85e5a6b97c2db2b83bcebc3574ec",
	};

	/**
	 * ### Constructs an instance of the swap class
	 *
	 * @param client The axios client to use for the API calls
	 *
	 * @returns {ZeroExAggregator} The 0x Aggregator instance
	 */
	constructor(private readonly client: AxiosInstance) {}

	/**
	 * ### Creates a new client instance for the 0x API for a url
	 *
	 * @param baseUrl The base endpoint to query
	 * @param apiKey The API key to use for the query
	 *
	 * @returns {ZeroExAggregator} The 0x Aggregator instance
	 */
	static fromUrl(
		baseUrl: string,
		apiKey?: string,
	): [ZeroExAggregator, AbortController] {
		const abortController = new AbortController();

		const client = axios.create({
			signal: abortController?.signal,
			// eslint-disable-next-line @typescript-eslint/naming-convention
			baseURL: baseUrl,
			headers: {
				"Content-Type": "application/json",
				...(apiKey ? { "0x-api-key": apiKey } : {}),
			},
			validateStatus: (status) => status < 500,
		});

		return [new ZeroExAggregator(client), abortController];
	}

	/**
	 * ### Makes a call to the slippage endpoint and returns the slippage
	 *
	 * @returns True if slippage protection is enabled
	 */
	get slippageProtection(): boolean {
		return this._defaultQueryParams.enableSlippageProtection;
	}

	/**
	 * ### Sets the slippage protection for the aggregator
	 *
	 * @param slippageProtection Whether to enable slippage protection
	 */
	set slippageProtection(slippageProtection: boolean) {
		this._defaultQueryParams.enableSlippageProtection = slippageProtection;
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
		sellToken: string,
		buyToken: string,
		sellAmount: BigNumberish,
		options?: Partial<Zero0xQuoteOptions>,
	): Promise<Zero0xQuoteResponse> {
		const { data } = await this.client.get<Zero0xQuoteResponse>(
			"/swap/v1/quote",
			{
				params: {
					...this._defaultQueryParams,
					sellToken,
					buyToken,
					sellAmount: BigNumber.from(sellAmount).toString(),
					...options,
				},
			},
		);

		// TODO: cover error codes and add retry logic

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
		sellToken: string,
		buyToken: string,
		sellAmount: BigNumberish,
		options?: Partial<Zero0xPriceOptions>,
	): Promise<Zero0xPriceResponse> {
		const { data } = await this.client.get<Zero0xPriceResponse>(
			"/swap/v1/price",
			{
				params: {
					...this._defaultQueryParams,
					sellToken,
					buyToken,
					sellAmount: BigNumber.from(sellAmount).toString(),
					...options,
				},
			},
		);

		// TODO: cover error codes and add retry logic

		return data;
	}
}
