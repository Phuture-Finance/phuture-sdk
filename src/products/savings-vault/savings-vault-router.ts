import { TransactionResponse } from '@ethersproject/abstract-provider'
import { BigNumber, BigNumberish } from 'ethers'

import { Erc20, StandardPermitArguments } from '../../erc-20'
import { InsufficientAllowanceError, PhutureError } from '../../errors'
import { Router } from '../../router'
import { Address } from '../../types'

import { SavingsVault } from './savings-vault'

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
    inputToken?: Erc20,
  ): Promise<{
    isMint: boolean
    target: Address
    outputAmount: BigNumber
    expectedAllowance?: BigNumber
  }> {
    const target = savingsVault.address

    let expectedAllowance: BigNumber | undefined
    if (inputToken) {
      if (
        inputToken.address.toLowerCase() !==
        (await savingsVault.contract.asset()).toLowerCase()
      ) {
        throw new PhutureError({
          status: 400,
          message:
            'Input token is not the underlying asset token of the SavingsVault',
        })
      }
      try {
        await inputToken.checkAllowance(target, amountInInputToken)
      } catch (error) {
        if (error instanceof InsufficientAllowanceError) {
          expectedAllowance = error.expectedAllowance
        } else {
          throw error
        }
      }
    }

    return {
      isMint: true,
      target,
      outputAmount: await savingsVault.contract.previewDeposit(
        amountInInputToken,
      ),
      expectedAllowance,
    }
  }

  /**
   * ### Auto Buy
   *
   * @param _isMint True if minting, false if swapping
   * @param savingsVault Contract which implements the SavingsVault interface
   * @param amountInInputToken Amount in input token
   * @param inputTokenAddress Address of input token
   * @param options 0x request options and permit options for transaction
   *
   * @returns mint or swap transaction
   */
  async buy(
    _isMint: boolean,
    savingsVault: SavingsVault,
    amountInInputToken: BigNumberish,
    inputTokenAddress?: Address,
    options?: Partial<{
      permitOptions: Omit<StandardPermitArguments, 'amount'>
    }>,
  ): Promise<TransactionResponse> {
    return this.buyMint(
      savingsVault,
      amountInInputToken,
      inputTokenAddress,
      options,
    )
  }

  /**
   * ### Buy mint
   *
   * @param savingsVault Contract which implements the SavingsVault interface
   * @param amountInInputToken Amount in input token
   * @param _inputTokenAddress Address of input token
   * @param options 0x request options and permit options for transaction
   *
   * @returns mint transaction
   */
  public async buyMint(
    savingsVault: SavingsVault,
    amountInInputToken: BigNumberish,
    _inputTokenAddress?: Address,
    options?: Partial<{
      permitOptions: Omit<StandardPermitArguments, 'amount'>
    }>,
  ): Promise<TransactionResponse> {
    const accountAddress = await savingsVault.account.address()
    if (options?.permitOptions !== undefined) {
      const depositWithPermitEstimatedGas =
        await savingsVault.contract.estimateGas.depositWithPermit(
          amountInInputToken,
          accountAddress,
          options.permitOptions.deadline,
          options.permitOptions.v,
          options.permitOptions.r,
          options.permitOptions.s,
        )
      return savingsVault.contract.depositWithPermit(
        amountInInputToken,
        await savingsVault.account.address(),
        options.permitOptions.deadline,
        options.permitOptions.v,
        options.permitOptions.r,
        options.permitOptions.s,
        { gasLimit: depositWithPermitEstimatedGas.mul(100).div(95) },
      )
    }
    const sellToken = new Erc20(
      savingsVault.account,
      await savingsVault.contract.asset(),
    )
    await sellToken.checkAllowance(savingsVault.address, amountInInputToken)
    const estimatedGas = await savingsVault.contract.estimateGas.deposit(
      amountInInputToken,
      accountAddress,
    )
    return savingsVault.contract.deposit(amountInInputToken, accountAddress, {
      gasLimit: estimatedGas.mul(100).div(80),
    })
  }

  /**
   * ### Buy swap
   *
   * @param _savingsVaultAddress Address of the Savings Vault
   * @param _amountInInputToken amount in input token
   * @param _inputTokenAddress Address of input token
   *
   * @returns swap transaction
   */
  public async buySwap(
    _savingsVaultAddress: Address,
    _amountInInputToken: BigNumberish,
    _inputTokenAddress?: Address,
  ): Promise<TransactionResponse> {
    throw new PhutureError({
      status: 404,
      message: 'buySwap method is not defined',
    })
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
    amount: BigNumberish,
  ): Promise<{
    isBurn: boolean
    outputAmount: BigNumber
    target: Address
    expectedAllowance?: BigNumber
  }> {
    return {
      isBurn: true,
      target: savingsVault.address,
      outputAmount: await savingsVault.contract.previewRedeem(amount),
      expectedAllowance: undefined,
    }
  }

  /**
   * ### Auto Sell
   *
   * @param _isBurn true if tx is burn, false if swap
   * @param savingsVault Contract which implements the SavingsVault interface
   * @param amount Amount of Savings Vault shares
   * @param outputTokenAddress Address of output token
   * @param options maxLoss option
   *
   * @returns burn or swap transaction
   */
  async sell(
    _isBurn: boolean,
    savingsVault: SavingsVault,
    amount: BigNumberish,
    outputTokenAddress?: Address,
    options?: Partial<{
      maxLoss?: number
    }>,
  ): Promise<TransactionResponse> {
    return this.sellBurn(savingsVault, amount, outputTokenAddress, options)
  }

  /**
   * ### Sell Burn
   *
   * @param savingsVault Contract which implements the SavingsVault interface
   * @param amount Amount of Savings Vault shares
   * @param _outputTokenAddress Address of output token
   * @param options maxLoss option
   *
   * @returns burn transaction
   */
  public async sellBurn(
    savingsVault: SavingsVault,
    amount: BigNumberish,
    _outputTokenAddress?: Address,
    options?: Partial<{
      maxLoss: number
    }>,
  ): Promise<TransactionResponse> {
    const owner = await savingsVault.account.address()

    if (options?.maxLoss) {
      if (options.maxLoss < 0 || options.maxLoss >= 10000)
        throw new RangeError('Parameter maxLoss must be between 0 and 10000.')

      const redeemed = await savingsVault.contract.previewRedeem(amount)
      const minOutputAmount = redeemed.mul(10000 - options.maxLoss).div(10000)

      return savingsVault.redeemWithMinOutputAmount(
        amount,
        owner,
        owner,
        minOutputAmount,
      )
    }

    return savingsVault.redeem(amount, owner, owner)
  }

  /**
   * ### Sell Swap
   *
   * @param _savingsVaultAddress Address of the Savings Vault
   * @param _amount Amount of Savings Vault shares
   * @param _outputTokenAddress Address of output token
   *
   * @returns burn transaction
   */
  public async sellSwap(
    _savingsVaultAddress: Address,
    _amount: BigNumberish,
    _outputTokenAddress?: Address,
  ): Promise<TransactionResponse> {
    throw new PhutureError({
      status: 404,
      message: 'sellSwap method is not defined',
    })
  }
}
