import { IIndexViewer } from 'typechain/OmniIndex'
import { RedeemRouter } from 'typechain/RedeemRouter'

import {
  Zero0xQuoteOptions,
  ZeroExAggregator,
  zeroExBaseUrl,
} from '../0x-aggregator'
import { Address, ChainId, ChainIds } from '../types'

const payload =
  '0x0000000000000000000000000000000000000000000000000000000000002ee00000000000000000000000000000000000000000000000000000000000989680'

//TODO: update reserve tokens for every chain
export const ReserveTokenOf: Record<ChainId, Address> = {
  [ChainIds.Mainnet]: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48', //INFO: USDC
  [ChainIds.CChain]: '0xb97ef9ef8734c71904d8002f8b6bc66dd9c48a6e', //INFO: USDC
  [ChainIds.Polygon]: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174', //INFO: USDC
  [ChainIds.BSC]: '0xe9e7cea3dedca5984780bafc599bd69add087d56', //INFO: BUSD
  [ChainIds.Arbitrum]: '0xff970a61a04b1ca14834a43f5de4533ebddb5cc8', //INFO: USDC
  [ChainIds.Mumbai]: '0x742dfa5aa70a8212857966d491d67b09ce7d6ec7', //INFO: USDC
  [ChainIds.GoerliTestnet]: '0xdf0360ad8c5ccf25095aa97ee5f2785c8d848620', //INFO: USDC
  [ChainIds.GoerliRollupTestnet]: '0x6aad876244e7a1ad44ec4824ce813729e5b6c291', //INFO: USDC
}

export const createRemoteBatches = async (
  subIndexes: IIndexViewer.RedeemAssetInfoStructOutput[],
  options?: Partial<Zero0xQuoteOptions>,
): Promise<RedeemRouter.BatchStruct[]> =>
  Promise.all(
    subIndexes.map(async (chain) => {
      const { quotes } = await createQuotes(chain, options)
      return {
        quotes,
        chainId: chain.chainId,
        payload,
      }
    }),
  )

export const createQuotes = async (
  chain: IIndexViewer.RedeemAssetInfoStructOutput,
  options?: Partial<Zero0xQuoteOptions>,
): Promise<RedeemRouter.LocalQuotesStruct> => {
  const chainId = chain.chainId.toNumber()

  const [aggregator] = ZeroExAggregator.fromUrl(zeroExBaseUrl[chainId])
  const reserveAddress: Address = ReserveTokenOf[chainId]

  const quotes = await Promise.all(
    chain.assets.map(async (asset, i) => {
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
        additionalGas: swapInfo.estimatedGas, //INFO: test
        assetQuote: swapInfo.data,
      }
    }),
  )

  return { quotes }
}
