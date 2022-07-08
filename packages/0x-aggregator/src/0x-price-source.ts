import {PriceSource} from '@phuture/types';
import {BigNumber} from 'ethers';
import {ZeroExAggregator} from './0x-aggregator';

class ZeroExPriceSource implements PriceSource {
	constructor(private readonly client: ZeroExAggregator) {}

	public async price(
		sellToken: string,
		buyToken: string,
		sellAmount: string,
	): Promise<BigNumber> {
		const {buyAmount} = await this.client.quote(
			sellToken,
			buyToken,
			sellAmount,
		);
		return BigNumber.from(buyAmount);
	}
}
