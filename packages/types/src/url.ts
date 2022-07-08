/**
 * ### Absolute or relative URL
 *
 * @see https://url.spec.whatwg.org/#url-interface
 */
export type Url = AbsoluteUrl | RelativeUrl;

const isUrl = (url: unknown): url is Url => typeof url === 'string';

/**
 * ### Absolute URL
 *
 * @example
 * const url: AbsoluteUrl = "https://phuture.finance"
 */
export type AbsoluteUrl = string;

/**
 * ### Relative URL
 *
 * @example
 * const url: RelativeUrl = "/some/path"
 */
export type RelativeUrl = string;
