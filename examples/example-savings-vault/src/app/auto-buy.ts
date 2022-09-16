import { BigNumber } from 'ethers';
import * as yesno from 'yesno';
import { Erc20Permit } from '@phuture/erc-20';
import prepare from './prepare';

export default async function buySavingsVault(amountToDeposit: BigNumber) {
	const { account, savingsVault, savingsVaultRouter } = await prepare();
	const tokenAddress = process.env['TOKEN_ADDRESS'];
	if (!tokenAddress) {
		const select = await savingsVaultRouter.selectBuy(
			savingsVault,
			amountToDeposit
		);

		console.dir(select);

		const ok = await yesno({ question: 'Ready to continue?' });
		if (ok) {
			return await savingsVaultRouter.buy(
				select.isMint,
				savingsVault,
				amountToDeposit
			);
		}
		return;
	}
	const token = new Erc20Permit(account, tokenAddress);
	const select = await savingsVaultRouter.selectBuy(
		savingsVault,
		amountToDeposit,
		token
	);
	console.dir(select);
	const ok = await yesno({ question: 'Ready to continue?' });

	if (ok) {
		return await savingsVaultRouter.buy(
			select.isMint,
			savingsVault,
			amountToDeposit,
			tokenAddress
		);
	}
	return;
}
