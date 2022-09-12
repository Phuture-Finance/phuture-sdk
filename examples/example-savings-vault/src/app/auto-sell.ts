import { BigNumber } from 'ethers';
import prepare from "./prepare";
import * as yesno from "yesno";

export async function sellSavingsVault(amountToSell: BigNumber) {
	const { savingsVault, savingsVaultRouter } = await prepare();

	const select = await savingsVaultRouter.selectSell(savingsVault, amountToSell);

	console.dir(select);

	const ok = await yesno({ question: 'Ready to continue?' });
	if (ok) {
		return await savingsVaultRouter.sell(select.isBurn, savingsVault, amountToSell);
	}

	return;
}
