import { Address, Networkish, TokenSymbol } from '@phuture/types';
/** ### Default addresses for network ### */
export declare const setOfAssets: {
    [key in Networkish]: Record<TokenSymbol, Address>;
};
