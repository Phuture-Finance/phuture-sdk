import type { JsonRpcSigner } from "@ethersproject/providers";

import { InsufficientAllowanceError } from "./insufficient-allowance.error";
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
  public async checkAllowance(owner: string, spender: string, expectedAmount: string): Promise<true> {
    const allowance = await this.contract.allowance(owner, spender);
    if (allowance.lt(expectedAmount))
      throw new InsufficientAllowanceError(spender, expectedAmount, allowance.toString());

    return true;
  }
}
