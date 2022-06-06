/**
 * ### Predicate to test if a value is an object
 *
 * @param maybeObject The value to test
 * @returns `true` if the value is an object
 *
 * @example
 * isObject({}) // => true
 * isObject([]) // => false
 * isObject(1) // => false
 * isObject(null) // => false
 * isObject(undefined) // => false
 * isObject('string') // => false
 */
export const isObject = (
	maybeObject: unknown,
): maybeObject is Record<string | number | symbol, unknown> =>
	maybeObject !== null &&
	typeof maybeObject === 'object' &&
	!Array.isArray(maybeObject);
