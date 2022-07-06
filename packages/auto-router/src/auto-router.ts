import { ZeroExAggregator } from "@phuture/0x-aggregator";
import { Erc20, Erc20Permit, StandardPermitArguments } from "@phuture/erc-20";
import { Index } from "@phuture/index";
import { IndexRouter } from "@phuture/index-router";
import { Address, isAddress } from "@phuture/types";
import { BigNumber, BigNumberish, ContractTransaction, Signer } from "ethers";

/**
 * ### AutoRouter class
 */
export class AutoRouter {
	private _minMintAmount: BigNumber;
	/**
	 * ### Creates a new AutoRouter instance
	 *
	 * @param indexRouter IndexRouter package
	 * @param zeroExAggregator ZeroExAggregator package
	 * @param signer signer
	 *
	 * @returns New AutoRouter instance
	 */
	constructor(
		public signer: Signer,
		public readonly indexRouter: IndexRouter,
		public readonly zeroExAggregator: ZeroExAggregator,
		minMintAmount: BigNumberish
	) {
		this._minMintAmount = BigNumber.from(minMintAmount);
	}

	/**
	 * ### Get the minimum mint amount of the contract
	 *
	 * @returns minimum mint amount of the contract
	 */
	get minMintAmount(): BigNumber {
		return this._minMintAmount;
	}

	/**
	 * ### Set the minimum mint amount of the contract
	 *
	 * @param _minMintAmount minimum mint amount of the contract
	 */
	set minMintAmount(amount: BigNumberish) {
		this._minMintAmount = BigNumber.from(amount);
	}

	// Auto Mint for native token
	autoMint(
		index: Index | Address,
		amountInInputToken: BigNumberish
	): Promise<ContractTransaction>;
	// Auto Mint for single sell token
	autoMint(
		index: Index | Address,
		amountInInputToken: BigNumberish,
		sellToken: Erc20
	): Promise<ContractTransaction>;
	// Auto Mint for sell token with permit
	autoMint(
		index: Index | Address,
		amountInInputToken: BigNumberish,
		sellToken: Erc20Permit,
		permitOptions: Omit<StandardPermitArguments, "amount">
	): Promise<ContractTransaction>;

	async autoMint(
		index: Index | Address,
		amountInInputToken: BigNumberish,
		inputToken?: Erc20 | Erc20Permit,
		permitOptions?: Omit<StandardPermitArguments, "amount">
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
			amountInInputToken
		);

		const { buyAmount } = await this.zeroExAggregator.price(
			inputToken.address,
			"0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48", //USDC
			amountInInputToken
		);

		if (this._minMintAmount.lt(buyAmount)) {
			const { amounts, amountToSell } = await index.scaleAmount(
				amountInInputToken
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
						amount
					);

					return {
						asset,
						swapTarget,
						buyAssetMinAmount,
						assetQuote,
					};
				})
			);

			const indexRouterAmount = await this.indexRouter.mintStatic(
				{
					index: index.address,
					recipient: await this.signer.getAddress(),
					quotes,
					amountInInputToken,
					inputToken: inputToken.address,
				},
				amountToSell,
				inputToken, //TODO
				permitOptions
			);

			if (indexRouterAmount.gte(zeroExAmount)) {
				return this.indexRouter.mint(
					{
						index: index.address,
						recipient: await this.signer.getAddress(),
						quotes,
						amountInInputToken,
						inputToken: inputToken.address,
					},
					amountToSell,
					inputToken, //TODO
					inputToken ? permitOptions : undefined
				);
			}
		}
		return this.signer.call({
			to: swapTarget,
			data: assetQuote,
		});
	}
}
