import {expect} from 'chai';
import {ethers} from 'ethers';

import {Erc165} from '../src';

describe('Erc165', () => {
	it('should throw error on invalid address', async () => {
		const contractAddress = '0x123';
		expect(
			() => new Erc165(contractAddress, ethers.providers.getDefaultProvider()),
		).to.throw(TypeError, `Invalid contract address: ${contractAddress}`);
	});
});
