/** ### Generic constructor Type */
export type Constructor<T = Record<string, unknown>> = new (...args: any[]) => T
