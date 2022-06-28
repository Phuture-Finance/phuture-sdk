import { Erc20 } from "@phuture/erc-20";
import { Address, isAddress } from "@phuture/types";
import { BigNumber, BigNumberish, Signer } from "ethers";
import { BaseIndex, BaseIndex__factory } from "./types";

/**
 * ### Index Contract
 */
export class Index extends Erc20<BaseIndex> {
	constructor(signer: Signer, contract: Address | BaseIndex) {
		super(
			signer,
			isAddress(contract)
				? BaseIndex__factory.connect(contract, signer)
				: contract
		);
	}

	async scaleAmount(amountDesired: BigNumberish): Promise<{
		amountToSellQuoted: BigNumber;
		amounts: Record<Address, BigNumber>;
	}> {
		const { _assets, _weights } = await this.contract.anatomy();

		const amounts: Record<Address, BigNumber> = {};
		for (const [index, _] of _assets.entries()) {
			const weight = _weights[index];
			amounts[_assets[index]] = BigNumber.from(amountDesired)
				.mul(weight)
				.div(255);
		}

		const amountToSell = BigNumber.from(0);

		for (const amount of Object.values(amounts)) amountToSell.add(amount);

		return {
			amountToSellQuoted: amountToSell,
			amounts,
		};
	}
}
