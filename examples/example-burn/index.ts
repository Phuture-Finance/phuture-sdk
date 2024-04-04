import { BigNumber, Wallet, constants, utils } from 'ethers'
import { JsonRpcProvider } from '@ethersproject/providers'

import { ZeroExAggregator } from '../../src/0x-aggregator/0x-aggregator'
import { BaseIndex__factory, IndexRouter__factory } from '../../src/typechain'

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

/// 0xD6dd95610fC3A3579a2C32fe06158d8bfB8F4eE9 on Production
const INDEX_ROUTER_ADDRESS = process.env.INDEX_ROUTER_ADDRESS!
if (!INDEX_ROUTER_ADDRESS) throw new Error('Missing INDEX_ROUTER_ADDRESS')

/// Address to receive the output token(s) after burning Index shares
const RECIPIENT_ADDRESS = process.env.RECIPIENT_ADDRESS!
if (!RECIPIENT_ADDRESS) throw new Error('Missing RECIPIENT_ADDRESS')

/// Amount of Index shares to burn
const SHARES = process.env.SHARES!
if (!SHARES) throw new Error('Missing SHARES')

/// Address of the output token
const OUTPUT_TOKEN = process.env.OUTPUT_TOKEN!
if (!OUTPUT_TOKEN) throw new Error('Missing OUTPUT_TOKEN')

/// PREPARE ENTITIES

/// For static calls only, you can just use the provider (VoidSigner)
const provider = new JsonRpcProvider(RPC_URL)
/// For transactions, you need to use a Wallet or Injected Signer (in browser)
const wallet = new Wallet(process.env.PK!, new JsonRpcProvider(RPC_URL))

/// Instantiate the 0x Aggregator
/// For more customizations, you can use the constructor directly
const [zeroExAggregator] = ZeroExAggregator.fromUrl(
  ZERO_EX_API_URL,
  ZERO_EX_API_KEY,
)

zeroExAggregator.slippageProtection = true

/// Instantiate the Index and IndexRouter contracts
const index = BaseIndex__factory.connect(INDEX_ADDRESS, provider)
const indexRouter = IndexRouter__factory.connect(INDEX_ROUTER_ADDRESS, wallet)

const BALANCE_OF_SLOT = 8
const ALLOWANCE_SLOT = 9

/// HELPER FUNCTIONS

/**
 * Prepares quotes for burning tokens.
 *
 * @param shares - The number of shares to burn.
 * @param outputToken - The output token for the burn operation.
 * @returns A promise that resolves to an array of quotes for burning tokens.
 */
async function prepareQuotes(shares, outputToken) {
  const balanceOfOwnerSlot = utils.keccak256(
    utils.defaultAbiCoder.encode(
      ['address', 'uint256'],
      [RECIPIENT_ADDRESS, BALANCE_OF_SLOT],
    ),
  )

  const allowanceOwnerSlot = utils.keccak256(
    utils.defaultAbiCoder.encode(
      ['address', 'uint256'],
      [RECIPIENT_ADDRESS, ALLOWANCE_SLOT],
    ),
  )
  const spenderSlot = utils.keccak256(
    utils.defaultAbiCoder.encode(
      ['address', 'bytes32'],
      [INDEX_ROUTER_ADDRESS, allowanceOwnerSlot],
    ),
  )

  const stateDiff = {
    [INDEX_ADDRESS]: {
      stateDiff: {
        [balanceOfOwnerSlot]: utils.hexZeroPad(
          utils.hexValue(BigNumber.from(shares)),
          32,
        ),
        [spenderSlot]: utils.hexZeroPad(
          utils.hexValue(BigNumber.from(shares)),
          32,
        ),
      },
    },
  }

  /// Retrieve the current index anatomy and inactive anatomy from the index contract
  const [{ _assets, _weights }, inactiveAnatomy, rawBurnTokensAmounts] =
    await Promise.all([
      index.anatomy(),
      index.inactiveAnatomy(),
      provider.send('eth_call', [
        {
          from: RECIPIENT_ADDRESS,
          to: indexRouter.address,
          data: indexRouter.interface.encodeFunctionData('burnWithAmounts', [
            {
              index: index.address,
              recipient: RECIPIENT_ADDRESS,
              amount: shares,
            },
          ]),
        },
        'latest',
        stateDiff,
      ]),
    ])

  const [burnTokensAmounts] = new utils.AbiCoder().decode(
    ['uint[]'],
    rawBurnTokensAmounts,
  )

  console.log('Burn Tokens Amounts:')
  console.table(
    burnTokensAmounts.map((amount, i) => ({
      asset: _assets[i],
      amount: amount.toString(),
    })),
  )

  /// Merge the active and inactive anatomy into a single array
  const constituents = [
    ..._assets.map((asset, i) => ({ asset, weight: _weights[i] })),
    ...inactiveAnatomy.map((asset) => ({ asset, weight: 0 })),
  ]

  /// Prepare quotes for burning tokens
  const quotes = constituents.map(async ({ asset }, constituentIndex) => {
    const amount = burnTokensAmounts[constituentIndex] || BigNumber.from(0)
    /// If the amount is zero or the asset is the output token, return an empty quote
    if (!amount || amount.isZero() || asset === outputToken) {
      return {
        swapTarget: constants.AddressZero,
        assetQuote: [],
        buyAssetMinAmount: 0,
      }
    }

    /// Use the 0x Aggregator to get a quote for burning the token
    const zeroExResult = await zeroExAggregator.quote(
      asset,
      outputToken,
      amount,
      {
        slippagePercentage: 0.03,
      }
    )

    return {
      swapTarget: zeroExResult.to,
      buyAssetMinAmount: zeroExResult.buyAmount,
      assetQuote: zeroExResult.data,
    }
  })

  /// Use `Promise.all` to resolve all the quotes concurrently
  return await Promise.all(quotes)
}

/// MAIN FUNCTION

async function main() {
  /// Prepare quotes for burning tokens
  const quotes = await prepareQuotes(SHARES, OUTPUT_TOKEN)

  // Use `.burnSwapValue` if you want to use native currency as output
  return await indexRouter.burnSwap({
    index: INDEX_ADDRESS,
    amount: SHARES,
    outputAsset: OUTPUT_TOKEN,
    recipient: RECIPIENT_ADDRESS,
    quotes,
  })
}

main().then(console.info, console.error)
