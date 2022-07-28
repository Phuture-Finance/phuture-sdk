/**
 * ### HTTP Method
 *
 * @see https://developer.mozilla.org/docs/Web/HTTP/Methods
 *
 * @example
 * const method: HttpMethod = HttpMethod.GET
 */
export enum HttpMethod {
	/** GET method to get the resource */
	GET = 'GET',

	/** HEAD method to get the headers of the resource */
	HEAD = 'HEAD',

	/** POST method to create a new resource */
	POST = 'POST',

	/** PUT method to replace an existing resource */
	PUT = 'PUT',

	/** DELETE method to delete an existing resource */
	DELETE = 'DELETE',

	/** CONNECT method to connect to a remote host */
	CONNECT = 'CONNECT',

	/** OPTIONS method to get the options of the resource */
	OPTIONS = 'OPTIONS',

	/** TRACE method to get the trace of the resource */
	TRACE = 'TRACE',

	/** PATCH method to patch an existing resource */
	PATCH = 'PATCH',
}

/**
 * ### Check if the given method is a valid HTTP method
 *
 * @param {string} method The method to check
 * @return {method is HttpMethod} True if the method is a valid HTTP method
 */
export const isHttpMethod = (method: unknown): method is HttpMethod =>
	typeof method === 'string' && method in HttpMethod;
