import { TransactionResponse } from '@ethersproject/abstract-provider'
import { BigNumber, BigNumberish } from 'ethers'

import { Zero0xQuoteOptions } from '../0x-aggregator'
import { AutoRouter } from '../auto-router'
import { Erc20, Erc20Permit, StandardPermitArguments } from '../erc-20'
import { PhutureError } from '../errors'
import { Index } from '../products/index'
import { SavingsVault, SavingsVaultRouter } from '../products/savings-vault'
import { Router } from '../router'
import { Address, ProductType } from '../types'

export class MetaRouter implements Router {
  /**
   * ### Creates a new MetaRouter instance
   *
   * @param savingsVaultRouter Instance of SavingsVaultRouter
   * @param autoRouter Instance of AutoRouter
   * @param products Record of address and its corresponding product type
   *
   * @returns New MetaRouter instance
   */
  constructor(
    private savingsVaultRouter: SavingsVaultRouter,
    private autoRouter: AutoRouter,
    private products: Record<Address, ProductType>,
  ) {}

  async selectBuy(
    erc20Permit: Erc20Permit,
    amountInInputToken: BigNumberish,
    inputToken?: Erc20,
    options?: Partial<Zero0xQuoteOptions>,
  ): Promise<{
    isMint: boolean
    target: Address
    outputAmount: BigNumber
    expectedAllowance?: BigNumber
  }> {
    switch (this.findProductType(erc20Permit.address)) {
      case ProductType.INDEX:
        return this.autoRouter.selectBuy(
          erc20Permit as Index,
          amountInInputToken,
          inputToken,
          options,
        )
      case ProductType.SAVINGS_VAULT:
        return this.savingsVaultRouter.selectBuy(
          erc20Permit as SavingsVault,
          amountInInputToken,
          inputToken,
        )
    }
  }

  async buy(
    isMint: boolean,
    erc20Permit: Erc20Permit,
    amountInInputToken: BigNumberish,
    inputToken?: Address,
    options?: Partial<{
      permitOptions: Omit<StandardPermitArguments, 'amount'>
      zeroExOptions: Partial<Zero0xQuoteOptions>
    }>,
  ): Promise<TransactionResponse> {
    switch (this.findProductType(erc20Permit.address)) {
      case ProductType.INDEX:
        return this.autoRouter.buy(
          isMint,
          erc20Permit as Index,
          amountInInputToken,
          inputToken,
          options,
        )
      case ProductType.SAVINGS_VAULT:
        return this.savingsVaultRouter.buy(
          isMint,
          erc20Permit as SavingsVault,
          amountInInputToken,
          inputToken,
          options,
        )
    }
  }

  async buyMint(
    erc20Permit: Erc20Permit,
    amountInInputToken: BigNumberish,
    inputTokenAddress?: Address,
    options?: Partial<{
      permitOptions: Omit<StandardPermitArguments, 'amount'>
      zeroExOptions: Partial<Zero0xQuoteOptions>
    }>,
  ): Promise<TransactionResponse> {
    switch (this.findProductType(erc20Permit.address)) {
      case ProductType.INDEX:
        return this.autoRouter.buyMint(
          erc20Permit as Index,
          amountInInputToken,
          inputTokenAddress,
          options,
        )
      case ProductType.SAVINGS_VAULT:
        return this.savingsVaultRouter.buyMint(
          erc20Permit as SavingsVault,
          amountInInputToken,
          inputTokenAddress,
          options,
        )
    }
  }

  async buySwap(
    contractAddress: Address,
    amountInInputToken: BigNumberish,
    inputTokenAddress?: Address,
    zeroExOptions?: Partial<Zero0xQuoteOptions>,
  ): Promise<TransactionResponse> {
    switch (this.findProductType(contractAddress)) {
      case ProductType.INDEX:
        return this.autoRouter.buySwap(
          contractAddress,
          amountInInputToken,
          inputTokenAddress,
          zeroExOptions,
        )
      case ProductType.SAVINGS_VAULT:
        return this.savingsVaultRouter.buySwap(
          contractAddress,
          amountInInputToken,
          inputTokenAddress,
        )
    }
  }

  async selectSell(
    erc20Permit: Erc20Permit,
    sharesAmount: BigNumberish,
    outputToken?: Erc20,
    options?: Partial<Zero0xQuoteOptions>,
  ): Promise<{
    isBurn: boolean
    outputAmount: BigNumber
    target: Address
    expectedAllowance?: BigNumber
  }> {
    switch (this.findProductType(erc20Permit.address)) {
      case ProductType.INDEX:
        return this.autoRouter.selectSell(
          erc20Permit as Index,
          sharesAmount,
          outputToken,
          options,
        )
      case ProductType.SAVINGS_VAULT:
        return this.savingsVaultRouter.selectSell(
          erc20Permit as SavingsVault,
          sharesAmount,
        )
    }
  }

  async sell(
    isBurn: boolean,
    erc20Permit: Erc20Permit,
    sharesAmount: BigNumberish,
    outputTokenAddress?: Address,
    options?: Partial<{
      permitOptions: Omit<StandardPermitArguments, 'amount'>
      zeroExOptions: Partial<Zero0xQuoteOptions>
      maxLoss: number
    }>,
  ): Promise<TransactionResponse> {
    switch (this.findProductType(erc20Permit.address)) {
      case ProductType.INDEX:
        return this.autoRouter.sell(
          isBurn,
          erc20Permit as Index,
          sharesAmount,
          outputTokenAddress,
          options,
        )
      case ProductType.SAVINGS_VAULT:
        return this.savingsVaultRouter.sell(
          isBurn,
          erc20Permit as SavingsVault,
          sharesAmount,
          outputTokenAddress,
          options,
        )
    }
  }

  async sellBurn(
    erc20Permit: Erc20Permit,
    sharesAmount: BigNumberish,
    outputTokenAddress?: Address,
    options?: Partial<{
      permitOptions: Omit<StandardPermitArguments, 'amount'>
      zeroExOptions: Partial<Zero0xQuoteOptions>
      maxLoss: number
    }>,
  ): Promise<TransactionResponse> {
    switch (this.findProductType(erc20Permit.address)) {
      case ProductType.INDEX:
        return this.autoRouter.sellBurn(
          erc20Permit as Index,
          sharesAmount,
          outputTokenAddress,
          options,
        )
      case ProductType.SAVINGS_VAULT:
        return this.savingsVaultRouter.sellBurn(
          erc20Permit as SavingsVault,
          sharesAmount,
          outputTokenAddress,
          options,
        )
    }
  }

  async sellSwap(
    contractAddress: Address,
    sharesAmount: BigNumberish,
    outputTokenAddress?: Address,
    options?: Partial<Zero0xQuoteOptions>,
  ): Promise<TransactionResponse> {
    switch (this.findProductType(contractAddress)) {
      case ProductType.INDEX:
        return this.autoRouter.sellSwap(
          contractAddress,
          sharesAmount,
          outputTokenAddress,
          options,
        )
      case ProductType.SAVINGS_VAULT:
        return this.savingsVaultRouter.sellSwap(contractAddress, sharesAmount)
    }
  }

  addProduct(productType: ProductType, contractAddress: Address) {
    this.products[contractAddress] = productType
  }

  findProductType(address: Address): ProductType {
    const productType = this.products[address]
    if (productType === undefined) {
      throw new PhutureError({
        status: 400,
        message: 'Product type not found',
      })
    }
    return productType
  }
}
