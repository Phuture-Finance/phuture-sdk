import { ZeroExAggregator } from '@phuture/0x-aggregator';
import { Erc20, StandardPermitArguments } from '@phuture/erc-20';
import { Index } from '@phuture/index';
import { IndexRouter } from '@phuture/index-router';
import { Address } from '@phuture/types';
import { BigNumberish } from 'ethers';
export interface MintThreshold {
    amount: BigNumberish;
    tokenAddress: Address;
}
export declare class AutoRouter {
    readonly indexRouter: IndexRouter;
    readonly zeroExAggregator: ZeroExAggregator;
    constructor(indexRouter: IndexRouter, zeroExAggregator: ZeroExAggregator);
    autoBuy(index: Index, amountInInputToken: BigNumberish, inputToken?: Erc20, permitOptions?: Omit<StandardPermitArguments, 'amount'>): Promise<string | import("ethers").ContractTransaction>;
    autoSell(index: Index, indexAmount: BigNumberish, outputToken?: Erc20 | Address, permitOptions?: Omit<StandardPermitArguments, 'amount'>): Promise<string | import("ethers").ContractTransaction>;
}
