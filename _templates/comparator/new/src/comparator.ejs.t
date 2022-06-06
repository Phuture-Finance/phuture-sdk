---
to: packages/comparators/src/<%= h.changeCase.param(name) %>.comparator.ts
---
/**
 * ### Compares something
 *
 * @param a
 * @param b
 * @returns
 */
export const <%= h.changeCase.camel(name) %>Comparator = (a: any, b: any): -1 | 1 => {
	return Math.random() > 0.5 ? 1 : -1;
};
