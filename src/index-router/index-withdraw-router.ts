import { BigNumber, BigNumberish, ContractTransaction } from 'ethers'

import { Account } from '../account'
import { Contract } from '../contract'
import { Erc20, StandardPermitArguments } from '../erc-20'
import { Index } from '../products/index/index'
import {
  IndexRouter as IndexRouterContractInterface,
  IndexRouter__factory,
} from '../typechain'
import { IIndexRouter } from '../typechain/IndexRouter'
import { Address, ChainId, ChainIds, isAddress } from '../types'

/** ### Default IndexRouter address for network */
export const defaultIndexWithdrawRouterAddress: Record<ChainId, Address> = {
  /** ### Default IndexRouter address on mainnet. */
  [ChainIds.Mainnet]: '0x1985426d77c431fc95e5ca51547bcb9b793e8482',
  /** ### Default IndexRouter address on c-chain. */
  // [ChainIds.CChain]: '0xd6dd95610fc3a3579a2c32fe06158d8bfb8f4ee9',//INFO: main
  [ChainIds.CChain]: '0x848c8b8b1490e9799dbe4fe227545f33c0456e08', //INFO: staging
}

/** ### IndexRouter Contract */
export class IndexWithdrawRouter extends Contract<
  IndexRouterContractInterface
> {
  private _weth?: Address

  /**
   * ### Creates a new IndexRouter instance
   *
   * @param account Account to use for signing
   * @param contract Contract instance or address of the IndexRouter contract
   *
   * @returns New IndexRouter token instance
   */
  constructor(
    account: Account,
    contract: IndexRouterContractInterface | Address,
  ) {
    super(account, contract, IndexRouter__factory)
  }

  async weth(): Promise<Address> {
    if (!this._weth) this._weth = await this.contract.WETH()

    return this._weth
  }

  /**
   * ### Mint Index Amount
   *
   * @param index index address
   * @param amountInInputToken token's  amount
   * @param quotes quotes for swaps
   * @param inputToken (optional) token's address
   *
   * @returns mint amount in single token
   */
  async mintIndexAmount(
    index: Address,
    amountInInputToken: BigNumberish,
    quotes: IIndexRouter.MintQuoteParamsStruct[],
    inputToken?: Address,
  ): Promise<BigNumber> {
    if (!inputToken) {
      inputToken = await this.weth()
    }

    const option: IIndexRouter.MintSwapParamsStruct = {
      inputToken,
      amountInInputToken,
      quotes,
      index,
      recipient: await this.account.address(),
    }

    return this.contract.mintSwapIndexAmount(option)
  }

  /**
   * ### Burn
   *
   * @param index index address or it's erc20 interface
   * @param amount index amount
   * @param recipient address of account to receive tokens
   * @param permitOptions permit options for transaction
   *
   * @returns burn transaction
   */
  async burn(
    index: Address | Erc20,
    amount: BigNumberish,
    recipient: Address,
    permitOptions?: Omit<StandardPermitArguments, 'amount'>,
  ): Promise<ContractTransaction> {
    const indexInstance = isAddress(index)
      ? new Erc20(this.account, index)
      : index
    const burnParameters: IIndexRouter.BurnParamsStruct = {
      index: indexInstance.address,
      amount,
      recipient,
    }

    if (permitOptions !== undefined) {
      const burnWithPermitEstimatedGas = await this.contract.estimateGas.burnWithPermit(
        burnParameters,
        permitOptions.deadline,
        permitOptions.v,
        permitOptions.r,
        permitOptions.s,
      )

      return this.contract.burnWithPermit(
        burnParameters,
        permitOptions.deadline,
        permitOptions.v,
        permitOptions.r,
        permitOptions.s,
        { gasLimit: burnWithPermitEstimatedGas.mul(100).div(95) },
      )
    }

    await indexInstance.checkAllowance(this.address, amount)

    const estimatedGas = await this.contract.estimateGas.burn(burnParameters)

    return this.contract.burn(burnParameters, {
      gasLimit: estimatedGas.mul(100).div(95),
    })
  }

  /**
   * ### Burn Swap
   *
   * @param index index address or it's erc20 interface
   * @param amount index amount
   * @param recipient signer's address
   * @param options burn swap options
   *
   * @returns burn swap transaction
   */
  async burnSwap(
    index: Address | Erc20,
    amount: BigNumberish,
    recipient: Address,
    options: {
      quotes: IIndexRouter.BurnQuoteParamsStruct[]
      outputAsset?: Address
      permitOptions?: Omit<StandardPermitArguments, 'amount'>
    },
  ): Promise<ContractTransaction> {
    const indexInstance = isAddress(index)
      ? new Erc20(this.account, index)
      : index
    const burnParameters: IIndexRouter.BurnSwapParamsStruct = {
      index: indexInstance.address,
      amount,
      recipient,
      quotes: options.quotes,
      outputAsset: options.outputAsset || (await this.weth()),
    }

    if (options.outputAsset === undefined) {
      if (options.permitOptions !== undefined) {
        const burnSwapWithPermitEstimatedGas = await this.contract.estimateGas.burnSwapWithPermit(
          burnParameters,
          options.permitOptions.deadline,
          options.permitOptions.v,
          options.permitOptions.r,
          options.permitOptions.s,
        )

        return this.contract.burnSwapValueWithPermit(
          burnParameters,
          options.permitOptions.deadline,
          options.permitOptions.v,
          options.permitOptions.r,
          options.permitOptions.s,
          { gasLimit: burnSwapWithPermitEstimatedGas.mul(100).div(95) },
        )
      }

      await indexInstance.checkAllowance(this.address, amount)

      const burnSwapEstimatedGas = await this.contract.estimateGas.burnSwap(
        burnParameters,
      )

      return this.contract.burnSwapValue(burnParameters, {
        gasLimit: burnSwapEstimatedGas.mul(100).div(95),
      })
    }

    if (options.permitOptions !== undefined) {
      const burnSwapWithPermitEstimatedGas = await this.contract.estimateGas.burnSwapWithPermit(
        burnParameters,
        options.permitOptions.deadline,
        options.permitOptions.v,
        options.permitOptions.r,
        options.permitOptions.s,
      )

      return this.contract.burnSwapWithPermit(
        burnParameters,
        options.permitOptions.deadline,
        options.permitOptions.v,
        options.permitOptions.r,
        options.permitOptions.s,
        { gasLimit: burnSwapWithPermitEstimatedGas.mul(100).div(95) },
      )
    }

    await indexInstance.checkAllowance(this.address, amount)

    const estimatedGas = await this.contract.estimateGas.burnSwap(
      burnParameters,
    )

    return this.contract.burnSwap(burnParameters, {
      gasLimit: estimatedGas.mul(100).div(95),
    })
  }

  /**
   * ### Burn Swap Static
   *
   * @param index index address or it's erc20 interface
   * @param amount index amount
   * @param recipient signer's address
   * @param options burn swap options
   *
   * @returns burn swap amount
   */
  async burnSwapStatic(
    index: Address | Erc20,
    amount: BigNumberish,
    recipient: Address,
    options: {
      quotes: IIndexRouter.BurnQuoteParamsStruct[]
      outputAsset?: Address
      permitOptions?: Omit<StandardPermitArguments, 'amount'>
    },
  ): Promise<BigNumber> {
    const indexInstance = isAddress(index)
      ? new Erc20(this.account, index)
      : index
    const burnParameters: IIndexRouter.BurnSwapParamsStruct = {
      index: indexInstance.address,
      amount,
      recipient,
      quotes: options.quotes,
      outputAsset: options.outputAsset || (await this.weth()),
    }

    if (options.outputAsset === undefined) {
      if (options.permitOptions !== undefined) {
        return this.contract.callStatic.burnSwapValueWithPermit(
          burnParameters,
          options.permitOptions.deadline,
          options.permitOptions.v,
          options.permitOptions.r,
          options.permitOptions.s,
        )
      }

      await indexInstance.checkAllowance(this.address, amount)

      return this.contract.callStatic.burnSwapValue(burnParameters)
    }

    if (options.permitOptions !== undefined) {
      return this.contract.callStatic.burnSwapWithPermit(
        burnParameters,
        options.permitOptions.deadline,
        options.permitOptions.v,
        options.permitOptions.r,
        options.permitOptions.s,
      )
    }

    await indexInstance.checkAllowance(this.address, amount)

    return this.contract.callStatic.burnSwap(burnParameters)
  }

  /**
   * ### Burn tokens amount view
   *
   * @param index index interface
   * @param amount index amount
   *
   * @returns burn amount in single token or total from array of tokens
   */
  async burnTokensAmount(
    index: Index,
    amount: BigNumberish,
  ): Promise<{ asset: Address; amount: BigNumber; weight: number }[]> {
    const [constituents, burnTokensAmounts] = await Promise.all([
      index.constituents(),
      this.contract.burnTokensAmount(index.address, amount),
    ])

    return constituents.map((constituent, constituentIndex) => ({
      amount: burnTokensAmounts[constituentIndex] || BigNumber.from(0),
      ...constituent,
    }))
  }

  /**
   * ### Burn amounts static
   *
   * @param index index interface
   * @param amount index amount
   *
   * @returns burn amount in single token or total from array of tokens
   */
  async burnAmount(
    index: Index,
    amount: BigNumberish,
  ): Promise<{ asset: Address; amount: BigNumber; weight: number }[]> {
    const [constituents, burnTokensAmounts] = await Promise.all([
      index.constituents(),
      this.contract.callStatic.burnWithAmounts({
        index: index.address,
        recipient: this.account.address(),
        amount,
      }),
    ])

    return constituents.map((constituent, constituentIndex) => ({
      amount: burnTokensAmounts[constituentIndex] || BigNumber.from(0),
      ...constituent,
    }))
  }
}
