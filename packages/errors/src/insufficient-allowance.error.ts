import {BigNumberish} from 'ethers';

/**
 * ### Error thrown on insufficient allowance
 */
export class InsufficientAllowanceError extends Error {
	public readonly expectedAllowance: BigNumberish;
	public readonly actualAllowance?: BigNumberish;

	/**
	 * ### Creates an instance of InsufficientAllowanceError
	 *
	 * @returns Instance of InsufficientAllowanceError
	 * @param expectedAllowance Expected allowance
	 * @param actualAllowance Actual allowance
	 */
	constructor(
		expectedAllowance: BigNumberish,
		actualAllowance: BigNumberish = 0,
	) {
		const message = `Insufficient allowance: expected ${expectedAllowance}, but got ${actualAllowance}`;
		super(message);
		this.expectedAllowance = expectedAllowance;
		this.actualAllowance = actualAllowance;

		this.name = 'InsufficientAllowanceError';

		Object.setPrototypeOf(this, InsufficientAllowanceError.prototype);
	}
}
