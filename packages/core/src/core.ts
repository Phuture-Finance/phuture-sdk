import {Url} from '@phuture/types';
import {withDefaults} from "@phuture/with-defaults";

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Phuture {
	/**
	 * ### Interface for options of Phuture core constructor
	 */
	export interface Options<T = any> {
		/** Base URL of Phuture API */
		apiUrl: Url;

		/** Any additional options */
		[option: string]: any;
	}
}

/**
 * ### Default options of Phuture core constructor
 */
const defaultOptions: Phuture.Options = {
	apiUrl: 'https://api.phuture.finance',
};

/**
 * ### Class for Phuture Core
 */
export class Phuture<T> {
	/** ### Options of Phuture core constructor */
	protected options: Phuture.Options<T>;

	/**
	 * ### Creates a new Phuture Core instance
	 *
	 * @param options Options of Phuture core constructor
	 * @returns New Phuture Core instance
	 */
	constructor(options: Partial<Phuture.Options<T>> = {}) {
		this.options = withDefaults(options, defaultOptions);
	}
}
