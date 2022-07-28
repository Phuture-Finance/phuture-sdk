/// <reference types="node" />
import EventEmitter from 'events';
import { BigNumber, Signer } from 'ethers';
import { Address } from "@phuture/types";
/** ### Account class for interacting with the blockchain through the Signer */
export declare class Account extends EventEmitter {
    private _signer;
    /**
     * ### Constructs an instance of the Account class
     *
     * @param _signer The signer to use for the account
     *
     * @returns {Account} The account instance
     */
    constructor(_signer: Signer);
    /**
     * ### Gets the signer used for the account
     *
     * @returns The signer used for the account
     */
    get signer(): Signer;
    /**
     * ### Sets the signer to use for the account
     *
     * @param _signer The signer to use for the account
     */
    set signer(_signer: Signer);
    /**
     * ### Gets the address of the current signer
     *
     * @returns The address of the current signer
     */
    address(): Promise<Address>;
    /**
     * ### Gets the balance of the current signer
     *
     * @returns The balance of the current signer
     */
    balance(): Promise<BigNumber>;
    /**
     * ### Gets the gas price
     *
     * @returns The gas price
     */
    gasPrice(): Promise<BigNumber>;
}
