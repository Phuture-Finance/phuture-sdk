import type { JsonRpcSigner } from "@ethersproject/providers";
import { BigNumber, type ContractTransaction } from "ethers";
import { type Address, decodeAbiParameters, encodeAbiParameters, keccak256, pad, toHex } from "viem";

import { InsufficientAllowanceError } from "./insufficient-allowance.error";
import {
  BaseIndex__factory,
  ERC20__factory,
  type IndexRouter as IndexRouterContractInterface,
  IndexRouter__factory,
} from "./typechain";
import type { IIndexRouterV2 } from "./typechain/IndexRouter";

/** ### Default IndexRouter address for network */
export const defaultIndexRouterAddress: Record<number, string> = {
  /** ### Default IndexRouter address on mainnet. */
  1: "0x1985426d77c431fc95e5ca51547bcb9b793e8482",
  /** ### Default IndexRouter address on c-chain. */
  43114: "0xd6dd95610fc3a3579a2c32fe06158d8bfb8f4ee9",
};

const BALANCE_OF_SLOT = BigInt(8);
const ALLOWANCE_SLOT = BigInt(9);

export type Anatomy = {
  asset: string;
  weight: number;
}[];

/** ### IndexRouter Contract */
export class IndexRouter {
  public contract: IndexRouterContractInterface;

  /**
   * ### Creates a new IndexRouter instance
   *
   * @param signer Account to use for signing
   * @param contract Contract instance or address of the IndexRouter contract
   *
   * @returns New IndexRouter token instance
   */
  constructor(
    public signer: JsonRpcSigner,
    contract: string,
  ) {
    this.contract = IndexRouter__factory.connect(contract, signer);
  }

  /**
   * ### Mint
   *
   * @param options mint options
   * @param sellAmount token's  amount
   * @param sellToken (optional) erc20 token
   *
   * @returns mint transaction
   */
  async mintSwap(
    options: IIndexRouterV2.MintSwapParamsStruct,
    sellAmount: string,
    sellToken: string,
  ): Promise<ContractTransaction> {
    const sellTokenInstance = ERC20__factory.connect(sellToken, this.signer);

    const owner = await this.signer.getAddress();
    const spender = this.contract.address;

    const allowance = await sellTokenInstance.allowance(owner, spender);
    if (allowance.lt(sellAmount)) throw new InsufficientAllowanceError(spender, sellAmount, allowance.toString());

    const estimatedGas = await this.contract.estimateGas.mintSwap(options as IIndexRouterV2.MintSwapParamsStruct);

    return this.contract.mintSwap(options as IIndexRouterV2.MintSwapParamsStruct, {
      gasLimit: estimatedGas.mul(105).div(100),
    });
  }

  async mintSwapValue(options: IIndexRouterV2.MintSwapParamsStruct, sellAmount: string): Promise<ContractTransaction> {
    const mintSwapValueOptions: IIndexRouterV2.MintSwapValueParamsStruct = {
      index: options.index,
      quotes: options.quotes,
      recipient: options.recipient,
    };

    const mintSwapValueEstimatedGas = await this.contract.estimateGas.mintSwapValue(mintSwapValueOptions, {
      value: sellAmount,
    });

    return this.contract.mintSwapValue(mintSwapValueOptions, {
      value: sellAmount,
      gasLimit: mintSwapValueEstimatedGas.mul(105).div(100),
    });
  }

  /**
   * ### Mint Static
   *
   * @param options mint options
   * @param sellAmount token's  amount
   * @param sellToken (optional) erc20 token
   *
   * @returns mint amount
   */
  async mintSwapStatic(
    options: IIndexRouterV2.MintSwapParamsStruct,
    sellAmount: string,
    sellToken?: string,
  ): Promise<BigNumber> {
    if (!sellToken) {
      const mintSwapValueOptions: IIndexRouterV2.MintSwapValueParamsStruct = {
        index: options.index,
        quotes: options.quotes,
        recipient: options.recipient,
      };

      return this.contract.callStatic.mintSwapValue(mintSwapValueOptions, {
        value: sellAmount,
      });
    }

    const sellTokenInstance = ERC20__factory.connect(sellToken, this.signer);

    const owner = await this.signer.getAddress();
    const spender = this.contract.address;

    const allowance = await sellTokenInstance.allowance(owner, spender);
    if (allowance.lt(sellAmount)) throw new InsufficientAllowanceError(spender, sellAmount, allowance.toString());

    return this.contract.callStatic.mintSwap(options as IIndexRouterV2.MintSwapParamsStruct);
  }

