import { BigNumber } from 'ethers';
import { getEnv } from './app/utils';
import buySavingsVault from './app/auto-buy';
import { sellSavingsVault } from './app/auto-sell';
import { harvest } from './app/harvest';

const amount = BigNumber.from(getEnv('AMOUNT'));

const main = async () => {
	if (process.env['TYPE'] === 'buy') {
		console.dir(await buySavingsVault(amount));
	} else if (process.env['TYPE'] === 'sell') {
		console.dir(await sellSavingsVault(amount));
	} else if (process.env['TYPE'] == 'harvest') {
		await harvest();
	}
};

main().catch(console.error);
