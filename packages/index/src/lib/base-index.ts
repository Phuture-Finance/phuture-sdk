import { Erc20Permit } from '@phuture/erc-20';
import type { Address, ContractFactory, PriceSource } from '@phuture/types';
import { BigNumber, BigNumberish, utils } from 'ethers';
import { Account } from '@phuture/account';
import { Fees, IndexRepo } from './interfaces';
import { subgraphIndexRepo } from './subraph.repository';
import { BaseIndex, BaseIndex__factory } from '../types';

/**
 * ### Index Contract
 */
export class Index extends Erc20Permit<BaseIndex> {
	/** ### Index repository */
	private _indexRepo: IndexRepo;

	/** ### Price source */
	private _priceSource?: PriceSource;

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

		this._indexRepo = subgraphIndexRepo;
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
	 * ### Connect price source to Index
	 *
	 * @param {IndexRepo} priceSource Price source to connect to Index
	 *
	 * @returns {this} Index instance
	 */
	public withPriceSource(priceSource: PriceSource): this {
		this._priceSource = priceSource;

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
		const { _assets, _weights } = await this.contract.anatomy();

		let amountToSell = BigNumber.from(0);
		const amounts: Record<Address, BigNumber> = {};
		for (const [index, asset] of _assets.entries()) {
			amounts[asset] = BigNumber.from(amountDesired)
				.mul(_weights[index])
				.div(255);
			amountToSell = amountToSell.add(amounts[asset]);
		}

		return { amountToSell, amounts };
	}

	/**
	 * ### Get holders of the index
	 *
	 * @returns {Promise<Address[]>} Holders of the index
	 */
	public async holders(): Promise<Address[]> {
		return this._indexRepo.holders(this.address);
	}

	/**
	 * ### Get holders count of the index
	 *
	 * @returns {Promise<number>} Count of holders of the index
	 */
	public async holdersCount(): Promise<number> {
		return this._indexRepo.holdersCount(this.address);
	}

	/**
	 * ### Get price of the index
	 *
	 * @param {Address} sellToken Token to sell
	 * @param {BigNumberish} sellAmount Amount of tokens to sell
	 *
	 * @returns {Promise<BigNumber>} Price of the index in sellToken
	 */
	public async price(
		sellToken: Address,
		sellAmount: BigNumberish
	): Promise<BigNumber> {
		if (!this._priceSource) throw new Error('No price source');

		return this._priceSource.price(this.address, sellToken, sellAmount);
	}

	/**
	 * ### Get price of the index
	 *
	 * @returns Price of the index in sellToken
	 */
	public async priceEth(): Promise<BigNumber> {
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
		return this._indexRepo.fees(this.address);
	}
}