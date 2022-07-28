import {BigNumber, BigNumberish} from 'ethers';
import {canSetPrototype} from './can-set-prototype';

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
		this.name = this.constructor.name;

		this.expectedAllowance = expectedAllowance;
		this.actualAllowance = actualAllowance;

		if (canSetPrototype) Object.setPrototypeOf(this, new.target.prototype);
	}
}
