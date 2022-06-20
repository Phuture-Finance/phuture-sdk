/**
 * ### Object to be provided as an argument to the swap method
 */
export interface Payload {
	sellAmount: string;
	buyToken: string;
	sellToken: string;
	takerAddress: string;
}

/**
 * ### Optional parts of the param
 */
export type QueryPayload = Payload & {
	slippagePercentage?: string;
	gasFee?: string;
};
