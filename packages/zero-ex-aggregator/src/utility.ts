import {BigNumberish, BigNumber} from 'ethers';
import {QuotePayload, QueryPayload} from './interface';

/**
 * Takes the provided payload parameters and combines them/normalizes them
 * @param payload the payload provided by the user executing the swap
 * @param slippage optional slippage percentage limit
 * @param fee optional gas fee limit
 * @returns Partial<QueryPayload>
 */
const modifyQuotePayloadForQuery = (
	payload: QuotePayload,
	slippage?: BigNumberish,
	fee?: BigNumberish,
): Partial<QueryPayload> => {
	const query: Record<string, string> = {};
	payload.sellAmount = BigNumber.from(payload.sellAmount).toString();
	if (slippage) {
		query.slippagePercentage = BigNumber.from(slippage).toString();
	}

	if (fee) {
		query.gasFee = BigNumber.from(fee).toString();
	}

	const modifiedPayload: Partial<QueryPayload> = {...payload, ...query};
	return modifiedPayload;
};

export default modifyQuotePayloadForQuery;
