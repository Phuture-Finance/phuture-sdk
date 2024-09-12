import type { BigNumberish, BytesLike } from 'ethers'

import type { Address } from '../types'

/** ### Options for 0x price endpoint */
export interface Zero0xPriceOptions {
  /** ### Taker address that will make the trade */
  taker: Address
  /** ### The contract address of the external account that started the transaction. This is only needed if taker is a smart contract */
  txOrigin: Address
  /** ### The wallet address to receive the specified trading fees. You must also specify the swapFeeToken and swapFeeBps in the request to use this feature.  */
  swapFeeRecipient: Address
  /** ### The amount in Bps of the swapFeeToken to charge and deliver to the swapFeeRecipient. You must also specify the swapFeeRecipient and swapFeeToken in the request to use this feature. For security, this field has a default limit of 1000 Bps. */
  swapFeeBps: number
  /** ### The contract address of the token to receive trading fees in. This must be set to the value of either the buyToken or the sellToken.  */
  swapFeeToken: Address
  /** ### The address to receive any trade surplus. If specified, this address will receive trade surplus when applicable. Otherwise, the taker will receive the surplus */
  tradeSurplusRecipient: Address
  /** ### The target gas price (in wei) for the swap transaction. If not provided, the default value is based on the 0x gas price oracle */
  gasPrice: string
  /** ### The maximum acceptable slippage of the buyToken in Bps. If this parameter is set to 0, no slippage will be tolerated. If not provided, the default slippage tolerance is 100Bps */
  slippageBps: number

  /** ### Sources to exclude from the quote endpoint call */
  excludedSources: string[]
}

/** ### Response from the 0x price endpoint */
export interface Zero0xPriceResponse {
  /** ### Amount of tokens to buy */
  buyAmount: BigNumberish
  /** ### Amount of tokens to sell */
  sellAmount: BigNumberish
  /** ### Estimated Gas */
  estimatedGas: BigNumberish
  /** ### Gas price */
  gasPrice: BigNumberish
}

export interface RawZero0xPriceResponse {
  buyAmount: BigNumberish
  buyToken: Address
  gas: BigNumberish
  gasPrice: BigNumberish
  liquidityAvailable: boolean
  minBuyAmount: BigNumberish
  sellAmount: BigNumberish
  sellToken: Address
  totalNetworkFee: BigNumberish
  zid: string
}

/** ### Options for 0x quote endpoint */
export type Zero0xQuoteOptions = Zero0xPriceOptions

/** ### Response from the 0x quote endpoint */
export interface Zero0xQuoteResponse extends Zero0xPriceResponse {
  /** ### Address of the contract to call with data */
  to: Address
  /** ### Raw call data */
  data: BytesLike
}

export interface RawZero0xQuoteResponse {
  buyToken: Address
  buyAmount: BigNumberish
  minBuyAmount: BigNumberish
  sellAmount: BigNumberish
  sellToken: Address
  totalNetworkFee: string
  transaction: {
    to: Address
    data: BytesLike
    gas: string
    gasPrice: string
    value: string
  }
}

/** ### Response from the 0x sources endpoint */
export interface Zero0xSourcesResponse {
  /** ### Array of sources */
  sources: string[]
  /** ### The unique ZeroEx identifier of the request */
  zid: string
}
