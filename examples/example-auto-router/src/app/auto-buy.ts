import { BigNumber } from 'ethers';
import { Erc20Permit } from '@phuture/erc-20';
import * as yesno from 'yesno';
import prepare from './prepare';

export default async function autoBuy(amountToSellDesired: BigNumber) {
	const { account, index, autoRouter } = await prepare();

	const tokenAddress = process.env['TOKEN_ADDRESS'];
	if (!tokenAddress) {
		const select = await autoRouter.selectBuy(index, amountToSellDesired);

		console.dir(select);

		if (await yesno({ question: 'Ready to continue?' })) {
			return autoRouter.buy(select.isMint, index, amountToSellDesired);
		}

		return;
	}

	const token = new Erc20Permit(account, tokenAddress);
	const selectWithToken = await autoRouter.selectBuy(
		index,
		amountToSellDesired,
		token
	);

	console.dir(selectWithToken);

	if (await yesno({ question: 'Ready to continue?' })) {
		return autoRouter.buy(
			selectWithToken.isMint,
			index,
			amountToSellDesired,
			token.address
		);
	}

	return;
}
