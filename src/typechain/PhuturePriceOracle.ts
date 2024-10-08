import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  OnEvent,
  PromiseOrValue,
  TypedEvent,
  TypedEventFilter,
  TypedListener,
} from "./common";

export interface PhuturePriceOracleInterface extends utils.Interface {
  functions: {
    "refreshedAssetPerBaseInUQ(address)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic: "refreshedAssetPerBaseInUQ" | "refreshedAssetPerBaseInUQ(address)",
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "refreshedAssetPerBaseInUQ",
    values: [PromiseOrValue<string>],
  ): string;
  encodeFunctionData(
    functionFragment: "refreshedAssetPerBaseInUQ(address)",
    values: [PromiseOrValue<string>],
  ): string;

  decodeFunctionResult(functionFragment: "refreshedAssetPerBaseInUQ", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "refreshedAssetPerBaseInUQ(address)",
    data: BytesLike,
  ): Result;

  events: {};
}

export interface PhuturePriceOracle extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: PhuturePriceOracleInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined,
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>,
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(eventFilter: TypedEventFilter<TEvent>): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    refreshedAssetPerBaseInUQ(
      _asset: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<ContractTransaction>;

    "refreshedAssetPerBaseInUQ(address)"(
      _asset: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<ContractTransaction>;
  };

  refreshedAssetPerBaseInUQ(
    _asset: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> },
  ): Promise<ContractTransaction>;

  "refreshedAssetPerBaseInUQ(address)"(
    _asset: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> },
  ): Promise<ContractTransaction>;

  callStatic: {
    refreshedAssetPerBaseInUQ(
      _asset: PromiseOrValue<string>,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;

    "refreshedAssetPerBaseInUQ(address)"(
      _asset: PromiseOrValue<string>,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
  };

  filters: {};

  estimateGas: {
    refreshedAssetPerBaseInUQ(
      _asset: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<BigNumber>;

    "refreshedAssetPerBaseInUQ(address)"(
      _asset: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    refreshedAssetPerBaseInUQ(
      _asset: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<PopulatedTransaction>;

    "refreshedAssetPerBaseInUQ(address)"(
      _asset: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<PopulatedTransaction>;
  };
}
