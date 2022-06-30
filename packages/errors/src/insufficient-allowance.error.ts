/**
 * ### Error thrown on insufficient allowance
 */
export class InsufficientAllowanceError extends Error {
	public readonly expectedAllowance: string;
	public readonly actualAllowance?: string;

	/**
	 * ### Creates an instance of InsufficientAllowanceError
	 *
	 * @returns Instance of InsufficientAllowanceError
	 * @param expectedAllowance Expected allowance
	 * @param actualAllowance Actual allowance
	 */
	constructor(expectedAllowance: string, actualAllowance = '0') {
		const message = `Insufficient allowance: expected ${expectedAllowance}, but got ${actualAllowance}`;
		super(message);
		this.expectedAllowance = expectedAllowance;
		this.actualAllowance = actualAllowance;

		this.name = 'InsufficientAllowanceError';

		Object.setPrototypeOf(this, InsufficientAllowanceError.prototype);
	}
}
