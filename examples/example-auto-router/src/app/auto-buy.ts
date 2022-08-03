import { BigNumber } from 'ethers';
import { account, autoRouter, index } from './common';
import { Erc20Permit } from '@phuture/erc-20';

const func =
	process.env['IS_STATIC'] === 'true'
		? autoRouter.autoBuyStatic
		: autoRouter.autoBuy;

export default async function autoBuy(amountToSellDesired: BigNumber) {
	const tokenAddress = process.env['TOKEN_ADDRESS'];
	if (!tokenAddress) {
		await func(index, amountToSellDesired);
		return;
	}

	const token = new Erc20Permit(account, tokenAddress);

	await func(index, amountToSellDesired, token);
}
