import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { IndexRouter } from '@phuture/index-router';
import { ZeroExAggregator } from '@phuture/0x-aggregator';
import { ProductType } from '@phuture/types';
import { SavingsVault, SavingsVaultRouter } from '@phuture/savings-vault';
import { BigNumber, constants } from 'ethers';
import { expect } from 'chai';
import { AutoRouter } from '@phuture/auto-router';
import { MetaRouter } from './meta-router';

describe('MetaRouter', () => {
	const indexAddress = '0xf6562d37465dc23d52a8c19d45a9a7afd85fe1ec';
	const savingsVaultAddress = '0xc365c3315cf926351ccaf13fa7d19c8c4058c8e1';

	let indexRouter: DeepMockProxy<IndexRouter>;
	let zeroAggregator: DeepMockProxy<ZeroExAggregator>;
	let savingsVaultInterface: DeepMockProxy<SavingsVault>;
	let metaRouter: MetaRouter;

	beforeAll(async () => {
		indexRouter = mockDeep<IndexRouter>();
		zeroAggregator = mockDeep<ZeroExAggregator>();

		savingsVaultInterface = mockDeep<SavingsVault>();
		metaRouter = new MetaRouter(
			new SavingsVaultRouter(),
			new AutoRouter(indexRouter, zeroAggregator),
			{
				[indexAddress]: ProductType.INDEX,
				[savingsVaultAddress]: ProductType.SAVINGS_VAULT,
			}
		);
		Object.defineProperty(savingsVaultInterface, 'address', {
			get: () => savingsVaultAddress,
		});
	});

	it('should be able to get product type', async () => {
		expect(metaRouter.findProductType(indexAddress)).to.eq(ProductType.INDEX);
		expect(metaRouter.findProductType(savingsVaultAddress)).to.eq(
			ProductType.SAVINGS_VAULT
		);
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
			target: '0xc365c3315cf926351ccaf13fa7d19c8c4058c8e1',
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
