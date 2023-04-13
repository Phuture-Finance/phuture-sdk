import { BigNumber, BigNumberish, ContractTransaction } from 'ethers'
import { PromiseOrValue } from 'typechain/common'
import { SubIndexLib } from 'typechain/SubIndexFactory'
import { Address } from 'types'

import { Zero0xQuoteOptions, ZeroExAggregator } from '../0x-aggregator'

import { createBatches } from './batches-utils'
import { BurningQueue } from './burning-queue'
import { OmniIndex } from './omni-index'
import { OmniRouterInterface } from './omni-router-types'
import { SubIndex } from './sub-index-factory'
import { BurningQueue as BurningQueueInterface } from 'typechain/BurningQueue'

const mockedSingleBatches = {
  batches: [
    {
      quotes: [
        {
          swapTarget: '0x0000000000000000000000000000000000000000',
          inputAsset: '0x0000000000000000000000000000000000000000',
          inputAmount: 0,
          buyAssetMinAmount: 0,
          additionalGas: '300000',
          assetQuote: '0x',
        },
        {
          swapTarget: '0x0000000000000000000000000000000000000000',
          inputAsset: '0x0000000000000000000000000000000000000000',
          inputAmount: 0,
          buyAssetMinAmount: 0,
          additionalGas: '300000',
          assetQuote: '0x',
        },
      ],
      chainId: 5,
      payload:
        '0x0000000000000000000000000000000000000000000000000000000000004e20',
    },
    {
      quotes: [
        {
          swapTarget: '0x0000000000000000000000000000000000000000',
          inputAsset: '0x0000000000000000000000000000000000000000',
          inputAmount: 0,
          buyAssetMinAmount: 0,
          additionalGas: '300000',
          assetQuote: '0x',
        },
        {
          swapTarget: '0x0000000000000000000000000000000000000000',
          inputAsset: '0x0000000000000000000000000000000000000000',
          inputAmount: 0,
          buyAssetMinAmount: 0,
          additionalGas: '300000',
          assetQuote: '0x',
        },
      ],
      chainId: 80001,
      payload:
        '0x0000000000000000000000000000000000000000000000000000000000004e20',
    },
  ] as BurningQueueInterface.BatchStruct[],
  quotes: [] as BurningQueueInterface.QuoteParamsStruct[],
}

/** ### OmniRouter class */
export class OmniRouter implements OmniRouterInterface {
  /**
   * ### Creates a new OmniRouter instance
   *
   * @param omniIndex instance of OmniIndex
   * @param subIndex instance of SubIndex
   * @param burningQueue instance of BurningQueue
   * @param zeroExAggregator ZeroEx client
   *
   * @returns New OmniRouter instance
   */
  constructor(
    public readonly omniIndex: OmniIndex,
    public readonly subIndex: SubIndex,
    public readonly burningQueue: BurningQueue,
    public readonly zeroExAggregator: ZeroExAggregator,
  ) {}
  /**
   * ### Remote redeem
   * @param options
   * @returns remoteRedeem transaction
   */
  async remoteRedeem(
    options?: Partial<Zero0xQuoteOptions>,
  ): Promise<ContractTransaction> {
    const account = await this.omniIndex.account.address()
    const ids = await this.burningQueue.contract.ids(account)
    const data = await createBatches(
      ids,
      account,
      this.subIndex,
      this.burningQueue,
      options,
    )

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
    indexShares: PromiseOrValue<BigNumberish>,
    receiver: PromiseOrValue<string>,
    owner: PromiseOrValue<string>,
  ): Promise<ContractTransaction> {
    const batchInfo = mockedSingleBatches
    //TODO
    // const account = await this.omniIndex.account.address()
    // const ids = await this.burningQueue.contract.ids(account)

    // await createBatches(
    //   ids,
    //   account,
    //   this.subIndex,
    //   this.burningQueue,
    //   options,
    // )
    return this.omniIndex.redeem(indexShares, receiver, owner, batchInfo)
  }

  /**
   * ### Preview redeeming tokens
   * @param indexShares
   * @returns
   */

  async previewRedeem(
    indexShares: PromiseOrValue<BigNumberish>,
  ): Promise<BigNumber> {
    return this.omniIndex.previewRedeem(indexShares)
  }

  /**
   * ### Preview depositing tokens
   * @param reserveTokens
   * @returns
   */
  async previewDeposit(
    reserveTokens: PromiseOrValue<BigNumberish>,
  ): Promise<BigNumber> {
    return this.omniIndex.previewRedeem(reserveTokens)
  }

  /**
   * ### Get IDs
   * @param address
   * @returns array of IDs
   */
  async getIDs(address: Address): Promise<BigNumber[]> {
    return this.burningQueue.contract.ids(address)
  }

  /**
   * ### indexesOf
   * @param ids
   * @returns sub-index struct
   */
  async indexesOf(
    ids: PromiseOrValue<BigNumberish>[],
  ): Promise<SubIndexLib.SubIndexStructOutput[]> {
    return this.subIndex.indexesOf(ids)
  }
}
