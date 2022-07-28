/**
 * ### Error status code
 *
 * @example
 * const statusCode: ErrorStatusCode = 404
 *
 * @example
 * const statusCode: ErrorStatusCode = '500'
 */
export declare type ErrorStatus = string | number;
/**
 * ### Interface for error data
 */
export interface ErrorData {
    /** Error message */
    message: string;
    /** Error status code */
    status?: ErrorStatus;
}
/**
 * ### Props for an error
 */
export declare type ErrorProps = {
    status?: ErrorStatus;
} & ({
    message: string;
    errors?: never;
} | {
    message?: never;
    errors: ErrorData[];
});
/**
 * ### Error thrown on unexpected cases while interacting with Phuture interfaces
 */
export declare class PhutureError extends Error {
    /** Error code */
    readonly status?: ErrorStatus;
    /** Errors data list */
    readonly errors: ErrorData[];
    /**
     * ### Creates an instance of PhutureError
     *
     * @param props Error props
     *
     * @returns Instance of PhutureError
     */
    constructor(props: ErrorProps);
}
