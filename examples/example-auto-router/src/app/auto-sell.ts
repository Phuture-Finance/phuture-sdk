import { BigNumber } from 'ethers';
import {account, autoRouter, index} from './common';
import {Erc20Permit} from "@phuture/erc-20";

export default async function autoSell(amountToSellDesired: BigNumber) {
	const tokenAddress = process.env['TOKEN_ADDRESS'];
	if (tokenAddress) {
		await autoRouter.autoSell(index, amountToSellDesired);
	}

	const token = new Erc20Permit(account, tokenAddress);

	await autoRouter.autoSell(index, amountToSellDesired, token);
}