  /**
   * ### Mint Index Amount
   *
   * @param index index address
   * @param amountInInputToken token's  amount
   * @param quotes quotes for swaps
   * @param inputToken (optional) token's address
   *
   * @returns mint amount in single token
   */
  async mintIndexAmount(
    index: string,
    amountInInputToken: string,
    quotes: IIndexRouterV2.MintQuoteParamsStruct[],
    inputToken: string,
  ): Promise<BigNumber> {
    const option: IIndexRouterV2.MintSwapParamsStruct = {
      inputToken,
      amountInInputToken,
      quotes,
      index,
      recipient: await this.signer.getAddress(),
    };

    return this.contract.mintSwapIndexAmount(option);
  }

  /**
   * ### Burn
   *
   * @param index index address or it's erc20 interface
   * @param amount index amount
   * @param recipient address of account to receive tokens
   *
   * @returns burn transaction
   */
  async burn(index: string, amount: string, recipient: string): Promise<ContractTransaction> {
    const indexInstance = ERC20__factory.connect(index, this.signer);
    const burnParameters: IIndexRouterV2.BurnParamsStruct = {
      index,
      amount,
      recipient,
    };

    const owner = await this.signer.getAddress();
    const spender = this.contract.address;

    const allowance = await indexInstance.allowance(owner, spender);
    if (allowance.lt(amount)) throw new InsufficientAllowanceError(spender, amount, allowance.toString());

    const estimatedGas = await this.contract.estimateGas.burn(burnParameters);

    return this.contract.burn(burnParameters, {
      gasLimit: estimatedGas.mul(105).div(100),
    });
  }

  /**
   * ### Burn Swap
   *
   * @param index index address or it's erc20 interface
   * @param amount index amount
   * @param recipient signer's address
   * @param options burn swap options
   *
   * @returns burn swap transaction
   */
  async burnSwap(
    index: string,
    amount: string,
    recipient: string,
    outputAsset: string,
    quotes: IIndexRouterV2.BurnQuoteParamsStruct[],
  ): Promise<ContractTransaction> {
    const indexInstance = ERC20__factory.connect(index, this.signer);
    const burnParameters: IIndexRouterV2.BurnSwapParamsStruct = {
      index,
      amount,
      recipient,
      quotes,
      outputAsset,
    };

    const owner = await this.signer.getAddress();
    const spender = this.contract.address;

    const allowance = await indexInstance.allowance(owner, spender);
    if (allowance.lt(amount)) throw new InsufficientAllowanceError(spender, amount, allowance.toString());

    const estimatedGas = await this.contract.estimateGas.burnSwap(burnParameters);

    return this.contract.burnSwap(burnParameters, {
      gasLimit: estimatedGas.mul(105).div(100),
    });
  }

  async burnSwapValue(
    index: string,
    amount: string,
    recipient: string,
    outputAsset: string,
    quotes: IIndexRouterV2.BurnQuoteParamsStruct[],
  ): Promise<ContractTransaction> {
    const indexInstance = ERC20__factory.connect(index, this.signer);
    const burnParameters: IIndexRouterV2.BurnSwapParamsStruct = {
      index,
      amount,
      recipient,
      quotes,
      outputAsset,
    };

    const owner = await this.signer.getAddress();
    const spender = this.contract.address;

    const allowance = await indexInstance.allowance(owner, spender);
    if (allowance.lt(amount)) throw new InsufficientAllowanceError(spender, amount, allowance.toString());

    const estimatedGas = await this.contract.estimateGas.burnSwapValue(burnParameters);

    return this.contract.burnSwapValue(burnParameters, {
      gasLimit: estimatedGas.mul(105).div(100),
    });
  }

