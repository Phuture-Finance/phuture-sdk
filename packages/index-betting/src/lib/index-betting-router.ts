import { BigNumber, BigNumberish, constants } from 'ethers';
import { TransactionResponse } from '@ethersproject/abstract-provider';
import { Erc20 } from '@phuture/erc-20';
import { InsufficientAllowanceError, PhutureError } from '@phuture/errors';
import { Address, Network, Networkish } from '@phuture/types';
import { Zero0xQuoteOptions, ZeroExAggregator } from '@phuture/0x-aggregator';
import { getDefaultIndexHelper, Index } from '@phuture/index';
import { IndexRouter } from '@phuture/index-router';
import { getDefaultPriceOracle } from '@phuture/price-oracle';
import { IndexBetting } from './index-betting';

const baseMintGas = 260_000;
const additionalMintGasPerAsset = (network: Networkish): number => {
	const gas = {
		[Network.Mainnet]: 148_000,
		[Network.CChain]: 105_000,
	}[network];

	return gas ?? 135_000;
};

export class IndexBettingRouter {
	/**
	 * ### Creates a new IndexBettingRouter instance
	 *
	 * @param indexBetting instance of IndexBetting
	 * @param zeroExAggregator ZeroEx client
	 *
	 * @returns New IndexBettingRouter instance
	 */
	constructor(
		public readonly indexBetting: IndexBetting,
		public readonly zeroExAggregator: ZeroExAggregator
	) {}

	/**
	 * ### Deposit
	 *
	 * @param amountInStakingToken amount in staking token
	 *
	 * @returns deposit transaction
	 */
	async deposit(
		amountInStakingToken: BigNumberish
	): Promise<TransactionResponse> {
		const stakingToken = new Erc20(
			this.indexBetting.account,
			await this.indexBetting.contract.STAKING_TOKEN()
		);
		await stakingToken.checkAllowance(
			this.indexBetting.address,
			amountInStakingToken
		);
		return this.indexBetting.contract.deposit(amountInStakingToken);
	}

	/**
	 * ### Select Withdraw
	 *
	 * @param zeroExOptions 0x request zeroExOptions
	 *
	 * @returns output amount of Index
	 */
	async selectWithdraw(zeroExOptions?: Partial<Zero0xQuoteOptions>): Promise<{
		isMint: boolean;
		outputAmount: BigNumber;
	}> {
		const inputToken = await this.indexBetting.contract.STAKING_TOKEN();
		const indexAddress = await this.indexBetting.contract.REWARD_TOKEN();
		const user = await this.indexBetting.account;
		const index = new Index(user, indexAddress);
		const amountInInputToken = await this.indexBetting.contract.balanceOf(
			user.address()
		);
		const indexRouter = new IndexRouter(
			user,
			await this.indexBetting.contract.INDEX_ROUTER()
		);
		const [zeroExSwap, amounts, IndexHelper, priceOracle, wethAddress] =
			await Promise.all([
				this.zeroExAggregator.quote(
					inputToken,
					indexAddress,
					amountInInputToken,
					zeroExOptions
				),
				index.scaleAmount(amountInInputToken),
				getDefaultIndexHelper(user),
				getDefaultPriceOracle(user),
				indexRouter.weth(),
			]);

		const quotes = await Promise.all(
			amounts.map(async ({ amount, asset }) => {
				const { to, buyAmount, data, estimatedGas } =
					await this.zeroExAggregator.quote(
						inputToken,
						asset,
						amount,
						zeroExOptions
					);

				return {
					asset,
					swapTarget: to,
					buyAssetMinAmount: buyAmount,
					assetQuote: data,
					estimatedGas,
				};
			})
		);

		const [indexRouterMintOutputAmount, totalEvaluation, ethBasePrice] =
			await Promise.all([
				indexRouter.mintIndexAmount(
					index.address,
					amountInInputToken,
					quotes,
					inputToken
				),
				IndexHelper.contract.totalEvaluation(index.address),
				priceOracle.contract.callStatic.refreshedAssetPerBaseInUQ(wethAddress),
			]);

		const totalMintGas = BigNumber.from(
			quotes
				.reduce((curr, acc) => curr.add(acc.estimatedGas), BigNumber.from(0))
				.add(
					baseMintGas +
						quotes.length *
							additionalMintGasPerAsset(await index.account.chainId())
				)
		);

		const isMint = totalMintGas
			.sub(zeroExSwap.estimatedGas)
			.mul(zeroExSwap.gasPrice)
			.lte(
				indexRouterMintOutputAmount
					.sub(zeroExSwap.buyAmount)
					.mul(totalEvaluation._indexPriceInBase)
					.div(await index.decimals())
					.mul(ethBasePrice)
					.div(BigNumber.from(2).pow(112))
			);
		return {
			isMint,
			outputAmount: isMint
				? indexRouterMintOutputAmount
				: BigNumber.from(zeroExSwap.buyAmount),
		};
	}

