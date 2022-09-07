import { Address } from '@phuture/types';
import {IndexRouter} from "@phuture/index-router";
import {Zero0xQuoteOptions, ZeroExAggregator} from "@phuture/0x-aggregator";
import {Erc20, Erc20Permit, StandardPermitArguments} from "@phuture/erc-20";
import {BigNumber, BigNumberish} from "ethers";
import {SavingsVault} from "@phuture/savings-vault";
import {Index} from "@phuture/index";
import {TransactionResponse} from "@ethersproject/abstract-provider";
import {PhutureError} from "@phuture/errors";
import {AutoRouter} from "./interfaces";
import {SavingsVaultAutoRouter} from "./savings-vault-auto-router";
import {IndexAutoRouter} from "./index-auto-router";

export class MetaRouter implements AutoRouter {
	private savingsVaultAutoRouter: SavingsVaultAutoRouter;
	private indexAutoRouter: IndexAutoRouter;
	private products: Record<ProductType, Address[]>

	constructor(
		public readonly indexRouter: IndexRouter,
		public readonly zeroExAggregator: ZeroExAggregator,
		public _products: Record<ProductType, Address[]>
	) {
		this.savingsVaultAutoRouter = new SavingsVaultAutoRouter();
		this.indexAutoRouter = new IndexAutoRouter(indexRouter, zeroExAggregator);
		this.products = _products;
	}

	async selectBuy(
		erc20Permit: Erc20Permit,
		amountInInputToken: BigNumberish,
		inputToken?: Erc20,
		options?: Partial<Zero0xQuoteOptions>
	): Promise<{
		isMint: boolean;
		target: Address;
		outputAmount: BigNumber;
		expectedAllowance?: BigNumber;
	}> {
		switch (this.findProductType(erc20Permit.address)) {
			case ProductType.INDEX: return this.indexAutoRouter.selectBuy(erc20Permit as Index, amountInInputToken, inputToken, options);
			case ProductType.SAVINGS_VAULT: return this.savingsVaultAutoRouter.selectBuy(erc20Permit as SavingsVault, amountInInputToken, inputToken);
		}
	}

	async buy(
		isMint: boolean,
		erc20Permit: Erc20Permit,
		amountInInputToken: BigNumberish,
		inputToken?: Address,
		options?: Partial<{
			permitOptions: Omit<StandardPermitArguments, 'amount'>,
			zeroExOptions: Partial<Zero0xQuoteOptions>
		}>
	): Promise<TransactionResponse> {
		switch (this.findProductType(erc20Permit.address)) {
			case ProductType.INDEX: return this.indexAutoRouter.buy(isMint, erc20Permit as Index, amountInInputToken, inputToken, options);
			case ProductType.SAVINGS_VAULT: return this.savingsVaultAutoRouter.buy(isMint, erc20Permit as SavingsVault, amountInInputToken, inputToken, options);
		}
	}

	async buyMint(
		erc20Permit: Erc20Permit,
		amountInInputToken: BigNumberish,
		inputTokenAddress?: Address,
		options?: Partial<{
			permitOptions: Omit<StandardPermitArguments, 'amount'>,
			zeroExOptions: Partial<Zero0xQuoteOptions>
		}>
	): Promise<TransactionResponse> {
		switch (this.findProductType(erc20Permit.address)) {
			case ProductType.INDEX: return this.indexAutoRouter.buyMint(erc20Permit as Index, amountInInputToken, inputTokenAddress, options);
			case ProductType.SAVINGS_VAULT: return this.savingsVaultAutoRouter.buyMint(erc20Permit as SavingsVault, amountInInputToken, inputTokenAddress, options);
		}
	}

	async buySwap(
		contractAddress: Address,
		amountInInputToken: BigNumberish,
		inputTokenAddress?: Address,
		zeroExOptions?: Partial<Zero0xQuoteOptions>
	): Promise<TransactionResponse> {
		switch (this.findProductType(contractAddress)) {
			case ProductType.INDEX: return this.indexAutoRouter.buySwap(contractAddress, amountInInputToken, inputTokenAddress, zeroExOptions);
			case ProductType.SAVINGS_VAULT: return this.savingsVaultAutoRouter.buySwap(contractAddress, amountInInputToken, inputTokenAddress);
		}
	}

	async selectSell(
		erc20Permit: Erc20Permit,
		sharesAmount: BigNumberish,
		outputToken?: Erc20,
		options?: Partial<Zero0xQuoteOptions>
	): Promise<{
		isBurn: boolean;
		outputAmount: BigNumber;
		target: Address;
		expectedAllowance?: BigNumber;
	}> {
		switch (this.findProductType(erc20Permit.address)) {
			case ProductType.INDEX: return this.indexAutoRouter.selectSell(erc20Permit as Index, sharesAmount, outputToken, options);
			case ProductType.SAVINGS_VAULT: return this.savingsVaultAutoRouter.selectSell(erc20Permit as SavingsVault, sharesAmount);
		}
	}

	async sell(
		isBurn: boolean,
		erc20Permit: Erc20Permit,
		sharesAmount: BigNumberish,
		outputTokenAddress?: Address,
		permitOptions?: Omit<StandardPermitArguments, 'amount'>,
		options?: Partial<Zero0xQuoteOptions>
	): Promise<TransactionResponse> {
		switch (this.findProductType(erc20Permit.address)) {
			case ProductType.INDEX: return this.indexAutoRouter.sell(isBurn, erc20Permit as Index, sharesAmount, outputTokenAddress, permitOptions, options);
			case ProductType.SAVINGS_VAULT: return this.savingsVaultAutoRouter.sell(isBurn, erc20Permit as SavingsVault, sharesAmount);
		}
	}

	async sellBurn(
		erc20Permit: Erc20Permit,
		sharesAmount: BigNumberish,
		outputTokenAddress?: Address,
		permitOptions?: Omit<StandardPermitArguments, 'amount'>,
		options?: Partial<Zero0xQuoteOptions>
	): Promise<TransactionResponse> {
		switch (this.findProductType(erc20Permit.address)) {
			case ProductType.INDEX: return this.indexAutoRouter.sellBurn(erc20Permit as Index, sharesAmount, outputTokenAddress, permitOptions, options);
			case ProductType.SAVINGS_VAULT: return this.savingsVaultAutoRouter.sellBurn(erc20Permit as SavingsVault, sharesAmount);
		}
	}

	async sellSwap(
		contractAddress: Address,
		sharesAmount: BigNumberish,
		outputTokenAddress?: Address,
		options?: Partial<Zero0xQuoteOptions>
	): Promise<TransactionResponse> {
		switch (this.findProductType(contractAddress)) {
			case ProductType.INDEX: return this.indexAutoRouter.sellSwap(contractAddress, sharesAmount, outputTokenAddress, options);
			case ProductType.SAVINGS_VAULT: return this.savingsVaultAutoRouter.sellSwap(contractAddress, sharesAmount);
		}
	}

	addProduct(productType: ProductType, contractAddress: Address) {
		this.products[productType].push(contractAddress);
	}

	findProductType(address: Address): ProductType {
		for (const productType in ProductType ) {
			const contracts: Address[] = this.products[ProductType[productType as keyof typeof ProductType]]
			if (contracts.includes(address)) {
				return ProductType[productType as keyof typeof ProductType]
			}
		}
		throw new PhutureError({status: 400, message: "Contract address not found"});
	}

	getProductAddresses(productType: ProductType): Address[] {
		return this.products[productType];
	}
}

export enum ProductType {
	INDEX = 'Index',
	SAVINGS_VAULT = 'Savings_Vault'
}
