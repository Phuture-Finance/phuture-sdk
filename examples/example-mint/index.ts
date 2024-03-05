import { BigNumber, constants } from 'ethers'
import { JsonRpcProvider } from '@ethersproject/providers'

import { ZeroExAggregator } from '../../src/0x-aggregator/0x-aggregator'
import {
  BaseIndex__factory,
  IndexRouter__factory,
  PhuturePriceOracle__factory,
} from '../../src/typechain'

/// ENVIRONMENT VARIABLES

/// Avalanche HTTP RPC URL
const RPC_URL = process.env.RPC_URL!
if (!RPC_URL) throw new Error('Missing RPC_URL')

/// 0x API URL and API key
/// can be obtained from https://0x.org/pricing
const ZERO_EX_API_URL = process.env.ZERO_EX_API_URL!
const ZERO_EX_API_KEY = process.env.ZERO_EX_API_KEY!
if (!ZERO_EX_API_URL || !ZERO_EX_API_KEY)
  throw new Error('Missing ZERO_EX_API_URL or ZERO_EX_API_KEY')

/// 0x48f88A3fE843ccb0b5003e70B4192c1d7448bEf0 on Production
const INDEX_ADDRESS = process.env.INDEX_ADDRESS!
if (!INDEX_ADDRESS) throw new Error('Missing INDEX_ADDRESS')

/// 0x69E848b2F41019340CeC3e6696D5c937e74Da96b on Production
const PRICE_ORACLE_ADDRESS = process.env.PRICE_ORACLE_ADDRESS!
if (!PRICE_ORACLE_ADDRESS) throw new Error('Missing PRICE_ORACLE_ADDRESS')

/// 0xD6dd95610fC3A3579a2C32fe06158d8bfB8F4eE9 on Production
const INDEX_ROUTER_ADDRESS = process.env.INDEX_ROUTER_ADDRESS!
if (!INDEX_ROUTER_ADDRESS) throw new Error('Missing INDEX_ROUTER_ADDRESS')

/// Address to receive the Index shares after minting
const RECIPIENT_ADDRESS = process.env.RECIPIENT_ADDRESS!
if (!RECIPIENT_ADDRESS) throw new Error('Missing RECIPIENT_ADDRESS')

/// Address of the input token
const INPUT_TOKEN = process.env.INPUT_TOKEN!
if (!INPUT_TOKEN) throw new Error('Missing INPUT_TOKEN')

/// Amount of input token to mint
const AMOUNT_IN = process.env.AMOUNT_IN!
if (!AMOUNT_IN) throw new Error('Missing AMOUNT_IN')

/// PREPARE ENTITIES

/// For static calls only, you can just use the provider (VoidSigner)
const provider = new JsonRpcProvider(RPC_URL)
/// For transactions, you need to use a Wallet or Injected Signer (in browser)
/// const provider = new Wallet(process.env.PK!, new JsonRpcProvider(RPC_URL))

/// Instantiate the 0x Aggregator
/// For more customizations, you can use the constructor directly
const [zeroExAggregator] = ZeroExAggregator.fromUrl(
  ZERO_EX_API_URL,
  ZERO_EX_API_KEY,
)

/// Instantiate the Index, PriceOracle, and IndexRouter contracts
const index = BaseIndex__factory.connect(INDEX_ADDRESS, provider)
const priceOracle = PhuturePriceOracle__factory.connect(
  PRICE_ORACLE_ADDRESS,
  provider,
)
const indexRouter = IndexRouter__factory.connect(INDEX_ROUTER_ADDRESS, provider)

/// HELPER FUNCTIONS

/**
 * Retrieves the buy amounts for the given amounts and input token.
 * @param amounts - An array of objects containing asset and amount.
 * @param inputToken - The input token.
 * @returns A promise that resolves to an array of objects containing buy amounts and other details.
 */
async function getBuyAmounts(amounts, inputToken) {
  /// Prepare buy amounts for each asset
  const buyAmounts = amounts.map(async ({ asset, amount }) => {
    /// If the asset is the input token or the amount is zero, return the asset and amount
    if (asset === inputToken || amount.isZero()) {
      return {
        asset,
        swapTarget: constants.AddressZero,
        buyAssetMinAmount: amount,
        assetQuote: [],
      }
    }

    /// Otherwise, get the buy amount from the 0x Aggregator
    const zeroExResult = await zeroExAggregator.quote(inputToken, asset, amount)

    return {
      asset,
      swapTarget: zeroExResult.to,
      buyAssetMinAmount: zeroExResult.buyAmount,
      assetQuote: zeroExResult.data,
    }
  })

  /// Use `Promise.all` to resolve all buy amounts concurrently
  return await Promise.all(buyAmounts)
}

/**
 * Calculates the buy amounts in base currency.
 * @param buyAmounts - An array of objects containing asset and buy asset min amount.
 * @param amounts - An array of objects containing asset, amount, and weight.
 * @returns A promise that resolves to an array of objects containing asset and quoted buy amount.
 */