	/**
	 * ### Withdraw and swap into Index
	 *
	 * @param zeroExOptions 0x request options
	 *
	 * @returns deposit transaction
	 */
	async withdrawAndSwap(
		zeroExOptions?: Partial<Zero0xQuoteOptions>
	): Promise<TransactionResponse> {
		const { to, buyAmount, data } = await this.zeroExAggregator.quote(
			await this.indexBetting.contract.STAKING_TOKEN(),
			await this.indexBetting.contract.REWARD_TOKEN(),
			await this.indexBetting.contract.balanceOf(
				(await this.indexBetting.account).address()
			),
			{
				...zeroExOptions,
			}
		);
		const estimatedGas =
			await this.indexBetting.contract.estimateGas.withdrawAndSwap(
				to,
				data,
				buyAmount
			);
		const buyAssetMinAmount = zeroExOptions?.slippagePercentage
			? BigNumber.from(buyAmount)
					.mul(1000 - zeroExOptions?.slippagePercentage * 1000)
					.div(1000)
			: buyAmount;
		return this.indexBetting.contract.withdrawAndSwap(
			to,
			data,
			buyAssetMinAmount,
			{
				gasLimit: estimatedGas.mul(100).div(95),
			}
		);
	}

	async withdrawAndMint(
		zeroExOptions?: Partial<Zero0xQuoteOptions>
	): Promise<TransactionResponse> {
		const indexAddress = await this.indexBetting.contract.REWARD_TOKEN();
		const user = await this.indexBetting.account;
		const amountInInputToken = await this.indexBetting.contract.balanceOf(
			user.address()
		);
		const index = new Index(user, indexAddress);
		const amounts = await index.scaleAmount(amountInInputToken);
		const amountsSum = amounts.reduce(
			(sum, curr) => sum.add(curr.amount),
			BigNumber.from(0)
		);
		if (amountsSum.lt(amountInInputToken)) {
			amounts[0].amount = amounts[0].amount.add(
				amountInInputToken.sub(amountsSum)
			);
		}
		const quotes = await Promise.all(
			amounts.map(async ({ asset, amount }) => {
				const { to, buyAmount, data } = await this.zeroExAggregator.quote(
					await this.indexBetting.contract.STAKING_TOKEN(),
					indexAddress,
					amount,
					zeroExOptions
				);
				const buyAssetMinAmount = zeroExOptions?.slippagePercentage
					? BigNumber.from(buyAmount)
							.mul(1000 - zeroExOptions?.slippagePercentage * 1000)
							.div(1000)
					: buyAmount;
				return {
					asset,
					swapTarget: to,
					buyAssetMinAmount: buyAssetMinAmount,
					assetQuote: data,
				};
			})
		);
		const estimatedGas =
			await this.indexBetting.contract.estimateGas.withdrawAndConvert(quotes);

		return this.indexBetting.contract.withdrawAndConvert(quotes, {
			gasLimit: estimatedGas.mul(100).div(95),
		});
	}
}
