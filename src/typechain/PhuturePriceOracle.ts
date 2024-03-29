/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "./common";

export interface PhuturePriceOracleInterface extends utils.Interface {
  functions: {
    "base()": FunctionFragment;
    "containsOracleOf(address)": FunctionFragment;
    "convertToIndex(uint256,uint8)": FunctionFragment;
    "initialize(address,address)": FunctionFragment;
    "lastAssetPerBaseInUQ(address)": FunctionFragment;
    "priceOracleOf(address)": FunctionFragment;
    "proxiableUUID()": FunctionFragment;
    "refreshedAssetPerBaseInUQ(address)": FunctionFragment;
    "registry()": FunctionFragment;
    "removeOracleOf(address)": FunctionFragment;
    "setOracleOf(address,address)": FunctionFragment;
    "supportsInterface(bytes4)": FunctionFragment;
    "upgradeTo(address)": FunctionFragment;
    "upgradeToAndCall(address,bytes)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "base"
      | "base()"
      | "containsOracleOf"
      | "containsOracleOf(address)"
      | "convertToIndex"
      | "convertToIndex(uint256,uint8)"
      | "initialize"
      | "initialize(address,address)"
      | "lastAssetPerBaseInUQ"
      | "lastAssetPerBaseInUQ(address)"
      | "priceOracleOf"
      | "priceOracleOf(address)"
      | "proxiableUUID"
      | "proxiableUUID()"
      | "refreshedAssetPerBaseInUQ"
      | "refreshedAssetPerBaseInUQ(address)"
      | "registry"
      | "registry()"
      | "removeOracleOf"
      | "removeOracleOf(address)"
      | "setOracleOf"
      | "setOracleOf(address,address)"
      | "supportsInterface"
      | "supportsInterface(bytes4)"
      | "upgradeTo"
      | "upgradeTo(address)"
      | "upgradeToAndCall"
      | "upgradeToAndCall(address,bytes)"
  ): FunctionFragment;

