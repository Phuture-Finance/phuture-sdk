/**
 * ### Object to be provided as an argument to the swap method
 */
export interface QuotePayload {
	sellAmount: string;
	buyToken: string;
	sellToken: string;
	takerAddress: string;
}

/**
 * ### Optional parts of the param
 */
export type QueryPayload = QuotePayload & {
	slippagePercentage?: string;
	gasFee?: string;
};
