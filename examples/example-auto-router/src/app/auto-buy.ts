import { BigNumber } from 'ethers';
import { account, autoRouter, index } from './common';
import { Erc20Permit } from '@phuture/erc-20';

export default async function autoBuy(amountToSellDesired: BigNumber) {
	const tokenAddress = process.env['TOKEN_ADDRESS'];
	if (!tokenAddress) {
		console.dir(
			await (process.env['IS_STATIC'] === 'true'
				? autoRouter.autoBuyStatic(index, amountToSellDesired)
				: autoRouter.autoBuy(index, amountToSellDesired))
		);
		return;
	}

	const token = new Erc20Permit(account, tokenAddress);

	console.dir(
		await (process.env['IS_STATIC'] === 'true'
			? autoRouter.autoBuyStatic(index, amountToSellDesired, token)
			: autoRouter.autoBuy(index, amountToSellDesired, token))
	);
}
