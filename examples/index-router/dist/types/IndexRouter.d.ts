import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PayableOverrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";
export declare namespace IIndexRouter {
    type BurnParamsStruct = {
        index: string;
        amount: BigNumberish;
        recipient: string;
    };
    type BurnParamsStructOutput = [string, BigNumber, string] & {
        index: string;
        amount: BigNumber;
        recipient: string;
    };
    type BurnQuoteParamsStruct = {
        swapTarget: string;
        buyAssetMinAmount: BigNumberish;
        assetQuote: BytesLike;
    };
    type BurnQuoteParamsStructOutput = [string, BigNumber, string] & {
        swapTarget: string;
        buyAssetMinAmount: BigNumber;
        assetQuote: string;
    };
    type BurnSwapParamsStruct = {
        index: string;
        amount: BigNumberish;
        outputAsset: string;
        recipient: string;
        quotes: IIndexRouter.BurnQuoteParamsStruct[];
    };
    type BurnSwapParamsStructOutput = [
        string,
        BigNumber,
        string,
        string,
        IIndexRouter.BurnQuoteParamsStructOutput[]
    ] & {
        index: string;
        amount: BigNumber;
        outputAsset: string;
        recipient: string;
        quotes: IIndexRouter.BurnQuoteParamsStructOutput[];
    };
    type MintParamsStruct = {
        index: string;
        amountInBase: BigNumberish;
        recipient: string;
    };
    type MintParamsStructOutput = [string, BigNumber, string] & {
        index: string;
        amountInBase: BigNumber;
        recipient: string;
    };
    type MintQuoteParamsStruct = {
        asset: string;
        swapTarget: string;
        buyAssetMinAmount: BigNumberish;
        assetQuote: BytesLike;
    };
    type MintQuoteParamsStructOutput = [
        string,
        string,
        BigNumber,
        string
    ] & {
        asset: string;
        swapTarget: string;
        buyAssetMinAmount: BigNumber;
        assetQuote: string;
    };
    type MintSwapParamsStruct = {
        index: string;
        inputToken: string;
        amountInInputToken: BigNumberish;
        recipient: string;
        quotes: IIndexRouter.MintQuoteParamsStruct[];
    };
    type MintSwapParamsStructOutput = [
        string,
        string,
        BigNumber,
        string,
        IIndexRouter.MintQuoteParamsStructOutput[]
    ] & {
        index: string;
        inputToken: string;
        amountInInputToken: BigNumber;
        recipient: string;
        quotes: IIndexRouter.MintQuoteParamsStructOutput[];
    };
    type MintSwapValueParamsStruct = {
        index: string;
        recipient: string;
        quotes: IIndexRouter.MintQuoteParamsStruct[];
    };
    type MintSwapValueParamsStructOutput = [
        string,
        string,
        IIndexRouter.MintQuoteParamsStructOutput[]
    ] & {
        index: string;
        recipient: string;
        quotes: IIndexRouter.MintQuoteParamsStructOutput[];
    };
}
export interface IndexRouterInterface extends utils.Interface {
    functions: {
        "WETH()": FunctionFragment;
        "burn((address,uint256,address))": FunctionFragment;
        "burnSwap((address,uint256,address,address,(address,uint256,bytes)[]))": FunctionFragment;
        "burnSwapValue((address,uint256,address,address,(address,uint256,bytes)[]))": FunctionFragment;
        "burnSwapValueWithPermit((address,uint256,address,address,(address,uint256,bytes)[]),uint256,uint8,bytes32,bytes32)": FunctionFragment;
        "burnSwapWithPermit((address,uint256,address,address,(address,uint256,bytes)[]),uint256,uint8,bytes32,bytes32)": FunctionFragment;
        "burnTokensAmount(address,uint256)": FunctionFragment;
        "burnWithPermit((address,uint256,address),uint256,uint8,bytes32,bytes32)": FunctionFragment;
        "initialize(address,address)": FunctionFragment;
        "mint((address,uint256,address))": FunctionFragment;
        "mintSwap((address,address,uint256,address,(address,address,uint256,bytes)[]))": FunctionFragment;
        "mintSwapIndexAmount((address,address,uint256,address,(address,address,uint256,bytes)[]))": FunctionFragment;
        "mintSwapValue((address,address,(address,address,uint256,bytes)[]))": FunctionFragment;
        "mintSwapWithPermit((address,address,uint256,address,(address,address,uint256,bytes)[]),uint256,uint8,bytes32,bytes32)": FunctionFragment;
        "proxiableUUID()": FunctionFragment;
        "registry()": FunctionFragment;
        "upgradeTo(address)": FunctionFragment;
        "upgradeToAndCall(address,bytes)": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "WETH" | "burn" | "burnSwap" | "burnSwapValue" | "burnSwapValueWithPermit" | "burnSwapWithPermit" | "burnTokensAmount" | "burnWithPermit" | "initialize" | "mint" | "mintSwap" | "mintSwapIndexAmount" | "mintSwapValue" | "mintSwapWithPermit" | "proxiableUUID" | "registry" | "upgradeTo" | "upgradeToAndCall"): FunctionFragment;
    encodeFunctionData(functionFragment: "WETH", values?: undefined): string;
    encodeFunctionData(functionFragment: "burn", values: [IIndexRouter.BurnParamsStruct]): string;
    encodeFunctionData(functionFragment: "burnSwap", values: [IIndexRouter.BurnSwapParamsStruct]): string;
    encodeFunctionData(functionFragment: "burnSwapValue", values: [IIndexRouter.BurnSwapParamsStruct]): string;
    encodeFunctionData(functionFragment: "burnSwapValueWithPermit", values: [
        IIndexRouter.BurnSwapParamsStruct,
        BigNumberish,
        BigNumberish,
        BytesLike,
        BytesLike
    ]): string;
    encodeFunctionData(functionFragment: "burnSwapWithPermit", values: [
        IIndexRouter.BurnSwapParamsStruct,
        BigNumberish,
        BigNumberish,
        BytesLike,
        BytesLike
    ]): string;
    encodeFunctionData(functionFragment: "burnTokensAmount", values: [string, BigNumberish]): string;
    encodeFunctionData(functionFragment: "burnWithPermit", values: [
        IIndexRouter.BurnParamsStruct,
        BigNumberish,
        BigNumberish,
        BytesLike,
        BytesLike
    ]): string;
    encodeFunctionData(functionFragment: "initialize", values: [string, string]): string;
    encodeFunctionData(functionFragment: "mint", values: [IIndexRouter.MintParamsStruct]): string;
    encodeFunctionData(functionFragment: "mintSwap", values: [IIndexRouter.MintSwapParamsStruct]): string;
    encodeFunctionData(functionFragment: "mintSwapIndexAmount", values: [IIndexRouter.MintSwapParamsStruct]): string;
    encodeFunctionData(functionFragment: "mintSwapValue", values: [IIndexRouter.MintSwapValueParamsStruct]): string;
    encodeFunctionData(functionFragment: "mintSwapWithPermit", values: [
        IIndexRouter.MintSwapParamsStruct,
        BigNumberish,
        BigNumberish,
        BytesLike,
        BytesLike
    ]): string;
    encodeFunctionData(functionFragment: "proxiableUUID", values?: undefined): string;
    encodeFunctionData(functionFragment: "registry", values?: undefined): string;
    encodeFunctionData(functionFragment: "upgradeTo", values: [string]): string;
    encodeFunctionData(functionFragment: "upgradeToAndCall", values: [string, BytesLike]): string;
    decodeFunctionResult(functionFragment: "WETH", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "burn", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "burnSwap", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "burnSwapValue", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "burnSwapValueWithPermit", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "burnSwapWithPermit", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "burnTokensAmount", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "burnWithPermit", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "mint", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "mintSwap", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "mintSwapIndexAmount", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "mintSwapValue", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "mintSwapWithPermit", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "proxiableUUID", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "registry", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "upgradeTo", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "upgradeToAndCall", data: BytesLike): Result;
    events: {
        "AdminChanged(address,address)": EventFragment;
        "BeaconUpgraded(address)": EventFragment;
        "Initialized(uint8)": EventFragment;
        "Upgraded(address)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "AdminChanged"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "BeaconUpgraded"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "Initialized"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "Upgraded"): EventFragment;
}
export interface AdminChangedEventObject {
    previousAdmin: string;
    newAdmin: string;
}
export declare type AdminChangedEvent = TypedEvent<[
    string,
    string
], AdminChangedEventObject>;
export declare type AdminChangedEventFilter = TypedEventFilter<AdminChangedEvent>;
export interface BeaconUpgradedEventObject {
    beacon: string;
}
export declare type BeaconUpgradedEvent = TypedEvent<[
    string
], BeaconUpgradedEventObject>;
export declare type BeaconUpgradedEventFilter = TypedEventFilter<BeaconUpgradedEvent>;
export interface InitializedEventObject {
    version: number;
}
export declare type InitializedEvent = TypedEvent<[number], InitializedEventObject>;
export declare type InitializedEventFilter = TypedEventFilter<InitializedEvent>;
export interface UpgradedEventObject {
    implementation: string;
}
export declare type UpgradedEvent = TypedEvent<[string], UpgradedEventObject>;
export declare type UpgradedEventFilter = TypedEventFilter<UpgradedEvent>;
export interface IndexRouter extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: IndexRouterInterface;
    queryFilter<TEvent extends TypedEvent>(event: TypedEventFilter<TEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TEvent>>;
    listeners<TEvent extends TypedEvent>(eventFilter?: TypedEventFilter<TEvent>): Array<TypedListener<TEvent>>;
    listeners(eventName?: string): Array<Listener>;
    removeAllListeners<TEvent extends TypedEvent>(eventFilter: TypedEventFilter<TEvent>): this;
    removeAllListeners(eventName?: string): this;
    off: OnEvent<this>;
    on: OnEvent<this>;
    once: OnEvent<this>;
    removeListener: OnEvent<this>;
    functions: {
        WETH(overrides?: CallOverrides): Promise<[string]>;
        burn(_params: IIndexRouter.BurnParamsStruct, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        burnSwap(_params: IIndexRouter.BurnSwapParamsStruct, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        burnSwapValue(_params: IIndexRouter.BurnSwapParamsStruct, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        burnSwapValueWithPermit(_params: IIndexRouter.BurnSwapParamsStruct, _deadline: BigNumberish, _v: BigNumberish, _r: BytesLike, _s: BytesLike, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        burnSwapWithPermit(_params: IIndexRouter.BurnSwapParamsStruct, _deadline: BigNumberish, _v: BigNumberish, _r: BytesLike, _s: BytesLike, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        burnTokensAmount(_index: string, _amount: BigNumberish, overrides?: CallOverrides): Promise<[BigNumber[]] & {
            _amounts: BigNumber[];
        }>;
        burnWithPermit(_params: IIndexRouter.BurnParamsStruct, _deadline: BigNumberish, _v: BigNumberish, _r: BytesLike, _s: BytesLike, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        initialize(_WETH: string, _registry: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        mint(_params: IIndexRouter.MintParamsStruct, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        mintSwap(_params: IIndexRouter.MintSwapParamsStruct, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        mintSwapIndexAmount(_params: IIndexRouter.MintSwapParamsStruct, overrides?: CallOverrides): Promise<[BigNumber] & {
            _amount: BigNumber;
        }>;
        mintSwapValue(_params: IIndexRouter.MintSwapValueParamsStruct, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        mintSwapWithPermit(_params: IIndexRouter.MintSwapParamsStruct, _deadline: BigNumberish, _v: BigNumberish, _r: BytesLike, _s: BytesLike, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        proxiableUUID(overrides?: CallOverrides): Promise<[string]>;
        registry(overrides?: CallOverrides): Promise<[string]>;
        upgradeTo(newImplementation: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        upgradeToAndCall(newImplementation: string, data: BytesLike, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
    };
    WETH(overrides?: CallOverrides): Promise<string>;
    burn(_params: IIndexRouter.BurnParamsStruct, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    burnSwap(_params: IIndexRouter.BurnSwapParamsStruct, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    burnSwapValue(_params: IIndexRouter.BurnSwapParamsStruct, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    burnSwapValueWithPermit(_params: IIndexRouter.BurnSwapParamsStruct, _deadline: BigNumberish, _v: BigNumberish, _r: BytesLike, _s: BytesLike, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    burnSwapWithPermit(_params: IIndexRouter.BurnSwapParamsStruct, _deadline: BigNumberish, _v: BigNumberish, _r: BytesLike, _s: BytesLike, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    burnTokensAmount(_index: string, _amount: BigNumberish, overrides?: CallOverrides): Promise<BigNumber[]>;
    burnWithPermit(_params: IIndexRouter.BurnParamsStruct, _deadline: BigNumberish, _v: BigNumberish, _r: BytesLike, _s: BytesLike, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    initialize(_WETH: string, _registry: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    mint(_params: IIndexRouter.MintParamsStruct, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    mintSwap(_params: IIndexRouter.MintSwapParamsStruct, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    mintSwapIndexAmount(_params: IIndexRouter.MintSwapParamsStruct, overrides?: CallOverrides): Promise<BigNumber>;
    mintSwapValue(_params: IIndexRouter.MintSwapValueParamsStruct, overrides?: PayableOverrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    mintSwapWithPermit(_params: IIndexRouter.MintSwapParamsStruct, _deadline: BigNumberish, _v: BigNumberish, _r: BytesLike, _s: BytesLike, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    proxiableUUID(overrides?: CallOverrides): Promise<string>;
    registry(overrides?: CallOverrides): Promise<string>;
    upgradeTo(newImplementation: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    upgradeToAndCall(newImplementation: string, data: BytesLike, overrides?: PayableOverrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        WETH(overrides?: CallOverrides): Promise<string>;
        burn(_params: IIndexRouter.BurnParamsStruct, overrides?: CallOverrides): Promise<void>;
        burnSwap(_params: IIndexRouter.BurnSwapParamsStruct, overrides?: CallOverrides): Promise<void>;
        burnSwapValue(_params: IIndexRouter.BurnSwapParamsStruct, overrides?: CallOverrides): Promise<void>;
        burnSwapValueWithPermit(_params: IIndexRouter.BurnSwapParamsStruct, _deadline: BigNumberish, _v: BigNumberish, _r: BytesLike, _s: BytesLike, overrides?: CallOverrides): Promise<void>;
        burnSwapWithPermit(_params: IIndexRouter.BurnSwapParamsStruct, _deadline: BigNumberish, _v: BigNumberish, _r: BytesLike, _s: BytesLike, overrides?: CallOverrides): Promise<void>;
        burnTokensAmount(_index: string, _amount: BigNumberish, overrides?: CallOverrides): Promise<BigNumber[]>;
        burnWithPermit(_params: IIndexRouter.BurnParamsStruct, _deadline: BigNumberish, _v: BigNumberish, _r: BytesLike, _s: BytesLike, overrides?: CallOverrides): Promise<void>;
        initialize(_WETH: string, _registry: string, overrides?: CallOverrides): Promise<void>;
        mint(_params: IIndexRouter.MintParamsStruct, overrides?: CallOverrides): Promise<void>;
        mintSwap(_params: IIndexRouter.MintSwapParamsStruct, overrides?: CallOverrides): Promise<void>;
        mintSwapIndexAmount(_params: IIndexRouter.MintSwapParamsStruct, overrides?: CallOverrides): Promise<BigNumber>;
        mintSwapValue(_params: IIndexRouter.MintSwapValueParamsStruct, overrides?: CallOverrides): Promise<void>;
        mintSwapWithPermit(_params: IIndexRouter.MintSwapParamsStruct, _deadline: BigNumberish, _v: BigNumberish, _r: BytesLike, _s: BytesLike, overrides?: CallOverrides): Promise<void>;
        proxiableUUID(overrides?: CallOverrides): Promise<string>;
        registry(overrides?: CallOverrides): Promise<string>;
        upgradeTo(newImplementation: string, overrides?: CallOverrides): Promise<void>;
        upgradeToAndCall(newImplementation: string, data: BytesLike, overrides?: CallOverrides): Promise<void>;
    };
    filters: {
        "AdminChanged(address,address)"(previousAdmin?: null, newAdmin?: null): AdminChangedEventFilter;
        AdminChanged(previousAdmin?: null, newAdmin?: null): AdminChangedEventFilter;
        "BeaconUpgraded(address)"(beacon?: string | null): BeaconUpgradedEventFilter;
        BeaconUpgraded(beacon?: string | null): BeaconUpgradedEventFilter;
        "Initialized(uint8)"(version?: null): InitializedEventFilter;
        Initialized(version?: null): InitializedEventFilter;
        "Upgraded(address)"(implementation?: string | null): UpgradedEventFilter;
        Upgraded(implementation?: string | null): UpgradedEventFilter;
    };
    estimateGas: {
        WETH(overrides?: CallOverrides): Promise<BigNumber>;
        burn(_params: IIndexRouter.BurnParamsStruct, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        burnSwap(_params: IIndexRouter.BurnSwapParamsStruct, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        burnSwapValue(_params: IIndexRouter.BurnSwapParamsStruct, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        burnSwapValueWithPermit(_params: IIndexRouter.BurnSwapParamsStruct, _deadline: BigNumberish, _v: BigNumberish, _r: BytesLike, _s: BytesLike, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        burnSwapWithPermit(_params: IIndexRouter.BurnSwapParamsStruct, _deadline: BigNumberish, _v: BigNumberish, _r: BytesLike, _s: BytesLike, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        burnTokensAmount(_index: string, _amount: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        burnWithPermit(_params: IIndexRouter.BurnParamsStruct, _deadline: BigNumberish, _v: BigNumberish, _r: BytesLike, _s: BytesLike, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        initialize(_WETH: string, _registry: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        mint(_params: IIndexRouter.MintParamsStruct, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        mintSwap(_params: IIndexRouter.MintSwapParamsStruct, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        mintSwapIndexAmount(_params: IIndexRouter.MintSwapParamsStruct, overrides?: CallOverrides): Promise<BigNumber>;
        mintSwapValue(_params: IIndexRouter.MintSwapValueParamsStruct, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        mintSwapWithPermit(_params: IIndexRouter.MintSwapParamsStruct, _deadline: BigNumberish, _v: BigNumberish, _r: BytesLike, _s: BytesLike, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        proxiableUUID(overrides?: CallOverrides): Promise<BigNumber>;
        registry(overrides?: CallOverrides): Promise<BigNumber>;
        upgradeTo(newImplementation: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        upgradeToAndCall(newImplementation: string, data: BytesLike, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        WETH(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        burn(_params: IIndexRouter.BurnParamsStruct, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        burnSwap(_params: IIndexRouter.BurnSwapParamsStruct, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        burnSwapValue(_params: IIndexRouter.BurnSwapParamsStruct, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        burnSwapValueWithPermit(_params: IIndexRouter.BurnSwapParamsStruct, _deadline: BigNumberish, _v: BigNumberish, _r: BytesLike, _s: BytesLike, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        burnSwapWithPermit(_params: IIndexRouter.BurnSwapParamsStruct, _deadline: BigNumberish, _v: BigNumberish, _r: BytesLike, _s: BytesLike, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        burnTokensAmount(_index: string, _amount: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        burnWithPermit(_params: IIndexRouter.BurnParamsStruct, _deadline: BigNumberish, _v: BigNumberish, _r: BytesLike, _s: BytesLike, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        initialize(_WETH: string, _registry: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        mint(_params: IIndexRouter.MintParamsStruct, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        mintSwap(_params: IIndexRouter.MintSwapParamsStruct, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        mintSwapIndexAmount(_params: IIndexRouter.MintSwapParamsStruct, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        mintSwapValue(_params: IIndexRouter.MintSwapValueParamsStruct, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        mintSwapWithPermit(_params: IIndexRouter.MintSwapParamsStruct, _deadline: BigNumberish, _v: BigNumberish, _r: BytesLike, _s: BytesLike, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        proxiableUUID(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        registry(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        upgradeTo(newImplementation: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        upgradeToAndCall(newImplementation: string, data: BytesLike, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
    };
}
