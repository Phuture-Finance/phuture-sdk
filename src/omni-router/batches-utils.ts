import { BigNumber } from 'ethers'
import { IIndexViewer } from 'typechain/OmniIndex'
import { RedeemRouter } from 'typechain/RedeemRouter'
import { Address, ChainId, ChainIds } from 'types'

import {
  Zero0xQuoteOptions,
  ZeroExAggregator,
  zeroExBaseUrl,
} from '../0x-aggregator'

//INFO temporary solution, will be deleted
// const mockedSwapInfo = {
//   swapTarget: '0x0000000000000000000000000000000000000000',
//   inputAsset: '0x0000000000000000000000000000000000000000',
//   inputAmount: 0,
//   buyAssetMinAmount: 0,
//   additionalGas: '300000',
//   assetQuote: '0x',
// }

export const ReserveTokenOf: Record<ChainId, Address> = {
  [ChainIds.Mainnet]: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
  [ChainIds.CChain]: '0xb97ef9ef8734c71904d8002f8b6bc66dd9c48a6e',
  [ChainIds.Polygon]: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174',
  [ChainIds.BSC]: '0xe9e7cea3dedca5984780bafc599bd69add087d56', //BUSD
  [ChainIds.Arbitrum]: '0xff970a61a04b1ca14834a43f5de4533ebddb5cc8',
  [ChainIds.Mumbai]: '0x742dfa5aa70a8212857966d491d67b09ce7d6ec7',
  [ChainIds.GoerliTestnet]: '0xdf0360ad8c5ccf25095aa97ee5f2785c8d848620',
  [ChainIds.GoerliRollupTestnet]: '0x6aad876244e7a1ad44ec4824ce813729e5b6c291',
}

export const createRemoteBatches = async (
  assets: IIndexViewer.RedeemAssetInfoStructOutput[],
  options?: Partial<Zero0xQuoteOptions>,
): Promise<RedeemRouter.BatchStruct[]> =>
  (
    await Promise.all(assets.map(async (chain) => createQuotes(chain, options)))
  ).map(({ quotes }, index) => ({
    quotes,
    chainId: assets[index].chainId,
    payload: '0x',
  }))

export const createQuotes = async (
  chain: IIndexViewer.RedeemAssetInfoStructOutput,
  options?: Partial<Zero0xQuoteOptions>,
): Promise<RedeemRouter.LocalQuotesStruct> => {
  const [aggregator] = ZeroExAggregator.fromUrl(
    zeroExBaseUrl[chain.chainId.toNumber()],
  )

  const quotes = await Promise.all(
    chain.assets.map(async (asset, i) => {
      const reserveAddress: Address = ReserveTokenOf[chain.chainId.toNumber()]

      const swapInfo = await aggregator.quote(
        asset,
        reserveAddress,
        chain.amounts[i],
        options,
      )

      return {
        swapTarget: swapInfo.to,
        inputAsset: asset,
        inputAmount: swapInfo.sellAmount,
        buyAssetMinAmount: swapInfo.buyAmount,
        additionalGas: BigNumber.from(swapInfo.estimatedGas).add(300000), //INFO: test
        assetQuote: swapInfo.data,
      }
    }),
  )

  return { quotes }
}
