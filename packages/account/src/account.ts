import EventEmitter from 'events';
import {BigNumber, Signer} from 'ethers';
import {Address} from "@phuture/types";

/** ### Account class for interacting with the blockchain through the Signer */
export class Account extends EventEmitter {
	/**
	 * ### Constructs an instance of the Account class
	 *
	 * @param _signer The signer to use for the account
	 *
	 * @returns {Account} The account instance
	 */
	constructor(private _signer: Signer) {
		super();
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
		this.emit('change', this.signer);
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
}
