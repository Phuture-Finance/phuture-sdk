import { BigNumber, ContractTransaction } from 'ethers'
import { BurningQueue as BurningQueueInterface } from 'typechain/BurningQueue'
import { Address } from 'types'

import {
  Zero0xQuoteOptions,
  Zero0xQuoteResponse,
  ZeroExAggregator,
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
   * @param ids
   * @param address
   * @returns remoteRedeem transaction
   */
  async remoteRedeem(
    ids: BigNumber[],
    address: Address,
    options?: Partial<Zero0xQuoteOptions>,
  ): Promise<ContractTransaction> {
    const subIndexes = await this.subIndex.indexesOf(ids)
    const zeroExQuotes: Zero0xQuoteResponse[][] = new Array(subIndexes.length)
    const quotes: BurningQueueInterface.QuoteParamsStruct[] = []

    console.log('subIndexes: ', subIndexes)

    const assetBalances = await Promise.all(
      subIndexes.map(async (sub, index) => {
        const balance = await this.burningQueue.pickBalance(ids[index], address)
        return sub.balances.map((assetBalance) =>
          balance.add(assetBalance.div(subIndexTotalSupply)),
        )
      }),
    )

    assetBalances.map((bal, index) =>
      subIndexes[index].assets.map(async (asset, i) => {
        const [res] = await Promise.all([
          this.zeroExAggregator.quote(
            asset,
            await this.omniIndex.address,
            bal[i],
            options,
          ),
        ])
        return zeroExQuotes[index].push(res)
      }),
    )

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

    return this.burningQueue.remoteMultipleRedeem(ids, localQuotes, batches)
  }
}
