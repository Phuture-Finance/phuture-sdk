import { BigNumber, BigNumberish, ContractTransaction } from 'ethers'
import { BurningQueue as BurningQueueInterface } from 'typechain/BurningQueue'
import { PromiseOrValue } from 'typechain/common'
import { SubIndexLib } from 'typechain/SubIndexFactory'
import { Address } from 'types'

import {
  Zero0xQuoteOptions,
  Zero0xQuoteResponse,
  ZeroExAggregator,
  zeroExBaseUrl,
} from '../0x-aggregator'

import { BurningQueue } from './burning-queue'
import { OmniIndex } from './omni-index'
import { OmniRouterInterface } from './omni-router-types'
import { SubIndex } from './sub-index-factory'

const subIndexTotalSupply = BigNumber.from(2).pow(32)

/** ### OmniRouter class */
// implements OmniRouterInterface
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
    const ids = await this.burningQueue.getIDs(account)
    const subIndexes = await this.subIndex.indexesOf(ids)
    const zeroExAggregators = subIndexes.map((ind) => ({
      chain: ind.chainId,
      aggregator: ZeroExAggregator.fromUrl(
        zeroExBaseUrl[ind.chainId.toNumber()],
      )[0],
    }))
    console.log('zeroExAggregators: ', zeroExAggregators)

    const zeroExQuotes: Zero0xQuoteResponse[][] = new Array(subIndexes.length)
    const quotes: BurningQueueInterface.QuoteParamsStruct[] = []

    console.log('subIndexes: ', subIndexes)

    const assetBalances = await Promise.all(
      subIndexes.map(async (sub, index) => {
        const balance = await this.burningQueue.pickBalance(ids[index], account)
        return sub.balances.map((assetBalance) =>
          balance.add(assetBalance.div(subIndexTotalSupply)),
        )
      }),
    )
    console.log('assetBalances: ', assetBalances)

    assetBalances.map((bal, index) =>
      subIndexes[index].assets.map(async (asset, i) => {
        const [res] = await Promise.all([
          zeroExAggregators[index].aggregator.quote(
            asset,
            account,
            bal[i],
            options,
          ),
        ])
        return zeroExQuotes[index].push(res)
      }),
    )

    console.log('zeroExQuotes: ', zeroExQuotes)

    await Promise.all(
      zeroExQuotes.map(async (quoteArr, quoteInd) =>
        subIndexes[quoteInd].assets.map(async (asset, index) =>
          quotes.push({
            swapTarget: quoteArr[index].to,
            inputAsset: asset,
            inputAmount: quoteArr[index].sellAmount,
            buyAssetMinAmount: quoteArr[index].sellAmount, //buyAmount* 0.95
            additionalGas: quoteArr[index].estimatedGas,
            assetQuote: quoteArr[index].data,
          }),
        ),
      ),
    )
    console.log('quotes: ', quotes)

    const batches: BurningQueueInterface.BatchStruct[] = subIndexes.map(
      (el) => ({
        quotes: quotes,
        chainId: el.chainId,
        payload: '0x',
      }),
    )

    const localQuotes = new Array({
      quotes,
    })

    console.log('localQuotes: ', localQuotes)
    console.log('ids: ', ids, 'localQuotes', localQuotes, 'batches: ', batches)

    return await this.burningQueue.remoteMultipleRedeem(
      ids,
      localQuotes,
      batches,
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
    return this.omniIndex.redeem(indexShares, receiver, owner)
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
    return await this.burningQueue.getIDs(address)
  }

  /**
   * ### indexesOf
   * @param ids
   * @returns sub-index struct
   */
  async indexesOf(
    ids: PromiseOrValue<BigNumberish>[],
  ): Promise<SubIndexLib.SubIndexStructOutput[]> {
    return await this.subIndex.indexesOf(ids)
  }
}
