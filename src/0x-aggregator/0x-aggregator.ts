import axios, { AxiosInstance } from 'axios'
import axiosRetry from 'axios-retry'
import newDebug from 'debug'
import { BigNumber, BigNumberish } from 'ethers'

import type { Address, ChainId, TokenSymbol } from '../types'

import {
  RawZero0xPriceResponse,
  RawZero0xQuoteResponse,
  Zero0xPriceOptions,
  Zero0xPriceResponse,
  Zero0xQuoteOptions,
  Zero0xQuoteResponse,
  Zero0xSourcesResponse,
} from './types'

axiosRetry(axios, { retryDelay: axiosRetry.exponentialDelay })

const debug = newDebug('@phuture:0x-aggregator')

/** ### Facilitates swaps for end user */
export class ZeroExAggregator {
  /** ### Default options for the 0x endpoints */
  private _defaultQueryParams = {
    /** ### Slippage protection for the aggregator */
    enableSlippageProtection: true,
    affiliateAddress: '0x6575a93abdff85e5a6b97c2db2b83bcebc3574ec',
  }
  private client: AxiosInstance
  private abortController = new AbortController()

  baseUrl = 'https://api.0x.org/'

  /**
   * ### Constructs an instance of the swap class
   *
   * @param client The axios client to use for the API calls
   *
   * @returns {ZeroExAggregator} The 0x Aggregator instance
   */
  constructor(apiKey: string) {
    this.client = axios.create({
      signal: this.abortController?.signal,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      baseURL: this.baseUrl,
      headers: {
        'Content-Type': 'application/json',
        ...{ '0x-api-key': apiKey, '0x-version': 'v2' },
      },
      validateStatus: (status) => status < 500,
    })
  }

  /**
   * ### Makes a call to the slippage endpoint and returns the slippage
   *
   * @returns True if slippage protection is enabled
   */
  get slippageProtection(): boolean {
    return this._defaultQueryParams.enableSlippageProtection
  }

  /**
   * ### Sets the slippage protection for the aggregator
   *
   * @param slippageProtection Whether to enable slippage protection
   */
  set slippageProtection(slippageProtection: boolean) {
    this._defaultQueryParams.enableSlippageProtection = slippageProtection
  }

  /**
   * ### Makes a call to the quote endpoint and returns
   * a transaction request for the best price
   *
   * @param taker address that will make the trade
   * @param chainId chain ID
   * @param sellToken Token to sell
   * @param buyToken Token to buy
   * @param sellAmount Amount of sellToken to sell
   * @param options Options to pass to the quote endpoint
   *
   * @returns Promise transaction response
   */
  async quote(
    taker: Address,
    chainId: ChainId,
    sellToken: Address,
    buyToken: Address,
    sellAmount: BigNumberish,
    options?: Partial<Zero0xQuoteOptions>,
  ): Promise<Zero0xQuoteResponse> {
    debug(
      'Making quote call for sellToken: %s, buyToken: %s, sellAmount: %s',
      sellToken,
      buyToken,
      sellAmount,
    )
    const { data } = await this.client.get<RawZero0xQuoteResponse>(
      'swap/allowance-holder/quote',
      {
        params: {
          ...this._defaultQueryParams,
          chainId,
          sellToken,
          buyToken,
          taker,
          sellAmount: BigNumber.from(sellAmount).toString(),
          ...options,
        },
      },
    )

    // TODO: cover error codes and add retry logic

    debug(
      'Received quote buyAmount: %s for buyToken: %s',
      data.buyAmount,
      buyToken,
    )

    return parseZeroExQuotes(data)
  }

  /**
   * ### Makes a call to the price endpoint and returns the pricing
   * that would be a available for an analogous call to /quote
   *
   * @param chainId chain ID
   * @param sellToken Token to sell
   * @param buyToken Token to buy
   * @param sellAmount Amount of sellToken to sell
   * @param options Options to pass to the price endpoint
   *
   * @returns Promise transaction response
   */
  async price(
    chainId: ChainId,
    sellToken: Address | TokenSymbol,
    buyToken: Address,
    sellAmount: BigNumberish,
    options?: Partial<Zero0xPriceOptions>,
  ): Promise<Zero0xPriceResponse> {
    debug(
      'Making price call for sellToken: %s, buyToken: %s, sellAmount: %s',
      sellToken,
      buyToken,
      sellAmount,
    )
    const { data } = await this.client.get<RawZero0xPriceResponse>(
      'swap/allowance-holder/price',
      {
        params: {
          ...this._defaultQueryParams,
          chainId,
          sellToken,
          buyToken,
          sellAmount: BigNumber.from(sellAmount).toString(),
          ...options,
        },
      },
    )

    // TODO: cover error codes and add retry logic

    debug(
      'Received price buyAmount: %s for buyToken: %s',
      data.buyAmount,
      buyToken,
    )

    return parseZeroExPrices(data)
  }

  /**
   * Returns the liquidity sources enabled for the chain
   *
   * @param chainId chain ID
   *
   * @returns Promise transaction response
   */
  async sources(chainId: ChainId): Promise<Zero0xSourcesResponse> {
    debug('Making sources call')
    const { data } = await this.client.get<Zero0xSourcesResponse>('/sources', {
      params: {
        chainId,
      },
    })

    // TODO: cover error codes and add retry logic

    debug('Received %d sources', data.sources.length)

    return data
  }
}

const parseZeroExQuotes = (
  quotes: RawZero0xQuoteResponse,
): Zero0xQuoteResponse => ({
  buyAmount: quotes.buyAmount,
  sellAmount: quotes.sellAmount,
  estimatedGas: quotes.transaction.gas,
  gasPrice: quotes.transaction.gasPrice,
  to: quotes.transaction.to,
  data: quotes.transaction.data,
})

const parseZeroExPrices = (
  prices: RawZero0xPriceResponse,
): Zero0xPriceResponse => ({
  buyAmount: prices.buyAmount,
  sellAmount: prices.sellAmount,
  estimatedGas: prices.gas,
  gasPrice: prices.gasPrice,
})
