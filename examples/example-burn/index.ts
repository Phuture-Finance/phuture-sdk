import { BigNumber, constants } from 'ethers'
import { JsonRpcProvider } from '@ethersproject/providers'

import { ZeroExAggregator } from '../../src/0x-aggregator/0x-aggregator'
import { BaseIndex__factory, IndexRouter__factory } from '../../src/typechain'

/// ENVIRONMENT VARIABLES

const RPC_URL = process.env.RPC_URL!
if (!RPC_URL) throw new Error('Missing RPC_URL')

const ZERO_EX_API_URL = process.env.ZERO_EX_API_URL!
const ZERO_EX_API_KEY = process.env.ZERO_EX_API_KEY!
if (!ZERO_EX_API_URL || !ZERO_EX_API_KEY)
  throw new Error('Missing ZERO_EX_API_URL or ZERO_EX_API_KEY')

const INDEX_ADDRESS = process.env.INDEX_ADDRESS!
if (!INDEX_ADDRESS) throw new Error('Missing INDEX_ADDRESS')

const INDEX_ROUTER_ADDRESS = process.env.INDEX_ROUTER_ADDRESS!
if (!INDEX_ROUTER_ADDRESS) throw new Error('Missing INDEX_ROUTER_ADDRESS')

const RECIPIENT_ADDRESS = process.env.RECIPIENT_ADDRESS!
if (!RECIPIENT_ADDRESS) throw new Error('Missing RECIPIENT_ADDRESS')

const SHARES = process.env.SHARES!
if (!SHARES) throw new Error('Missing SHARES')

const OUTPUT_TOKEN = process.env.OUTPUT_TOKEN!
if (!OUTPUT_TOKEN) throw new Error('Missing OUTPUT_TOKEN')

/// PREPARE ENTITIES

const provider = new JsonRpcProvider(RPC_URL)

const [zeroExAggregator] = ZeroExAggregator.fromUrl(
  ZERO_EX_API_URL,
  ZERO_EX_API_KEY,
)

const index = BaseIndex__factory.connect(INDEX_ADDRESS, provider)
const indexRouter = IndexRouter__factory.connect(INDEX_ROUTER_ADDRESS, provider)

/// HELPER FUNCTIONS

async function prepareQuotes(shares, outputToken) {
  const [anatomy, inactiveAnatomy, burnTokensAmounts] = await Promise.all([
    this.anatomy(),
    this.inactiveAnatomy(),
    this.contract.callStatic.burnWithAmounts({
      index: index.address,
      recipient: this.account.address(),
      shares,
    }),
  ])

  const amounts = [...anatomy, ...inactiveAnatomy].map(
    (constituent, constituentIndex) => ({
      amount: burnTokensAmounts[constituentIndex] || BigNumber.from(0),
      ...constituent,
    }),
  )

  return await Promise.all(
    amounts.map(async ({ amount, asset }) => {
      if (!amount || amount.isZero() || asset === outputToken) {
        return {
          swapTarget: constants.AddressZero,
          assetQuote: [],
          buyAssetMinAmount: 0,
          estimatedGas: 0,
        }
      }
      const {
        buyAmount: buyAssetMinAmount,
        to: swapTarget,
        data: assetQuote,
        estimatedGas,
      } = await zeroExAggregator.quote(
        asset,
        outputToken,
        amount.mul(999).div(1000),
      )

      return {
        swapTarget,
        buyAssetMinAmount,
        assetQuote,
        estimatedGas,
      }
    }),
  )
}

/// MAIN FUNCTION

async function main() {
  const quotes = await prepareQuotes(SHARES, OUTPUT_TOKEN)

  // OR `.burnSwapValue` if you want to use native currency as output
  return await indexRouter.populateTransaction.burnSwap({
    index: INDEX_ADDRESS,
    amount: SHARES,
    outputAsset: OUTPUT_TOKEN,
    recipient: RECIPIENT_ADDRESS,
    quotes,
  })
}
