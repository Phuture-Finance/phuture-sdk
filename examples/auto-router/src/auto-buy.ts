import {BigNumber, utils} from 'ethers';
import {getEnv} from './utils';
import {autoRouter} from './common';

/**
 * This example looks at minting 1 ETH
 */
const amountToSellDesired = BigNumber.from(utils.parseEther('1'));

async function main() {
	await autoRouter.autoBuy(getEnv('INDEX_ADDRESS'), amountToSellDesired);
}

main().catch((error) => {
	console.error(error);
});
