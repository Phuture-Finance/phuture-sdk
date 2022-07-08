import {BigNumber, BigNumberish} from 'ethers';
import {Address} from './address';

export interface PriceSource {
	price(
		sellToken: Address,
		buyToken: Address,
		sellAmount: BigNumberish,
	): Promise<BigNumber>;
}
