import {BigNumber, utils} from 'ethers';
import {getEnv} from './utils';
import {autoRouter} from './common';

/**
 * This example looks at burning 1 PDI
 */
const amountToSellDesired = BigNumber.from(utils.parseEther('1'));

async function main() {
	await autoRouter.autoSell(getEnv('INDEX_ADDRESS'), amountToSellDesired);
}

main().catch((error) => {
	console.error(error);
});
