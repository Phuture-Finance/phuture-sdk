import {Url} from '@phuture/types';
import {withDefaults} from '@phuture/with-defaults';
import {Signer} from "ethers";
import {Account} from "@phuture/account";

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Phuture {
	/** ### Interface for options of Phuture core constructor */
	export interface Options {
		/** Any additional options */
		[option: string]: any;

		signer?: Signer

		/** Base URL of Phuture API */
		apiUrl: Url;
	}
}

/** ### Default options of Phuture core constructor */
const defaultOptions = (): Phuture.Options => ({
	apiUrl: 'https://api.phuture.finance',
});

/** ### Class for Phuture Core */
export class Phuture {
	/** ### Options of Phuture core constructor */
	private options: Phuture.Options;

	/** ### An current Account instance */
	private _account: Account | null = null;

	/**
	 * ### Creates a new Phuture Core instance
	 *
	 * @param options Options of Phuture core constructor
	 * @returns New Phuture Core instance
	 */
	constructor(options: Partial<Phuture.Options> = {}) {
		this.options = withDefaults(options, defaultOptions());

		if (this.options.signer)
			this._account = new Account(this.options.signer);
	}

	/** ### Get current Account instance */
	get account(): Account | null {
		return this._account;
	}

	/** ### Set an Account instance */
	set account(account: Account | null) {
		this._account = account;
	}
}
