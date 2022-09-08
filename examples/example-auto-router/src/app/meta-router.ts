import {BigNumber} from "ethers";
import {savingVault, metaRouter, account, autoRouter, index} from "./common";
import * as yesno from "yesno";
import {SavingsVault} from "@phuture/savings-vault";
import {Erc20Permit} from "@phuture/erc-20";

export default async function buySavingsVault(amountToDeposit: BigNumber) {
	const tokenAddress = process.env['TOKEN_ADDRESS'];
	if(!tokenAddress) {
		const select = await metaRouter.selectBuy(savingVault, amountToDeposit);

		console.dir(select);

		const ok = await yesno({ question: 'Ready to continue?' });
		if (ok) {
			await metaRouter.buy(select.isMint, savingVault, amountToDeposit);
		}
		return;
	}
	const token = new Erc20Permit(account, tokenAddress);
	const select = await metaRouter.selectBuy(savingVault, amountToDeposit, token);
	console.dir(select);
	const ok = await yesno({ question: 'Ready to continue?' });

	if (ok) {
		await metaRouter.buy(
			select.isMint,
			savingVault,
			amountToDeposit,
			tokenAddress
		);
	}
	return;
}

export async function sellSavingsVault(amountToSell: BigNumber) {
	const tokenAddress = process.env['TOKEN_ADDRESS'];
	if (!tokenAddress) {
		const select = await metaRouter.selectSell(savingVault, amountToSell);

		console.dir(select);

		const ok = await yesno({ question: 'Ready to continue?' });
		if (ok) {
			await metaRouter.sell(select.isBurn, savingVault, amountToSell);
		}

		return;
	}
	const token = new Erc20Permit(account, tokenAddress);
	const select = await metaRouter.selectSell(savingVault, amountToSell, token);
	console.dir(select);
	const ok = await yesno({ question: 'Ready to continue?' });

	if (ok) {
		await metaRouter.sell(
			select.isBurn,
			savingVault,
			amountToSell,
			tokenAddress
		);
	}
	return;
}
