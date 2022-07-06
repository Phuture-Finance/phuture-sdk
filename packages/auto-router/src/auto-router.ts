import {ZeroExAggregator} from '@phuture/0x-aggregator';
import {Erc20, Erc20Permit, StandardPermitArguments} from '@phuture/erc-20';
import {Index} from '@phuture/index';
import {IndexRouter} from '@phuture/index-router';
import {Address, isAddress} from '@phuture/types';
import {BigNumber, BigNumberish, Signer} from 'ethers';

interface MintThreshold {
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

	async autoBuy(
		index: Index | Address,
		amountInInputToken: BigNumberish,
		inputToken?: Erc20 | Erc20Permit,
		permitOptions?: Omit<StandardPermitArguments, 'amount'>,
	) {
		index = isAddress(index) ? new Index(this.signer, index) : index;
		inputToken ??= new Erc20Permit(this.signer, await this.indexRouter.weth());

		const {
			buyAmount: zeroExAmount,
			to: swapTarget,
			data: assetQuote,
		} = await this.zeroExAggregator.quote(
			inputToken.address,
			index.address,
			amountInInputToken,
		);

		const {buyAmount} = await this.zeroExAggregator.price(
			inputToken.address,
			this.mintThreshold.tokenAddress,
			amountInInputToken,
		);

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
						inputToken?.address ?? (await this.indexRouter.weth()),
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
						inputToken: inputToken.address,
					},
					amountToSell,
					inputToken,
					permitOptions,
				);

				if (indexRouterAmount.gte(zeroExAmount)) {
					return this.indexRouter.mintSwap(
						{
							index: index.address,
							recipient: await this.signer.getAddress(),
							quotes,
							amountInInputToken,
							inputToken: inputToken.address,
						},
						amountToSell,
						inputToken,
						permitOptions,
					);
				}
			} else {
				const indexRouterAmount = await this.indexRouter.mintSwapStatic(
					{
						index: index.address,
						recipient: await this.signer.getAddress(),
						quotes,
						amountInInputToken,
						inputToken: inputToken.address,
					},
					amountToSell,
					inputToken,
				);

				if (indexRouterAmount.gte(zeroExAmount)) {
					return this.indexRouter.mintSwap(
						{
							index: index.address,
							recipient: await this.signer.getAddress(),
							quotes,
							amountInInputToken,
							inputToken: inputToken.address,
						},
						amountToSell,
						inputToken,
					);
				}
			}
		}

		return this.signer.call({
			to: swapTarget,
			data: assetQuote,
		});
	}
}
