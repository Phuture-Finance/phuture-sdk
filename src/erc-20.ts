import type { JsonRpcSigner } from "@ethersproject/providers";

import { InsufficientAllowanceError } from "./errors";
import { type ERC20 as ERC20ContractInterface, ERC20__factory } from "./typechain";

/** ### ERC20 Token Contract */
export class Erc20 {
  public contract: ERC20ContractInterface;

  /**
   * ### Creates a new ERC20 instance
   *
   * @param signer Account to use for signing
   * @param contract Contract instance or address of the ERC20 contract
   *
   * @returns New ERC20 token instance
   */
  constructor(
    public signer: JsonRpcSigner,
    contract: string,
  ) {
    this.contract = ERC20__factory.connect(contract, signer);
  }

  /**
   * ### Check Allowance
   *
   * @param account Address of the account
   * @param expectedAmount Amount of tokens to check
   *
   * @returns true if the account has enough tokens to transfer the amount
   */
  public async checkAllowance(account: string, expectedAmount: string): Promise<true> {
    const allowance = await this.contract.allowance(await this.signer.getAddress(), account);

    if (allowance.lt(expectedAmount))
      throw new InsufficientAllowanceError(account, expectedAmount, allowance.toString());

    return true;
  }
}
