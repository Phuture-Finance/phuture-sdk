import { BigNumber, BigNumberish, ContractTransaction, ethers } from 'ethers'
import { BurningQueue } from 'typechain/BurningQueue'
import { IIndexViewer, SubIndexLib } from 'typechain/OmniIndex'

import { Account } from '../account'
import { Contract } from '../contract'
import {
  OmniIndex as OmniIndexInterface,
  OmniIndex__factory,
} from '../typechain'
import { PromiseOrValue } from '../typechain/common'
import { Address, ChainId, ChainIds } from '../types'

/** ### Default OmniIndex address for network */
export const defaultOmniIndexAddress: Record<ChainId, Address> = {
  /** ### Default OmniIndex address on goerli rollup testnet. */
  [ChainIds.GoerliRollupTestnet]: '0xae5fc9cec58946c2b90be5b3b29ab9c2d173a910',
}

export class OmniIndex extends Contract<OmniIndexInterface> {
  /**
   * ### Creates a new OmniIndex instance
   *
   * @param account Account to use for signing
   * @param contract Contract instance or address of the OmniIndexInterface contract
   *
   * @returns New OmniIndexInterface token instance
   */
  constructor(account: Account, contract: OmniIndexInterface | Address) {
    super(account, contract, OmniIndex__factory)
  }

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
      await this.contract.anatomy()
    return this.contract.deposit(reserveTokens, receiver, anatomy)
  }

  /**
   * ### Redeem tokens
   * @param indexShares
   * @param receiver
   * @param owner
   * @returns redeem transaction
   */
  async redeem(
    indexShares: PromiseOrValue<BigNumberish>,
    receiver: PromiseOrValue<string>,
    owner: PromiseOrValue<string>,
    batchInfo: {
      batches: BurningQueue.BatchStruct[]
      quotes: BurningQueue.QuoteParamsStruct[]
    },
    isDoubleStep: boolean,
  ): Promise<ContractTransaction> {
    const encodedLocalQuotes = ethers.utils.defaultAbiCoder.encode(
      ['tuple(address,address,uint256,uint256,uint256,bytes)[]'],
      [batchInfo.quotes],
    )

    const encodedBatches = ethers.utils.defaultAbiCoder.encode(
      [
        'tuple(tuple(address swapTarget,address inputAsset,uint256 inputAmount,uint256 buyAssetMinAmount,uint256 additionalGas,bytes assetQuote)[] quotes,uint256 chainId,bytes payload)[]',
      ],
      [batchInfo.batches],
    )

    const redeemData = ethers.utils.defaultAbiCoder.encode(
      ['tuple(bytes localData, bytes remoteData)'],
      [{ localData: encodedLocalQuotes, remoteData: encodedBatches }],
    )

    const reserveCached = isDoubleStep ? 0 : await this.contract.reserve() //INFO: change to 0 for testing
    const estimatedRedeemFee = await this.contract['estimateRedeemFee(bytes)'](
      encodedBatches,
    )

    const anatomy = await this.contract.anatomy()

    return this.contract.redeem(
      indexShares,
      receiver,
      owner,
      reserveCached,
      redeemData,
      anatomy,
      {
        value: estimatedRedeemFee,
      },
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
    return this.contract.previewRedeem(indexShares, executionTimestamp)
  }

  /**
   * ### Preview depositing tokens
   * @param reserveTokens
   * @returns
   */
  async previewDeposit(
    reserveTokens: PromiseOrValue<BigNumberish>,
  ): Promise<BigNumber> {
    return this.contract.previewDeposit(reserveTokens)
  }
}