async function calculateBuyAmountsInBase(buyAmounts, amounts) {
  /// Calculate the buy amounts in base currency
  const buyAmountsInBase = buyAmounts.map(
    async ({ asset, buyAssetMinAmount }, amountIndex) => {
      /// Get the price of the asset in base currency from the PriceOracle
      /// Note: `callStatic` is used because this is not a view function
      const price = await priceOracle.callStatic.refreshedAssetPerBaseInUQ(
        asset,
      )

      /// Calculate the quoted buy amount in base currency
      const quotedBuyAmount = BigNumber.from(buyAssetMinAmount)
        .mul(BigNumber.from(2).pow(112))
        .mul(255)
        .div(price.mul(amounts[amountIndex]!.weight))

      return { asset, quotedBuyAmount }
    },
  )

  /// Use `Promise.all` to resolve all buy amounts in base currency concurrently
  return await Promise.all(buyAmountsInBase)
}

/**
 * Retrieves quotes for the given amounts, input token, and scaled sell amounts.
 * @param amounts - An array of objects containing asset and amount.
 * @param inputToken - The input token.
 * @param scaledSellAmounts - An array of scaled sell amounts.
 * @returns A promise that resolves to an array of quotes for the given amounts.
 */
async function getQuotes(amounts, inputToken, scaledSellAmounts) {
  /// Prepare quotes for each asset
  const quotes = amounts.map(async ({ asset }, i) => {
    const scaledSellAmount = scaledSellAmounts[i] as BigNumber

    /// If the asset is the input token or the scaled sell amount is zero, return the asset and amount
    if (asset === inputToken || scaledSellAmount.isZero()) {
      return {
        asset,
        swapTarget: constants.AddressZero,
        buyAssetMinAmount: scaledSellAmounts[i]!,
        assetQuote: [],
      }
    }

    /// Otherwise, get the quote from the 0x Aggregator
    const zeroExResult = await zeroExAggregator.quote(
      inputToken,
      asset,
      scaledSellAmount,
    )

    return {
      asset,
      buyAssetMinAmount: BigNumber.from(zeroExResult.buyAmount),
      swapTarget: zeroExResult.to,
      assetQuote: zeroExResult.data,
    }
  })

  /// Use `Promise.all` to resolve all quotes concurrently
  return await Promise.all(quotes)
}

/**
 * Prepares quotes for minting tokens.
 * @param inputToken - The input token for the mint operation.
 * @param amountIn - The amount of input token to mint.
 * @returns A promise that resolves to an object containing quotes and the total sell amount.
 */
async function prepareQuotes(inputToken, amountIn) {
  /// Retrieve the current index anatomy and inactive anatomy from the index contract
  const { _assets, _weights } = await index.anatomy()

  /// Prepare amounts for each asset
  const amounts = _assets.map((asset, i) => ({
    asset,
    amount: BigNumber.from(amountIn).mul(_weights[i]).div(255),
    weight: _weights[i],
  }))

  console.dir({ amounts }, { depth: 2 })

  /// Get the buy amounts for the given amounts and input token
  const buyAmounts = await getBuyAmounts(amounts, inputToken)

  console.dir({ buyAmounts }, { depth: 2 })

  /// Calculate the buy amounts in base currency
  const buyAmountsInBase = await calculateBuyAmountsInBase(buyAmounts, amounts)

  console.dir({ buyAmountsInBase }, { depth: 2 })

  /// Find the minimum buy amount in base currency
  const minBuyAmount = buyAmountsInBase.reduce((min, curr) =>
    min.quotedBuyAmount.lte(curr.quotedBuyAmount) ? min : curr,
  )

  /// Scale the sell amounts based on the minimum buy amount
  const scaledSellAmounts = Object.values(amounts).map(({ amount }, i) =>
    amount
      .mul(minBuyAmount.quotedBuyAmount)
      .div(buyAmountsInBase[i].quotedBuyAmount),
  )

  /// Get quotes for the given amounts, input token, and scaled sell amounts
  const quotes = await getQuotes(amounts, inputToken, scaledSellAmounts)

  console.dir({ quotes }, { depth: 2 })

  /// Calculate the total sell amount
  const sellAmount = scaledSellAmounts.reduce(
    (sum, curr) => sum.add(curr),
    BigNumber.from(0),
  )

  return { quotes, sellAmount }
}

/// MAIN FUNCTION

async function main() {
  /// Prepare quotes for minting tokens and get the scaled total sell amount
  const { quotes, sellAmount } = await prepareQuotes(INPUT_TOKEN, AMOUNT_IN)

  // Use `.mintSwapValue` if you want to use native currency as input
  return await indexRouter.populateTransaction.mintSwap({
    index: INDEX_ADDRESS,
    inputToken: INPUT_TOKEN,
    recipient: RECIPIENT_ADDRESS,
    amountInInputToken: sellAmount,
    quotes,
  })
}

main().then(console.info, console.error)
