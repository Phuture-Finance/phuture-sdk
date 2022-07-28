/**
 * ### HTTP Method
 *
 * @see https://developer.mozilla.org/docs/Web/HTTP/Methods
 *
 * @example
 * const method: HttpMethod = HttpMethod.GET
 */
export var HttpMethod;
(function (HttpMethod) {
    /** GET method to get the resource */
    HttpMethod["GET"] = "GET";
    /** HEAD method to get the headers of the resource */
    HttpMethod["HEAD"] = "HEAD";
    /** POST method to create a new resource */
    HttpMethod["POST"] = "POST";
    /** PUT method to replace an existing resource */
    HttpMethod["PUT"] = "PUT";
    /** DELETE method to delete an existing resource */
    HttpMethod["DELETE"] = "DELETE";
    /** CONNECT method to connect to a remote host */
    HttpMethod["CONNECT"] = "CONNECT";
    /** OPTIONS method to get the options of the resource */
    HttpMethod["OPTIONS"] = "OPTIONS";
    /** TRACE method to get the trace of the resource */
    HttpMethod["TRACE"] = "TRACE";
    /** PATCH method to patch an existing resource */
    HttpMethod["PATCH"] = "PATCH";
})(HttpMethod || (HttpMethod = {}));
/**
 * ### Check if the given method is a valid HTTP method
 *
 * @param {string} method The method to check
 * @return {method is HttpMethod} True if the method is a valid HTTP method
 */
export const isHttpMethod = (method) => typeof method === 'string' && method in HttpMethod;
//# sourceMappingURL=http-method.js.map