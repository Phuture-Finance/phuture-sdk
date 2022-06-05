import {isObject} from "./is-object";

/**
 * ### Merges target and sources objects
 *
 * @param target Target object
 * @param source Source object
 * @returns Merged object
 */
export const merge = (target: any, source: any): any => {
	if (!isObject(target))
		throw new Error("Target must be an object");

	if (!isObject(source))
		throw new Error("Source must be an object");

	const result: any = {...target};
	for (const [key, value] of Object.entries(source))
		result[key] = isObject(value) ? merge(result[key], value) : value;

	return result;
}
