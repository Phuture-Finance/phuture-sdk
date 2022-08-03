import { BigNumber, utils } from 'ethers';
import { getEnv } from './app/utils';
import autoBuy from './app/auto-buy';
import autoSell from './app/auto-sell';

/**
 * This example looks at burning 1 PDI
 */
const amountToSellDesired = BigNumber.from(utils.parseEther(getEnv('AMOUNT')));

const main = async () => {
	const isSell = process.env['IS_SELL'] === 'true';
	await (isSell ? autoSell : autoBuy)(amountToSellDesired);
};

main().catch(console.error);
