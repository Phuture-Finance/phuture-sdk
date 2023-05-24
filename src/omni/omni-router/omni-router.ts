import { BigNumber, BigNumberish, ContractTransaction } from 'ethers'
import { PromiseOrValue } from 'typechain/common'
import { IIndexViewer, SubIndexLib } from 'typechain/OmniIndex'
import { RedeemRouter as RedeemRouterInterface } from 'typechain/RedeemRouter'

import { Zero0xQuoteOptions } from '../../0x-aggregator'

import { createQuotes, createRemoteBatches } from './batches-utils'
import { OmniIndex } from './omni-index'
import { OmniRouterInterface } from './omni-router-types'
import { RedeemRouter } from './redeem-router'

/** ### OmniRouter class */
export class OmniRouter implements OmniRouterInterface {
  /**
   * ### Creates a new OmniRouter instance
   *
   * @param omniIndex instance of OmniIndex
   * @param redeemRouter instance of RedeemRouter
   *
   * @returns New OmniRouter instance
   */
  //TODO: refactor OmniRouter constructor if we have a few indices on one chain
  constructor(
    public readonly omniIndex: OmniIndex,
    public readonly redeemRouter: RedeemRouter,
  ) {}

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
    const anatomy: SubIndexLib.SubIndexStructOutput[] =
      await this.omniIndex.contract.anatomy()
    return this.omniIndex.contract.deposit(reserveTokens, receiver, anatomy)
  }

  /**
   * ### Redeem tokens
   * @param indexShares
   * @param receiver
   * @param owner
   * @param assets
   * @param options
   * @returns redeem transaction
   */
  async redeem(
    indexShares: BigNumberish,
    receiver: PromiseOrValue<string>,
    owner: PromiseOrValue<string>,
    assets: IIndexViewer.RedeemAssetInfoStructOutput[],
    options?: Partial<Zero0xQuoteOptions>,
  ): Promise<ContractTransaction> {
    const homeChainId = await this.omniIndex.account.chainId()
    const homeChainIndex = assets.findIndex(
      ({ chainId }) => chainId.toNumber() === homeChainId,
    )

    let localQuotes: RedeemRouterInterface.LocalQuotesStruct = { quotes: [] }
    if (homeChainIndex !== -1) {
      const [homeChain] = assets.splice(homeChainIndex, 1)
      localQuotes = await createQuotes(homeChain, options)
    }

    const remoteData = await createRemoteBatches(assets, options)

    return this.redeemRouter.redeem(
      this.omniIndex,
      indexShares,
      receiver,
      owner,
      { remoteData, localData: [localQuotes] },
    )
  }

  /**
   * ### Retry
   * @param indexShares
   * @param receiver
   * @param owner
   * @returns retry transaction
   */
  async retry(
    indexShares: BigNumberish,
    receiver: PromiseOrValue<string>,
    owner: PromiseOrValue<string>,
  ): Promise<ContractTransaction> {
    //TODO build correct batches
    const batches = {} as RedeemRouterInterface.RedeemDataStruct

    return this.redeemRouter.retry(
      this.omniIndex,
      indexShares,
      receiver,
      owner,
      batches,
    )
  }

  /**
   * ### Preview redeeming tokens
   * @param indexShares
   * @returns
   */

  async previewRedeem(
    indexShares: PromiseOrValue<BigNumberish>,
    executionTimestamp: PromiseOrValue<BigNumberish>,
  ): Promise<IIndexViewer.RedeemInfoStructOutput> {
    return this.omniIndex.contract.previewRedeem(
      indexShares,
      executionTimestamp,
    )
  }

  /**
   * ### Preview depositing tokens
   * @param reserveTokens
   * @returns
   */
  async previewDeposit(
    reserveTokens: PromiseOrValue<BigNumberish>,
  ): Promise<BigNumber> {
    return this.omniIndex.contract.previewDeposit(reserveTokens)
  }
}
