import {Address, Anatomy, MAX_WEIGHT, ProductType} from '@phuture/types';
import { SavingsVault } from '@phuture/savings-vault';
import { Index } from '@phuture/index';
import { PhutureError } from '@phuture/errors';
import {Erc20Permit} from "@phuture/erc-20";

export class MetaViewer {
	/**
	 * ### Creates a new MetaViewer instance
	 *
	 * @param products Record of address and its corresponding product type
	 * @returns New MetaViewer instance
	 */
	constructor(
		private products: Record<Address, ProductType>
	) {}

	public async anatomy(contract: Erc20Permit): Promise<Anatomy> {
		switch (this.findProductType(contract.address)) {
			case ProductType.INDEX:
				return (contract as Index).anatomy()
			case ProductType.SAVINGS_VAULT:
				const asset = await (contract as SavingsVault).contract.asset();
				return [{asset: asset, weight: MAX_WEIGHT}]
		}
	}

	public async inactiveAnatomy(contract: Erc20Permit): Promise<Anatomy> {
		switch (this.findProductType(contract.address)) {
			case ProductType.INDEX:
				return (contract as Index).inactiveAnatomy();
			case ProductType.SAVINGS_VAULT:
				throw new PhutureError({
					status: 400,
					message: 'Savings Vault does not have inactive assets',
				});
		}
	}

	public async constituents(contract: Erc20Permit): Promise<Anatomy> {
		switch (this.findProductType(contract.address)) {
			case ProductType.INDEX:
				return (contract as Index).constituents();
			case ProductType.SAVINGS_VAULT:
				return this.anatomy(contract);
		}
	}

	addProduct(productType: ProductType, contractAddress: Address) {
		this.products[contractAddress] = productType;
	}

	findProductType(address: Address): ProductType {
		const productType = this.products[address];
		if (productType === undefined) {
			throw new PhutureError({
				status: 400,
				message: 'Product type not found',
			});
		}
		return productType;
	}
}
