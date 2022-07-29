import { BigNumber, utils } from 'ethers';
import { getEnv } from './app/utils';
import autoBuy from './app/auto-buy';
import autoSell from './app/auto-sell';

/**
 * This example looks at burning 1 PDI
 */
const amountToSellDesired = BigNumber.from(utils.parseEther(getEnv('AMOUNT')));

const func = getEnv('IS_SELL') === 'true' ? autoSell : autoBuy;

const main = async () => {
	await func(amountToSellDesired);
};

main().catch(console.error);
