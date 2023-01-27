/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "./common";

export interface SavingsVaultViewsInterface extends utils.Interface {
  functions: {
    "BP()": FunctionFragment;
    "getAPY(address)": FunctionFragment;
    "getHighestYieldMarketParameters(address)": FunctionFragment;
    "getMaxDepositedAmount(address)": FunctionFragment;
    "scaleAmount(address,uint256,uint256,uint256)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "BP"
      | "BP()"
      | "getAPY"
      | "getAPY(address)"
      | "getHighestYieldMarketParameters"
      | "getHighestYieldMarketParameters(address)"
      | "getMaxDepositedAmount"
      | "getMaxDepositedAmount(address)"
      | "scaleAmount"
      | "scaleAmount(address,uint256,uint256,uint256)"
  ): FunctionFragment;

  encodeFunctionData(functionFragment: "BP", values?: undefined): string;
  encodeFunctionData(functionFragment: "BP()", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "getAPY",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "getAPY(address)",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "getHighestYieldMarketParameters",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "getHighestYieldMarketParameters(address)",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "getMaxDepositedAmount",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "getMaxDepositedAmount(address)",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "scaleAmount",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "scaleAmount(address,uint256,uint256,uint256)",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;

  decodeFunctionResult(functionFragment: "BP", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "BP()", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getAPY", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getAPY(address)",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getHighestYieldMarketParameters",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getHighestYieldMarketParameters(address)",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getMaxDepositedAmount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getMaxDepositedAmount(address)",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "scaleAmount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "scaleAmount(address,uint256,uint256,uint256)",
    data: BytesLike
  ): Result;

  events: {};
}

export interface SavingsVaultViews extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: SavingsVaultViewsInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    BP(overrides?: CallOverrides): Promise<[number]>;

    "BP()"(overrides?: CallOverrides): Promise<[number]>;

    getAPY(
      _savingsVault: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    "getAPY(address)"(
      _savingsVault: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getHighestYieldMarketParameters(
      _savingsVault: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, number, number, string] & {
        maturity: BigNumber;
        minImpliedRate: number;
        currencyId: number;
        calculationViews: string;
      }
    >;

    "getHighestYieldMarketParameters(address)"(
      _savingsVault: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, number, number, string] & {
        maturity: BigNumber;
        minImpliedRate: number;
        currencyId: number;
        calculationViews: string;
      }
    >;

    getMaxDepositedAmount(
      _savingsVault: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { maxDepositedAmount: BigNumber }>;

    "getMaxDepositedAmount(address)"(
      _savingsVault: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { maxDepositedAmount: BigNumber }>;

    scaleAmount(
      _savingsVault: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      _percentage: PromiseOrValue<BigNumberish>,
      _steps: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    "scaleAmount(address,uint256,uint256,uint256)"(
      _savingsVault: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      _percentage: PromiseOrValue<BigNumberish>,
      _steps: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;
  };

  BP(overrides?: CallOverrides): Promise<number>;

  "BP()"(overrides?: CallOverrides): Promise<number>;

  getAPY(
    _savingsVault: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  "getAPY(address)"(
    _savingsVault: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getHighestYieldMarketParameters(
    _savingsVault: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, number, number, string] & {
      maturity: BigNumber;
      minImpliedRate: number;
      currencyId: number;
      calculationViews: string;
    }
  >;

  "getHighestYieldMarketParameters(address)"(
    _savingsVault: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, number, number, string] & {
      maturity: BigNumber;
      minImpliedRate: number;
      currencyId: number;
      calculationViews: string;
    }
  >;

  getMaxDepositedAmount(
    _savingsVault: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  "getMaxDepositedAmount(address)"(
    _savingsVault: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  scaleAmount(
    _savingsVault: PromiseOrValue<string>,
    _amount: PromiseOrValue<BigNumberish>,
    _percentage: PromiseOrValue<BigNumberish>,
    _steps: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  "scaleAmount(address,uint256,uint256,uint256)"(
    _savingsVault: PromiseOrValue<string>,
    _amount: PromiseOrValue<BigNumberish>,
    _percentage: PromiseOrValue<BigNumberish>,
    _steps: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  callStatic: {
    BP(overrides?: CallOverrides): Promise<number>;

    "BP()"(overrides?: CallOverrides): Promise<number>;

    getAPY(
      _savingsVault: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "getAPY(address)"(
      _savingsVault: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getHighestYieldMarketParameters(
      _savingsVault: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, number, number, string] & {
        maturity: BigNumber;
        minImpliedRate: number;
        currencyId: number;
        calculationViews: string;
      }
    >;

    "getHighestYieldMarketParameters(address)"(
      _savingsVault: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, number, number, string] & {
        maturity: BigNumber;
        minImpliedRate: number;
        currencyId: number;
        calculationViews: string;
      }
    >;

    getMaxDepositedAmount(
      _savingsVault: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "getMaxDepositedAmount(address)"(
      _savingsVault: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    scaleAmount(
      _savingsVault: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      _percentage: PromiseOrValue<BigNumberish>,
      _steps: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "scaleAmount(address,uint256,uint256,uint256)"(
      _savingsVault: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      _percentage: PromiseOrValue<BigNumberish>,
      _steps: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  filters: {};

  estimateGas: {
    BP(overrides?: CallOverrides): Promise<BigNumber>;

    "BP()"(overrides?: CallOverrides): Promise<BigNumber>;

    getAPY(
      _savingsVault: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "getAPY(address)"(
      _savingsVault: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getHighestYieldMarketParameters(
      _savingsVault: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "getHighestYieldMarketParameters(address)"(
      _savingsVault: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getMaxDepositedAmount(
      _savingsVault: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "getMaxDepositedAmount(address)"(
      _savingsVault: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    scaleAmount(
      _savingsVault: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      _percentage: PromiseOrValue<BigNumberish>,
      _steps: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "scaleAmount(address,uint256,uint256,uint256)"(
      _savingsVault: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      _percentage: PromiseOrValue<BigNumberish>,
      _steps: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    BP(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "BP()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getAPY(
      _savingsVault: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "getAPY(address)"(
      _savingsVault: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getHighestYieldMarketParameters(
      _savingsVault: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "getHighestYieldMarketParameters(address)"(
      _savingsVault: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getMaxDepositedAmount(
      _savingsVault: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "getMaxDepositedAmount(address)"(
      _savingsVault: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    scaleAmount(
      _savingsVault: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      _percentage: PromiseOrValue<BigNumberish>,
      _steps: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "scaleAmount(address,uint256,uint256,uint256)"(
      _savingsVault: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      _percentage: PromiseOrValue<BigNumberish>,
      _steps: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
