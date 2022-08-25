import { BigNumber } from 'ethers';
import { Erc20Permit } from '@phuture/erc-20';
import * as yesno from 'yesno';
import prepare from './prepare';

export default async function autoSell(amountToSellDesired: BigNumber) {
	const { account, index, autoRouter } = await prepare();

	const tokenAddress = process.env['TOKEN_ADDRESS'];
	if (!tokenAddress) {
		const select = await autoRouter.selectSell(index, amountToSellDesired);

		console.dir(select);

		const ok = await yesno({ question: 'Ready to continue?' });
		if (ok) {
			return autoRouter.sell(select.isBurn, index, amountToSellDesired);
		}

		return;
	}

	const token = new Erc20Permit(account, tokenAddress);
	const select = await autoRouter.selectSell(index, amountToSellDesired, token);

	console.dir(select);

	const ok = await yesno({ question: 'Ready to continue?' });
	if (ok) {
		return autoRouter.sell(
			select.isBurn,
			index,
			amountToSellDesired,
			token.address
		);
	}

	return;
}