  /**
   * ### Burn Swap Static
   *
   * @param index index address or it's erc20 interface
   * @param amount index amount
   * @param recipient signer's address
   * @param options burn swap options
   *
   * @returns burn swap amount
   */
  async burnSwapStatic(
    index: string,
    amount: string,
    recipient: string,
    outputAsset: string,
    quotes: IIndexRouterV2.BurnQuoteParamsStruct[],
  ): Promise<BigNumber> {
    const indexInstance = ERC20__factory.connect(index, this.signer);
    const burnParameters: IIndexRouterV2.BurnSwapParamsStruct = {
      index,
      amount,
      recipient,
      quotes,
      outputAsset,
    };

    const owner = await this.signer.getAddress();
    const spender = this.contract.address;

    const allowance = await indexInstance.allowance(owner, spender);
    if (allowance.lt(amount)) throw new InsufficientAllowanceError(spender, amount, allowance.toString());

    return this.contract.callStatic.burnSwap(burnParameters);
  }

  /**
   * ### Burn tokens amount view
   *
   * @param index Index token address
   * @param amount index amount
   *
   * @returns burn amount in single token or total from array of tokens
   */
  async burnTokensAmount(
    index: string,
    amount: string,
  ): Promise<{ asset: string; amount: BigNumber; weight: number }[]> {
    const [anatomy, inactiveAnatomy, burnTokensAmounts] = await Promise.all([
      this.getIndexAnatomy(index),
      this.getIndexInactiveAnatomy(index),
      this.contract.burnTokensAmount(index, amount),
    ]);

    return [...anatomy, ...inactiveAnatomy].map((constituent, constituentIndex) => ({
      amount: burnTokensAmounts[constituentIndex] || BigNumber.from(0),
      ...constituent,
    }));
  }

  /**
   * ### Burn amounts static
   *
   * @param index Index token address
   * @param amount index amount
   *
   * @returns burn amount in single token or total from array of tokens
   */
  async burnAmount(index: string, amount: string): Promise<{ asset: string; amount: BigNumber; weight: number }[]> {
    const recipient = await this.signer.getAddress();
    const balanceOfOwnerSlot = keccak256(
      encodeAbiParameters([{ type: "address" }, { type: "uint256" }], [recipient as Address, BALANCE_OF_SLOT]),
    );

    const allowanceOwnerSlot = keccak256(
      encodeAbiParameters([{ type: "address" }, { type: "uint256" }], [recipient as Address, ALLOWANCE_SLOT]),
    );
    const spenderSlot = keccak256(
      encodeAbiParameters(
        [{ type: "address" }, { type: "bytes32" }],
        [this.contract.address as Address, allowanceOwnerSlot],
      ),
    );

    const stateDiff = {
      [index]: {
        stateDiff: {
          [balanceOfOwnerSlot]: pad(toHex(BigNumber.from(amount).toBigInt()), { size: 32 }),
          [spenderSlot]: pad(toHex(BigNumber.from(amount).toBigInt()), { size: 32 }),
        },
      },
    };

    const [anatomy, inactiveAnatomy, rawBurnTokensAmounts] = await Promise.all([
      this.getIndexAnatomy(index),
      this.getIndexInactiveAnatomy(index),
      this.signer.provider.send("eth_call", [
        {
          from: recipient,
          to: this.contract.address,
          data: this.contract.interface.encodeFunctionData("burnWithAmounts", [
            {
              index,
              recipient,
              amount,
            },
          ]),
        },
        "latest",
        stateDiff,
      ]),
    ]);

    const [burnTokensAmounts] = decodeAbiParameters([{ type: "uint[]" }], rawBurnTokensAmounts);

    return [...anatomy, ...inactiveAnatomy].map((constituent, constituentIndex) => ({
      amount: BigNumber.from(burnTokensAmounts[constituentIndex]),
      ...constituent,
    }));
  }

  async getIndexAnatomy(indexToken: string): Promise<Anatomy> {
    const indexTokenInstance = BaseIndex__factory.connect(indexToken, this.signer);
    const { _assets, _weights } = await indexTokenInstance.anatomy();
    return _assets.map((asset, i) => ({ asset, weight: Number(_weights[i]) }));
  }

  async getIndexInactiveAnatomy(indexToken: string): Promise<Anatomy> {
    const indexTokenInstance = BaseIndex__factory.connect(indexToken, this.signer);
    const _assets = await indexTokenInstance.inactiveAnatomy();
    return _assets.map((asset) => ({ asset, weight: 0 }));
  }
}
