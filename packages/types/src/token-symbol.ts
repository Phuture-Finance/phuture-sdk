/**
 * ### Token symbol
 *
 * @example
 * const symbol: TokenSymbol = 'PHTR';
 */
export type TokenSymbol = string;

export const isTokenSymbol = (
	tokenSymbol: unknown,
): tokenSymbol is TokenSymbol => typeof tokenSymbol === 'string';