  encodeFunctionData(functionFragment: "base", values?: undefined): string;
  encodeFunctionData(functionFragment: "base()", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "containsOracleOf",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "containsOracleOf(address)",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "convertToIndex",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "convertToIndex(uint256,uint8)",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "initialize",
    values: [PromiseOrValue<string>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "initialize(address,address)",
    values: [PromiseOrValue<string>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "lastAssetPerBaseInUQ",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "lastAssetPerBaseInUQ(address)",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "priceOracleOf",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "priceOracleOf(address)",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "proxiableUUID",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "proxiableUUID()",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "refreshedAssetPerBaseInUQ",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "refreshedAssetPerBaseInUQ(address)",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(functionFragment: "registry", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "registry()",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "removeOracleOf",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "removeOracleOf(address)",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "setOracleOf",
    values: [PromiseOrValue<string>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "setOracleOf(address,address)",
    values: [PromiseOrValue<string>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "supportsInterface",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "supportsInterface(bytes4)",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "upgradeTo",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "upgradeTo(address)",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "upgradeToAndCall",
    values: [PromiseOrValue<string>, PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "upgradeToAndCall(address,bytes)",
    values: [PromiseOrValue<string>, PromiseOrValue<BytesLike>]
  ): string;

  decodeFunctionResult(functionFragment: "base", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "base()", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "containsOracleOf",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "containsOracleOf(address)",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "convertToIndex",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "convertToIndex(uint256,uint8)",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "initialize(address,address)",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "lastAssetPerBaseInUQ",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "lastAssetPerBaseInUQ(address)",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "priceOracleOf",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "priceOracleOf(address)",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "proxiableUUID",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "proxiableUUID()",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "refreshedAssetPerBaseInUQ",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "refreshedAssetPerBaseInUQ(address)",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "registry", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "registry()", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "removeOracleOf",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "removeOracleOf(address)",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setOracleOf",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setOracleOf(address,address)",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "supportsInterface",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "supportsInterface(bytes4)",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "upgradeTo", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "upgradeTo(address)",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "upgradeToAndCall",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "upgradeToAndCall(address,bytes)",
    data: BytesLike
  ): Result;

  events: {
    "AdminChanged(address,address)": EventFragment;
    "BeaconUpgraded(address)": EventFragment;
    "Initialized(uint8)": EventFragment;
    "Upgraded(address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "AdminChanged"): EventFragment;
  getEvent(
    nameOrSignatureOrTopic: "AdminChanged(address,address)"
  ): EventFragment;
  getEvent(nameOrSignatureOrTopic: "BeaconUpgraded"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "BeaconUpgraded(address)"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Initialized"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Initialized(uint8)"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Upgraded"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Upgraded(address)"): EventFragment;
}

export interface AdminChangedEventObject {
  previousAdmin: string;
  newAdmin: string;
}
export type AdminChangedEvent = TypedEvent<
  [string, string],
  AdminChangedEventObject
>;

export type AdminChangedEventFilter = TypedEventFilter<AdminChangedEvent>;

export interface BeaconUpgradedEventObject {
  beacon: string;
}
export type BeaconUpgradedEvent = TypedEvent<
  [string],
  BeaconUpgradedEventObject
>;

export type BeaconUpgradedEventFilter = TypedEventFilter<BeaconUpgradedEvent>;

export interface InitializedEventObject {
  version: number;
}
export type InitializedEvent = TypedEvent<[number], InitializedEventObject>;

export type InitializedEventFilter = TypedEventFilter<InitializedEvent>;

export interface UpgradedEventObject {
  implementation: string;
}
export type UpgradedEvent = TypedEvent<[string], UpgradedEventObject>;

export type UpgradedEventFilter = TypedEventFilter<UpgradedEvent>;

export interface PhuturePriceOracle extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: PhuturePriceOracleInterface;

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
    base(overrides?: CallOverrides): Promise<[string]>;

    "base()"(overrides?: CallOverrides): Promise<[string]>;

    containsOracleOf(
      _asset: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    "containsOracleOf(address)"(
      _asset: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    convertToIndex(
      _baseAmount: PromiseOrValue<BigNumberish>,
      _indexDecimals: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    "convertToIndex(uint256,uint8)"(
      _baseAmount: PromiseOrValue<BigNumberish>,
      _indexDecimals: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    initialize(
      _registry: PromiseOrValue<string>,
      _base: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    "initialize(address,address)"(
      _registry: PromiseOrValue<string>,
      _base: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    lastAssetPerBaseInUQ(
      _asset: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    "lastAssetPerBaseInUQ(address)"(
      _asset: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    priceOracleOf(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    "priceOracleOf(address)"(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    proxiableUUID(overrides?: CallOverrides): Promise<[string]>;

    "proxiableUUID()"(overrides?: CallOverrides): Promise<[string]>;

    refreshedAssetPerBaseInUQ(
      _asset: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    "refreshedAssetPerBaseInUQ(address)"(
      _asset: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    registry(overrides?: CallOverrides): Promise<[string]>;

    "registry()"(overrides?: CallOverrides): Promise<[string]>;

    removeOracleOf(
      _asset: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    "removeOracleOf(address)"(
      _asset: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setOracleOf(
      _asset: PromiseOrValue<string>,
      _oracle: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    "setOracleOf(address,address)"(
      _asset: PromiseOrValue<string>,
      _oracle: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    supportsInterface(
      _interfaceId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    "supportsInterface(bytes4)"(
      _interfaceId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    upgradeTo(
      newImplementation: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    "upgradeTo(address)"(
      newImplementation: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    upgradeToAndCall(
      newImplementation: PromiseOrValue<string>,
      data: PromiseOrValue<BytesLike>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    "upgradeToAndCall(address,bytes)"(
      newImplementation: PromiseOrValue<string>,
      data: PromiseOrValue<BytesLike>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  base(overrides?: CallOverrides): Promise<string>;

  "base()"(overrides?: CallOverrides): Promise<string>;

  containsOracleOf(
    _asset: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  "containsOracleOf(address)"(
    _asset: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  convertToIndex(
    _baseAmount: PromiseOrValue<BigNumberish>,
    _indexDecimals: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  "convertToIndex(uint256,uint8)"(
    _baseAmount: PromiseOrValue<BigNumberish>,
    _indexDecimals: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  initialize(
    _registry: PromiseOrValue<string>,
    _base: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  "initialize(address,address)"(
    _registry: PromiseOrValue<string>,
    _base: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  lastAssetPerBaseInUQ(
    _asset: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  "lastAssetPerBaseInUQ(address)"(
    _asset: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  priceOracleOf(
    arg0: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<string>;

  "priceOracleOf(address)"(
    arg0: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<string>;

  proxiableUUID(overrides?: CallOverrides): Promise<string>;

  "proxiableUUID()"(overrides?: CallOverrides): Promise<string>;

  refreshedAssetPerBaseInUQ(
    _asset: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  "refreshedAssetPerBaseInUQ(address)"(
    _asset: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  registry(overrides?: CallOverrides): Promise<string>;

  "registry()"(overrides?: CallOverrides): Promise<string>;

  removeOracleOf(
    _asset: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  "removeOracleOf(address)"(
    _asset: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setOracleOf(
    _asset: PromiseOrValue<string>,
    _oracle: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  "setOracleOf(address,address)"(
    _asset: PromiseOrValue<string>,
    _oracle: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  supportsInterface(
    _interfaceId: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  "supportsInterface(bytes4)"(
    _interfaceId: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  upgradeTo(
    newImplementation: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  "upgradeTo(address)"(
    newImplementation: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  upgradeToAndCall(
    newImplementation: PromiseOrValue<string>,
    data: PromiseOrValue<BytesLike>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  "upgradeToAndCall(address,bytes)"(
    newImplementation: PromiseOrValue<string>,
    data: PromiseOrValue<BytesLike>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    base(overrides?: CallOverrides): Promise<string>;

    "base()"(overrides?: CallOverrides): Promise<string>;

    containsOracleOf(
      _asset: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    "containsOracleOf(address)"(
      _asset: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    convertToIndex(
      _baseAmount: PromiseOrValue<BigNumberish>,
      _indexDecimals: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "convertToIndex(uint256,uint8)"(
      _baseAmount: PromiseOrValue<BigNumberish>,
      _indexDecimals: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    initialize(
      _registry: PromiseOrValue<string>,
      _base: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    "initialize(address,address)"(
      _registry: PromiseOrValue<string>,
      _base: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    lastAssetPerBaseInUQ(
      _asset: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "lastAssetPerBaseInUQ(address)"(
      _asset: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    priceOracleOf(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<string>;

    "priceOracleOf(address)"(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<string>;

    proxiableUUID(overrides?: CallOverrides): Promise<string>;

    "proxiableUUID()"(overrides?: CallOverrides): Promise<string>;

    refreshedAssetPerBaseInUQ(
      _asset: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "refreshedAssetPerBaseInUQ(address)"(
      _asset: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    registry(overrides?: CallOverrides): Promise<string>;

    "registry()"(overrides?: CallOverrides): Promise<string>;

    removeOracleOf(
      _asset: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    "removeOracleOf(address)"(
      _asset: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    setOracleOf(
      _asset: PromiseOrValue<string>,
      _oracle: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    "setOracleOf(address,address)"(
      _asset: PromiseOrValue<string>,
      _oracle: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    supportsInterface(
      _interfaceId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    "supportsInterface(bytes4)"(
      _interfaceId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    upgradeTo(
      newImplementation: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    "upgradeTo(address)"(
      newImplementation: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    upgradeToAndCall(
      newImplementation: PromiseOrValue<string>,
      data: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<void>;

    "upgradeToAndCall(address,bytes)"(
      newImplementation: PromiseOrValue<string>,
      data: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "AdminChanged(address,address)"(
      previousAdmin?: null,
      newAdmin?: null
    ): AdminChangedEventFilter;
    AdminChanged(
      previousAdmin?: null,
      newAdmin?: null
    ): AdminChangedEventFilter;

    "BeaconUpgraded(address)"(
      beacon?: PromiseOrValue<string> | null
    ): BeaconUpgradedEventFilter;
    BeaconUpgraded(
      beacon?: PromiseOrValue<string> | null
    ): BeaconUpgradedEventFilter;

    "Initialized(uint8)"(version?: null): InitializedEventFilter;
    Initialized(version?: null): InitializedEventFilter;

    "Upgraded(address)"(
      implementation?: PromiseOrValue<string> | null
    ): UpgradedEventFilter;
    Upgraded(
      implementation?: PromiseOrValue<string> | null
    ): UpgradedEventFilter;
  };

  estimateGas: {
    base(overrides?: CallOverrides): Promise<BigNumber>;

    "base()"(overrides?: CallOverrides): Promise<BigNumber>;

    containsOracleOf(
      _asset: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "containsOracleOf(address)"(
      _asset: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    convertToIndex(
      _baseAmount: PromiseOrValue<BigNumberish>,
      _indexDecimals: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "convertToIndex(uint256,uint8)"(
      _baseAmount: PromiseOrValue<BigNumberish>,
      _indexDecimals: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    initialize(
      _registry: PromiseOrValue<string>,
      _base: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    "initialize(address,address)"(
      _registry: PromiseOrValue<string>,
      _base: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    lastAssetPerBaseInUQ(
      _asset: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "lastAssetPerBaseInUQ(address)"(
      _asset: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    priceOracleOf(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "priceOracleOf(address)"(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    proxiableUUID(overrides?: CallOverrides): Promise<BigNumber>;

    "proxiableUUID()"(overrides?: CallOverrides): Promise<BigNumber>;

    refreshedAssetPerBaseInUQ(
      _asset: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    "refreshedAssetPerBaseInUQ(address)"(
      _asset: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    registry(overrides?: CallOverrides): Promise<BigNumber>;

    "registry()"(overrides?: CallOverrides): Promise<BigNumber>;

    removeOracleOf(
      _asset: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    "removeOracleOf(address)"(
      _asset: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setOracleOf(
      _asset: PromiseOrValue<string>,
      _oracle: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    "setOracleOf(address,address)"(
      _asset: PromiseOrValue<string>,
      _oracle: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    supportsInterface(
      _interfaceId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "supportsInterface(bytes4)"(
      _interfaceId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    upgradeTo(
      newImplementation: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    "upgradeTo(address)"(
      newImplementation: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    upgradeToAndCall(
      newImplementation: PromiseOrValue<string>,
      data: PromiseOrValue<BytesLike>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    "upgradeToAndCall(address,bytes)"(
      newImplementation: PromiseOrValue<string>,
      data: PromiseOrValue<BytesLike>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    base(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "base()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    containsOracleOf(
      _asset: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "containsOracleOf(address)"(
      _asset: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    convertToIndex(
      _baseAmount: PromiseOrValue<BigNumberish>,
      _indexDecimals: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "convertToIndex(uint256,uint8)"(
      _baseAmount: PromiseOrValue<BigNumberish>,
      _indexDecimals: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    initialize(
      _registry: PromiseOrValue<string>,
      _base: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    "initialize(address,address)"(
      _registry: PromiseOrValue<string>,
      _base: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    lastAssetPerBaseInUQ(
      _asset: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "lastAssetPerBaseInUQ(address)"(
      _asset: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    priceOracleOf(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "priceOracleOf(address)"(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    proxiableUUID(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "proxiableUUID()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    refreshedAssetPerBaseInUQ(
      _asset: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    "refreshedAssetPerBaseInUQ(address)"(
      _asset: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    registry(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "registry()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    removeOracleOf(
      _asset: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    "removeOracleOf(address)"(
      _asset: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setOracleOf(
      _asset: PromiseOrValue<string>,
      _oracle: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    "setOracleOf(address,address)"(
      _asset: PromiseOrValue<string>,
      _oracle: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    supportsInterface(
      _interfaceId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "supportsInterface(bytes4)"(
      _interfaceId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    upgradeTo(
      newImplementation: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    "upgradeTo(address)"(
      newImplementation: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    upgradeToAndCall(
      newImplementation: PromiseOrValue<string>,
      data: PromiseOrValue<BytesLike>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    "upgradeToAndCall(address,bytes)"(
      newImplementation: PromiseOrValue<string>,
      data: PromiseOrValue<BytesLike>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
