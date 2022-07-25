import {Address} from '@phuture/types';
import {BigNumberish, BytesLike} from 'ethers';

/** ### Options for 0x price endpoint */
export interface Zero0xPriceOptions {
	/** ### Address of account to use for the quote */
	takerAddress: Address;
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
export interface Zero0xQuoteOptions extends Zero0xPriceOptions {}

/** ### Response from the 0x quote endpoint */
export interface Zero0xQuoteResponse extends Zero0xPriceResponse {
	/** ### Address of the contract to call with data */
	to: Address;
	/** ### Raw call data */
	data: BytesLike;
}

/** ### Response from the 0x sources endpoint */
export interface Zero0xSourcesResponse {
	/** ### Array of sources */
	records: string[];
}
