import { Account } from '@phuture/account'
import { StandardPermitArguments } from '@phuture/erc-20'
import { Erc4626 } from '@phuture/erc-4626'
import type { Address, ContractFactory } from '@phuture/types'
import { isAddress } from '@phuture/types'
import { BigNumber, BigNumberish, ContractTransaction } from 'ethers'
import { formatUnits } from 'ethers/lib/utils'

import {
	SavingsVault as SavingsVaultContractInterface,
	SavingsVault__factory,
} from '../types'

import { SavingsVaultViews } from './savings-vault-views'

/**
 * ### SavingsVault Contract
 */
export class SavingsVault extends Erc4626<SavingsVaultContractInterface> {
	/** ### SavingsVaultViews */
	private _savingsVaultViews: SavingsVaultViews

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
			| SavingsVaultViews = '0xe574bebddb460e3e0588f1001d24441102339429',
	) {
		super(account, contract, factory)
		this._savingsVaultViews = isAddress(savingsVaultViews)
			? new SavingsVaultViews(account, savingsVaultViews)
			: savingsVaultViews
	}

	public async deposit(
		amountInInputToken: BigNumberish,
		gasPercentage?: number,
	): Promise<ContractTransaction> {
		const estimatedGas = await this.contract.estimateGas.deposit(
			amountInInputToken,
			this.account.address(),
		)
		return this.contract.deposit(amountInInputToken, this.account.address(), {
			gasLimit: estimatedGas
				.mul(100 + (gasPercentage ? gasPercentage : 15))
				.div(100),
		})
	}

	public async depositWithPermit(
		amountInInputToken: BigNumberish,
		permitOptions: Omit<StandardPermitArguments, 'amount'>,
		gasPercentage?: number,
	): Promise<ContractTransaction> {
		const estimatedGas = await this.contract.estimateGas.depositWithPermit(
			amountInInputToken,
			this.account.address(),
			permitOptions.deadline,
			permitOptions.v,
			permitOptions.r,
			permitOptions.s,
		)
		return this.contract.depositWithPermit(
			amountInInputToken,
			this.account.address(),
			permitOptions.deadline,
			permitOptions.v,
			permitOptions.r,
			permitOptions.s,
			{
				gasLimit: estimatedGas
					.mul(100 + (gasPercentage ? gasPercentage : 15))
					.div(100),
			},
		)
	}

	public async redeem(
		shares: BigNumberish,
		_receiver: Address,
		owner: Address,
		gasPercentage?: number,
	): Promise<ContractTransaction> {
		const estimatedGas = await this.contract.estimateGas.redeem(
			shares,
			owner,
			owner,
		)

		return this.contract.redeem(shares, owner, owner, {
			gasLimit: estimatedGas
				.mul(100 + (gasPercentage ? gasPercentage : 20))
				.div(100),
		})
	}

	public async redeemWithMinOutputAmount(
		shares: BigNumberish,
		receiver: Address,
		owner: Address,
		minOutputAmount: BigNumber,
		gasPercentage?: number,
	): Promise<ContractTransaction> {
		const estimatedGas =
			await this.contract.estimateGas.redeemWithMinOutputAmount(
				shares,
				receiver,
				owner,
				minOutputAmount,
			)

		return this.contract.redeemWithMinOutputAmount(
			shares,
			receiver,
			owner,
			minOutputAmount,
			{
				gasLimit: estimatedGas
					.mul(100 + (gasPercentage ? gasPercentage : 20))
					.div(100),
			},
		)
	}

	public async apy(): Promise<string> {
		const apy = await this._savingsVaultViews.contract.getAPY(
			this.contract.address,
		)
		return formatUnits(apy, 9)
	}
}
