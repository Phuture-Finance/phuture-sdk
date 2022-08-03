import { BigNumber } from 'ethers';
import { account, autoRouter, index } from './common';
import { Erc20Permit } from '@phuture/erc-20';

export default async function autoSell(amountToSellDesired: BigNumber) {
	const tokenAddress = process.env['TOKEN_ADDRESS'];
	if (!tokenAddress) {
		console.dir(
			await (process.env['IS_STATIC']
				? autoRouter.autoSellStatic(index, amountToSellDesired)
				: autoRouter.autoSell(index, amountToSellDesired))
		);
		return;
	}

	const token = new Erc20Permit(account, tokenAddress);

	console.dir(
		await (process.env['IS_STATIC']
			? autoRouter.autoSellStatic(index, amountToSellDesired, token)
			: autoRouter.autoSell(index, amountToSellDesired, token))
	);
}
