import { Account } from '../account'
import { BigNumberish, ContractTransaction } from 'ethers'
import { Contract } from '../contract'
import {
  IndexDepositRouter as IndexDepositRouterInterface,
  IndexDepositRouter__factory,
} from '../typechain'
import { PromiseOrValue } from '../typechain/common'
import { IIndexRouter } from '../typechain/IndexRouter'
import { Address, ChainId, ChainIds } from '../types'

/** ### Default IndexDepositRouter address for network */
export const defaultIndexDepositRouterAddress: Record<ChainId, Address> = {
  /** ### Default IndexDepositRouter address on mainnet. */
  [ChainIds.Mainnet]: '0x0',
  /** ### Default IndexDepositRouter address on c-chain. */
  [ChainIds.CChain]: '0x9579368aC05e16DBC2791aB25A219b369B8f4C66',
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
    buyToken: PromiseOrValue<string>,
    sellAmount: BigNumberish,
    quotes?: IIndexRouter.MintQuoteParamsStructOutput[],
  ): Promise<ContractTransaction> {
    if (quotes !== undefined) {
      return this.contract.deposit(buyToken, this.account.address(), {
        value: sellAmount,
      })
    }
    //INFO: here will be USDC deposit
    return this.contract.deposit(buyToken, this.account.address(), {
      value: sellAmount,
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
    quotes?: IIndexRouter.MintQuoteParamsStructOutput[],
  ): Promise<BigNumberish> {
    if (quotes !== undefined) {
      return this.contract.callStatic.deposit(
        buyToken,
        this.account.address(),
        {
          value: sellAmount,
        },
      )
    }
    //INFO: here will be USDC deposit
    return this.contract.callStatic.deposit(buyToken, this.account.address(), {
      value: sellAmount,
    })
  }
}
