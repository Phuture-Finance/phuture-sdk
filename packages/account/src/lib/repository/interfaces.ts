import { Types } from '@phuture/subgraph';
import { Address } from '@phuture/types';

/** ### Account Repository Interface */
export interface AccountRepo {
	indexes: (address: Address) => Promise<Types.UserIndex[]>;
}
