import type {DeepPartial} from '@phuture/types';
import {merge} from './merge';

/**
 * ### Merges default options into an options object
 *
 * @param options Options object
 * @param defaults Default options object
 * @returns Merged options object
 */
export const withDefaults = <T extends Record<any, unknown>>(
	options: DeepPartial<T>,
	defaults: T,
): T => merge(defaults, options);
