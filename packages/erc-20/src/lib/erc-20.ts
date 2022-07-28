import {Address, ContractFactory} from '@phuture/types';
import {BigNumberish} from 'ethers';
import {formatUnits} from 'ethers/lib/utils';
import {Contract} from '@phuture/contract';
import {Account} from '@phuture/account';
import {ERC20 as ERC20ContractInterface, ERC20__factory} from '../types';

/** ### ERC20 Token Contract */
export class Erc20<
	C extends ERC20ContractInterface = ERC20ContractInterface,
> extends Contract<C> {
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
		factory: ContractFactory = ERC20__factory,
	) {
		super(account, contract, factory);
	}

	/**
	 * ### Get the decimals of the token
	 *
	 * @returns Decimals of the token
	 */
	public async decimals(): Promise<number> {
		const getDecimals = async () => this.contract.decimals();

		this.on('update', getDecimals);
		this._decimals ??= await getDecimals();

		return this._decimals;
	}

	/**
	 * ### Get the symbol of the token
	 *
	 * @returns Symbol of the token
	 */
	public async symbol(): Promise<string> {
		const getSymbol = async () => this.contract.symbol();

		this.on('update', getSymbol);
		this._symbol ??= await getSymbol();

		return this._symbol;
	}

	/**
	 * ### Get the name of the token
	 *
	 * @returns Name of the token
	 */
	public async name(): Promise<string> {
		const getName = async () => this.contract.name();

		this.on('update', getName);
		this._name ??= await getName();

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
	 * @param amount Token amount
	 *
	 * @returns true if the account has enough tokens to transfer the amount
	 */
	public async checkAllowance(
		account: Address,
		amount: BigNumberish,
	): Promise<boolean> {
		const allowance = await this.contract.allowance(
			await this.account.address(),
			account,
		);

		return allowance.gte(amount);
	}
}
