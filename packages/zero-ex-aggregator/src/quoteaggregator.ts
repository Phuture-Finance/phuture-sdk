import {TransactionRequest} from '@ethersproject/abstract-provider';
import axios from 'axios';
import {BigNumber, BigNumberish, utils as ethersUtils} from 'ethers';
import {QuotePayload} from './interface';
import modifyQuotePayloadForQuery from './utility';

/**
 * ### Addresses of the ZeroX API endpoint
 */
export enum QuotingEndpoint {
	zeroX = 'https://api.0x.org/swap/v1/quote',
}

/**
 * ### Facilitates swaps for end user
 */
export class QuoteAggregator {
	public readonly quoteEndpoint: QuotingEndpoint;

	/**
	 * ### Constructs an instance of the swap class
	 * @param quoteEndpoint The endpoint to query for quotes
	 */
	constructor(quoteEndpoint = QuotingEndpoint.zeroX) {
		this.quoteEndpoint = quoteEndpoint;
	}

	/**
	 * ### Makes a call to the quote endpoint and returns a transaction request for the best price
	 * @param payload user provided payload, un checked
	 * @param slippage optional slippage limit
	 * @param gasFee optional gas fee limit
	 * @returns Promise transaction response
	 */
	async quote(
		payload: QuotePayload,
		slippage?: BigNumberish,
		gasFee?: BigNumberish,
	): Promise<TransactionRequest> {
		try {
			await this.errorBoundary(payload, slippage, gasFee);

			// Setup
			const url = new URL(this.quoteEndpoint);
			url.search = new URLSearchParams(
				modifyQuotePayloadForQuery(payload, slippage, gasFee),
			).toString();

			// Execute
			return await axios.get(url.toString());
		} catch (error: unknown) {
			throw new Error(error as string);
		}
	}

	/**
	 * ### Error boundary for public facing quote method
	 * @param param0 User provided params
	 * @param slippage Optional slippage
	 * @param gasFee Optional gas fee
	 * @returns String of all found errors
	 */
	private async errorBoundary(
		{buyToken, sellAmount, sellToken, takerAddress}: QuotePayload,
		slippage: BigNumberish | undefined,
		gasFee: BigNumberish | undefined,
	): Promise<void> {
		const errorBoundary = new Promise<void>((resolve, reject) => {
			const errors: string[] = [];
			try {
				BigNumber.from(sellAmount);
			} catch {
				errors.push(`Amount provided could not be parsed into a big number`);
			}

			if (slippage) {
				try {
					BigNumber.from(slippage);
				} catch {
					errors.push(`Found a slippage value but was unable to parse it`);
				}
			}

			if (gasFee) {
				try {
					BigNumber.from(gasFee);
				} catch {
					errors.push(`Found a gas fee value but was unable to parse it`);
				}
			}

			if (!buyToken) {
				errors.push('A buy token is required');
			}

			if (!sellToken) {
				errors.push('A sell token is required');
			}

			if (!ethersUtils.isAddress(takerAddress)) {
				errors.push(`Address is invalid: ${takerAddress}`);
			}

			if (errors.length > 0) {
				reject(errors.join('\n'));
			} else {
				resolve();
			}
		});
		return errorBoundary;
	}
}
