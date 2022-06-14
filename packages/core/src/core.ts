import type {CoreInterface, Url} from '@phuture/types';
import {withDefaults} from '@phuture/with-defaults';
import {Collection} from 'before-after-hook';
import {request} from '@phuture/request';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Phuture {
	/**
	 * ### Interface for options of Phuture core constructor
	 */
	export interface Options<T = unknown> {
		/** Any additional options */
		[option: string]: any;

		/** Whether to use production settings or not */
		isProduction: boolean;

		/** Base URL of Phuture API */
		apiUrl: Url;

		/** Logger */
		log: CoreInterface['log'];
	}
}

/**
 * ### Default options of Phuture core constructor
 */
const defaultOptions = <T>(isProduction = false): Phuture.Options<T> => ({
	isProduction,
	apiUrl: 'https://api.phuture.finance',
	log: {
		error: console.error,
		warn: console.warn,
		info: console.info,
		debug: isProduction ? () => void 0 : console.debug,
	},
});

/**
 * ### Class for Phuture Core
 */
export class Core<T = unknown> implements CoreInterface {
	/** ### Logger Object */
	public log: CoreInterface['log'];
	/** ### Hook for wrapping methods execution */
	public hook: CoreInterface['hook'];
	/** ### Request for Phuture API */
	public request: CoreInterface['request'];
	/** ### Options of Phuture core constructor */
	protected options: Phuture.Options<T>;

	/**
	 * ### Creates a new Phuture Core instance
	 *
	 * @param options Options of Phuture core constructor
	 * @returns New Phuture Core instance
	 */
	constructor(options: Partial<Phuture.Options<T>> = {}) {
		this.options = withDefaults(
			options,
			defaultOptions<T>(options.isProduction),
		);
		this.log = this.options.log;
		this.hook = new Collection();
		this.request = request();
	}
}
