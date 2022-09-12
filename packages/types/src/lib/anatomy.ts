import { Address } from './address';

export type Anatomy = {
	asset: Address;
	weight: number;
}[];

/**
 * Maximum weight of all the assets
 */
export const MAX_WEIGHT = 256;
