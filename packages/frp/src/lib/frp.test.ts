import { expect } from 'chai';
import {BigNumber, constants, ethers, VoidSigner} from 'ethers';
import { Mock } from 'moq.ts';
import {FRPVault as FRPVaultContractInterface, FRPViews as FRPViewsContractInterface} from '../types';
import { Account } from '@phuture/account';
import { FRP } from './frp';
import {FRPViews} from "./frp-views";

describe('FRP', () => {
	const account = new Account(new VoidSigner(ethers.constants.AddressZero))

	describe('FRP constructed', () => {
		let frp: FRP;
		let frpViews: FRPViews

		beforeAll(async () => {
			const FRPVaultContract = new Mock<FRPVaultContractInterface>()
				.setup((c) => c.address)
				.returns(constants.AddressZero)
				.setup(async (c) => c.balanceOf(constants.AddressZero))
				.returnsAsync(BigNumber.from('1234567890000000000'))
				.setup(async (c) => c.decimals())
				.returnsAsync(18)
				.object();

			const FRPViewsContract = new Mock<FRPViewsContractInterface>()
				.setup((c) => c.address)
				.returns('0x0000000000000000000000000000000000000001')
				.setup(async (c) => c.getAPY(constants.AddressZero))
				.returnsAsync(BigNumber.from('37264168'))
				.object();

			frpViews = new FRPViews(account, FRPViewsContract)
			frp = new FRP(account, FRPVaultContract, undefined, frpViews)
		});

		it('FRP should return formatted APY', async () => {
			const string_ = await frp.getAPY();
			expect(string_).to.be.eq('0.037264168');
		});

		it('FRP should return formatted balance', async () => {
			const string_ = await frp.formattedBalanceOf(constants.AddressZero);
			expect(string_).to.be.eq('1.23456789');
		});

		it('FRPViews should return apy', async () => {
			const apy = await frpViews.contract.getAPY(constants.AddressZero);
			expect(apy.toString()).to.be.eq('37264168');
		});
	});
});
