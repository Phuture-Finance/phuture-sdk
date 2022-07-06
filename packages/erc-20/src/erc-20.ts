import { Address } from "@phuture/types";
import { Signer } from "ethers";
import { formatUnits } from "ethers/lib/utils";
import { Contract } from "@phuture/contract/dist";
import { ERC20 as ERC20ContractInterface, ERC20__factory } from "./types";

/**
 * ### ERC20 Token Contract
 */
export class Erc20<
	C extends ERC20ContractInterface = ERC20ContractInterface
> extends Contract<C> {
	/** ### Decimals of the token */
	private _decimals?: number;

	/**
	 * ### Creates a new ERC20 instance
	 *
	 * @param signer Signer or provider to use for interacting with the contract
	 * @param contract Contract instance or address of the ERC20 token contract
	 *
	 * @returns New ERC20 token instance
	 */
	constructor(signer: Signer, contract: Address | C) {
		super(signer, ERC20__factory, contract);
	}

	/**
	 * ### Get the decimals of the token
	 *
	 * @returns Decimals of the token
	 */
	async decimals(): Promise<number> {
		if (this._decimals) return this._decimals;

		this._decimals = await this.contract.decimals();

		return this._decimals;
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
