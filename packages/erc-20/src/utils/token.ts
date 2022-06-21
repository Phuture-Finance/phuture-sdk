import invariant from 'tiny-invariant';
import {validateAndParseAddress} from './validate-an-parse-address';
import {BaseCurrency} from './base-currency';
import {NativeCurrency} from './native-currency';
// Import { Currency } from "./currency";

/**
 * Represents an ERC20 token with a unique address and some metadata.
 */
export class Token extends BaseCurrency {
	public get isNative() {
		return false;
	}

	public get isToken() {
		return true;
	}

	/**
	 * The contract address on the chain on which this token lives
	 */
	public readonly address: string;

	public constructor(
		chainId: number,
		address: string,
		decimals: number,
		symbol?: string,
		name?: string,
	) {
		super(chainId, decimals, symbol, name);
		this.address = validateAndParseAddress(address);
	}

	/**
	 * Returns true if the two tokens are equivalent, i.e. have the same chainId and address.
	 * @param other other token to compare
	 */
	public equals(other: this): boolean {
		return (
			other.isToken &&
			this.chainId === other.chainId &&
			this.address === other.address
		);
	}

	/**
	 * Returns true if the address of this token sorts before the address of the other token
	 * @param other other token to compare
	 * @throws if the tokens have the same address
	 * @throws if the tokens are on different chains
	 */
	public sortsBefore(other: Token): boolean {
		invariant(this.chainId === other.chainId, 'CHAIN_IDS');
		invariant(this.address !== other.address, 'ADDRESSES');
		return this.address.toLowerCase() < other.address.toLowerCase();
	}

	/**
	 * Return this token, which does not need to be wrapped
	 */
	public get wrapped(): this {
		return this;
	}
}
