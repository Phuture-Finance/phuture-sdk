import { BigNumber } from 'ethers'
import { BurningQueue as BurningQueueInterface } from 'typechain'
import { Address } from 'types'

import {
  Zero0xQuoteOptions,
  ZeroExAggregator,
  zeroExBaseUrl,
} from '../0x-aggregator'

import { BurningQueue } from './burning-queue'
import { SubIndex } from './sub-index-factory'

//INFO temporary solution, will be deleted
const mockedSwapInfo = {
  swapTarget: '0x0000000000000000000000000000000000000000',
  inputAsset: '0x0000000000000000000000000000000000000000',
  inputAmount: 0,
  buyAssetMinAmount: 0,
  additionalGas: '300000',
  assetQuote: '0x',
}

const subIndexTotalSupply = BigNumber.from(2).pow(32)
const hundred = BigNumber.from(100)
type AvailableChainId = 5 | 80001

//TODO
// const deadlineOffset: Record<number, number> = {
//   [5]: 2,
//   [80001]: 5,
// }
// const rpcByChainId: Record<AvailableChainId, string> = {
//   //TESTNETS
//   5: 'https://rpc.ankr.com/eth_goerli',
//   80001: 'https://polygon-testnet.public.blastapi.io',
// }

const getScalingFactor = async (_chainId: AvailableChainId) => {
  //TODO
  // const provider = getProvider(chainId)

  // const currentBlockNumber = await provider.getBlockNumber()
  // const deadline = currentBlockNumber + deadlineOffset[chainId]

  // const x1 = currentBlockNumber
  // const y1 = 1
  // const x2 = deadline
  // const y2 = 0

  // const slope = (y2 - y1) / (x2 - x1)
  // const scalingFactor = slope * currentBlockNumber + (y1 - slope * x1)
  const scalingFactor = 1
  return Math.max(0, Math.min(100, scalingFactor))
}
//TODO
// const getProvider = (chainId: AvailableChainId): Provider =>
//   ethers.getDefaultProvider(rpcByChainId[chainId])

export const createBatches = async (
  ids: BigNumber[],
  account: Address,
  subIndex: SubIndex,
  burningQueue: BurningQueue,
  options?: Partial<Zero0xQuoteOptions>,
): Promise<{
  batches: BurningQueueInterface.BatchStruct[]
  quotes: BurningQueueInterface.QuoteParamsStruct[]
}> => {
  console.log('ids: ', ids)
  const subIndexes = await subIndex.indexesOf(ids)
  console.log('subIndexes: ', subIndexes)
  const zeroExAggregators = subIndexes.map((ind) => ({
    chain: ind.chainId,
    aggregator: ZeroExAggregator.fromUrl(
      zeroExBaseUrl[ind.chainId.toNumber()],
    )[0],
  }))

  const assetBalances = await Promise.all(
    subIndexes.map(async (sub, index) => {
      const balance = await burningQueue.pickBalance(ids[index], account)
      return sub.balances.map((assetBalance) =>
        balance.add(assetBalance.div(subIndexTotalSupply)),
      )
    }),
  )
  console.log('assetBalances: ', assetBalances)

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

          arr[i] = swapInfo.sellAmount
            ? {
                swapTarget: swapInfo.to,
                inputAsset: asset,
                inputAmount: swapInfo.sellAmount,
                buyAssetMinAmount: hundred
                  .sub(scalingFactor)
                  .mul(swapInfo.sellAmount)
                  .div(hundred),
                additionalGas: BigNumber.from(swapInfo.estimatedGas).add(
                  300000,
                ), //INFO: test
                assetQuote: swapInfo.data,
              }
            : mockedSwapInfo
          //INFO: temporary
        }),
      )
      return arr
    }),
  )
  console.log('zeroExQuotes: ', zeroExQuotes)

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
