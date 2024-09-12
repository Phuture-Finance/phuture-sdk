import type { BigNumberish } from "ethers";

import { canSetPrototype } from "./can-set-prototype";

/**
 * ### Error thrown on insufficient allowance
 */
export class InsufficientAllowanceError extends Error {
	/** ### Address of the allowance target */
	public readonly target: string;

	/** ### Excepted allowance */
	public readonly expectedAllowance: BigNumberish;

	/** ### Actual allowance */
	public readonly actualAllowance: BigNumberish;

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
		expectedAllowance: BigNumberish,
		actualAllowance: BigNumberish = 0,
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
