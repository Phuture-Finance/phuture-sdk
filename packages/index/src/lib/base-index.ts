import { Erc20Permit } from '@phuture/erc-20';
import type { Address, Anatomy, ContractFactory } from '@phuture/types';
import { BigNumber, BigNumberish, utils } from 'ethers';
import { Account } from '@phuture/account';
import { BaseIndex, BaseIndex__factory } from '../types';
import { Fees, IndexRepo } from './interfaces';

/**
 * ### Index Contract
 */
export class Index extends Erc20Permit<BaseIndex> {
	/** ### Index repository */
	private _indexRepo?: IndexRepo;

	/** ### List of assets of the index */
	private _anatomy?: Anatomy;

	/** ### List of inactive (with 0 weight) assets of the index */
	private _inactiveAnatomy?: Anatomy;

	/**
	 * ### Creates a new Index instance
	 *
	 * @param account Account to use for interacting with the contract
	 * @param contract Contract instance or address of the Index token contract
	 * @param factory Contract factory to use for creating the contract
	 *
	 * @returns New Index token instance
	 */
	constructor(
		account: Account,
		contract: Address | BaseIndex,
		factory: ContractFactory = BaseIndex__factory
	) {
		super(account, contract, factory);
	}

	/**
	 * ### Connect repository to Index
	 *
	 * @param {IndexRepo} indexRepo Repository to connect to Index
	 *
	 * @returns {this} Index instance
	 */
	public withRepo(indexRepo: IndexRepo): this {
		this._indexRepo = indexRepo;

		return this;
	}

	/**
	 * ### Scale amount of input tokens to set underlying tokens amount in baseToken
	 *
	 * @param amountDesired Amount of input tokens to scale
	 *
	 * @returns Scaled amounts of underlying tokens and total amount in baseToken
	 */
	public async scaleAmount(
		amountDesired: BigNumberish
	): Promise<{ asset: Address; amount: BigNumber; weight: number }[]> {
		const anatomy = await this.anatomy();

		return anatomy.map(({ asset, weight }) => ({
			asset,
			amount: BigNumber.from(amountDesired).mul(weight).div(255),
			weight,
		}));
	}

	public async anatomy(): Promise<Anatomy> {
		this._anatomy ??= await this.getAnatomy();

		return this._anatomy;
	}

	public async inactiveAnatomy(): Promise<Anatomy> {
		this._inactiveAnatomy ??= await this.getInactiveAnatomy();

		return this._inactiveAnatomy;
	}

	public async constituents(): Promise<Anatomy> {
		const [anatomy, inactiveAnatomy] = await Promise.all([
			this.anatomy(),
			this.inactiveAnatomy(),
		]);

		return [...anatomy, ...inactiveAnatomy];
	}

	/**
	 * ### Get holders of the index
	 *
	 * @returns {Promise<Address[]>} Holders of the index
	 */
	public async holders(): Promise<Address[]> {
		if (!this._indexRepo)
			throw new Error(
				'No IndexRepo found, please add one using `withRepo` method before calling this method'
			);

		return this._indexRepo.holders(this.address);
	}

	/**
	 * ### Get holders count of the index
	 *
	 * @returns {Promise<number>} Count of holders of the index
	 */
	public async holdersCount(): Promise<number> {
		if (!this._indexRepo)
			throw new Error(
				'No IndexRepo found, please add one using `withRepo` method before calling this method'
			);

		return this._indexRepo.holdersCount(this.address);
	}

	/**
	 * ### Get price of the index
	 *
	 * @returns Price of the index in sellToken
	 */
	public async priceEth(): Promise<BigNumber> {
		if (!this._indexRepo)
			throw new Error(
				'No IndexRepo found, please add one using `withRepo` method before calling this method'
			);

		return utils.parseEther(await this._indexRepo.priceEth(this.address));
	}

	/**
	 * ### Get market cap of the index
	 *
	 * @param {Address} sellToken Token to sell
	 *
	 * @returns {Promise<BigNumber>} Market cap of the index in sellToken
	 */
	public async marketCap(sellToken: Address): Promise<BigNumber> {
		if (!this._priceSource) throw new Error('No price source');

		const price = await this._priceSource.price(
			this.address,
			sellToken,
			BigNumber.from(10).mul(await this.decimals())
		);

		return price.mul(await this.contract.totalSupply());
	}

	/**
	 * ### Get fees of the index
	 *
	 * @returns {Promise<Fees>} Fees of the index
	 */
	public async fees(): Promise<Fees> {
		if (!this._indexRepo)
			throw new Error(
				'No IndexRepo found, please add one using `withRepo` method before calling this method'
			);

		return this._indexRepo.fees(this.address);
	}

	private async getAnatomy(): Promise<Anatomy> {
		const { _assets, _weights } = await this.contract.anatomy();
		return _assets.map((asset, index) => ({ asset, weight: _weights[index] }));
	}

	private async getInactiveAnatomy(): Promise<Anatomy> {
		const _assets = await this.contract.inactiveAnatomy();
		return _assets.map((asset) => ({ asset, weight: 0 }));
	}
}
