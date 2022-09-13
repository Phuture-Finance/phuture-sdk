import { BigNumber, Signer } from 'ethers';
import { Address } from '@phuture/types';
import { Types } from '@phuture/subgraph';
import { AccountRepo } from "./repository";

/** ### Account class for interacting with the blockchain through the Signer */
export class Account {
	private _accountRepo?: AccountRepo;

	/**
	 * ### Constructs an instance of the Account class
	 *
	 * @param _signer The signer to use for the account
	 *
	 * @returns {Account} The account instance
	 */
	constructor(private _signer: Signer) {}

	withRepo(accountRepo: AccountRepo): Account {
		this._accountRepo = accountRepo;
		return this;
	}

	/**
	 * ### Gets the signer used for the account
	 *
	 * @returns The signer used for the account
	 */
	get signer(): Signer {
		return this._signer;
	}

	/**
	 * ### Sets the signer to use for the account
	 *
	 * @param _signer The signer to use for the account
	 */
	set signer(_signer: Signer) {
		this._signer = _signer;
	}

	/**
	 * ### Gets the address of the current signer
	 *
	 * @returns The address of the current signer
	 */
	public async address(): Promise<Address> {
		return this.signer.getAddress();
	}

	/**
	 * ### Gets the balance of the current signer
	 *
	 * @returns The balance of the current signer
	 */
	public async balance(): Promise<BigNumber> {
		return this.signer.getBalance();
	}

	/**
	 * ### Gets the gas price
	 *
	 * @returns The gas price
	 */
	public async gasPrice(): Promise<BigNumber> {
		return this.signer.getGasPrice();
	}

	/**
	 * ### Gets the chain id
	 *
	 * @returns The chain id
	 */
	public async chainId(): Promise<number> {
		return this.signer.getChainId();
	}

	public async indexes(): Promise<Types.UserIndex[]> {
		if (!this._accountRepo)
			throw new Error('Account repository not found, use withRepo() to set it');

		return this._accountRepo.indexes(await this.address());
	}
}
