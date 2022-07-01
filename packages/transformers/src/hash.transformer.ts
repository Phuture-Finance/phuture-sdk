/**
 * ### Transforms hash to short string representation.
 *
 * @param charsOnStart Number of characters to keep on start of the hash
 * @param charsOnEnd Number of characters to keep on end of the hash
 *
 * @returns function that transforms hash to short string representation
 */
export const transformHash = (charsOnStart = 3, charsOnEnd?: number) => {
	if (charsOnStart < 0)
		throw new RangeError('charsOnStart must be greater than or equal to 0');

	if (charsOnEnd && charsOnEnd < 0)
		throw new RangeError('charsOnEnd must be greater than or equal to 0');

	return (hash: string): string =>
		`${hash.slice(0, Math.max(0, charsOnStart))}…${hash.slice(
			Math.max(0, hash.length - (charsOnEnd ?? charsOnStart)),
		)}`;
};
