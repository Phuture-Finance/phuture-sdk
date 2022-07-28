import { Erc20, StandardPermitArguments } from '@phuture/erc-20';
import { Address } from '@phuture/types';
import { BigNumber, BigNumberish, ContractTransaction } from 'ethers';
import { Contract } from '@phuture/contract';
import { Account } from '@phuture/account';
import { IndexRouter as IndexRouterContractInterface } from './types';
import { IIndexRouter } from './types/IndexRouter';
/** ### Default IndexRouter address for network */
export declare enum DefaultIndexRouterAddress {
    /** ### Default IndexRouter address on mainnet. */
    Mainnet = "0x7b6c3e5486d9e6959441ab554a889099eed76290"
}
/** ### IndexRouter Contract */
export declare class IndexRouter extends Contract<IndexRouterContractInterface> {
    private _weth?;
    /**
     * ### Creates a new IndexRouter instance
     *
     * @param account Account to use for signing
     * @param contract Contract instance or address of the IndexRouter contract
     *
     * @returns New IndexRouter token instance
     */
    constructor(account: Account, contract?: IndexRouterContractInterface | Address);
    weth(): Promise<Address>;
    /**
     * ### Mint
     *
     * @param options mint options
     * @param sellAmount token's  amount
     * @param sellToken (optional) erc20 token
     * @param permitOptions (optional) permit options for transaction
     *
     * @returns mint transaction
     */
    mintSwap(options: IIndexRouter.MintParamsStruct | IIndexRouter.MintSwapParamsStruct | IIndexRouter.MintSwapValueParamsStruct, sellAmount: BigNumberish, sellToken?: Erc20, permitOptions?: Omit<StandardPermitArguments, 'amount'>): Promise<ContractTransaction>;
    /**
     * ### Mint Static
     *
     * @param options mint options
     * @param sellAmount token's  amount
     * @param sellToken (optional) erc20 token
     * @param permitOptions (optional) permit options for transaction
     *
     * @returns mint amount
     */
    mintSwapStatic(options: IIndexRouter.MintParamsStruct | IIndexRouter.MintSwapParamsStruct | IIndexRouter.MintSwapValueParamsStruct, sellAmount: BigNumberish, sellToken?: Erc20, permitOptions?: Omit<StandardPermitArguments, 'amount'>): Promise<{
        outputAmount: BigNumber;
        estimatedGas: BigNumber;
    }>;
    /**
     * ### Mint Index Amount
     *
     * @param index index address
     * @param amountInInputToken token's  amount
     * @param quotes quotes for swaps
     * @param inputToken (optional) token's address
     *
     * @returns mint amount in single token
     */
    mintIndexAmount(index: Address, amountInInputToken: BigNumberish, quotes: IIndexRouter.MintQuoteParamsStruct[], inputToken?: Address): Promise<BigNumber>;
    /**
     * ### Burn
     *
     * @param index index address or it's erc20 interface
     * @param amount index amount
     * @param recipient address of account to receive tokens
     * @param permitOptions permit options for transaction
     *
     * @returns burn transaction
     */
    burn(index: Address | Erc20, amount: BigNumberish, recipient: Address, permitOptions?: Omit<StandardPermitArguments, 'amount'>): Promise<ContractTransaction>;
    /**
     * ### Burn Swap
     *
     * @param index index address or it's erc20 interface
     * @param amount index amount
     * @param recipient signer's address
     * @param options burn swap options
     *
     * @returns burn swap transaction
     */
    burnSwap(index: Address | Erc20, amount: BigNumberish, recipient: Address, options: {
        quotes: IIndexRouter.BurnQuoteParamsStruct[];
        outputAsset?: Address;
        permitOptions?: Omit<StandardPermitArguments, 'amount'>;
    }): Promise<ContractTransaction>;
    /**
     * ### Burn Swap Static
     *
     * @param index index address or it's erc20 interface
     * @param amount index amount
     * @param recipient signer's address
     * @param options burn swap options
     *
     * @returns burn swap amount
     */
    burnSwapStatic(index: Address | Erc20, amount: BigNumberish, recipient: Address, options: {
        quotes: IIndexRouter.BurnQuoteParamsStruct[];
        outputAsset?: Address;
        permitOptions?: Omit<StandardPermitArguments, 'amount'>;
    }): Promise<{
        outputAmount: BigNumber;
        estimatedGas: BigNumber;
    }>;
    burnAmount(index: Address, amount: BigNumberish): Promise<BigNumber[]>;
    burnAmount(index: Address, amount: BigNumberish, prices?: BigNumberish[]): Promise<BigNumber>;
}
