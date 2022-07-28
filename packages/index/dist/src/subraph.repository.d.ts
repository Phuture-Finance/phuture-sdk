import { Subgraph } from '@phuture/subgraph';
import { Address } from '@phuture/types/dist';
import { BigNumber } from 'ethers';
import { Fees, IndexRepo } from './interfaces';
/** ### Subgraph Index Repository */
export declare class SubgraphIndexRepo implements IndexRepo {
    /** ### Subgraph client instance */
    private readonly _subgraph;
    /**
     * ### Creates a new Subgraph Index Repository instance
     *
     * @param {Subgraph} _subgraph Subgraph client instance
     *
     * @returns {SubgraphIndexRepo} Subgraph Index Repository instance
     */
    constructor(_subgraph?: Subgraph);
    /**
     * ### Get the holders of the index
     *
     * @param {Address} indexAddress The address of the index
     *
     * @returns {Promise<Address[]>} Addresses of the holders
     */
    holders(indexAddress: Address): Promise<Address[]>;
    /**
     * ### Get the count of holders of the index
     *
     * @param {Address} indexAddress The address of the index
     *
     * @returns {Promise<number>} The count of holders
     */
    holdersCount(indexAddress: Address): Promise<number>;
    /**
     * ### Get fees of the index
     *
     * @param {Address} indexAddress The address of the index
     *
     * @returns {Promise<Fees>} Fees of the index
     */
    fees(indexAddress: Address): Promise<Fees>;
    priceEth(indexAddress: Address): Promise<BigNumber>;
}
/** ### Subgraph Index Repository Singleton */
export declare const subgraphIndexRepo: SubgraphIndexRepo;
