import { Erc20Permit } from '@phuture/erc-20';
import type { Address, ContractFactory, PriceSource } from '@phuture/types';
import { BigNumber, BigNumberish } from 'ethers';
import { Account } from '@phuture/account';
import { BaseIndex } from './types';
import { Fees, IndexRepo } from './interfaces';
/**
 * ### Index Contract
 */
export declare class Index extends Erc20Permit<BaseIndex> {
    /** ### Index repository */
    private _indexRepo;
    /** ### Price source */
    private _priceSource?;
    /**
     * ### Creates a new Index instance
     *
     * @param account Account to use for interacting with the contract
     * @param contract Contract instance or address of the Index token contract
     * @param factory Contract factory to use for creating the contract
     *
     * @returns New Index token instance
     */
    constructor(account: Account, contract: Address | BaseIndex, factory?: ContractFactory);
    /**
     * ### Connect repository to Index
     *
     * @param {IndexRepo} indexRepo Repository to connect to Index
     *
     * @returns {this} Index instance
     */
    withRepo(indexRepo: IndexRepo): this;
    /**
     * ### Connect price source to Index
     *
     * @param {IndexRepo} priceSource Price source to connect to Index
     *
     * @returns {this} Index instance
     */
    withPriceSource(priceSource: PriceSource): this;
    /**
     * ### Scale amount of input tokens to set underlying tokens amount
     *
     * @param amountDesired Amount of input tokens to scale
     */
    scaleAmount(amountDesired: BigNumberish): Promise<{
        amountToSell: BigNumber;
        amounts: Record<Address, BigNumber>;
    }>;
    /**
     * ### Get holders of the index
     *
     * @returns {Promise<Address[]>} Holders of the index
     */
    holders(): Promise<Address[]>;
    /**
     * ### Get holders count of the index
     *
     * @returns {Promise<number>} Count of holders of the index
     */
    holdersCount(): Promise<number>;
    /**
     * ### Get price of the index
     *
     * @param {Address} sellToken Token to sell
     * @param {BigNumberish} sellAmount Amount of tokens to sell
     *
     * @returns {Promise<BigNumber>} Price of the index in sellToken
     */
    price(sellToken: Address, sellAmount: BigNumberish): Promise<BigNumber>;
    /**
     * ### Get price of the index
     *
     * @returns {Promise<BigNumber>} Price of the index in sellToken
     */
    priceEth(): Promise<BigNumber>;
    /**
     * ### Get market cap of the index
     *
     * @param {Address} sellToken Token to sell
     *
     * @returns {Promise<BigNumber>} Market cap of the index in sellToken
     */
    marketCap(sellToken: Address): Promise<BigNumber>;
    /**
     * ### Get fees of the index
     *
     * @returns {Promise<Fees>} Fees of the index
     */
    fees(): Promise<Fees>;
}
