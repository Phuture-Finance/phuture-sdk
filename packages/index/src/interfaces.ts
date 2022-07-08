import type {Address} from '@phuture/types';

export interface IndexRepo {
	holders(indexAddress: Address): Promise<Address[]>;
}
