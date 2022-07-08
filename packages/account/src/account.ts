import EventEmitter from 'node:events';
import {BigNumber, Signer} from 'ethers';

export class Account extends EventEmitter {
	constructor(public currentSigner: Signer) {
		super();
	}

	public async balance(): Promise<BigNumber> {
		return this.currentSigner.getBalance();
	}

	// Public async indexes(): Promise<{ index: Index, balance: }[]> {
	// }
}
