import {BigNumber, utils} from 'ethers';
import {Address} from '@phuture/types';

/**
 * ### Compares two addresses
 * Use it for sorting addresses array
 *
 * @param a Address of token A
 * @param b Address of token B
 * @returns **-1** if a is less then b or **1** if it isn't
 */
export const addressComparator = (a: Address, b: Address): -1 | 1 => {
	// If(!utils.isAddress(a))
	// 	throw TypeError(`Invalid address: ${a}`);
	// if(!utils.isAddress(b))
	// 	throw TypeError(`Invalid address: ${b}`);

	const aBigNumber = BigNumber.from(a);
	const bBigNumber = BigNumber.from(b);
	if (aBigNumber.eq(bBigNumber)) {
		throw new Error(`Comparator duplicate: ${a} == ${b}`);
	}

	return aBigNumber.lt(bBigNumber) ? -1 : 1;
};
