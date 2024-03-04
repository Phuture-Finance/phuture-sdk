import { BigNumber, constants } from 'ethers'
import { JsonRpcProvider } from '@ethersproject/providers'

import { ZeroExAggregator } from '../../src/0x-aggregator/0x-aggregator'
import {
  BaseIndex__factory,
  IndexRouter__factory,
  PhuturePriceOracle__factory,
} from '../../src/typechain'

/// ENVIRONMENT VARIABLES

const RPC_URL = process.env.RPC_URL!
if (!RPC_URL) throw new Error('Missing RPC_URL')

const ZERO_EX_API_URL = process.env.ZERO_EX_API_URL!
const ZERO_EX_API_KEY = process.env.ZERO_EX_API_KEY!
if (!ZERO_EX_API_URL || !ZERO_EX_API_KEY)
  throw new Error('Missing ZERO_EX_API_URL or ZERO_EX_API_KEY')

const INDEX_ADDRESS = process.env.INDEX_ADDRESS!
if (!INDEX_ADDRESS) throw new Error('Missing INDEX_ADDRESS')

const PRICE_ORACLE_ADDRESS = process.env.PRICE_ORACLE_ADDRESS!
if (!PRICE_ORACLE_ADDRESS) throw new Error('Missing PRICE_ORACLE_ADDRESS')

const INDEX_ROUTER_ADDRESS = process.env.INDEX_ROUTER_ADDRESS!
if (!INDEX_ROUTER_ADDRESS) throw new Error('Missing INDEX_ROUTER_ADDRESS')

const RECIPIENT_ADDRESS = process.env.RECIPIENT_ADDRESS!
if (!RECIPIENT_ADDRESS) throw new Error('Missing RECIPIENT_ADDRESS')

const INPUT_TOKEN = process.env.INPUT_TOKEN!
if (!INPUT_TOKEN) throw new Error('Missing INPUT_TOKEN')

const AMOUNT_IN = process.env.AMOUNT_IN!
if (!AMOUNT_IN) throw new Error('Missing AMOUNT_IN')

/// PREPARE ENTITIES

const provider = new JsonRpcProvider(RPC_URL)

const [zeroExAggregator] = ZeroExAggregator.fromUrl(
  ZERO_EX_API_URL,
  ZERO_EX_API_KEY,
)

const index = BaseIndex__factory.connect(INDEX_ADDRESS, provider)
const priceOracle = PhuturePriceOracle__factory.connect(
  PRICE_ORACLE_ADDRESS,
  provider,
)
const indexRouter = IndexRouter__factory.connect(INDEX_ROUTER_ADDRESS, provider)

/// HELPER FUNCTIONS

async function getBuyAmounts(amounts, inputToken) {
  return await Promise.all(
    amounts.map(async ({ asset, amount }) => {
      if (asset === inputToken || amount.isZero()) {
        return {
          asset,
          swapTarget: constants.AddressZero,
          buyAssetMinAmount: amount,
          assetQuote: [],
          estimatedGas: 0,
        }
      }

      const zeroExResult = await zeroExAggregator.quote(
        inputToken,
        asset,
        amount,
      )

      return {
        asset,
        swapTarget: zeroExResult.to,
        buyAssetMinAmount: zeroExResult.buyAmount,
        assetQuote: zeroExResult.data,
        estimatedGas: zeroExResult.estimatedGas,
      }
    }),
  )
}

async function calculateBuyAmountsInBase(buyAmounts, amounts) {
  return await Promise.all(
    buyAmounts.map(async ({ asset, buyAssetMinAmount }, amountIndex) => {
      const price = await priceOracle.callStatic.refreshedAssetPerBaseInUQ(
        asset,
      )
      const quotedBuyAmount = BigNumber.from(buyAssetMinAmount)
        .mul(BigNumber.from(2).pow(112))
        .mul(255)
        .div(price.mul(amounts[amountIndex]!.weight))

      return { asset, quotedBuyAmount }
    }),
  )
}

async function getQuotes(amounts, inputToken, scaledSellAmounts) {
  return await Promise.all(
    amounts.map(async ({ asset }, i) => {
      const scaledSellAmount = scaledSellAmounts[i] as BigNumber
      if (asset === inputToken || scaledSellAmount.isZero()) {
        return {
          asset,
          swapTarget: constants.AddressZero,
          buyAssetMinAmount: scaledSellAmounts[i]!,
          assetQuote: [],
          estimatedGas: 0,
        }
      }

      const zeroExResult = await zeroExAggregator.quote(
        inputToken,
        asset,
        scaledSellAmount,
      )

      let buyAssetMinAmount = BigNumber.from(zeroExResult.buyAmount)

      return {
        asset,
        buyAssetMinAmount,
        swapTarget: zeroExResult.to,
        assetQuote: zeroExResult.data,
        estimatedGas: zeroExResult.estimatedGas,
      }
    }),
  )
}

async function prepareQuotes(inputToken, amountIn) {
  const { _assets, _weights } = await index.anatomy()

  const amounts = _assets.map((asset, i) => ({
    asset,
    amount: BigNumber.from(amountIn).mul(_weights[i]).div(255),
  }))

  const buyAmounts = await getBuyAmounts(amounts, inputToken)
  const buyAmountsInBase = await calculateBuyAmountsInBase(buyAmounts, amounts)

  const minBuyAmount = buyAmountsInBase.reduce((min, curr) =>
    min.quotedBuyAmount.lte(curr.quotedBuyAmount) ? min : curr,
  )

  const scaledSellAmounts = Object.values(amounts).map(({ amount }, i) =>
    amount
      .mul(minBuyAmount.quotedBuyAmount)
      .div(buyAmountsInBase[i].quotedBuyAmount),
  )

  const quotes = await getQuotes(amounts, inputToken, scaledSellAmounts)

  const sellAmount = scaledSellAmounts.reduce(
    (sum, curr) => sum.add(curr),
    BigNumber.from(0),
  )

  return { quotes, sellAmount }
}

/// MAIN FUNCTION

async function main() {
  const { quotes, sellAmount } = await prepareQuotes(INPUT_TOKEN, AMOUNT_IN)

  // OR `.mintSwapValue` if you want to use native currency as input
  return await indexRouter.populateTransaction.mintSwap({
    index: INDEX_ADDRESS,
    inputToken: INPUT_TOKEN,
    recipient: RECIPIENT_ADDRESS,
    amountInInputToken: sellAmount,
    quotes,
  })
}
