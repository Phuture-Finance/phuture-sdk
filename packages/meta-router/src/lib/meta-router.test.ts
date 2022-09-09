import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { IndexRouter } from '@phuture/index-router';
import { ZeroExAggregator } from '@phuture/0x-aggregator';
import {Address, ProductType} from '@phuture/types';
import {SavingsVault, SavingsVaultRouter} from '@phuture/savings-vault';
import { BigNumber, constants } from 'ethers';
import { expect } from 'chai';
import { MetaRouter } from './meta-router';
import {AutoRouter} from "@phuture/auto-router";

describe('MetaRouter', () => {
	let indexRouter: DeepMockProxy<IndexRouter>;
	let zeroAggregator: DeepMockProxy<ZeroExAggregator>;
	let savingsVaultInterface: DeepMockProxy<SavingsVault>;
	let metaRouter: MetaRouter;
	let savingsVaultAddresses: Address[];
	let indexAddresses: Address[];

	beforeAll(async () => {
		indexRouter = mockDeep<IndexRouter>();
		zeroAggregator = mockDeep<ZeroExAggregator>();
		savingsVaultAddresses = [
			'0xc365c3315cf926351ccaf13fa7d19c8c4058c8e1',
			'0x28c6c06298d514db089934071355e5743bf21d60',
		];
		indexAddresses = [
			'0xf6562d37465dc23d52a8c19d45a9a7afd85fe1ec',
			'0x8167da7fa6554f2053ee92f77fd3d729323e0aca',
		];
		const products: Record<ProductType, Address[]> = {
			[ProductType.INDEX]: indexAddresses,
			[ProductType.SAVINGS_VAULT]: savingsVaultAddresses,
		};
		savingsVaultInterface = mockDeep<SavingsVault>();
		metaRouter = new MetaRouter(
			new SavingsVaultRouter(),
			new AutoRouter(indexRouter, zeroAggregator),
			products
		);
		Object.defineProperty(savingsVaultInterface, 'address', {
			get: () => savingsVaultAddresses[0],
		});
	});

	it('should be able to set product addresses', async () => {
		expect(metaRouter.getProductAddresses(ProductType.INDEX)).to.deep.eq(
			indexAddresses
		);
		expect(
			metaRouter.getProductAddresses(ProductType.SAVINGS_VAULT)
		).to.deep.eq(savingsVaultAddresses);
		for (const address of indexAddresses) {
			expect(metaRouter.findProductType(address)).to.eq(ProductType.INDEX);
		}
		for (const address of savingsVaultAddresses) {
			expect(metaRouter.findProductType(address)).to.eq(
				ProductType.SAVINGS_VAULT
			);
		}
	});

	it('should route selectBuy to SavingsVault', async () => {
		const sharesAmount = BigNumber.from(10);
		savingsVaultInterface.contract.previewDeposit.mockReturnValueOnce(
			Promise.resolve(sharesAmount)
		);
		const result = await metaRouter.selectBuy(
			savingsVaultInterface,
			sharesAmount
		);
		expect(result).to.deep.equal({
			isMint: true,
			target: constants.AddressZero,
			outputAmount: sharesAmount,
			expectedAllowance: undefined,
		});
	});

	it('should route selectSell to SavingsVault', async () => {
		const sharesAmount = BigNumber.from(10);
		savingsVaultInterface.contract.previewRedeem.mockReturnValueOnce(
			Promise.resolve(sharesAmount)
		);
		const result = await metaRouter.selectSell(
			savingsVaultInterface,
			sharesAmount
		);
		expect(result).to.deep.equal({
			isBurn: true,
			target: '0xc365c3315cf926351ccaf13fa7d19c8c4058c8e1',
			outputAmount: sharesAmount,
			expectedAllowance: undefined,
		});
	});
});
