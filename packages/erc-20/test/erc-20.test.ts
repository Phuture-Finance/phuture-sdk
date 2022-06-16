import {expect} from 'chai';
import {Mock} from 'moq.ts';
import {constants} from 'ethers';

import {ERC20 as ERC20ContractInterface} from '../src/types';
import {Erc20} from '../src/erc-20';

describe('Erc20', () => {
	let erc20: Erc20;

	beforeAll(async () => {
		const erc20contract = new Mock<ERC20ContractInterface>()
			.setup((c) => c.address)
			.returns(constants.AddressZero)
			.setup(async (c) => c.decimals())
			.returnsAsync(18)
			.object();

		erc20 = Erc20.fromContract(
			erc20contract as unknown as ERC20ContractInterface,
		);
	});

	it('should get the decimals', async () => {
		const decimals = await erc20.decimals();
		expect(decimals).to.eq(18);
	});
});
