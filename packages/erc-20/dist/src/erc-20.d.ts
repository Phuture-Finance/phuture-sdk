import { Address, ContractFactory } from '@phuture/types';
import { BigNumberish } from 'ethers';
import { Contract } from '@phuture/contract/dist';
import { Account } from '@phuture/account';
import { ERC20 as ERC20ContractInterface } from './types';
/** ### ERC20 Token Contract */
export declare class Erc20<C extends ERC20ContractInterface = ERC20ContractInterface> extends Contract<C> {
    /** ### Decimals of the token */
    private _decimals?;
    /** ### Symbol of the token */
    private _symbol?;
    /** ### Name of the token */
    private _name?;
    /**
     * ### Creates a new ERC20 instance
     *
     * @param account Account to use for interacting with the contract
     * @param contract Contract instance or address of the ERC20 token contract
     * @param factory Contract factory to use for creating the contract
     *
     * @returns New ERC20 token instance
     */
    constructor(account: Account, contract: Address | C, factory?: ContractFactory);
    /**
     * ### Get the decimals of the token
     *
     * @returns Decimals of the token
     */
    decimals(): Promise<number>;
    /**
     * ### Get the symbol of the token
     *
     * @returns Symbol of the token
     */
    symbol(): Promise<string>;
    /**
     * ### Get the name of the token
     *
     * @returns Name of the token
     */
    name(): Promise<string>;
    /**
     * ### Get the formatted total supply of the token
     *
     * @returns Formatted total supply of the token
     */
    formattedTotalSupply(): Promise<string>;
    /**
     * ### Get the formatted balance of the account
     *
     * @param account Address of the account
     *
     * @returns Formatted balance of the account
     */
    formattedBalanceOf(account: Address): Promise<string>;
    /**
     * ### Check Allowance
     *
     * @param account Address of the account
     * @param amount Token amount
     *
     * @returns true if the account has enough tokens to transfer the amount
     */
    checkAllowance(account: Address, amount: BigNumberish): Promise<boolean>;
}
