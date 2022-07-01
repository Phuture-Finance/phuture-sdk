import {BigNumber, BigNumberish} from 'ethers';

/**
 * ### Error thrown on insufficient allowance
 */
export class InsufficientAllowanceError extends Error {
	/** ### Excepted allowance */
	public readonly expectedAllowance: BigNumber;

	/** ### Actual allowance */
	public readonly actualAllowance: BigNumber;

	/**
	 * ### Creates an instance of InsufficientAllowanceError
	 *
	 * @param expectedAllowance Expected allowance
	 * @param actualAllowance Actual allowance
	 *
	 * @returns Instance of InsufficientAllowanceError
	 */
	constructor(
		expectedAllowance: BigNumberish,
		actualAllowance: BigNumberish = 0,
	) {
		expectedAllowance = BigNumber.from(expectedAllowance);
		actualAllowance = BigNumber.from(actualAllowance);
		const message = `Insufficient allowance: expected ${expectedAllowance.toString()}, but got ${actualAllowance.toString()}`;
		super(message);
		this.expectedAllowance = expectedAllowance;
		this.actualAllowance = actualAllowance;

		this.name = 'InsufficientAllowanceError';

		Object.setPrototypeOf(this, InsufficientAllowanceError.prototype);
	}
}
