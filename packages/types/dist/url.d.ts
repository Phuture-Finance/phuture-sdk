/**
 * ### Absolute or relative URL
 *
 * @see https://url.spec.whatwg.org/#url-interface
 */
export declare type Url = AbsoluteUrl | RelativeUrl;
/**
 * ### Absolute URL
 *
 * @example
 * const url: AbsoluteUrl = "https://phuture.finance"
 */
export declare type AbsoluteUrl = string;
/**
 * ### Relative URL
 *
 * @example
 * const url: RelativeUrl = "/some/path"
 */
export declare type RelativeUrl = string;
