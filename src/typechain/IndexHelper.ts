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

export interface IndexHelperInterface extends utils.Interface {
  functions: {
    "totalEvaluation(address)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic: "totalEvaluation" | "totalEvaluation(address)",
  ): FunctionFragment;

  encodeFunctionData(functionFragment: "totalEvaluation", values: [PromiseOrValue<string>]): string;
  encodeFunctionData(
    functionFragment: "totalEvaluation(address)",
    values: [PromiseOrValue<string>],
  ): string;

  decodeFunctionResult(functionFragment: "totalEvaluation", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "totalEvaluation(address)", data: BytesLike): Result;

  events: {};
}

export interface IndexHelper extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IndexHelperInterface;

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
    totalEvaluation(
      _index: PromiseOrValue<string>,
      overrides?: CallOverrides,
    ): Promise<
      [BigNumber, BigNumber] & {
        _totalEvaluation: BigNumber;
        _indexPriceInBase: BigNumber;
      }
    >;

    "totalEvaluation(address)"(
      _index: PromiseOrValue<string>,
      overrides?: CallOverrides,
    ): Promise<
      [BigNumber, BigNumber] & {
        _totalEvaluation: BigNumber;
        _indexPriceInBase: BigNumber;
      }
    >;
  };

  totalEvaluation(
    _index: PromiseOrValue<string>,
    overrides?: CallOverrides,
  ): Promise<
    [BigNumber, BigNumber] & {
      _totalEvaluation: BigNumber;
      _indexPriceInBase: BigNumber;
    }
  >;

  "totalEvaluation(address)"(
    _index: PromiseOrValue<string>,
    overrides?: CallOverrides,
  ): Promise<
    [BigNumber, BigNumber] & {
      _totalEvaluation: BigNumber;
      _indexPriceInBase: BigNumber;
    }
  >;

  callStatic: {
    totalEvaluation(
      _index: PromiseOrValue<string>,
      overrides?: CallOverrides,
    ): Promise<
      [BigNumber, BigNumber] & {
        _totalEvaluation: BigNumber;
        _indexPriceInBase: BigNumber;
      }
    >;

    "totalEvaluation(address)"(
      _index: PromiseOrValue<string>,
      overrides?: CallOverrides,
    ): Promise<
      [BigNumber, BigNumber] & {
        _totalEvaluation: BigNumber;
        _indexPriceInBase: BigNumber;
      }
    >;
  };

  filters: {};

  estimateGas: {
    totalEvaluation(_index: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;

    "totalEvaluation(address)"(
      _index: PromiseOrValue<string>,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    totalEvaluation(
      _index: PromiseOrValue<string>,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;

    "totalEvaluation(address)"(
      _index: PromiseOrValue<string>,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
  };
}
