import type { Address } from "viem";

/**
 * ### Error thrown on insufficient allowance
 */
export class InsufficientAllowanceError extends Error {
  /** ### Address of the allowance target */
  public readonly target: Address;

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
  constructor(target: Address, expectedAllowance: string, actualAllowance = "0") {
    const message = `Insufficient allowance: expected ${expectedAllowance.toString()}, but got ${actualAllowance.toString()}`;
    super(message);
    this.name = this.constructor.name;

    this.target = target;
    this.expectedAllowance = expectedAllowance;
    this.actualAllowance = actualAllowance;

    if ("setPrototypeOf" in Object) Object.setPrototypeOf(this, new.target.prototype);
  }
}
