import EventEmitter from 'node:events';
import {BigNumber, Signer} from 'ethers';

/** ### Account class for interacting with the blockchain through the Signer */
export class Account extends EventEmitter {
	/**
	 * ### Constructs an instance of the Account class
	 *
	 * @param {Signer} currentSigner The signer to use for the account
	 *
	 * @returns {Account} The account instance
	 */
	constructor(public currentSigner: Signer) {
		super();
	}

	/**
	 * ### Gets the balance of the current signer
	 *
	 * @returns {Promise<BigNumber>} The balance of the current signer
	 */
	public async balance(): Promise<BigNumber> {
		return this.currentSigner.getBalance();
	}
}
