import {TransactionResponse} from '@ethersproject/abstract-provider';
import axios from 'axios';
import {
	BigNumber,
	BigNumberish,
	ethers,
	Signer,
	utils as ethersUtils,
} from 'ethers';
import {Payload, QueryPayload} from './interface';

const zeroXendPoint = 'https://api.0x.org/swap/v1/quote';

/**
 * ### Facilitates swaps for end user
 */
export class Swap {
	public readonly provider: Signer | ethers.providers.Provider;

	/**
	 * ### Constructs an instance of the swap class
	 * @param signerOrProvider the provider to user
	 */
	constructor(signerOrProvider?: Signer | ethers.providers.Provider) {
		this.provider = signerOrProvider ?? ethers.providers.getDefaultProvider();
	}

	/**
	 * Takes the provided payload parameters and combines them/normalizes them
	 * @param payload the payload provided by the user executing the swap
	 * @param slippage optional slippage percentage limit
	 * @param fee optional gas fee limit
	 * @returns Partial<QueryPayload>
	 */
	modifyPayloadForQuery(
		payload: Payload,
		slippage?: BigNumberish,
		fee?: BigNumberish,
	): Partial<QueryPayload> {
		const query: Record<string, string> = {};
		payload.sellAmount = BigNumber.from(payload.sellAmount).toString();
		if (slippage) {
			query.slippagePercentage = BigNumber.from(slippage).toString();
		}

		if (fee) {
			query.gasFee = BigNumber.from(fee).toString();
		}

		return Object.assign(payload, query);
	}

	/**
	 * ### Swap call
	 * @param payload user provided payload, un checked
	 * @param slippage optional slippage limit
	 * @param gasFee optional gas fee limit
	 * @returns Promise transaction response
	 */
	async swap(
		payload: Payload,
		slippage?: BigNumberish,
		gasFee?: BigNumberish,
	): Promise<TransactionResponse> {
		try {
			await this.errorBoundary(payload, slippage, gasFee);

			// Setup
			const url = new URL(zeroXendPoint);
			url.search = new URLSearchParams(
				this.modifyPayloadForQuery(payload, slippage, gasFee),
			).toString();

			// Execute
			const response = await axios.get(url.toString());
			return await this.provider.sendTransaction(response.data);
		} catch (error: unknown) {
			throw new Error(error as string);
		}
	}

	/**
	 * ### Error boundary for public facing swap method
	 * @param param0 User provided params
	 * @param slippage Optional slippage
	 * @param gasFee Optional gas fee
	 * @returns String of all found errors
	 */
	private async errorBoundary(
		{buyToken, sellAmount, sellToken, takerAddress}: Payload,
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
				reject(errors);
			} else {
				resolve();
			}
		});
		return errorBoundary;
	}
}
