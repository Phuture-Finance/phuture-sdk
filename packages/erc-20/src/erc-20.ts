import {Address, ContractFactory} from '@phuture/types';
import {Signer} from 'ethers';
import {formatUnits} from 'ethers/lib/utils';
import {Contract} from '@phuture/contract/dist';
import {ERC20 as ERC20ContractInterface, ERC20__factory} from './types';

/**
 * ### ERC20 Token Contract
 */
export class Erc20<
	C extends ERC20ContractInterface = ERC20ContractInterface,
> extends Contract<C> {
	/** ### Decimals of the token */
	private _decimals?: number;

	private _symbol?: string;

	private _name?: string;

	/**
	 * ### Creates a new ERC20 instance
	 *
	 * @param signer Signer or provider to use for interacting with the contract
	 * @param contract Contract instance or address of the ERC20 token contract
	 * @param factory Contract factory to use for creating the contract
	 *
	 * @returns New ERC20 token instance
	 */
	constructor(
		signer: Signer,
		contract: Address | C,
		factory: ContractFactory = ERC20__factory,
	) {
		super(signer, contract, factory);
	}

	/**
	 * ### Get the decimals of the token
	 *
	 * @returns Decimals of the token
	 */
	async decimals(): Promise<number> {
		this._decimals ??= await this.contract.decimals();

		return this._decimals;
	}

	/**
	 * ### Get the symbol of the token
	 *
	 * @returns Symbol of the token
	 */
	async symbol(): Promise<string> {
		this._symbol ??= await this.contract.symbol();

		return this._symbol;
	}

	/**
	 * ### Get the name of the token
	 *
	 * @returns Name of the token
	 */
	async name(): Promise<string> {
		this._name ??= await this.contract.name();

		return this._name;
	}

	/**
	 * ### Get the formatted total supply of the token
	 *
	 * @returns Formatted total supply of the token
	 */
	async formattedTotalSupply(): Promise<string> {
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
	async formattedBalanceOf(account: string): Promise<string> {
		const balance = await this.contract.balanceOf(account);
		const decimals = await this.decimals();

		return formatUnits(balance, decimals);
	}
}
