import { BigNumber } from 'ethers';
import { account, indexAutoRouter, index } from './common';
import { Erc20Permit } from '@phuture/erc-20';
import * as yesno from 'yesno';

// Auto buying Index amount
export default async function autoBuy(amountToSellDesired: BigNumber) {
	const tokenAddress = process.env['TOKEN_ADDRESS'];
	if (!tokenAddress) {
		const select = await indexAutoRouter.selectBuy(index, amountToSellDesired);

		console.dir(select);

		const ok = await yesno({ question: 'Ready to continue?' });
		if (ok) {
			await indexAutoRouter.buy(select.isMint, index, amountToSellDesired);
		}

		return;
	}

	const token = new Erc20Permit(account, tokenAddress);
	const select = await indexAutoRouter.selectBuy(index, amountToSellDesired, token);

	console.dir(select);

	const ok = await yesno({ question: 'Ready to continue?' });
	if (ok) {
		await indexAutoRouter.buy(
			select.isMint,
			index,
			amountToSellDesired,
			token.address
		);
	}

	return;
}
