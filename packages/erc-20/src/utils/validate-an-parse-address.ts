import {getAddress} from 'ethers/lib/utils';

/**
 * Validates an address and returns the parsed (checksummed) version of that address
 * @param address the unchecksummed hex address
 */
export function validateAndParseAddress(address: string): string {
	try {
		return getAddress(address);
	} catch {
		throw new Error(`${address} is not a valid address.`);
	}
}
