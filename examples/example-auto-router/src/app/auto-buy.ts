import {BigNumber} from 'ethers';
import {autoRouter, index} from './common';

export default async function autoBuy(amountToSellDesired: BigNumber) {
	await autoRouter.autoBuy(index, amountToSellDesired);
}
