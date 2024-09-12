import { canSetPrototype } from "./can-set-prototype";

/**
 * ### Error thrown on insufficient allowance
 */
export class InsufficientAllowanceError extends Error {
	/** ### Address of the allowance target */
	public readonly target: string;

	/** ### Excepted allowance */
	public readonly expectedAllowance: string;

	/** ### Actual allowance */
	public readonly actualAllowance: string;

	/**
	 * ### Creates an instance of InsufficientAllowanceError
	 *
	 * @param target Address of the allowance target
	 * @param expectedAllowance Expected allowance
	 * @param actualAllowance Actual allowance
	 *
	 * @returns Instance of InsufficientAllowanceError
	 */
	constructor(
		target: string,
		expectedAllowance: string,
		actualAllowance = "0",
	) {
		const message = `Insufficient allowance: expected ${expectedAllowance.toString()}, but got ${actualAllowance.toString()}`;
		super(message);
		this.name = this.constructor.name;

		this.target = target;
		this.expectedAllowance = expectedAllowance;
		this.actualAllowance = actualAllowance;

		if (canSetPrototype) Object.setPrototypeOf(this, new.target.prototype);
	}
}
