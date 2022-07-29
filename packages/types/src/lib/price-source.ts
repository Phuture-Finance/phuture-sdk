import { BigNumber, BigNumberish } from 'ethers';
import { Address } from './address';

/** ### Price Source interface */
export interface PriceSource {
	/**
	 * ### Price of a token using the 0x
	 *
	 * @param {string} buyToken Token to buy
	 * @param {string} sellToken Token to sell
	 * @param {string} sellAmount Amount of sellToken to sell
	 *
	 * @returns {Promise<BigNumber>} Price of the token in sellToken
	 */
	price(
		buyToken: Address,
		sellToken: Address,
		sellAmount: BigNumberish
	): Promise<BigNumber>;
}
