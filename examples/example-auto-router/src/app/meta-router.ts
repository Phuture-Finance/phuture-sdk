import {BigNumber} from "ethers";
import {savingVault, metaRouter} from "./common";
import * as yesno from "yesno";

export default async function autoBuyProduct(amountToSellDesired: BigNumber) {
	const select = await metaRouter.selectBuy(savingVault, amountToSellDesired);
	console.dir(select);
	const ok = await yesno({ question: 'Ready to continue?' });
	if (ok) {
		await metaRouter.buy(
			select.isMint,
			savingVault,
			amountToSellDesired,
		);
	}
	return;
}
