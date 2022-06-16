import {expect} from 'chai';
import {Mock} from 'moq.ts';
import {BigNumber, constants, ethers} from 'ethers';

import {ERC20 as ERC20ContractInterface} from '../src/types';
import {Erc20} from '../src';

describe('Erc20', () => {
	it('should throw error on invalid address', async () => {
		const contractAddress = '0x123';
		await Promise.resolve(
			expect(
				() => new Erc20(contractAddress, ethers.providers.getDefaultProvider()),
			).to.throw(TypeError, `Invalid contract address: ${contractAddress}`),
		);
	});

	it('should create erc20 instance from contract', async () => {
		const erc20contract = new Mock<ERC20ContractInterface>()
			.setup((c) => c.address)
			.returns(constants.AddressZero)
			.object();

		const erc20 = await Promise.resolve(Erc20.fromContract(erc20contract));
		expect(erc20 instanceof Erc20).to.eq(true);
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

			erc20 = Erc20.fromContract(
				erc20contract as unknown as ERC20ContractInterface,
			);
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
