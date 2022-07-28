import { BigNumber, BigNumberish } from 'ethers';
/**
 * ### Error thrown on insufficient allowance
 */
export declare class InsufficientAllowanceError extends Error {
    /** ### Excepted allowance */
    readonly expectedAllowance: BigNumber;
    /** ### Actual allowance */
    readonly actualAllowance: BigNumber;
    /**
     * ### Creates an instance of InsufficientAllowanceError
     *
     * @param expectedAllowance Expected allowance
     * @param actualAllowance Actual allowance
     *
     * @returns Instance of InsufficientAllowanceError
     */
    constructor(expectedAllowance: BigNumberish, actualAllowance?: BigNumberish);
}
