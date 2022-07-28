/// <reference types="node" />
import EventEmitter from 'events';
import { Contract as EthersContract } from 'ethers';
import type { Address, ContractFactory } from '@phuture/types';
import { Account } from '@phuture/account';
/** ### Contract Instance */
export declare class Contract<C extends EthersContract> extends EventEmitter {
    private _account;
    protected readonly contractFactory: ContractFactory;
    /** ### Contract instance */
    contract: C;
    /**
     * ### Constructs an instance of the contract class
     *
     * @param _account Account used for interacting with the contract
     * @param contract Contract or contract address to interact with
     * @param contractFactory Factory for creating the contract
     *
     * @returns {Contract} The contract instance
     */
    constructor(_account: Account, contract: C | Address, contractFactory: ContractFactory);
    /**
     * ### Get the address of the contract
     *
     * @returns Address of the contract
     */
    get address(): Address;
    /**
     * ### Set the address of the contract
     *
     * @param address Address of the contract
     */
    set address(address: Address);
    /**
     * ### Get the signer used for interacting with the contract
     *
     * @returns Signer used for interacting with the contract
     */
    get account(): Account;
    /**
     * ### Set the signer used for interacting with the contract
     *
     * @param account Account used for interacting with the contract
     */
    set account(account: Account);
}
