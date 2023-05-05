import { BigNumber, BigNumberish, ContractTransaction } from 'ethers'
import { BurningQueue as BurningQueueInterface } from 'typechain/BurningQueue'
import { PromiseOrValue } from 'typechain/common'
import { IIndexViewer } from 'typechain/OmniIndex'
import { Address } from 'types'

import { Zero0xQuoteOptions, ZeroExAggregator } from '../0x-aggregator'

import { createQuotes, createRemoteBatches } from './batches-utils'
import { BurningQueue } from './burning-queue'
import { OmniIndex } from './omni-index'
import { OmniRouterInterface } from './omni-router-types'
import { RedeemRouter } from './redeem-router'

/** ### OmniRouter class */
export class OmniRouter implements OmniRouterInterface {
  /**
   * ### Creates a new OmniRouter instance
   *
   * @param omniIndex instance of OmniIndex
   * @param redeemRouter instance of RedeemRouter
   * @param burningQueue instance of BurningQueue
   * @param zeroExAggregator ZeroEx client
   *
   * @returns New OmniRouter instance
   */
  constructor(
    public readonly omniIndex: OmniIndex,
    public readonly redeemRouter: RedeemRouter,
    public readonly burningQueue: BurningQueue,
    public readonly zeroExAggregator: ZeroExAggregator,
  ) {}
  /**
   * ### Remote redeem
   * @param options
   * @returns remoteRedeem transaction
   */
  async remoteRedeem(): Promise<ContractTransaction> {
    const account = await this.omniIndex.account.address()
    const ids = await this.burningQueue.contract.ids(account)
    const data = {} as {
      batches: BurningQueueInterface.BatchStruct[]
      quotes: BurningQueueInterface.QuoteParamsStruct[]
    }

    const localQuotes = new Array({
      quotes: await data.quotes,
    })

    return this.burningQueue.remoteMultipleRedeem(
      ids,
      localQuotes,
      data.batches,
    )
  }

  /**
   * ### Deposit tokens
   * @param reserveTokens Amount of tokens used for minting
   * @param receiver
   * @returns deposit transaction
   */
  async deposit(
    reserveTokens: PromiseOrValue<BigNumberish>,
    receiver: PromiseOrValue<string>,
  ): Promise<ContractTransaction> {
    return this.omniIndex.deposit(reserveTokens, receiver)
  }

  /**
   * ### Redeem tokens
   * @param indexShares
   * @param receiver
   * @param owner
   * @returns redeem transaction
   */
  async redeem(
    indexShares: BigNumberish,
    receiver: PromiseOrValue<string>,
    owner: PromiseOrValue<string>,
    { assets }: IIndexViewer.RedeemInfoStructOutput,
    options?: Partial<Zero0xQuoteOptions>,
  ): Promise<ContractTransaction> {
    const homeChainId = await this.omniIndex.account.chainId()

    let homeChain: IIndexViewer.RedeemAssetInfoStructOutput | undefined

    const homeChainIndex = assets.findIndex(
      ({ chainId }) => chainId.toNumber() === homeChainId,
    )

    if (homeChainIndex !== -1) {
      const [chain] = assets.splice(homeChainIndex, 1)
      homeChain = chain
    }

    const batchInfo = await createRemoteBatches(assets, options)
    const quotes = homeChain
      ? await createQuotes(homeChain, options)
      : { quotes: [] }

    return this.redeemRouter.redeem(
      this.omniIndex,
      indexShares,
      receiver,
      owner,
      { remoteData: batchInfo, localData: [quotes] },
    )
  }

  /**
   * ### Preview redeeming tokens
   * @param indexShares
   * @returns
   */

  async previewRedeem(
    indexShares: PromiseOrValue<BigNumberish>,
    executionTimestamp: PromiseOrValue<BigNumberish>,
  ): Promise<IIndexViewer.RedeemInfoStructOutput> {
    return this.omniIndex.previewRedeem(indexShares, executionTimestamp)
  }

  /**
   * ### Preview depositing tokens
   * @param reserveTokens
   * @returns
   */
  async previewDeposit(
    reserveTokens: PromiseOrValue<BigNumberish>,
  ): Promise<BigNumber> {
    return this.omniIndex.previewDeposit(reserveTokens)
  }

  /**
   * ### Get IDs
   * @param address
   * @returns array of IDs
   */
  async getIDs(address: Address): Promise<BigNumber[]> {
    return this.burningQueue.contract.ids(address)
  }
}
