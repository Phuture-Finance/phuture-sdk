import {Erc20Permit} from '@phuture/erc-20';
import {Address, ContractFactory} from '@phuture/types';
import {BigNumber, BigNumberish, Signer} from 'ethers';
import {BaseIndex, BaseIndex__factory} from './types';

/**
 * ### Index Contract
 */
export class Index extends Erc20Permit<BaseIndex> {
	/**
	 * ### Creates a new Index instance
	 *
	 * @param signer Signer or provider to use for interacting with the contract
	 * @param contract Contract instance or address of the Index token contract
	 * @param factory Contract factory to use for creating the contract
	 *
	 * @returns New Index token instance
	 */
	constructor(
		signer: Signer,
		contract: Address | BaseIndex,
		factory: ContractFactory = BaseIndex__factory,
	) {
		super(signer, contract, factory);
	}

	/**
	 * ### Scale amount of input tokens to set underlying tokens amount
	 *
	 * @param amountDesired Amount of input tokens to scale
	 */
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
