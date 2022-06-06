import {isObject} from './is-object';

/**
 * ### Merges target and sources objects
 *
 * @param target Target object
 * @param source Source object
 * @returns Merged object
 */
export const merge = <T extends Record<string | number | symbol, unknown>, S>(
	target: T,
	source: S,
): T & S => {
	const result: any = {...target};
	for (const [key, value] of Object.entries(source))
		result[key] = (
			isObject(value) ? merge(result[key], value) : value
		) as unknown;

	return result as T & S;
};
