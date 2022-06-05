import {transformHash} from './hash.transformer';

/**
 * ### Transforms transaction to short string representation.
 *
 * @param charsOnStart Number of characters to keep on the start of the transaction
 * @param charsOnEnd Number of characters to keep on the end of the transaction
 * @returns function that transforms transaction to short string representation
 */
export const transformTransaction = (charsOnStart = 15, charsOnEnd?: number) =>
	transformHash(charsOnStart, charsOnEnd);
