import {ZeroExAggregator} from '@phuture/0x-aggregator';
import {Erc20, Erc20Permit, StandardPermitArguments} from '@phuture/erc-20';
import {Index} from '@phuture/index';
import {IndexRouter} from '@phuture/index-router';
import {Address, isAddress} from '@phuture/types';
import {BigNumber, BigNumberish, Signer} from 'ethers';

export interface MintThreshold {
	amount: BigNumberish;
	tokenAddress: Address;
}

/**
 * ### AutoRouter class
 */
export class AutoRouter {
	/**
	 * ### Creates a new AutoRouter instance
	 *
	 * @param indexRouter IndexRouter package
	 * @param zeroExAggregator ZeroExAggregator package
	 * @param signer Signer to use for the contract
	 * @param mintThreshold Minimum amount of token value to mint using the IndexRouter
	 *
	 * @returns New AutoRouter instance
	 */
	constructor(
		public signer: Signer,
		public readonly indexRouter: IndexRouter,
		public readonly zeroExAggregator: ZeroExAggregator,
		public mintThreshold: MintThreshold,
	) {}

	/**
	 * ### Auto Buy
	 *
	 * @param index index address or it's Index interface
	 * @param amountInInputToken amount in input token
	 * @param inputToken Erc20 or Erc20Permit interface of input token
	 * @param permitOptions permit options for transaction
	 *
	 * @returns mint or swap transaction
	 */
	async autoBuy(
		index: Index | Address,
		amountInInputToken: BigNumberish,
		inputToken?: Erc20 | Erc20Permit,
		permitOptions?: Omit<StandardPermitArguments, 'amount'>,
	) {
		index = isAddress(index) ? new Index(this.signer, index) : index;
		const inputTokenInstance =
			inputToken ?? new Erc20(this.signer, await this.indexRouter.weth());

		const [
			{buyAmount: zeroExAmount, to: swapTarget, data: indexQuote},
			{buyAmount},
		] = await Promise.all([
			this.zeroExAggregator.quote(
				inputTokenInstance.address,
				index.address,
				amountInInputToken,
			),
			this.zeroExAggregator.price(
				inputTokenInstance.address,
				this.mintThreshold.tokenAddress,
				amountInInputToken,
			),
		]);

		if (BigNumber.from(this.mintThreshold.amount).lt(buyAmount)) {
			const {amounts, amountToSell} = await index.scaleAmount(
				amountInInputToken,
			);

			const quotes = await Promise.all(
				Object.entries(amounts).map(async ([asset, amount]) => {
					const {
						buyAmount: buyAssetMinAmount,
						to: swapTarget,
						data: assetQuote,
					} = await this.zeroExAggregator.quote(
						inputTokenInstance.address,
						asset,
						amount,
					);

					return {
						asset,
						swapTarget,
						buyAssetMinAmount,
						assetQuote,
					};
				}),
			);

			if (permitOptions) {
				const indexRouterAmount = await this.indexRouter.mintSwapStatic(
					{
						index: index.address,
						recipient: await this.signer.getAddress(),
						quotes,
						amountInInputToken,
						inputToken: inputTokenInstance.address,
					},
					amountToSell,
					inputTokenInstance,
					permitOptions,
				);

				if (indexRouterAmount.gte(zeroExAmount))
					return this.indexRouter.mintSwap(
						{
							index: index.address,
							recipient: await this.signer.getAddress(),
							quotes,
							amountInInputToken,
							inputToken: inputTokenInstance.address,
						},
						amountToSell,
						inputTokenInstance,
						permitOptions,
					);
			}

			const indexRouterAmount = await this.indexRouter.mintSwapStatic(
				{
					index: index.address,
					recipient: await this.signer.getAddress(),
					quotes,
					amountInInputToken,
					inputToken: inputTokenInstance.address,
				},
				amountToSell,
				inputTokenInstance,
			);

			if (indexRouterAmount.gte(zeroExAmount))
				return this.indexRouter.mintSwap(
					{
						index: index.address,
						recipient: await this.signer.getAddress(),
						quotes,
						amountInInputToken,
						inputToken: inputTokenInstance.address,
					},
					amountToSell,
					inputTokenInstance,
				);
		}

		return this.signer.call({
			to: swapTarget,
			data: indexQuote,
			value: inputToken ? 0 : zeroExAmount,
		});
	}

	/**
	 * ### Auto Sell
	 *
	 * @param index index address or it's Index interface
	 * @param indexAmount amount in index token
	 * @param outputToken address of account to receive tokens
	 * @param permitOptions permit options for transaction
	 *
	 * @returns burn or swap transaction
	 */
	async autoSell(
		index: Index | Address,
		indexAmount: BigNumberish,
		outputToken?: Address,
		permitOptions?: Omit<StandardPermitArguments, 'amount'>,
	) {
		const indexInterface = isAddress(index)
			? new Index(this.signer, index)
			: index;

		outputToken ??= await this.indexRouter.weth();

		const [
			{buyAmount: zeroExAmount, to: swapTarget, data: assetQuote},
			{buyAmount},
		] = await Promise.all([
			this.zeroExAggregator.quote(
				indexInterface.address,
				outputToken,
				indexAmount,
			),
			this.zeroExAggregator.price(
				indexInterface.address,
				this.mintThreshold.tokenAddress,
				indexAmount,
			),
		]);

		if (BigNumber.from(this.mintThreshold.amount).lt(buyAmount)) {
			const {amounts, amountToSell} = await indexInterface.scaleAmount(
				indexAmount,
			);

			const quotes = await Promise.all(
				Object.entries(amounts).map(async ([asset, amount]) => {
					const {
						buyAmount: buyAssetMinAmount,
						to: swapTarget,
						data: assetQuote,
					} = await this.zeroExAggregator.quote(
						indexInterface.address,
						asset,
						amount,
					);

					return {
						asset,
						swapTarget,
						buyAssetMinAmount,
						assetQuote,
					};
				}),
			);

			const options = {
				outputAsset:
					outputToken === (await this.indexRouter.weth())
						? undefined
						: outputToken,
				quotes,
				permitOptions,
			};
			if (permitOptions) {
				const indexRouterAmount = await this.indexRouter.burnSwapStatic(
					indexInterface.address,
					amountToSell,
					await this.signer.getAddress(),
					options,
				);

				if (indexRouterAmount.gte(zeroExAmount))
					return this.indexRouter.burnSwap(
						indexInterface.address,
						amountToSell,
						await this.signer.getAddress(),
						options,
					);
			}
		}

		return this.signer.call({to: swapTarget, data: assetQuote});
	}
}
