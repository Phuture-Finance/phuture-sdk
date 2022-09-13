import type {
	Address,
	Anatomy,
	ContractFactory,
	PhutureProduct,
} from '@phuture/types';
import { Account } from '@phuture/account';
import { Erc4626 } from '@phuture/erc-4626';
import { formatUnits } from 'ethers/lib/utils';
import { isAddress, MAX_WEIGHT } from '@phuture/types';
import { PhutureError } from '@phuture/errors';
import {
	SavingsVault as SavingsVaultContractInterface,
	SavingsVault__factory,
} from '../types';
import { SavingsVaultViews } from './savings-vault-views';

/**
 * ### SavingsVault Contract
 */
export class SavingsVault
	extends Erc4626<SavingsVaultContractInterface>
	implements PhutureProduct
{
	/** ### SavingsVaultViews */
	private _savingsVaultViews: SavingsVaultViews;
	/**
	 * ### Creates a new SavingsVault instance
	 *
	 * @param account Account to use for interacting with the contract
	 * @param contract Contract instance or address of the SavingsVault contract
	 * @param factory Contract factory to use for creating the contract
	 * @param savingsVaultViews Contract instance or address of the SavingsVaultViews contract
	 *
	 * @returns New SavingsVault instance
	 */
	constructor(
		account: Account,
		contract: Address | SavingsVaultContractInterface,
		factory: ContractFactory = SavingsVault__factory,
		savingsVaultViews:
			| Address
			| SavingsVaultViews = '0x1344A36A1B56144C3Bc62E7757377D288fDE0369' // TODO deploy and set an instance of the SavingsVaultViews
	) {
		super(account, contract, factory);
		this._savingsVaultViews = isAddress(savingsVaultViews)
			? new SavingsVaultViews(account, savingsVaultViews)
			: savingsVaultViews;
	}

	public async apy(): Promise<string> {
		const apy = await this._savingsVaultViews.contract.getAPY(
			this.contract.address
		);
		return formatUnits(apy, 9);
	}

	public async anatomy(): Promise<Anatomy> {
		const asset = await this.contract.asset();
		return [{ asset: asset, weight: MAX_WEIGHT }];
	}

	public async inactiveAnatomy(): Promise<Anatomy> {
		throw new PhutureError({
			status: 400,
			message: 'Savings Vault does not have inactive assets',
		});
	}

	public async constituents(): Promise<Anatomy> {
		return this.anatomy();
	}
}
