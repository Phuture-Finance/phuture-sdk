import {transformHash} from "./hash.transformer";

/**
 * ### Transforms address to short string representation.
 *
 * @param charsOnStart Number of characters to keep on the start of the address
 * @param charsOnEnd Number of characters to keep on the end of the address
 */
export const transformAddress = (charsOnStart: number = 3, charsOnEnd?: number) => transformHash(charsOnStart + 3, charsOnEnd);
