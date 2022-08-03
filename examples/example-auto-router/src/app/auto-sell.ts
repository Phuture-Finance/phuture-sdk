import {BigNumber} from 'ethers';
import {account, autoRouter, index} from './common';
import {Erc20Permit} from '@phuture/erc-20';

export default async function autoSell(amountToSellDesired: BigNumber) {
	const tokenAddress = process.env['TOKEN_ADDRESS'];
	if (!tokenAddress) {
		await (process.env['IS_STATIC'] === 'true'
			? autoRouter.autoSellStatic(index, amountToSellDesired)
			: autoRouter.autoSell(index, amountToSellDesired));
		return;
	}

	const token = new Erc20Permit(account, tokenAddress);

	await (process.env['IS_STATIC'] === 'true'
		? autoRouter.autoSellStatic(index, amountToSellDesired, token)
		: autoRouter.autoSell(index, amountToSellDesired, token));
}
