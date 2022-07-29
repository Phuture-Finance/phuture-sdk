import type { Address } from '@phuture/types';

/** ### Index Repository Interface */
export interface IndexRepo {
	/**
	 * ### Get the holders of the index
	 *
	 * @param {Address} indexAddress The address of the index
	 *
	 * @returns {Promise<Address[]>} Addresses of the holders
	 */
	holders(indexAddress: Address): Promise<Address[]>;

	/**
	 * ### Get the count of holders of the index
	 *
	 * @param {Address} indexAddress The address of the index
	 *
	 * @returns {Promise<number>} The count of holders
	 */
	holdersCount(indexAddress: Address): Promise<number>;

	/**
	 * ### Get fees of the index
	 *
	 * @param {Address} indexAddress The address of the index
	 *
	 * @returns {Promise<Fees>} Fees of the index
	 */
	fees(indexAddress: Address): Promise<Fees>;

	/**
	 * ### Get price of the index in ETH
	 *
	 * @param indexAddress The address of the index
	 *
	 * @returns Price of the index in ETH
	 */
	priceEth(indexAddress: Address): Promise<string>;
}

/** ### Fees Interface */
export interface Fees {
	/** The fee for the creation of a new index */
	minting: number;

	/** The fee for managing the index */
	management: number;

	/** The fee for the burning of an index */
	redemption: number;
}
