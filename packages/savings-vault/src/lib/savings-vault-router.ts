import { Erc20, StandardPermitArguments } from '@phuture/erc-20';
import { Address } from '@phuture/types';
import { Router } from '@phuture/router';
import { BigNumber, BigNumberish, constants } from 'ethers';
import { TransactionResponse } from '@ethersproject/abstract-provider';
import { InsufficientAllowanceError, PhutureError } from '@phuture/errors';
import { SavingsVault } from './savings-vault';

/** ### SavingsVaultRouter class */
export class SavingsVaultRouter implements Router {
	/**
	 * ### Select Buy
	 *
	 * @param savingsVault Contract which implements the SavingsVault interface
	 * @param amountInInputToken Amount in input token
	 * @param inputToken Erc20 or Erc20Permit interface of input token
	 *
	 * @returns isMint True if minting selected.
	 * @returns target Address of the target contract
	 * @returns output Amount of Index shares
	 * @returns expectedAllowance Allowance for the input token
	 */
	async selectBuy(
		savingsVault: SavingsVault,
		amountInInputToken: BigNumberish,
		inputToken?: Erc20
	): Promise<{
		isMint: boolean;
		target: Address;
		outputAmount: BigNumber;
		expectedAllowance?: BigNumber;
	}> {
		const target = savingsVault.address;

		let expectedAllowance: BigNumber | undefined;
		if (inputToken) {
			if (
				inputToken.address.toLowerCase() !==
				(await savingsVault.contract.asset()).toLowerCase()
			) {
				throw new PhutureError({
					status: 400,
					message:
						'Input token is not the underlying asset token of the SavingsVault',
				});
			}
			try {
				await inputToken.checkAllowance(target, amountInInputToken);
			} catch (error) {
				if (error instanceof InsufficientAllowanceError) {
					expectedAllowance = error.expectedAllowance;
				} else {
					throw error;
				}
			}
		}

		return {
			isMint: true,
			target,
			outputAmount: await savingsVault.contract.previewDeposit(
				amountInInputToken
			),
			expectedAllowance,
		};
	}

	/**
	 * ### Auto Buy
	 *
	 * @param isMint True if minting, false if swapping
	 * @param savingsVault Contract which implements the SavingsVault interface
	 * @param amountInInputToken Amount in input token
	 * @param inputTokenAddress Address of input token
	 * @param options 0x request options and permit options for transaction
	 *
	 * @returns mint or swap transaction
	 */
	async buy(
		isMint: boolean,
		savingsVault: SavingsVault,
		amountInInputToken: BigNumberish,
		inputTokenAddress?: Address,
		options?: Partial<{
			permitOptions: Omit<StandardPermitArguments, 'amount'>;
		}>
	): Promise<TransactionResponse> {
		return this.buyMint(
			savingsVault,
			amountInInputToken,
			inputTokenAddress,
			options
		);
	}

	/**
	 * ### Buy mint
	 *
	 * @param savingsVault Contract which implements the SavingsVault interface
	 * @param amountInInputToken Amount in input token
	 * @param inputTokenAddress Address of input token
	 * @param options 0x request options and permit options for transaction
	 *
	 * @returns mint transaction
	 */
	public async buyMint(
		savingsVault: SavingsVault,
		amountInInputToken: BigNumberish,
		inputTokenAddress?: Address,
		options?: Partial<{
			permitOptions: Omit<StandardPermitArguments, 'amount'>;
		}>
	): Promise<TransactionResponse> {
		const accountAddress = await savingsVault.account.address();
		if (options?.permitOptions !== undefined) {
			const estimatedGas =
				await savingsVault.contract.estimateGas.depositWithPermit(
					amountInInputToken,
					accountAddress,
					options.permitOptions.deadline,
					options.permitOptions.v,
					options.permitOptions.r,
					options.permitOptions.s
				);
			return savingsVault.contract.depositWithPermit(
				amountInInputToken,
				await savingsVault.account.address(),
				options.permitOptions.deadline,
				options.permitOptions.v,
				options.permitOptions.r,
				options.permitOptions.s,
				{ gasLimit: estimatedGas.mul(100).div(95) }
			);
		}
		const sellToken = new Erc20(
			savingsVault.account,
			await savingsVault.contract.asset()
		);
		await sellToken.checkAllowance(savingsVault.address, amountInInputToken);
		const estimatedGas = await savingsVault.contract.estimateGas.deposit(
			amountInInputToken,
			accountAddress
		);
		return savingsVault.contract.deposit(amountInInputToken, accountAddress, {
			gasLimit: estimatedGas.mul(100).div(95),
		});
	}

	/**
	 * ### Buy swap
	 *
	 * @param savingsVaultAddress Address of the Savings Vault
	 * @param amountInInputToken amount in input token
	 * @param inputTokenAddress Address of input token
	 *
	 * @returns swap transaction
	 */
	public async buySwap(
		savingsVaultAddress: Address,
		amountInInputToken: BigNumberish,
		inputTokenAddress?: Address
	): Promise<TransactionResponse> {
		throw new PhutureError({
			status: 404,
			message: 'buySwap method is not defined',
		});
	}

	/**
	 * ### Select sell
	 *
	 * @param savingsVault Contract which implements the SavingsVault interface
	 * @param amount Amount of Savings Vault shares
	 *
	 * @returns isBurn true if burn is selected
	 * @returns indexAmount Amount of index
	 * @returns outputToken Amount of output token
	 * @returns expectedAllowance Allowance for the output token
	 */
	async selectSell(
		savingsVault: SavingsVault,
		amount: BigNumberish
	): Promise<{
		isBurn: boolean;
		outputAmount: BigNumber;
		target: Address;
		expectedAllowance?: BigNumber;
	}> {
		return {
			isBurn: true,
			target: savingsVault.address,
			outputAmount: await savingsVault.contract.previewRedeem(amount),
			expectedAllowance: undefined,
		};
	}

	/**
	 * ### Auto Sell
	 *
	 * @param isBurn true if burn, false if swap
	 * @param savingsVault Contract which implements the SavingsVault interface
	 * @param amount Amount of Savings Vault shares
	 *
	 * @returns burn or swap transaction
	 */
	async sell(
		isBurn: boolean,
		savingsVault: SavingsVault,
		amount: BigNumberish
	): Promise<TransactionResponse> {
		return this.sellBurn(savingsVault, amount);
	}

	/**
	 * ### Sell Burn
	 *
	 * @param savingsVault Contract which implements the SavingsVault interface
	 * @param amount Amount of Savings Vault shares
	 *
	 * @returns burn transaction
	 */
	public async sellBurn(
		savingsVault: SavingsVault,
		amount: BigNumberish
	): Promise<TransactionResponse> {
		const owner = await savingsVault.account.address();
		const estimatedGas = await savingsVault.contract.estimateGas.redeem(
			amount,
			owner,
			owner
		);
		return savingsVault.contract.redeem(amount, owner, owner, {
			gasLimit: estimatedGas.mul(100).div(95),
		});
	}

	/**
	 * ### Sell Swap
	 *
	 * @param savingsVaultAddress Address of the Savings Vault
	 * @param amount Amount of Savings Vault shares
	 * @param outputTokenAddress Address of output token
	 *
	 * @returns burn transaction
	 */
	public async sellSwap(
		savingsVaultAddress: Address,
		amount: BigNumberish,
		outputTokenAddress?: Address
	): Promise<TransactionResponse> {
		throw new PhutureError({
			status: 404,
			message: 'sellSwap method is not defined',
		});
	}
}
