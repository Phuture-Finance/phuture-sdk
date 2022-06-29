import { BigNumberish } from "ethers";

/**
 * ### Props for an error
 */
export type InsufficientAllowanceErrorProps = {
	expectedAllowance: BigNumberish;
	actualAllowance?: BigNumberish;
};

/**
 * ### Error thrown on insufficient allowance
 */
export class InsufficientAllowanceError extends Error {
	public readonly expectedAllowance: BigNumberish;
	public readonly actualAllowance?: BigNumberish;
	/**
	 * ### Creates an instance of InsufficientAllowanceError
	 *
	 * @param props Error props
	 * @returns Instance of InsufficientAllowanceError
	 */
	constructor(props: InsufficientAllowanceErrorProps) {
		const { expectedAllowance, actualAllowance = 0 } = props;

		const message = `Insufficient allowance expectedAllowance: ${expectedAllowance} actualAllowance: ${actualAllowance} `;
		super(message);
		this.expectedAllowance = expectedAllowance;
		this.actualAllowance = actualAllowance;

		this.name = "InsufficientAllowanceError";
	}
}
