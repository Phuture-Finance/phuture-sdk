import {Address} from '@phuture/types';
import {BytesLike} from 'ethers';

export interface Zero0xQuoteOptions {
	takerAddress: Address;
	excludedSources: string[];
	slippagePercentage: number;
	skipValidation: boolean;
	gasFee: number;
}

export interface Zero0xQuoteResponse {
	to: Address;
	data: BytesLike;
	buyAmount: string;
	sellAmount: string;
}

export interface Zero0xPriceOptions {
	takerAddress: Address;
	excludedSources: string[];
	slippagePercentage: number;
	skipValidation: boolean;
	gasFee: number;
}

export interface Zero0xPriceResponse {
	data: BytesLike;
	buyAmount: string;
	sellAmount: string;
}

export interface Zero0xSourcesResponse {
	records: string[];
}
