import { Erc20, Erc20Permit, StandardPermitArguments } from "@phuture/erc-20";
import { Address } from "@phuture/types";
import { BigNumberish, ContractTransaction, Signer } from "ethers";
import { IndexRouter as IndexRouterContractInterface } from "./types";
import { IIndexRouter } from "./types/IndexRouter";
/** ### Default IndexRouter address for network */
export declare enum DefaultIndexRouterAddress {
    /** ### Default IndexRouter address on mainnet. */
    Mainnet = "0xcbB6a59393D68cDa7431792e291b00c6801e7279"
}
/**
 * ### IndexRouter Contract
 */
export declare class IndexRouter {
    /** ### IndexRouter contract instance */
    contract: IndexRouterContractInterface;
    /**
     * ### Creates a new IndexRouter instance
     *
     * @param contract Contract instance or address of the IndexRouter contract
     * @param signer Signer instance
     *
     * @returns New IndexRouter token instance
     */
    constructor(signer: Signer, contract?: IndexRouterContractInterface | Address);
    _signer: Signer;
    set signer(signer: Signer);
    mint(options: IIndexRouter.MintSwapValueParamsStruct, sellAmount: BigNumberish): Promise<ContractTransaction>;
    mint(options: IIndexRouter.MintSwapParamsStruct, sellAmount: BigNumberish, sellToken: Erc20): Promise<ContractTransaction>;
    mint(options: IIndexRouter.MintSwapParamsStruct, sellAmount: BigNumberish, sellToken: Erc20Permit, permitOptions: Omit<StandardPermitArguments, "amount">): Promise<ContractTransaction>;
}
