import { Provider } from '@ethersproject/abstract-provider'
import { BigNumber, BigNumberish, ContractTransaction, ethers } from 'ethers'
import { BurningQueue as BurningQueueInterface } from 'typechain/BurningQueue'
import { PromiseOrValue } from 'typechain/common'
import { SubIndexLib } from 'typechain/SubIndexFactory'
import { Address } from 'types'

import {
  Zero0xQuoteOptions,
  ZeroExAggregator,
  zeroExBaseUrl,
} from '../0x-aggregator'

import { BurningQueue } from './burning-queue'
import { OmniIndex } from './omni-index'
import { OmniRouterInterface } from './omni-router-types'
import { SubIndex } from './sub-index-factory'

const subIndexTotalSupply = BigNumber.from(2).pow(32)
const deadlineOffset: Record<number, number> = {
  [5]: 2,
  [80001]: 5,
}
const hundred = BigNumber.from(100)
type AvailableChainId = 5 | 80001

const rpcByChainId: Record<AvailableChainId, string> = {
  //TESTNETS
  5: 'https://rpc.ankr.com/eth_goerli',
  80001: 'https://polygon-testnet.public.blastapi.io',
}

const getScalingFactor = async (chainId: AvailableChainId) => {
  //TODO
  const provider = getProvider(chainId)

  const currentBlockNumber = await provider.getBlockNumber()
  const deadline = currentBlockNumber + deadlineOffset[chainId]

  console.log(
    'currentBlockNumber: ',
    currentBlockNumber,
    'deadline: ',
    deadline,
  )

  const x1 = currentBlockNumber
  const y1 = 1
  const x2 = deadline
  const y2 = 0

  const slope = (y2 - y1) / (x2 - x1)
  console.log('slope: ', slope)
  const scalingFactor = slope * currentBlockNumber + (y1 - slope * x1)
  console.log('scalingFactor: ', scalingFactor)
  // const scalingFactor = 1
  console.log('HERE: ', Math.max(0, Math.min(100, scalingFactor)))
  return Math.max(0, Math.min(100, scalingFactor))
  //0.05 щк 0.02
  //0.5 =50
}

const getProvider = (chainId: AvailableChainId): Provider =>
  ethers.getDefaultProvider(rpcByChainId[chainId])

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
    const data = await this.createBatches(ids, account, options)

    const localQuotes = new Array({
      quotes: await data.quotes,
    })

    return this.burningQueue.remoteMultipleRedeem(
      ids,
      localQuotes,
      data.batches,
    )
  }

  async createBatches(
    ids: BigNumber[],
    account: Address,
    options?: Partial<Zero0xQuoteOptions>,
  ): Promise<{
    batches: BurningQueueInterface.BatchStruct[]
    quotes: BurningQueueInterface.QuoteParamsStruct[]
  }> {
    const subIndexes = await this.subIndex.indexesOf(ids)
    const zeroExAggregators = subIndexes.map((ind) => ({
      chain: ind.chainId,
      aggregator: ZeroExAggregator.fromUrl(
        zeroExBaseUrl[ind.chainId.toNumber()],
      )[0],
    }))

    const assetBalances = await Promise.all(
      subIndexes.map(async (sub, index) => {
        const balance = await this.burningQueue.pickBalance(ids[index], account)
        return sub.balances.map((assetBalance) =>
          balance.add(assetBalance.div(subIndexTotalSupply)),
        )
      }),
    )

    const zeroExQuotes = await Promise.all(
      assetBalances.map(async (bal, index) => {
        const arr: BurningQueueInterface.QuoteParamsStruct[] = Array(bal.length)
        const scalingFactor = await getScalingFactor(
          subIndexes[index].chainId.toNumber() as AvailableChainId,
        )

        await Promise.all(
          subIndexes[index].assets.map(async (asset, i) => {
            const usdcAddress: string =
              zeroExAggregators[index].chain.toString() === '5'
                ? '0xdf0360ad8c5ccf25095aa97ee5f2785c8d848620' //goerli USDC
                : '0x742dfa5aa70a8212857966d491d67b09ce7d6ec7' //mumbai USDC
            const swapInfo = await zeroExAggregators[index].aggregator.quote(
              asset,
              usdcAddress,
              bal[i],
              options,
            )
            arr[i] = {
              swapTarget: swapInfo.to,
              inputAsset: asset,
              inputAmount: swapInfo.sellAmount,
              buyAssetMinAmount: hundred
                .sub(scalingFactor)
                .mul(swapInfo.sellAmount)
                .div(hundred),
              additionalGas: swapInfo.estimatedGas,
              assetQuote: swapInfo.data,
            }
          }),
        )
        return arr
      }),
    )

    const batches: BurningQueueInterface.BatchStruct[] = subIndexes.map(
      (el, index) => ({
        quotes: zeroExQuotes[index],
        chainId: el.chainId.toNumber(),
        payload: '0x',
      }),
    )

    return {
      batches,
      quotes: [],
    }
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
    return this.burningQueue.getIDs(address)
  }
  //TODO burningQueue.contract....

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
