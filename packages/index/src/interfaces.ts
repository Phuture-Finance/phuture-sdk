import type {Address} from '@phuture/types';

export interface IndexRepo {
	holders(indexAddress: Address): Promise<Address[]>;

	holdersCount(indexAddress: Address): Promise<number>;

	fees(indexAddress: Address): Promise<Fees>;
}

export interface Fees {
	minting: number;
	management: number;
	redemption: number;
}
