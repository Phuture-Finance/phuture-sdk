import {canSetPrototype} from './can-set-prototype';

/**
 * ### Error status code
 *
 * @example
 * const statusCode: ErrorStatusCode = 404
 *
 * @example
 * const statusCode: ErrorStatusCode = '500'
 */
export type ErrorStatus = string | number;

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
export type ErrorProps = {
	status?: ErrorStatus;
} & (
	| {message: string; errors?: never}
	| {message?: never; errors: ErrorData[]}
);

/**
 * ### Error thrown on unexpected cases while interacting with Phuture interfaces
 */
export class PhutureError extends Error {
	/** Error code */
	public readonly status?: ErrorStatus;

	/** Errors data list */
	public readonly errors: ErrorData[];

	/**
	 * ### Creates an instance of PhutureError
	 *
	 * @param props Error props
	 *
	 * @returns Instance of PhutureError
	 */
	constructor(props: ErrorProps) {
		const {status, message, errors} = props;
		const error: ErrorData = message
			? {message, ...(status ? {status} : {})}
			: errors![0];

		super(error.message);
		this.name = this.constructor.name;

		this.errors = message ? [error] : errors!;

		if (error.status) this.status = error.status;

		if (canSetPrototype) Object.setPrototypeOf(this, new.target.prototype);
	}
}
