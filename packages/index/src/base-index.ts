import {Erc20Permit} from '@phuture/erc-20';
import {Address, ContractFactory} from '@phuture/types';
import {BigNumber, BigNumberish, Signer} from 'ethers';
import {BaseIndex, BaseIndex__factory} from './types';
import {IndexRepo} from './interfaces';
import {subgraphIndexRepo} from './subraph.repository';

/**
 * ### Index Contract
 */
export class Index extends Erc20Permit<BaseIndex> {
	private _indexRepo: IndexRepo;

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

		this._indexRepo = subgraphIndexRepo;
	}

	public withRepo(indexRepo: IndexRepo): this {
		this._indexRepo = indexRepo;
		return this;
	}

	/**
	 * ### Scale amount of input tokens to set underlying tokens amount
	 *
	 * @param amountDesired Amount of input tokens to scale
	 */
	public async scaleAmount(amountDesired: BigNumberish): Promise<{
		amountToSell: BigNumber;
		amounts: Record<Address, BigNumber>;
	}> {
		const {_assets, _weights} = await this.contract.anatomy();

		let amountToSell = BigNumber.from(0);
		const amounts: Record<Address, BigNumber> = {};
		for (const [index, asset] of _assets.entries()) {
			amounts[asset] = BigNumber.from(amountDesired)
				.mul(_weights[index])
				.div(255);
			amountToSell = amountToSell.add(amounts[asset]);
		}

		return {amountToSell, amounts};
	}

	public async holders(): Promise<Address[]> {
		return this._indexRepo.holders(this.address);
	}
}
