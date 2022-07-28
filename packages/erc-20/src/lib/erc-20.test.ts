import { expect } from 'chai';
import { BigNumber, constants } from 'ethers';
import { Mock } from 'moq.ts';
import { Erc20 } from './erc-20';
import { ERC20 as ERC20ContractInterface } from '../types';
import { Account } from '@phuture/account';

describe('Erc20', () => {
	const account = new Mock<Account>().object();
	const erc20contract = new Mock<ERC20ContractInterface>()
		.setup((c) => c.address)
		.returns(constants.AddressZero)
		.object();

	it('create erc20 instance from address', () => {
		const erc20 = new Erc20(account, constants.AddressZero);
		expect(erc20.contract.address).to.eq(constants.AddressZero);
	});

	it('should create erc20 instance from contract', () => {
		const erc20 = new Erc20(account, erc20contract);
		expect(erc20.contract.address).to.eq(constants.AddressZero);
	});

	describe('erc20 constructed', () => {
		let erc20: Erc20;

		beforeAll(async () => {
			const erc20contract = new Mock<ERC20ContractInterface>()
				.setup((c) => c.address)
				.returns(constants.AddressZero)
				.setup(async (c) => c.totalSupply())
				.returnsAsync(BigNumber.from('1234567890000000000'))
				.setup(async (c) => c.balanceOf(constants.AddressZero))
				.returnsAsync(BigNumber.from('1234567890000000000'))
				.setup(async (c) => c.decimals())
				.returnsAsync(18)
				.object();

			erc20 = new Erc20(account, erc20contract);
		});

		it('should return formatted total supply', async () => {
			const string_ = await erc20.formattedTotalSupply();
			expect(string_).to.be.eq('1.23456789');
		});

		it('should return formatted balance', async () => {
			const string_ = await erc20.formattedBalanceOf(constants.AddressZero);
			expect(string_).to.be.eq('1.23456789');
		});

		it('should get the decimals', async () => {
			const decimals = await erc20.decimals();
			expect(decimals).to.eq(18);
		});
	});
});