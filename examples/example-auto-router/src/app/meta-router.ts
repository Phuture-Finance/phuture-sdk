import { BigNumber } from 'ethers';
import * as yesno from 'yesno';
import { Erc20Permit } from '@phuture/erc-20';
import prepare from './prepare';

export default async function buySavingsVault(amountToDeposit: BigNumber) {
	const { account, savingsVault, metaRouter } = await prepare();
	const tokenAddress = process.env['TOKEN_ADDRESS'];
	if (!tokenAddress) {
		const select = await metaRouter.selectBuy(savingsVault, amountToDeposit);

		console.dir(select);

		const ok = await yesno({ question: 'Ready to continue?' });
		if (ok) {
			await metaRouter.buy(select.isMint, savingsVault, amountToDeposit);
		}
		return;
	}
	const token = new Erc20Permit(account, tokenAddress);
	const select = await metaRouter.selectBuy(
		savingsVault,
		amountToDeposit,
		token
	);
	console.dir(select);
	const ok = await yesno({ question: 'Ready to continue?' });

	if (ok) {
		await metaRouter.buy(
			select.isMint,
			savingsVault,
			amountToDeposit,
			tokenAddress
		);
	}
	return;
}

export async function sellSavingsVault(amountToSell: BigNumber) {
	const { account, savingsVault, metaRouter } = await prepare();
	const tokenAddress = process.env['TOKEN_ADDRESS'];
	if (!tokenAddress) {
		const select = await metaRouter.selectSell(savingsVault, amountToSell);

		console.dir(select);

		const ok = await yesno({ question: 'Ready to continue?' });
		if (ok) {
			await metaRouter.sell(select.isBurn, savingsVault, amountToSell);
		}

		return;
	}
	const token = new Erc20Permit(account, tokenAddress);
	const select = await metaRouter.selectSell(savingsVault, amountToSell, token);
	console.dir(select);
	const ok = await yesno({ question: 'Ready to continue?' });

	if (ok) {
		await metaRouter.sell(
			select.isBurn,
			savingsVault,
			amountToSell,
			tokenAddress
		);
	}
	return;
}
