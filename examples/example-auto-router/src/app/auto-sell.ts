import { BigNumber } from 'ethers';
import { autoRouter, index } from './common';

export default async function autoSell(amountToSellDesired: BigNumber) {
	await autoRouter.autoSell(index, amountToSellDesired);
}
