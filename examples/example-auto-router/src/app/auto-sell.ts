import { BigNumber } from 'ethers';
import { account, indexAutoRouter, index } from './common';
import { Erc20Permit } from '@phuture/erc-20';
import * as yesno from 'yesno';

// Auto selling Index amount
export default async function autoSell(amountToSellDesired: BigNumber) {
	const tokenAddress = process.env['TOKEN_ADDRESS'];
	if (!tokenAddress) {
		const select = await indexAutoRouter.selectSell(index, amountToSellDesired);

		console.dir(select);

		const ok = await yesno({ question: 'Ready to continue?' });
		if (ok) {
			await indexAutoRouter.sell(select.isBurn, index, amountToSellDesired);
		}

		return;
	}

	const token = new Erc20Permit(account, tokenAddress);
	const select = await indexAutoRouter.selectSell(index, amountToSellDesired, token);

	console.dir(select);

	const ok = await yesno({ question: 'Ready to continue?' });
	if (ok) {
		await indexAutoRouter.sell(
			select.isBurn,
			index,
			amountToSellDesired,
			token.address
		);
	}

	return;
}
