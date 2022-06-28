import {Address, Url} from '@phuture/types';
import axios, {AxiosInstance} from 'axios';
import {BigNumber, BigNumberish} from 'ethers';
import {
	Zero0xPriceOptions,
	Zero0xPriceResponse,
	Zero0xQuoteOptions,
	Zero0xQuoteResponse,
	Zero0xSourcesResponse,
} from './types';

/**
 * ### Addresses of the ZeroX API endpoint
 */
export enum ZeroExBaseUrl {
	Mainnet = 'https://api.0x.org/',
}

/**
 * ### Facilitates swaps for end user
 */
export class ZeroExAggregator {
	private readonly client: AxiosInstance;

	/**
	 * ### Constructs an instance of the swap class
	 * @param baseUrl The base endpoint to query
	 */
	constructor(baseUrl: Url = ZeroExBaseUrl.Mainnet) {
		this.client = axios.create({
			baseURL: baseUrl,
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
		});
	}

	/**
	 * ### Makes a call to the quote endpoint and returns a transaction request for the best price
	 * @param sellToken
	 * @param buyToken
	 * @param sellAmount
	 * @param options
	 * @returns Promise transaction response
	 */
	async quote(
		sellToken: Address,
		buyToken: Address,
		sellAmount: BigNumberish,
		options: Partial<Zero0xQuoteOptions> = {slippagePercentage: 0.05},
	): Promise<Zero0xQuoteResponse> {
		const parameters = {
			sellToken,
			buyToken,
			sellAmount: BigNumber.from(sellAmount).toString(),
			...options,
		};

		const {data} = await this.client.get<Zero0xQuoteResponse>('swap/v1/quote', {
			params: parameters,
		});

		return data;
	}

	async price(
		sellToken: Address | string,
		buyToken: Address,
		sellAmount: BigNumberish,
		options: Partial<Zero0xPriceOptions> = {slippagePercentage: 0.05},
	): Promise<Zero0xPriceResponse> {
		const parameters = {
			sellToken,
			buyToken,
			sellAmount: BigNumber.from(sellAmount).toString(),
			...options,
		};

		const {data} = await this.client.get<Zero0xPriceResponse>('swap/v1/price', {
			params: parameters,
		});

		return data;
	}

	async sources(): Promise<Zero0xSourcesResponse> {
		const {data} = await this.client.get<Zero0xSourcesResponse>(
			'swap/v1/sources',
		);

		return data;
	}
}
