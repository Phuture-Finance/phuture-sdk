import {DeepPartial} from './deep-partial';
import {merge} from "./merge";

/**
 * ### Merges default options into an options object
 *
 * @param options Options object
 * @param defaults Default options object
 * @returns Merged options object
 */
export const withDefaults = <T extends Record<string, unknown>>(
	options: DeepPartial<T>,
	defaults: T,
): T => merge(defaults, options);
