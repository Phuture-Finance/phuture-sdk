import type { JsonRpcSigner } from "@ethersproject/providers";

import { Contract, type ContractFactory } from "./contract";
import { InsufficientAllowanceError } from "./errors";
import {
	type ERC20 as ERC20ContractInterface,
	ERC20__factory,
} from "./typechain";

/** ### ERC20 Token Contract */
export class Erc20<
	C extends ERC20ContractInterface = ERC20ContractInterface,
> extends Contract<C> {
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
		account: JsonRpcSigner,
		contract: string | C,
		factory: ContractFactory = ERC20__factory,
	) {
		super(account, contract, factory);
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
		account: string,
		expectedAmount: string,
	): Promise<true> {
		const allowance = await this.contract.allowance(
			await this.signer.getAddress(),
			account,
		);

		if (allowance.lt(expectedAmount))
			throw new InsufficientAllowanceError(
				account,
				expectedAmount,
				allowance.toString(),
			);

		return true;
	}
}
