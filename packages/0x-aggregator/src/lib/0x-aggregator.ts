import type {Address, Networkish, TokenSymbol, Url} from '@phuture/types';
import {Network} from '@phuture/types';
import axios, {AxiosInstance} from 'axios';
import {BigNumber, BigNumberish} from 'ethers';
import newDebug from 'debug';
import {
	Zero0xPriceOptions,
	Zero0xPriceResponse,
	Zero0xQuoteOptions,
	Zero0xQuoteResponse,
	Zero0xSourcesResponse,
} from './types';

const debug = newDebug('@phuture:0x-aggregator');

/** ### Addresses of the ZeroX API endpoint */
export const zeroExBaseUrl: Record<Networkish, Url> = {
	[Network.Mainnet]: 'https://api.0x.org/',
	[Network.CChain]: 'https://avalanche.api.0x.org/',
};

/** ### Facilitates swaps for end user */
export class ZeroExAggregator {
	/** ### Default options for the 0x endpoints */
	private _defaultQueryParams = {
		/** ### Slippage protection for the aggregator */
		enableSlippageProtection: true,
	};

	/**
	 * ### Constructs an instance of the swap class
	 *
	 * @param client The axios client to use for the API calls
	 *
	 * @returns {ZeroExAggregator} The 0x Aggregator instance
	 */
	constructor(private readonly client: AxiosInstance) {
	}

	/**
	 * ### Creates a new client instance for the 0x API for a url
	 *
	 * @param baseUrl The base endpoint to query
	 * @param apiKey The API key to use for the query
	 *
	 * @returns {ZeroExAggregator} The 0x Aggregator instance
	 */
	static fromUrl(baseUrl: Url, apiKey?: string): [ZeroExAggregator, AbortController] {
		const abortController = new AbortController();

		const client = axios.create({
			signal: abortController?.signal,
			// eslint-disable-next-line @typescript-eslint/naming-convention
			baseURL: baseUrl,
			headers: {
				'Content-Type': 'application/json',
				...(apiKey ? {'0x-api-key': apiKey} : {}),
			},
			validateStatus: (status) => status < 500,
		});

		debug('Created client with base URL: %s', baseUrl);

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
		sellToken: Address,
		buyToken: Address,
		sellAmount: BigNumberish,
		options?: Partial<Zero0xQuoteOptions>
	): Promise<Zero0xQuoteResponse> {
		debug(
			'Making quote call for sellToken: %s, buyToken: %s, sellAmount: %s',
			sellToken,
			buyToken,
			sellAmount
		);
		const {data} = await this.client.get<Zero0xQuoteResponse>(
			'/swap/v1/quote',
			{
				params: {
					...this._defaultQueryParams,
					sellToken,
					buyToken,
					sellAmount: BigNumber.from(sellAmount).toString(),
					...options,
				},
			}
		);

		// TODO: cover error codes and add retry logic

		debug(
			'Received quote buyAmount: %s for buyToken: %s',
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
			'Making price call for sellToken: %s, buyToken: %s, sellAmount: %s',
			sellToken,
			buyToken,
			sellAmount
		);
		const {data} = await this.client.get<Zero0xPriceResponse>(
			'/swap/v1/price',
			{
				params: {
					...this._defaultQueryParams,
					sellToken,
					buyToken,
					sellAmount: BigNumber.from(sellAmount).toString(),
					...options,
				},
			}
		);

		// TODO: cover error codes and add retry logic

		debug(
			'Received price buyAmount: %s for buyToken: %s',
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
		debug('Making sources call');
		const {data} = await this.client.get<Zero0xSourcesResponse>(
			'/swap/v1/sources'
		);

		// TODO: cover error codes and add retry logic

		debug('Received %d sources', data.records.length);

		return data;
	}
}
