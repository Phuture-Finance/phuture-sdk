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
		amountToSellQuoted: BigNumber;
		amounts: Record<Address, BigNumber>;
	}> {
		const {_assets, _weights} = await this.contract.anatomy();

		const amounts: Record<Address, BigNumber> = {};
		for (const index in _assets) {
			const weight = _weights[index];
			amounts[_assets[index]] = BigNumber.from(amountDesired)
				.mul(weight)
				.div(255);
		}

		return {
			amountToSellQuoted: Object.values(amounts).reduce(
				(acc, amount) => acc.add(amount),
				BigNumber.from(0),
			),
			amounts,
		};
	}
}
