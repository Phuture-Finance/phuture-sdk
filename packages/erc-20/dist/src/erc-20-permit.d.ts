import { Address, ContractFactory, Signature } from '@phuture/types';
import { BigNumberish } from 'ethers';
import { Account } from '@phuture/account';
import { Erc20 } from './erc-20';
import { ERC20Permit as ERC20PermitContractInterface } from './types';
/** ### Standard permit arguments */
export interface StandardPermitArguments extends Signature {
    amount: BigNumberish;
    deadline: BigNumberish;
}
/** ### Allowed permit arguments */
export interface AllowedPermitArguments extends Signature {
    nonce: BigNumberish;
    expiry: BigNumberish;
}
/** ### Erc20Permit options type */
export declare type PermitOptions = StandardPermitArguments | AllowedPermitArguments;
/**
 * ### Encodes permit data for given erc20 contract and options
 * @param erc20 Erc20 contract instance of contract address
 */
export declare const encodePermit: (erc20: Erc20 | Address) => (options: PermitOptions) => string;
/** ### Erc20Permit Token Contract */
export declare class Erc20Permit<C extends ERC20PermitContractInterface = ERC20PermitContractInterface> extends Erc20<C> {
    /** Encodes permit data for the given options */
    encodePermit: (options: PermitOptions) => string;
    /**
     * ### Creates a new Erc20Permit instance
     *
     * @param account Account to use for interacting with the contract
     * @param contract Contract instance or address of the Erc20Permit token contract
     * @param factory Contract factory to use for creating the contract
     *
     * @returns New Erc20Permit token instance
     */
    constructor(account: Account, contract: Address | C, factory?: ContractFactory);
}
