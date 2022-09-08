import { Address, ContractFactory, Network, PriceSource } from '@phuture/types';
import { BigNumber, BigNumberish } from 'ethers';
import { formatUnits } from 'ethers/lib/utils';
import { Contract } from '@phuture/contract';
import { Account } from '@phuture/account';
import { InsufficientAllowanceError } from '@phuture/errors';
import { ERC20 as ERC20ContractInterface, ERC20__factory } from '../types';
import { Addresses } from './addresses';

/** ### ERC20 Token Contract */
export class Erc20<
	C extends ERC20ContractInterface = ERC20ContractInterface
> extends Contract<C> {
	/** ### Price source */
	protected _priceSource?: PriceSource;

	/** ### Decimals of the token */
	private _decimals?: number;

	/** ### Symbol of the token */
	private _symbol?: string;

	/** ### Name of the token */
	private _name?: string;

	/**
	 * ### Creates a new ERC20 instance
	 *
	 * @param account Account to use for interacting with the contract
	 * @param contract Contract instance or address of the ERC20 token contract
	 * @param factory Contract factory to use for creating the contract
	 *
	 * @returns New ERC20 token instance
	 */
	constructor(
		account: Account,
		contract: Address | C,
		factory: ContractFactory = ERC20__factory
	) {
		super(account, contract, factory);
	}

	/**
	 * ### Connect price source to Index
	 *
	 * @param priceSource Price source to connect to Index
	 *
	 * @returns {this} Index instance
	 */
	public withPriceSource(priceSource: PriceSource): this {
		this._priceSource = priceSource;

		return this;
	}

	/**
	 * ### Get the decimals of the token
	 *
	 * @returns Decimals of the token
	 */
	public async decimals(): Promise<number> {
		this._decimals ??= await this.contract.decimals();

		return this._decimals;
	}

	/**
	 * ### Get the symbol of the token
	 *
	 * @returns Symbol of the token
	 */
	public async symbol(): Promise<string> {
		this._symbol ??= await this.contract.symbol();

		return this._symbol;
	}

	/**
	 * ### Get the name of the token
	 *
	 * @returns Name of the token
	 */
	public async name(): Promise<string> {
		this._name ??= await this.contract.name();

		return this._name;
	}

	/**
	 * ### Get the formatted total supply of the token
	 *
	 * @returns Formatted total supply of the token
	 */
	public async formattedTotalSupply(): Promise<string> {
		const totalSupply = await this.contract.totalSupply();
		const decimals = await this.decimals();

		return formatUnits(totalSupply, decimals);
	}

	/**
	 * ### Get the formatted balance of the account
	 *
	 * @param account Address of the account
	 *
	 * @returns Formatted balance of the account
	 */
	public async formattedBalanceOf(account: Address): Promise<string> {
		const balance = await this.contract.balanceOf(account);
		const decimals = await this.decimals();

		return formatUnits(balance, decimals);
	}

	/**
	 * ### Check Allowance
	 *
	 * @param account Address of the account
	 * @param expectedAmount Amount of tokens to check
	 *
	 * @returns true if the account has enough tokens to transfer the amount
	 */
	public async checkAllowance(
		account: Address,
		expectedAmount: BigNumberish
	): Promise<true> {
		const allowance = await this.contract.allowance(
			await this.account.address(),
			account
		);

		if (allowance.lt(expectedAmount))
			throw new InsufficientAllowanceError(account, expectedAmount, allowance);

		return true;
	}

	/**
	 * ### Get price of the token
	 *
	 * @param {Address} sellToken Token to sell
	 * @param {BigNumberish} sellAmount Amount of tokens to sell
	 *
	 * @returns {Promise<BigNumber>} Price of the index in sellToken
	 */
	public async price(
		sellToken: Address = Addresses[Network.Mainnet]['usdc'],
		sellAmount: BigNumberish
	): Promise<BigNumber> {
		if (!this._priceSource) throw new Error('No price source');

		return this._priceSource.price(this.address, sellToken, sellAmount);
	}
}
