import {Erc20} from '@phuture/erc-20';
import {Address, isAddress} from '@phuture/types';
import {BigNumber, BigNumberish, Signer} from 'ethers';
import {BaseIndex, BaseIndex__factory} from './types';

/**
 * ### Index Contract
 */
export class Index extends Erc20<BaseIndex> {
	constructor(signer: Signer, contract: Address | BaseIndex) {
		super(
			signer,
			isAddress(contract)
				? BaseIndex__factory.connect(contract, signer)
				: contract,
		);
	}

	async scaleAmount(amountDesired: BigNumberish): Promise<{
		amountToSell: BigNumber;
		amounts: Record<Address, BigNumber>;
	}> {
		const {_assets, _weights} = await this.contract.anatomy();

		let amountToSell = BigNumber.from(0);
		const amounts: Record<Address, BigNumber> = {};
		for (const [index, asset] of _assets.entries()) {
			const weight = _weights[index];
			amounts[asset] = BigNumber.from(amountDesired).mul(weight).div(255);
			amountToSell = amountToSell.add(amounts[asset]);
		}

		return {amountToSell, amounts};
	}
}
