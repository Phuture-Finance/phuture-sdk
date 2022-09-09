import { expect } from 'chai';
import { BigNumber, constants, ethers, VoidSigner } from 'ethers';
import { Mock } from 'moq.ts';
import { Account } from '@phuture/account';
import {
	SavingsVault as SavingsVaultContractInterface,
	SavingsVaultViews as SavingsVaultViewsContractInterface,
} from '../types';
import { SavingsVault } from './savings-vault';
import { SavingsVaultViews } from './savings-vault-views';

describe('SavingsVault', () => {
	const account = new Account(new VoidSigner(ethers.constants.AddressZero));

	describe('SavingsVault constructed', () => {
		let savingsVault: SavingsVault;
		let savingsVaultViews: SavingsVaultViews;

		beforeAll(async () => {
			const savingsVaultContract = new Mock<SavingsVaultContractInterface>()
				.setup((c) => c.address)
				.returns(constants.AddressZero)
				.setup(async (c) => c.balanceOf(constants.AddressZero))
				.returnsAsync(BigNumber.from('1234567890000000000'))
				.setup(async (c) => c.decimals())
				.returnsAsync(18)
				.object();

			const savingsVaultViewsContract =
				new Mock<SavingsVaultViewsContractInterface>()
					.setup((c) => c.address)
					.returns('0x0000000000000000000000000000000000000001')
					.setup(async (c) => c.getAPY(constants.AddressZero))
					.returnsAsync(BigNumber.from('37264168'))
					.object();

			savingsVaultViews = new SavingsVaultViews(
				account,
				savingsVaultViewsContract
			);
			savingsVault = new SavingsVault(
				account,
				savingsVaultContract,
				undefined,
				savingsVaultViews
			);
		});

		it('SavingsVault should return formatted APY', async () => {
			const string_ = await savingsVault.apy();
			expect(string_).to.be.eq('0.037264168');
		});

		it('SavingsVault should return formatted balance', async () => {
			const string_ = await savingsVault.formattedBalanceOf(
				constants.AddressZero
			);
			expect(string_).to.be.eq('1.23456789');
		});

		it('SavingsVaultViews should return apy', async () => {
			const apy = await savingsVaultViews.contract.getAPY(
				constants.AddressZero
			);
			expect(apy.toString()).to.be.eq('37264168');
		});
	});
});
