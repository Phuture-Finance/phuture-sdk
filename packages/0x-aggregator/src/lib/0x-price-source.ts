import { PriceSource } from '@phuture/types';
import { BigNumber } from 'ethers';
import { ZeroExAggregator } from './0x-aggregator';

/** Price Source for 0x */
export class ZeroExPriceSource implements PriceSource {
	/**
	 * ### Constructs an instance of the 0x PriceSource
	 *
	 * @param {ZeroExAggregator} client Client instance for making calls to the 0x
	 */
	constructor(private readonly client: ZeroExAggregator) {}

	/**
	 * ### Price of a token using the 0x
	 *
	 * @param {string} buyToken Token to buy
	 * @param {string} sellToken Token to sell
	 * @param {string} sellAmount Amount of sellToken to sell
	 *
	 * @returns {Promise<BigNumber>} Price of the token in sellToken
	 */
	public async price(
		buyToken: string,
		sellToken: string,
		sellAmount: string
	): Promise<BigNumber> {
		const { buyAmount } = await this.client.quote(
			sellToken,
			buyToken,
			sellAmount
		);
		return BigNumber.from(buyAmount);
	}
}
