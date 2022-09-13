import { Anatomy } from './anatomy';

/** ### Phuture Product interface */
export interface PhutureProduct {
	/**
	 * ### Anatomy of Phuture Product
	 * @returns {Promise<Anatomy>} Anatomy of the product
	 */
	anatomy(): Promise<Anatomy>;

	/**
	 * ### Inactive anatomy of Phuture Product
	 * @returns {Promise<Anatomy>} Inactive anatomy of the product
	 */
	inactiveAnatomy(): Promise<Anatomy>;

	/**
	 * ### Constituents [active + inactive assets] of Phuture Product
	 * @returns {Promise<Anatomy>} Constituents of the product
	 */
	constituents(): Promise<Anatomy>;
}
