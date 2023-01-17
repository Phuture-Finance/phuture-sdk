import { BigNumberish, BigNumber, ContractTransaction } from 'ethers'

import { Account } from '../account'
import { Contract } from '../contract'
import {
  IndexDepositRouter as IndexDepositRouterInterface,
  IndexDepositRouter__factory,
} from '../typechain'
import { PromiseOrValue } from '../typechain/common'
import { IReserveRouter } from '../typechain/IndexDepositRouter'
import { Address, ChainId, ChainIds } from '../types'

/** ### Default IndexDepositRouter address for network */
export const defaultIndexDepositRouterAddress: Record<ChainId, Address> = {
  /** ### Default IndexDepositRouter address on mainnet. */
  [ChainIds.Mainnet]: '0x0',
  /** ### Default IndexDepositRouter address on c-chain. */
  [ChainIds.CChain]: '0xa04df6ec0138b9366c28d018d16acffd76531855', //INFO: CChain staging
}

/** ### IndexDepositRouter Contract */
export class IndexDepositRouter extends Contract<IndexDepositRouterInterface> {
  /**
   * ### Creates a new IndexDepositRouter instance
   *
   * @param account Account to use for signing
   * @param contract Contract instance or address of the IndexDepositRouter contract
   *
   * @returns New IndexDepositRouter token instance
   */
  constructor(
    account: Account,
    contract: IndexDepositRouterInterface | Address,
  ) {
    super(account, contract, IndexDepositRouter__factory)
  }

  /**
   * ### Deposit
   *
   * @param index buy token address
   * @param sellAmount sell token's  amount
   * @param quotes (optional) quotes for deposits with USDC
   *
   * @returns deposit transaction
   */
  async deposit(
    index: PromiseOrValue<string>,
    sellAmount: BigNumberish,
    params?: IReserveRouter.QuoteParamsStruct,
  ): Promise<ContractTransaction> {
    if (!params) {
      const estimatedNativeGas = await this.contract.estimateGas[
        'deposit(address,address)'
      ](index, this.account.address(), {
        value: sellAmount,
      })
      return this.contract['deposit(address,address)'](
        index,
        this.account.address(),
        {
          value: sellAmount,
          gasLimit: estimatedNativeGas.mul(100).div(95),
        },
      )
    }
    const estimatedTokenGas = await this.contract.estimateGas[
      'deposit(address,address,(address,uint256,uint256,address,bytes))'
    ](index, this.account.address(), params)

    return this.contract[
      'deposit(address,address,(address,uint256,uint256,address,bytes))'
    ](index, this.account.address(), params, {
      gasLimit: estimatedTokenGas.mul(100).div(95),
    })
  }

  /**
   * ### Deposit Static
   *
   * @param index buy token address
   * @param sellAmount sell token's  amount
   * @param quotes (optional) quotes for deposits with USDC
   *
   * @returns deposit amount
   */
  async depositStatic(
    buyToken: PromiseOrValue<string>,
    sellAmount: BigNumberish,
    params?: IReserveRouter.QuoteParamsStruct,
  ): Promise<BigNumber> {
    if (!params) {
      return await this.contract.callStatic['deposit(address,address)'](
        buyToken,
        this.account.address(),
        {
          value: sellAmount,
        },
      )
    }

    return this.contract.callStatic[
      'deposit(address,address,(address,uint256,uint256,address,bytes))'
    ](buyToken, this.account.address(), params)
  }
}
