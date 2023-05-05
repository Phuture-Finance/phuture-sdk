import { BigNumber, BigNumberish, ContractTransaction } from 'ethers'
import { PromiseOrValue } from 'typechain/common'
import { IIndexViewer } from 'typechain/OmniIndex'

/** ### OmniRouterInterface Interface */
export interface OmniRouterInterface {
  /**
   * ### Deposit tokens
   * @param reserveTokens Amount of tokens used for minting
   * @param receiver
   * @returns deposit transaction
   */
  deposit(
    reserveTokens: PromiseOrValue<BigNumberish>,
    receiver: PromiseOrValue<string>,
  ): Promise<ContractTransaction>

  /**
   * ### Redeem tokens
   * @param indexShares
   * @param receiver
   * @param owner
   * @returns redeem transaction
   */
  redeem(
    indexShares: PromiseOrValue<BigNumberish>,
    receiver: PromiseOrValue<string>,
    owner: PromiseOrValue<string>,
    assets: IIndexViewer.RedeemAssetInfoStructOutput[],
  ): Promise<ContractTransaction>

  /**
   * ### Preview redeeming tokens
   * @param indexShares
   * @returns
   */

  previewRedeem(
    indexShares: PromiseOrValue<BigNumberish>,
    executionTimestamp: PromiseOrValue<BigNumberish>,
  ): Promise<IIndexViewer.RedeemInfoStructOutput>

  /**
   * ### Preview depositing tokens
   * @param reserveTokens
   * @returns
   */
  previewDeposit(
    reserveTokens: PromiseOrValue<BigNumberish>,
  ): Promise<BigNumber>
}
