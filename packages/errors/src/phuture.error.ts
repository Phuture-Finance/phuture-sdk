/**
 * ### Error code
 */
export type ErrorCode = string | number;

/**
 * ### Interface for error data
 */
export interface ErrorData {
    /** Error message */
    message: string

    /** Error code */
    code?: ErrorCode
}

/**
 * ### Props for an error
 */
export type ErrorProps = {
    code?: ErrorCode
} & (
    | { message: string; errors?: never }
    | { message?: never; errors: ErrorData[] }
    )

/**
 * ### Error thrown on unexpected cases while interacting with Phuture interfaces
 */
export class PhutureError extends Error {
    /** Error code */
    public readonly code?: ErrorCode

    /** Errors data list */
    public readonly errors: ErrorData[]

    /**
     * ### Creates an instance of PhutureError
     *
     * @param props Error props
     * @returns Instance of PhutureError
     */
    constructor(props: ErrorProps) {
        const {code, message, errors} = props;
        const error: ErrorData = message
            ? {message, ...(code ? {code} : {})}
            : errors![0]

        super(error.message)
        this.name = 'PhutureError'
        this.errors = message ? [error] : errors!

        if (error.code) this.code = error.code
    }
}
