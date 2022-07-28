import { FieldPolicy, FieldReadFunction, TypePolicies, TypePolicy } from '@apollo/client/cache';
export declare type Maybe<T> = T | null;
export declare type InputMaybe<T> = Maybe<T>;
export declare type Exact<T extends {
    [key: string]: unknown;
}> = {
    [K in keyof T]: T[K];
};
export declare type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]?: Maybe<T[SubKey]>;
};
export declare type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export declare type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
    BigDecimal: any;
    BigInt: any;
    Bytes: any;
};
export declare type Asset = {
    __typename?: 'Asset';
    _indexes: Array<Scalars['ID']>;
    _vTokens: Array<Scalars['ID']>;
    basePrice: Scalars['BigDecimal'];
    basePriceSushi: Scalars['BigDecimal'];
    basePriceUni: Scalars['BigDecimal'];
    dailyStats: Array<DailyAssetStat>;
    decimals: Scalars['BigInt'];
    /** Address (hash) */
    id: Scalars['ID'];
    indexCount: Scalars['BigInt'];
    indexes: Array<IndexAsset>;
    isWhitelisted: Scalars['Boolean'];
    marketCap: Scalars['BigInt'];
    name: Scalars['String'];
    pairsAsAsset0: Array<Pair>;
    pairsAsAsset1: Array<Pair>;
    symbol: Scalars['String'];
    totalSupply: Scalars['BigInt'];
    vTokens: Array<VToken>;
    vaultBaseReserve: Scalars['BigDecimal'];
    vaultReserve: Scalars['BigDecimal'];
};
export declare type AssetDailyStatsArgs = {
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<DailyAssetStat_OrderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    where?: InputMaybe<DailyAssetStat_Filter>;
};
export declare type AssetIndexesArgs = {
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<IndexAsset_OrderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    where?: InputMaybe<IndexAsset_Filter>;
};
export declare type AssetPairsAsAsset0Args = {
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<Pair_OrderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    where?: InputMaybe<Pair_Filter>;
};
export declare type AssetPairsAsAsset1Args = {
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<Pair_OrderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    where?: InputMaybe<Pair_Filter>;
};
export declare type AssetVTokensArgs = {
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<VToken_OrderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    where?: InputMaybe<VToken_Filter>;
};
export declare type Asset_Filter = {
    /** Filter for the block changed event. */
    _change_block?: InputMaybe<BlockChangedFilter>;
    _indexes?: InputMaybe<Array<Scalars['ID']>>;
    _indexes_contains?: InputMaybe<Array<Scalars['ID']>>;
    _indexes_contains_nocase?: InputMaybe<Array<Scalars['ID']>>;
    _indexes_not?: InputMaybe<Array<Scalars['ID']>>;
    _indexes_not_contains?: InputMaybe<Array<Scalars['ID']>>;
    _indexes_not_contains_nocase?: InputMaybe<Array<Scalars['ID']>>;
    _vTokens?: InputMaybe<Array<Scalars['ID']>>;
    _vTokens_contains?: InputMaybe<Array<Scalars['ID']>>;
    _vTokens_contains_nocase?: InputMaybe<Array<Scalars['ID']>>;
    _vTokens_not?: InputMaybe<Array<Scalars['ID']>>;
    _vTokens_not_contains?: InputMaybe<Array<Scalars['ID']>>;
    _vTokens_not_contains_nocase?: InputMaybe<Array<Scalars['ID']>>;
    basePrice?: InputMaybe<Scalars['BigDecimal']>;
    basePriceSushi?: InputMaybe<Scalars['BigDecimal']>;
    basePriceSushi_gt?: InputMaybe<Scalars['BigDecimal']>;
    basePriceSushi_gte?: InputMaybe<Scalars['BigDecimal']>;
    basePriceSushi_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    basePriceSushi_lt?: InputMaybe<Scalars['BigDecimal']>;
    basePriceSushi_lte?: InputMaybe<Scalars['BigDecimal']>;
    basePriceSushi_not?: InputMaybe<Scalars['BigDecimal']>;
    basePriceSushi_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    basePriceUni?: InputMaybe<Scalars['BigDecimal']>;
    basePriceUni_gt?: InputMaybe<Scalars['BigDecimal']>;
    basePriceUni_gte?: InputMaybe<Scalars['BigDecimal']>;
    basePriceUni_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    basePriceUni_lt?: InputMaybe<Scalars['BigDecimal']>;
    basePriceUni_lte?: InputMaybe<Scalars['BigDecimal']>;
    basePriceUni_not?: InputMaybe<Scalars['BigDecimal']>;
    basePriceUni_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    basePrice_gt?: InputMaybe<Scalars['BigDecimal']>;
    basePrice_gte?: InputMaybe<Scalars['BigDecimal']>;
    basePrice_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    basePrice_lt?: InputMaybe<Scalars['BigDecimal']>;
    basePrice_lte?: InputMaybe<Scalars['BigDecimal']>;
    basePrice_not?: InputMaybe<Scalars['BigDecimal']>;
    basePrice_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    dailyStats_?: InputMaybe<DailyAssetStat_Filter>;
    decimals?: InputMaybe<Scalars['BigInt']>;
    decimals_gt?: InputMaybe<Scalars['BigInt']>;
    decimals_gte?: InputMaybe<Scalars['BigInt']>;
    decimals_in?: InputMaybe<Array<Scalars['BigInt']>>;
    decimals_lt?: InputMaybe<Scalars['BigInt']>;
    decimals_lte?: InputMaybe<Scalars['BigInt']>;
    decimals_not?: InputMaybe<Scalars['BigInt']>;
    decimals_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    id?: InputMaybe<Scalars['ID']>;
    id_gt?: InputMaybe<Scalars['ID']>;
    id_gte?: InputMaybe<Scalars['ID']>;
    id_in?: InputMaybe<Array<Scalars['ID']>>;
    id_lt?: InputMaybe<Scalars['ID']>;
    id_lte?: InputMaybe<Scalars['ID']>;
    id_not?: InputMaybe<Scalars['ID']>;
    id_not_in?: InputMaybe<Array<Scalars['ID']>>;
    indexCount?: InputMaybe<Scalars['BigInt']>;
    indexCount_gt?: InputMaybe<Scalars['BigInt']>;
    indexCount_gte?: InputMaybe<Scalars['BigInt']>;
    indexCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
    indexCount_lt?: InputMaybe<Scalars['BigInt']>;
    indexCount_lte?: InputMaybe<Scalars['BigInt']>;
    indexCount_not?: InputMaybe<Scalars['BigInt']>;
    indexCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    indexes_?: InputMaybe<IndexAsset_Filter>;
    isWhitelisted?: InputMaybe<Scalars['Boolean']>;
    isWhitelisted_in?: InputMaybe<Array<Scalars['Boolean']>>;
    isWhitelisted_not?: InputMaybe<Scalars['Boolean']>;
    isWhitelisted_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
    marketCap?: InputMaybe<Scalars['BigInt']>;
    marketCap_gt?: InputMaybe<Scalars['BigInt']>;
    marketCap_gte?: InputMaybe<Scalars['BigInt']>;
    marketCap_in?: InputMaybe<Array<Scalars['BigInt']>>;
    marketCap_lt?: InputMaybe<Scalars['BigInt']>;
    marketCap_lte?: InputMaybe<Scalars['BigInt']>;
    marketCap_not?: InputMaybe<Scalars['BigInt']>;
    marketCap_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    name?: InputMaybe<Scalars['String']>;
    name_contains?: InputMaybe<Scalars['String']>;
    name_contains_nocase?: InputMaybe<Scalars['String']>;
    name_ends_with?: InputMaybe<Scalars['String']>;
    name_ends_with_nocase?: InputMaybe<Scalars['String']>;
    name_gt?: InputMaybe<Scalars['String']>;
    name_gte?: InputMaybe<Scalars['String']>;
    name_in?: InputMaybe<Array<Scalars['String']>>;
    name_lt?: InputMaybe<Scalars['String']>;
    name_lte?: InputMaybe<Scalars['String']>;
    name_not?: InputMaybe<Scalars['String']>;
    name_not_contains?: InputMaybe<Scalars['String']>;
    name_not_contains_nocase?: InputMaybe<Scalars['String']>;
    name_not_ends_with?: InputMaybe<Scalars['String']>;
    name_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
    name_not_in?: InputMaybe<Array<Scalars['String']>>;
    name_not_starts_with?: InputMaybe<Scalars['String']>;
    name_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
    name_starts_with?: InputMaybe<Scalars['String']>;
    name_starts_with_nocase?: InputMaybe<Scalars['String']>;
    pairsAsAsset0_?: InputMaybe<Pair_Filter>;
    pairsAsAsset1_?: InputMaybe<Pair_Filter>;
    symbol?: InputMaybe<Scalars['String']>;
    symbol_contains?: InputMaybe<Scalars['String']>;
    symbol_contains_nocase?: InputMaybe<Scalars['String']>;
    symbol_ends_with?: InputMaybe<Scalars['String']>;
    symbol_ends_with_nocase?: InputMaybe<Scalars['String']>;
    symbol_gt?: InputMaybe<Scalars['String']>;
    symbol_gte?: InputMaybe<Scalars['String']>;
    symbol_in?: InputMaybe<Array<Scalars['String']>>;
    symbol_lt?: InputMaybe<Scalars['String']>;
    symbol_lte?: InputMaybe<Scalars['String']>;
    symbol_not?: InputMaybe<Scalars['String']>;
    symbol_not_contains?: InputMaybe<Scalars['String']>;
    symbol_not_contains_nocase?: InputMaybe<Scalars['String']>;
    symbol_not_ends_with?: InputMaybe<Scalars['String']>;
    symbol_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
    symbol_not_in?: InputMaybe<Array<Scalars['String']>>;
    symbol_not_starts_with?: InputMaybe<Scalars['String']>;
    symbol_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
    symbol_starts_with?: InputMaybe<Scalars['String']>;
    symbol_starts_with_nocase?: InputMaybe<Scalars['String']>;
    totalSupply?: InputMaybe<Scalars['BigInt']>;
    totalSupply_gt?: InputMaybe<Scalars['BigInt']>;
    totalSupply_gte?: InputMaybe<Scalars['BigInt']>;
    totalSupply_in?: InputMaybe<Array<Scalars['BigInt']>>;
    totalSupply_lt?: InputMaybe<Scalars['BigInt']>;
    totalSupply_lte?: InputMaybe<Scalars['BigInt']>;
    totalSupply_not?: InputMaybe<Scalars['BigInt']>;
    totalSupply_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    vTokens_?: InputMaybe<VToken_Filter>;
    vaultBaseReserve?: InputMaybe<Scalars['BigDecimal']>;
    vaultBaseReserve_gt?: InputMaybe<Scalars['BigDecimal']>;
    vaultBaseReserve_gte?: InputMaybe<Scalars['BigDecimal']>;
    vaultBaseReserve_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    vaultBaseReserve_lt?: InputMaybe<Scalars['BigDecimal']>;
    vaultBaseReserve_lte?: InputMaybe<Scalars['BigDecimal']>;
    vaultBaseReserve_not?: InputMaybe<Scalars['BigDecimal']>;
    vaultBaseReserve_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    vaultReserve?: InputMaybe<Scalars['BigDecimal']>;
    vaultReserve_gt?: InputMaybe<Scalars['BigDecimal']>;
    vaultReserve_gte?: InputMaybe<Scalars['BigDecimal']>;
    vaultReserve_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    vaultReserve_lt?: InputMaybe<Scalars['BigDecimal']>;
    vaultReserve_lte?: InputMaybe<Scalars['BigDecimal']>;
    vaultReserve_not?: InputMaybe<Scalars['BigDecimal']>;
    vaultReserve_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
};
export declare enum Asset_OrderBy {
    _indexes = "_indexes",
    _vTokens = "_vTokens",
    basePrice = "basePrice",
    basePriceSushi = "basePriceSushi",
    basePriceUni = "basePriceUni",
    dailyStats = "dailyStats",
    decimals = "decimals",
    id = "id",
    indexCount = "indexCount",
    indexes = "indexes",
    isWhitelisted = "isWhitelisted",
    marketCap = "marketCap",
    name = "name",
    pairsAsAsset0 = "pairsAsAsset0",
    pairsAsAsset1 = "pairsAsAsset1",
    symbol = "symbol",
    totalSupply = "totalSupply",
    vTokens = "vTokens",
    vaultBaseReserve = "vaultBaseReserve",
    vaultReserve = "vaultReserve"
}
export declare type BlockChangedFilter = {
    number_gte: Scalars['Int'];
};
export declare type Block_Height = {
    hash?: InputMaybe<Scalars['Bytes']>;
    number?: InputMaybe<Scalars['Int']>;
    number_gte?: InputMaybe<Scalars['Int']>;
};
export declare type ChainLinkAgg = {
    __typename?: 'ChainLinkAgg';
    answer: Scalars['BigInt'];
    asset: Asset;
    decimals: Scalars['BigInt'];
    description: Scalars['String'];
    id: Scalars['ID'];
    nextAgg?: Maybe<ChainLinkAgg>;
    updatedAt: Scalars['BigInt'];
};
export declare type ChainLinkAgg_Filter = {
    /** Filter for the block changed event. */
    _change_block?: InputMaybe<BlockChangedFilter>;
    answer?: InputMaybe<Scalars['BigInt']>;
    answer_gt?: InputMaybe<Scalars['BigInt']>;
    answer_gte?: InputMaybe<Scalars['BigInt']>;
    answer_in?: InputMaybe<Array<Scalars['BigInt']>>;
    answer_lt?: InputMaybe<Scalars['BigInt']>;
    answer_lte?: InputMaybe<Scalars['BigInt']>;
    answer_not?: InputMaybe<Scalars['BigInt']>;
    answer_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    asset?: InputMaybe<Scalars['String']>;
    asset_?: InputMaybe<Asset_Filter>;
    asset_contains?: InputMaybe<Scalars['String']>;
    asset_contains_nocase?: InputMaybe<Scalars['String']>;
    asset_ends_with?: InputMaybe<Scalars['String']>;
    asset_ends_with_nocase?: InputMaybe<Scalars['String']>;
    asset_gt?: InputMaybe<Scalars['String']>;
    asset_gte?: InputMaybe<Scalars['String']>;
    asset_in?: InputMaybe<Array<Scalars['String']>>;
    asset_lt?: InputMaybe<Scalars['String']>;
    asset_lte?: InputMaybe<Scalars['String']>;
    asset_not?: InputMaybe<Scalars['String']>;
    asset_not_contains?: InputMaybe<Scalars['String']>;
    asset_not_contains_nocase?: InputMaybe<Scalars['String']>;
    asset_not_ends_with?: InputMaybe<Scalars['String']>;
    asset_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
    asset_not_in?: InputMaybe<Array<Scalars['String']>>;
    asset_not_starts_with?: InputMaybe<Scalars['String']>;
    asset_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
    asset_starts_with?: InputMaybe<Scalars['String']>;
    asset_starts_with_nocase?: InputMaybe<Scalars['String']>;
    decimals?: InputMaybe<Scalars['BigInt']>;
    decimals_gt?: InputMaybe<Scalars['BigInt']>;
    decimals_gte?: InputMaybe<Scalars['BigInt']>;
    decimals_in?: InputMaybe<Array<Scalars['BigInt']>>;
    decimals_lt?: InputMaybe<Scalars['BigInt']>;
    decimals_lte?: InputMaybe<Scalars['BigInt']>;
    decimals_not?: InputMaybe<Scalars['BigInt']>;
    decimals_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    description?: InputMaybe<Scalars['String']>;
    description_contains?: InputMaybe<Scalars['String']>;
    description_contains_nocase?: InputMaybe<Scalars['String']>;
    description_ends_with?: InputMaybe<Scalars['String']>;
    description_ends_with_nocase?: InputMaybe<Scalars['String']>;
    description_gt?: InputMaybe<Scalars['String']>;
    description_gte?: InputMaybe<Scalars['String']>;
    description_in?: InputMaybe<Array<Scalars['String']>>;
    description_lt?: InputMaybe<Scalars['String']>;
    description_lte?: InputMaybe<Scalars['String']>;
    description_not?: InputMaybe<Scalars['String']>;
    description_not_contains?: InputMaybe<Scalars['String']>;
    description_not_contains_nocase?: InputMaybe<Scalars['String']>;
    description_not_ends_with?: InputMaybe<Scalars['String']>;
    description_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
    description_not_in?: InputMaybe<Array<Scalars['String']>>;
    description_not_starts_with?: InputMaybe<Scalars['String']>;
    description_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
    description_starts_with?: InputMaybe<Scalars['String']>;
    description_starts_with_nocase?: InputMaybe<Scalars['String']>;
    id?: InputMaybe<Scalars['ID']>;
    id_gt?: InputMaybe<Scalars['ID']>;
    id_gte?: InputMaybe<Scalars['ID']>;
    id_in?: InputMaybe<Array<Scalars['ID']>>;
    id_lt?: InputMaybe<Scalars['ID']>;
    id_lte?: InputMaybe<Scalars['ID']>;
    id_not?: InputMaybe<Scalars['ID']>;
    id_not_in?: InputMaybe<Array<Scalars['ID']>>;
    nextAgg?: InputMaybe<Scalars['String']>;
    nextAgg_?: InputMaybe<ChainLinkAgg_Filter>;
    nextAgg_contains?: InputMaybe<Scalars['String']>;
    nextAgg_contains_nocase?: InputMaybe<Scalars['String']>;
    nextAgg_ends_with?: InputMaybe<Scalars['String']>;
    nextAgg_ends_with_nocase?: InputMaybe<Scalars['String']>;
    nextAgg_gt?: InputMaybe<Scalars['String']>;
    nextAgg_gte?: InputMaybe<Scalars['String']>;
    nextAgg_in?: InputMaybe<Array<Scalars['String']>>;
    nextAgg_lt?: InputMaybe<Scalars['String']>;
    nextAgg_lte?: InputMaybe<Scalars['String']>;
    nextAgg_not?: InputMaybe<Scalars['String']>;
    nextAgg_not_contains?: InputMaybe<Scalars['String']>;
    nextAgg_not_contains_nocase?: InputMaybe<Scalars['String']>;
    nextAgg_not_ends_with?: InputMaybe<Scalars['String']>;
    nextAgg_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
    nextAgg_not_in?: InputMaybe<Array<Scalars['String']>>;
    nextAgg_not_starts_with?: InputMaybe<Scalars['String']>;
    nextAgg_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
    nextAgg_starts_with?: InputMaybe<Scalars['String']>;
    nextAgg_starts_with_nocase?: InputMaybe<Scalars['String']>;
    updatedAt?: InputMaybe<Scalars['BigInt']>;
    updatedAt_gt?: InputMaybe<Scalars['BigInt']>;
    updatedAt_gte?: InputMaybe<Scalars['BigInt']>;
    updatedAt_in?: InputMaybe<Array<Scalars['BigInt']>>;
    updatedAt_lt?: InputMaybe<Scalars['BigInt']>;
    updatedAt_lte?: InputMaybe<Scalars['BigInt']>;
    updatedAt_not?: InputMaybe<Scalars['BigInt']>;
    updatedAt_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};
export declare enum ChainLinkAgg_OrderBy {
    answer = "answer",
    asset = "asset",
    decimals = "decimals",
    description = "description",
    id = "id",
    nextAgg = "nextAgg",
    updatedAt = "updatedAt"
}
export declare type Dex = {
    __typename?: 'DEX';
    id: Scalars['ID'];
    router: Scalars['String'];
    type: Scalars['String'];
};
export declare type Dex_Filter = {
    /** Filter for the block changed event. */
    _change_block?: InputMaybe<BlockChangedFilter>;
    id?: InputMaybe<Scalars['ID']>;
    id_gt?: InputMaybe<Scalars['ID']>;
    id_gte?: InputMaybe<Scalars['ID']>;
    id_in?: InputMaybe<Array<Scalars['ID']>>;
    id_lt?: InputMaybe<Scalars['ID']>;
    id_lte?: InputMaybe<Scalars['ID']>;
    id_not?: InputMaybe<Scalars['ID']>;
    id_not_in?: InputMaybe<Array<Scalars['ID']>>;
    router?: InputMaybe<Scalars['String']>;
    router_contains?: InputMaybe<Scalars['String']>;
    router_contains_nocase?: InputMaybe<Scalars['String']>;
    router_ends_with?: InputMaybe<Scalars['String']>;
    router_ends_with_nocase?: InputMaybe<Scalars['String']>;
    router_gt?: InputMaybe<Scalars['String']>;
    router_gte?: InputMaybe<Scalars['String']>;
    router_in?: InputMaybe<Array<Scalars['String']>>;
    router_lt?: InputMaybe<Scalars['String']>;
    router_lte?: InputMaybe<Scalars['String']>;
    router_not?: InputMaybe<Scalars['String']>;
    router_not_contains?: InputMaybe<Scalars['String']>;
    router_not_contains_nocase?: InputMaybe<Scalars['String']>;
    router_not_ends_with?: InputMaybe<Scalars['String']>;
    router_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
    router_not_in?: InputMaybe<Array<Scalars['String']>>;
    router_not_starts_with?: InputMaybe<Scalars['String']>;
    router_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
    router_starts_with?: InputMaybe<Scalars['String']>;
    router_starts_with_nocase?: InputMaybe<Scalars['String']>;
    type?: InputMaybe<Scalars['String']>;
    type_contains?: InputMaybe<Scalars['String']>;
    type_contains_nocase?: InputMaybe<Scalars['String']>;
    type_ends_with?: InputMaybe<Scalars['String']>;
    type_ends_with_nocase?: InputMaybe<Scalars['String']>;
    type_gt?: InputMaybe<Scalars['String']>;
    type_gte?: InputMaybe<Scalars['String']>;
    type_in?: InputMaybe<Array<Scalars['String']>>;
    type_lt?: InputMaybe<Scalars['String']>;
    type_lte?: InputMaybe<Scalars['String']>;
    type_not?: InputMaybe<Scalars['String']>;
    type_not_contains?: InputMaybe<Scalars['String']>;
    type_not_contains_nocase?: InputMaybe<Scalars['String']>;
    type_not_ends_with?: InputMaybe<Scalars['String']>;
    type_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
    type_not_in?: InputMaybe<Array<Scalars['String']>>;
    type_not_starts_with?: InputMaybe<Scalars['String']>;
    type_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
    type_starts_with?: InputMaybe<Scalars['String']>;
    type_starts_with_nocase?: InputMaybe<Scalars['String']>;
};
export declare enum Dex_OrderBy {
    id = "id",
    router = "router",
    type = "type"
}
export declare type DailyAssetStat = {
    __typename?: 'DailyAssetStat';
    asset: Asset;
    basePrice: Scalars['BigDecimal'];
    date: Scalars['Int'];
    id: Scalars['ID'];
    vaultBaseReserve: Scalars['BigDecimal'];
    vaultReserve: Scalars['BigDecimal'];
};
export declare type DailyAssetStat_Filter = {
    /** Filter for the block changed event. */
    _change_block?: InputMaybe<BlockChangedFilter>;
    asset?: InputMaybe<Scalars['String']>;
    asset_?: InputMaybe<Asset_Filter>;
    asset_contains?: InputMaybe<Scalars['String']>;
    asset_contains_nocase?: InputMaybe<Scalars['String']>;
    asset_ends_with?: InputMaybe<Scalars['String']>;
    asset_ends_with_nocase?: InputMaybe<Scalars['String']>;
    asset_gt?: InputMaybe<Scalars['String']>;
    asset_gte?: InputMaybe<Scalars['String']>;
    asset_in?: InputMaybe<Array<Scalars['String']>>;
    asset_lt?: InputMaybe<Scalars['String']>;
    asset_lte?: InputMaybe<Scalars['String']>;
    asset_not?: InputMaybe<Scalars['String']>;
    asset_not_contains?: InputMaybe<Scalars['String']>;
    asset_not_contains_nocase?: InputMaybe<Scalars['String']>;
    asset_not_ends_with?: InputMaybe<Scalars['String']>;
    asset_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
    asset_not_in?: InputMaybe<Array<Scalars['String']>>;
    asset_not_starts_with?: InputMaybe<Scalars['String']>;
    asset_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
    asset_starts_with?: InputMaybe<Scalars['String']>;
    asset_starts_with_nocase?: InputMaybe<Scalars['String']>;
    basePrice?: InputMaybe<Scalars['BigDecimal']>;
    basePrice_gt?: InputMaybe<Scalars['BigDecimal']>;
    basePrice_gte?: InputMaybe<Scalars['BigDecimal']>;
    basePrice_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    basePrice_lt?: InputMaybe<Scalars['BigDecimal']>;
    basePrice_lte?: InputMaybe<Scalars['BigDecimal']>;
    basePrice_not?: InputMaybe<Scalars['BigDecimal']>;
    basePrice_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    date?: InputMaybe<Scalars['Int']>;
    date_gt?: InputMaybe<Scalars['Int']>;
    date_gte?: InputMaybe<Scalars['Int']>;
    date_in?: InputMaybe<Array<Scalars['Int']>>;
    date_lt?: InputMaybe<Scalars['Int']>;
    date_lte?: InputMaybe<Scalars['Int']>;
    date_not?: InputMaybe<Scalars['Int']>;
    date_not_in?: InputMaybe<Array<Scalars['Int']>>;
    id?: InputMaybe<Scalars['ID']>;
    id_gt?: InputMaybe<Scalars['ID']>;
    id_gte?: InputMaybe<Scalars['ID']>;
    id_in?: InputMaybe<Array<Scalars['ID']>>;
    id_lt?: InputMaybe<Scalars['ID']>;
    id_lte?: InputMaybe<Scalars['ID']>;
    id_not?: InputMaybe<Scalars['ID']>;
    id_not_in?: InputMaybe<Array<Scalars['ID']>>;
    vaultBaseReserve?: InputMaybe<Scalars['BigDecimal']>;
    vaultBaseReserve_gt?: InputMaybe<Scalars['BigDecimal']>;
    vaultBaseReserve_gte?: InputMaybe<Scalars['BigDecimal']>;
    vaultBaseReserve_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    vaultBaseReserve_lt?: InputMaybe<Scalars['BigDecimal']>;
    vaultBaseReserve_lte?: InputMaybe<Scalars['BigDecimal']>;
    vaultBaseReserve_not?: InputMaybe<Scalars['BigDecimal']>;
    vaultBaseReserve_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    vaultReserve?: InputMaybe<Scalars['BigDecimal']>;
    vaultReserve_gt?: InputMaybe<Scalars['BigDecimal']>;
    vaultReserve_gte?: InputMaybe<Scalars['BigDecimal']>;
    vaultReserve_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    vaultReserve_lt?: InputMaybe<Scalars['BigDecimal']>;
    vaultReserve_lte?: InputMaybe<Scalars['BigDecimal']>;
    vaultReserve_not?: InputMaybe<Scalars['BigDecimal']>;
    vaultReserve_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
};
export declare enum DailyAssetStat_OrderBy {
    asset = "asset",
    basePrice = "basePrice",
    date = "date",
    id = "id",
    vaultBaseReserve = "vaultBaseReserve",
    vaultReserve = "vaultReserve"
}
export declare type DailyCapitalization = {
    __typename?: 'DailyCapitalization';
    /** price of the index in the day */
    basePrice: Scalars['BigDecimal'];
    /** capitalisation for the specific day */
    capitalization: Scalars['BigDecimal'];
    id: Scalars['ID'];
    /** index referred to daily capitalisation metrics */
    index: Index;
    /** log index value taken from event which triggered storing the metric */
    logIndex: Scalars['BigInt'];
    /** raw timestamp of the specific day */
    timestamp: Scalars['BigInt'];
    /** total supply of the index in specific */
    totalSupply: Scalars['BigInt'];
};
export declare type DailyCapitalization_Filter = {
    /** Filter for the block changed event. */
    _change_block?: InputMaybe<BlockChangedFilter>;
    basePrice?: InputMaybe<Scalars['BigDecimal']>;
    basePrice_gt?: InputMaybe<Scalars['BigDecimal']>;
    basePrice_gte?: InputMaybe<Scalars['BigDecimal']>;
    basePrice_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    basePrice_lt?: InputMaybe<Scalars['BigDecimal']>;
    basePrice_lte?: InputMaybe<Scalars['BigDecimal']>;
    basePrice_not?: InputMaybe<Scalars['BigDecimal']>;
    basePrice_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    capitalization?: InputMaybe<Scalars['BigDecimal']>;
    capitalization_gt?: InputMaybe<Scalars['BigDecimal']>;
    capitalization_gte?: InputMaybe<Scalars['BigDecimal']>;
    capitalization_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    capitalization_lt?: InputMaybe<Scalars['BigDecimal']>;
    capitalization_lte?: InputMaybe<Scalars['BigDecimal']>;
    capitalization_not?: InputMaybe<Scalars['BigDecimal']>;
    capitalization_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    id?: InputMaybe<Scalars['ID']>;
    id_gt?: InputMaybe<Scalars['ID']>;
    id_gte?: InputMaybe<Scalars['ID']>;
    id_in?: InputMaybe<Array<Scalars['ID']>>;
    id_lt?: InputMaybe<Scalars['ID']>;
    id_lte?: InputMaybe<Scalars['ID']>;
    id_not?: InputMaybe<Scalars['ID']>;
    id_not_in?: InputMaybe<Array<Scalars['ID']>>;
    index?: InputMaybe<Scalars['String']>;
    index_?: InputMaybe<Index_Filter>;
    index_contains?: InputMaybe<Scalars['String']>;
    index_contains_nocase?: InputMaybe<Scalars['String']>;
    index_ends_with?: InputMaybe<Scalars['String']>;
    index_ends_with_nocase?: InputMaybe<Scalars['String']>;
    index_gt?: InputMaybe<Scalars['String']>;
    index_gte?: InputMaybe<Scalars['String']>;
    index_in?: InputMaybe<Array<Scalars['String']>>;
    index_lt?: InputMaybe<Scalars['String']>;
    index_lte?: InputMaybe<Scalars['String']>;
    index_not?: InputMaybe<Scalars['String']>;
    index_not_contains?: InputMaybe<Scalars['String']>;
    index_not_contains_nocase?: InputMaybe<Scalars['String']>;
    index_not_ends_with?: InputMaybe<Scalars['String']>;
    index_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
    index_not_in?: InputMaybe<Array<Scalars['String']>>;
    index_not_starts_with?: InputMaybe<Scalars['String']>;
    index_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
    index_starts_with?: InputMaybe<Scalars['String']>;
    index_starts_with_nocase?: InputMaybe<Scalars['String']>;
    logIndex?: InputMaybe<Scalars['BigInt']>;
    logIndex_gt?: InputMaybe<Scalars['BigInt']>;
    logIndex_gte?: InputMaybe<Scalars['BigInt']>;
    logIndex_in?: InputMaybe<Array<Scalars['BigInt']>>;
    logIndex_lt?: InputMaybe<Scalars['BigInt']>;
    logIndex_lte?: InputMaybe<Scalars['BigInt']>;
    logIndex_not?: InputMaybe<Scalars['BigInt']>;
    logIndex_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    timestamp?: InputMaybe<Scalars['BigInt']>;
    timestamp_gt?: InputMaybe<Scalars['BigInt']>;
    timestamp_gte?: InputMaybe<Scalars['BigInt']>;
    timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
    timestamp_lt?: InputMaybe<Scalars['BigInt']>;
    timestamp_lte?: InputMaybe<Scalars['BigInt']>;
    timestamp_not?: InputMaybe<Scalars['BigInt']>;
    timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    totalSupply?: InputMaybe<Scalars['BigInt']>;
    totalSupply_gt?: InputMaybe<Scalars['BigInt']>;
    totalSupply_gte?: InputMaybe<Scalars['BigInt']>;
    totalSupply_in?: InputMaybe<Array<Scalars['BigInt']>>;
    totalSupply_lt?: InputMaybe<Scalars['BigInt']>;
    totalSupply_lte?: InputMaybe<Scalars['BigInt']>;
    totalSupply_not?: InputMaybe<Scalars['BigInt']>;
    totalSupply_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};
export declare enum DailyCapitalization_OrderBy {
    basePrice = "basePrice",
    capitalization = "capitalization",
    id = "id",
    index = "index",
    logIndex = "logIndex",
    timestamp = "timestamp",
    totalSupply = "totalSupply"
}
export declare type DailyIndexStat = {
    __typename?: 'DailyIndexStat';
    /** price of the index in USD */
    basePrice: Scalars['BigDecimal'];
    /** price of the index in ETH */
    basePriceETH: Scalars['BigDecimal'];
    baseVolume: Scalars['BigDecimal'];
    date: Scalars['Int'];
    id: Scalars['ID'];
    index: Index;
    marketCap: Scalars['BigDecimal'];
    uniqueHolders: Scalars['BigInt'];
};
export declare type DailyIndexStat_Filter = {
    /** Filter for the block changed event. */
    _change_block?: InputMaybe<BlockChangedFilter>;
    basePrice?: InputMaybe<Scalars['BigDecimal']>;
    basePriceETH?: InputMaybe<Scalars['BigDecimal']>;
    basePriceETH_gt?: InputMaybe<Scalars['BigDecimal']>;
    basePriceETH_gte?: InputMaybe<Scalars['BigDecimal']>;
    basePriceETH_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    basePriceETH_lt?: InputMaybe<Scalars['BigDecimal']>;
    basePriceETH_lte?: InputMaybe<Scalars['BigDecimal']>;
    basePriceETH_not?: InputMaybe<Scalars['BigDecimal']>;
    basePriceETH_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    basePrice_gt?: InputMaybe<Scalars['BigDecimal']>;
    basePrice_gte?: InputMaybe<Scalars['BigDecimal']>;
    basePrice_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    basePrice_lt?: InputMaybe<Scalars['BigDecimal']>;
    basePrice_lte?: InputMaybe<Scalars['BigDecimal']>;
    basePrice_not?: InputMaybe<Scalars['BigDecimal']>;
    basePrice_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    baseVolume?: InputMaybe<Scalars['BigDecimal']>;
    baseVolume_gt?: InputMaybe<Scalars['BigDecimal']>;
    baseVolume_gte?: InputMaybe<Scalars['BigDecimal']>;
    baseVolume_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    baseVolume_lt?: InputMaybe<Scalars['BigDecimal']>;
    baseVolume_lte?: InputMaybe<Scalars['BigDecimal']>;
    baseVolume_not?: InputMaybe<Scalars['BigDecimal']>;
    baseVolume_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    date?: InputMaybe<Scalars['Int']>;
    date_gt?: InputMaybe<Scalars['Int']>;
    date_gte?: InputMaybe<Scalars['Int']>;
    date_in?: InputMaybe<Array<Scalars['Int']>>;
    date_lt?: InputMaybe<Scalars['Int']>;
    date_lte?: InputMaybe<Scalars['Int']>;
    date_not?: InputMaybe<Scalars['Int']>;
    date_not_in?: InputMaybe<Array<Scalars['Int']>>;
    id?: InputMaybe<Scalars['ID']>;
    id_gt?: InputMaybe<Scalars['ID']>;
    id_gte?: InputMaybe<Scalars['ID']>;
    id_in?: InputMaybe<Array<Scalars['ID']>>;
    id_lt?: InputMaybe<Scalars['ID']>;
    id_lte?: InputMaybe<Scalars['ID']>;
    id_not?: InputMaybe<Scalars['ID']>;
    id_not_in?: InputMaybe<Array<Scalars['ID']>>;
    index?: InputMaybe<Scalars['String']>;
    index_?: InputMaybe<Index_Filter>;
    index_contains?: InputMaybe<Scalars['String']>;
    index_contains_nocase?: InputMaybe<Scalars['String']>;
    index_ends_with?: InputMaybe<Scalars['String']>;
    index_ends_with_nocase?: InputMaybe<Scalars['String']>;
    index_gt?: InputMaybe<Scalars['String']>;
    index_gte?: InputMaybe<Scalars['String']>;
    index_in?: InputMaybe<Array<Scalars['String']>>;
    index_lt?: InputMaybe<Scalars['String']>;
    index_lte?: InputMaybe<Scalars['String']>;
    index_not?: InputMaybe<Scalars['String']>;
    index_not_contains?: InputMaybe<Scalars['String']>;
    index_not_contains_nocase?: InputMaybe<Scalars['String']>;
    index_not_ends_with?: InputMaybe<Scalars['String']>;
    index_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
    index_not_in?: InputMaybe<Array<Scalars['String']>>;
    index_not_starts_with?: InputMaybe<Scalars['String']>;
    index_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
    index_starts_with?: InputMaybe<Scalars['String']>;
    index_starts_with_nocase?: InputMaybe<Scalars['String']>;
    marketCap?: InputMaybe<Scalars['BigDecimal']>;
    marketCap_gt?: InputMaybe<Scalars['BigDecimal']>;
    marketCap_gte?: InputMaybe<Scalars['BigDecimal']>;
    marketCap_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    marketCap_lt?: InputMaybe<Scalars['BigDecimal']>;
    marketCap_lte?: InputMaybe<Scalars['BigDecimal']>;
    marketCap_not?: InputMaybe<Scalars['BigDecimal']>;
    marketCap_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    uniqueHolders?: InputMaybe<Scalars['BigInt']>;
    uniqueHolders_gt?: InputMaybe<Scalars['BigInt']>;
    uniqueHolders_gte?: InputMaybe<Scalars['BigInt']>;
    uniqueHolders_in?: InputMaybe<Array<Scalars['BigInt']>>;
    uniqueHolders_lt?: InputMaybe<Scalars['BigInt']>;
    uniqueHolders_lte?: InputMaybe<Scalars['BigInt']>;
    uniqueHolders_not?: InputMaybe<Scalars['BigInt']>;
    uniqueHolders_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};
export declare enum DailyIndexStat_OrderBy {
    basePrice = "basePrice",
    basePriceETH = "basePriceETH",
    baseVolume = "baseVolume",
    date = "date",
    id = "id",
    index = "index",
    marketCap = "marketCap",
    uniqueHolders = "uniqueHolders"
}
export declare type DailyStat = {
    __typename?: 'DailyStat';
    date: Scalars['Int'];
    id: Scalars['ID'];
    indexCount: Scalars['BigInt'];
    totalValueLocked: Scalars['BigDecimal'];
};
export declare type DailyStat_Filter = {
    /** Filter for the block changed event. */
    _change_block?: InputMaybe<BlockChangedFilter>;
    date?: InputMaybe<Scalars['Int']>;
    date_gt?: InputMaybe<Scalars['Int']>;
    date_gte?: InputMaybe<Scalars['Int']>;
    date_in?: InputMaybe<Array<Scalars['Int']>>;
    date_lt?: InputMaybe<Scalars['Int']>;
    date_lte?: InputMaybe<Scalars['Int']>;
    date_not?: InputMaybe<Scalars['Int']>;
    date_not_in?: InputMaybe<Array<Scalars['Int']>>;
    id?: InputMaybe<Scalars['ID']>;
    id_gt?: InputMaybe<Scalars['ID']>;
    id_gte?: InputMaybe<Scalars['ID']>;
    id_in?: InputMaybe<Array<Scalars['ID']>>;
    id_lt?: InputMaybe<Scalars['ID']>;
    id_lte?: InputMaybe<Scalars['ID']>;
    id_not?: InputMaybe<Scalars['ID']>;
    id_not_in?: InputMaybe<Array<Scalars['ID']>>;
    indexCount?: InputMaybe<Scalars['BigInt']>;
    indexCount_gt?: InputMaybe<Scalars['BigInt']>;
    indexCount_gte?: InputMaybe<Scalars['BigInt']>;
    indexCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
    indexCount_lt?: InputMaybe<Scalars['BigInt']>;
    indexCount_lte?: InputMaybe<Scalars['BigInt']>;
    indexCount_not?: InputMaybe<Scalars['BigInt']>;
    indexCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    totalValueLocked?: InputMaybe<Scalars['BigDecimal']>;
    totalValueLocked_gt?: InputMaybe<Scalars['BigDecimal']>;
    totalValueLocked_gte?: InputMaybe<Scalars['BigDecimal']>;
    totalValueLocked_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    totalValueLocked_lt?: InputMaybe<Scalars['BigDecimal']>;
    totalValueLocked_lte?: InputMaybe<Scalars['BigDecimal']>;
    totalValueLocked_not?: InputMaybe<Scalars['BigDecimal']>;
    totalValueLocked_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
};
export declare enum DailyStat_OrderBy {
    date = "date",
    id = "id",
    indexCount = "indexCount",
    totalValueLocked = "totalValueLocked"
}
export declare type DailyUserIndexHistory = {
    __typename?: 'DailyUserIndexHistory';
    avgBalance: Scalars['BigDecimal'];
    avgCapitalization: Scalars['BigDecimal'];
    id: Scalars['ID'];
    index: Index;
    /** holds orders of transfers in transaction */
    logIndex: Scalars['BigInt'];
    number: Scalars['BigDecimal'];
    /** timestamp matching the starting of day GMT */
    timestamp: Scalars['BigInt'];
    total: Scalars['BigDecimal'];
    totalCap: Scalars['BigDecimal'];
    /** index total supply on the moment of the user balance calculation */
    totalSupply: Scalars['BigInt'];
    user: User;
};
export declare type DailyUserIndexHistory_Filter = {
    /** Filter for the block changed event. */
    _change_block?: InputMaybe<BlockChangedFilter>;
    avgBalance?: InputMaybe<Scalars['BigDecimal']>;
    avgBalance_gt?: InputMaybe<Scalars['BigDecimal']>;
    avgBalance_gte?: InputMaybe<Scalars['BigDecimal']>;
    avgBalance_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    avgBalance_lt?: InputMaybe<Scalars['BigDecimal']>;
    avgBalance_lte?: InputMaybe<Scalars['BigDecimal']>;
    avgBalance_not?: InputMaybe<Scalars['BigDecimal']>;
    avgBalance_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    avgCapitalization?: InputMaybe<Scalars['BigDecimal']>;
    avgCapitalization_gt?: InputMaybe<Scalars['BigDecimal']>;
    avgCapitalization_gte?: InputMaybe<Scalars['BigDecimal']>;
    avgCapitalization_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    avgCapitalization_lt?: InputMaybe<Scalars['BigDecimal']>;
    avgCapitalization_lte?: InputMaybe<Scalars['BigDecimal']>;
    avgCapitalization_not?: InputMaybe<Scalars['BigDecimal']>;
    avgCapitalization_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    id?: InputMaybe<Scalars['ID']>;
    id_gt?: InputMaybe<Scalars['ID']>;
    id_gte?: InputMaybe<Scalars['ID']>;
    id_in?: InputMaybe<Array<Scalars['ID']>>;
    id_lt?: InputMaybe<Scalars['ID']>;
    id_lte?: InputMaybe<Scalars['ID']>;
    id_not?: InputMaybe<Scalars['ID']>;
    id_not_in?: InputMaybe<Array<Scalars['ID']>>;
    index?: InputMaybe<Scalars['String']>;
    index_?: InputMaybe<Index_Filter>;
    index_contains?: InputMaybe<Scalars['String']>;
    index_contains_nocase?: InputMaybe<Scalars['String']>;
    index_ends_with?: InputMaybe<Scalars['String']>;
    index_ends_with_nocase?: InputMaybe<Scalars['String']>;
    index_gt?: InputMaybe<Scalars['String']>;
    index_gte?: InputMaybe<Scalars['String']>;
    index_in?: InputMaybe<Array<Scalars['String']>>;
    index_lt?: InputMaybe<Scalars['String']>;
    index_lte?: InputMaybe<Scalars['String']>;
    index_not?: InputMaybe<Scalars['String']>;
    index_not_contains?: InputMaybe<Scalars['String']>;
    index_not_contains_nocase?: InputMaybe<Scalars['String']>;
    index_not_ends_with?: InputMaybe<Scalars['String']>;
    index_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
    index_not_in?: InputMaybe<Array<Scalars['String']>>;
    index_not_starts_with?: InputMaybe<Scalars['String']>;
    index_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
    index_starts_with?: InputMaybe<Scalars['String']>;
    index_starts_with_nocase?: InputMaybe<Scalars['String']>;
    logIndex?: InputMaybe<Scalars['BigInt']>;
    logIndex_gt?: InputMaybe<Scalars['BigInt']>;
    logIndex_gte?: InputMaybe<Scalars['BigInt']>;
    logIndex_in?: InputMaybe<Array<Scalars['BigInt']>>;
    logIndex_lt?: InputMaybe<Scalars['BigInt']>;
    logIndex_lte?: InputMaybe<Scalars['BigInt']>;
    logIndex_not?: InputMaybe<Scalars['BigInt']>;
    logIndex_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    number?: InputMaybe<Scalars['BigDecimal']>;
    number_gt?: InputMaybe<Scalars['BigDecimal']>;
    number_gte?: InputMaybe<Scalars['BigDecimal']>;
    number_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    number_lt?: InputMaybe<Scalars['BigDecimal']>;
    number_lte?: InputMaybe<Scalars['BigDecimal']>;
    number_not?: InputMaybe<Scalars['BigDecimal']>;
    number_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    timestamp?: InputMaybe<Scalars['BigInt']>;
    timestamp_gt?: InputMaybe<Scalars['BigInt']>;
    timestamp_gte?: InputMaybe<Scalars['BigInt']>;
    timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
    timestamp_lt?: InputMaybe<Scalars['BigInt']>;
    timestamp_lte?: InputMaybe<Scalars['BigInt']>;
    timestamp_not?: InputMaybe<Scalars['BigInt']>;
    timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    total?: InputMaybe<Scalars['BigDecimal']>;
    totalCap?: InputMaybe<Scalars['BigDecimal']>;
    totalCap_gt?: InputMaybe<Scalars['BigDecimal']>;
    totalCap_gte?: InputMaybe<Scalars['BigDecimal']>;
    totalCap_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    totalCap_lt?: InputMaybe<Scalars['BigDecimal']>;
    totalCap_lte?: InputMaybe<Scalars['BigDecimal']>;
    totalCap_not?: InputMaybe<Scalars['BigDecimal']>;
    totalCap_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    totalSupply?: InputMaybe<Scalars['BigInt']>;
    totalSupply_gt?: InputMaybe<Scalars['BigInt']>;
    totalSupply_gte?: InputMaybe<Scalars['BigInt']>;
    totalSupply_in?: InputMaybe<Array<Scalars['BigInt']>>;
    totalSupply_lt?: InputMaybe<Scalars['BigInt']>;
    totalSupply_lte?: InputMaybe<Scalars['BigInt']>;
    totalSupply_not?: InputMaybe<Scalars['BigInt']>;
    totalSupply_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    total_gt?: InputMaybe<Scalars['BigDecimal']>;
    total_gte?: InputMaybe<Scalars['BigDecimal']>;
    total_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    total_lt?: InputMaybe<Scalars['BigDecimal']>;
    total_lte?: InputMaybe<Scalars['BigDecimal']>;
    total_not?: InputMaybe<Scalars['BigDecimal']>;
    total_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    user?: InputMaybe<Scalars['String']>;
    user_?: InputMaybe<User_Filter>;
    user_contains?: InputMaybe<Scalars['String']>;
    user_contains_nocase?: InputMaybe<Scalars['String']>;
    user_ends_with?: InputMaybe<Scalars['String']>;
    user_ends_with_nocase?: InputMaybe<Scalars['String']>;
    user_gt?: InputMaybe<Scalars['String']>;
    user_gte?: InputMaybe<Scalars['String']>;
    user_in?: InputMaybe<Array<Scalars['String']>>;
    user_lt?: InputMaybe<Scalars['String']>;
    user_lte?: InputMaybe<Scalars['String']>;
    user_not?: InputMaybe<Scalars['String']>;
    user_not_contains?: InputMaybe<Scalars['String']>;
    user_not_contains_nocase?: InputMaybe<Scalars['String']>;
    user_not_ends_with?: InputMaybe<Scalars['String']>;
    user_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
    user_not_in?: InputMaybe<Array<Scalars['String']>>;
    user_not_starts_with?: InputMaybe<Scalars['String']>;
    user_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
    user_starts_with?: InputMaybe<Scalars['String']>;
    user_starts_with_nocase?: InputMaybe<Scalars['String']>;
};
export declare enum DailyUserIndexHistory_OrderBy {
    avgBalance = "avgBalance",
    avgCapitalization = "avgCapitalization",
    id = "id",
    index = "index",
    logIndex = "logIndex",
    number = "number",
    timestamp = "timestamp",
    total = "total",
    totalCap = "totalCap",
    totalSupply = "totalSupply",
    user = "user"
}
export declare type HourlyIndexStat = {
    __typename?: 'HourlyIndexStat';
    basePrice: Scalars['BigDecimal'];
    baseVolume: Scalars['BigDecimal'];
    date: Scalars['Int'];
    id: Scalars['ID'];
    index: Index;
    marketCap: Scalars['BigDecimal'];
    uniqueHolders: Scalars['BigInt'];
};
export declare type HourlyIndexStat_Filter = {
    /** Filter for the block changed event. */
    _change_block?: InputMaybe<BlockChangedFilter>;
    basePrice?: InputMaybe<Scalars['BigDecimal']>;
    basePrice_gt?: InputMaybe<Scalars['BigDecimal']>;
    basePrice_gte?: InputMaybe<Scalars['BigDecimal']>;
    basePrice_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    basePrice_lt?: InputMaybe<Scalars['BigDecimal']>;
    basePrice_lte?: InputMaybe<Scalars['BigDecimal']>;
    basePrice_not?: InputMaybe<Scalars['BigDecimal']>;
    basePrice_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    baseVolume?: InputMaybe<Scalars['BigDecimal']>;
    baseVolume_gt?: InputMaybe<Scalars['BigDecimal']>;
    baseVolume_gte?: InputMaybe<Scalars['BigDecimal']>;
    baseVolume_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    baseVolume_lt?: InputMaybe<Scalars['BigDecimal']>;
    baseVolume_lte?: InputMaybe<Scalars['BigDecimal']>;
    baseVolume_not?: InputMaybe<Scalars['BigDecimal']>;
    baseVolume_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    date?: InputMaybe<Scalars['Int']>;
    date_gt?: InputMaybe<Scalars['Int']>;
    date_gte?: InputMaybe<Scalars['Int']>;
    date_in?: InputMaybe<Array<Scalars['Int']>>;
    date_lt?: InputMaybe<Scalars['Int']>;
    date_lte?: InputMaybe<Scalars['Int']>;
    date_not?: InputMaybe<Scalars['Int']>;
    date_not_in?: InputMaybe<Array<Scalars['Int']>>;
    id?: InputMaybe<Scalars['ID']>;
    id_gt?: InputMaybe<Scalars['ID']>;
    id_gte?: InputMaybe<Scalars['ID']>;
    id_in?: InputMaybe<Array<Scalars['ID']>>;
    id_lt?: InputMaybe<Scalars['ID']>;
    id_lte?: InputMaybe<Scalars['ID']>;
    id_not?: InputMaybe<Scalars['ID']>;
    id_not_in?: InputMaybe<Array<Scalars['ID']>>;
    index?: InputMaybe<Scalars['String']>;
    index_?: InputMaybe<Index_Filter>;
    index_contains?: InputMaybe<Scalars['String']>;
    index_contains_nocase?: InputMaybe<Scalars['String']>;
    index_ends_with?: InputMaybe<Scalars['String']>;
    index_ends_with_nocase?: InputMaybe<Scalars['String']>;
    index_gt?: InputMaybe<Scalars['String']>;
    index_gte?: InputMaybe<Scalars['String']>;
    index_in?: InputMaybe<Array<Scalars['String']>>;
    index_lt?: InputMaybe<Scalars['String']>;
    index_lte?: InputMaybe<Scalars['String']>;
    index_not?: InputMaybe<Scalars['String']>;
    index_not_contains?: InputMaybe<Scalars['String']>;
    index_not_contains_nocase?: InputMaybe<Scalars['String']>;
    index_not_ends_with?: InputMaybe<Scalars['String']>;
    index_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
    index_not_in?: InputMaybe<Array<Scalars['String']>>;
    index_not_starts_with?: InputMaybe<Scalars['String']>;
    index_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
    index_starts_with?: InputMaybe<Scalars['String']>;
    index_starts_with_nocase?: InputMaybe<Scalars['String']>;
    marketCap?: InputMaybe<Scalars['BigDecimal']>;
    marketCap_gt?: InputMaybe<Scalars['BigDecimal']>;
    marketCap_gte?: InputMaybe<Scalars['BigDecimal']>;
    marketCap_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    marketCap_lt?: InputMaybe<Scalars['BigDecimal']>;
    marketCap_lte?: InputMaybe<Scalars['BigDecimal']>;
    marketCap_not?: InputMaybe<Scalars['BigDecimal']>;
    marketCap_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    uniqueHolders?: InputMaybe<Scalars['BigInt']>;
    uniqueHolders_gt?: InputMaybe<Scalars['BigInt']>;
    uniqueHolders_gte?: InputMaybe<Scalars['BigInt']>;
    uniqueHolders_in?: InputMaybe<Array<Scalars['BigInt']>>;
    uniqueHolders_lt?: InputMaybe<Scalars['BigInt']>;
    uniqueHolders_lte?: InputMaybe<Scalars['BigInt']>;
    uniqueHolders_not?: InputMaybe<Scalars['BigInt']>;
    uniqueHolders_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};
export declare enum HourlyIndexStat_OrderBy {
    basePrice = "basePrice",
    baseVolume = "baseVolume",
    date = "date",
    id = "id",
    index = "index",
    marketCap = "marketCap",
    uniqueHolders = "uniqueHolders"
}
export declare type Index = {
    __typename?: 'Index';
    _assets: Array<Scalars['ID']>;
    _inactiveAssets: Array<Scalars['ID']>;
    assets?: Maybe<Array<IndexAsset>>;
    /** price of the index in USD */
    basePrice: Scalars['BigDecimal'];
    /** price of the index in ETH */
    basePriceETH: Scalars['BigDecimal'];
    /** deprecated */
    baseVolume: Scalars['BigDecimal'];
    /** When index was created */
    created: Scalars['BigInt'];
    dailyStats: Array<DailyIndexStat>;
    decimals: Scalars['BigInt'];
    /** BP = 10000 ; ((((aumFeeInBP / BP) / (1 - aumFeeInBP / BP)) / 1e27) ** 365) - 1 */
    feeAUMPercent: Scalars['BigDecimal'];
    feeBurn: Scalars['BigInt'];
    feeMint: Scalars['BigInt'];
    hourlyStats: Array<HourlyIndexStat>;
    /** Address (hash) */
    id: Scalars['ID'];
    inactiveAssets?: Maybe<Array<IndexAsset>>;
    indexFactory: IndexFactory;
    marketCap: Scalars['BigDecimal'];
    monthlyStats: Array<MonthlyIndexStat>;
    name: Scalars['String'];
    /** Index Creation Category */
    sector: Scalars['BigInt'];
    symbol: Scalars['String'];
    totalSupply: Scalars['BigInt'];
    transaction: Transaction;
    type: Scalars['String'];
    uniqueHolders: Scalars['BigInt'];
    users: Array<UserIndex>;
    weeklyStats: Array<WeeklyIndexStat>;
    yearlyStats: Array<YearlyIndexStat>;
};
export declare type IndexAssetsArgs = {
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<IndexAsset_OrderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    where?: InputMaybe<IndexAsset_Filter>;
};
export declare type IndexDailyStatsArgs = {
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<DailyIndexStat_OrderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    where?: InputMaybe<DailyIndexStat_Filter>;
};
export declare type IndexHourlyStatsArgs = {
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<HourlyIndexStat_OrderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    where?: InputMaybe<HourlyIndexStat_Filter>;
};
export declare type IndexInactiveAssetsArgs = {
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<IndexAsset_OrderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    where?: InputMaybe<IndexAsset_Filter>;
};
export declare type IndexMonthlyStatsArgs = {
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<MonthlyIndexStat_OrderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    where?: InputMaybe<MonthlyIndexStat_Filter>;
};
export declare type IndexUsersArgs = {
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<UserIndex_OrderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    where?: InputMaybe<UserIndex_Filter>;
};
export declare type IndexWeeklyStatsArgs = {
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<WeeklyIndexStat_OrderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    where?: InputMaybe<WeeklyIndexStat_Filter>;
};
export declare type IndexYearlyStatsArgs = {
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<YearlyIndexStat_OrderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    where?: InputMaybe<YearlyIndexStat_Filter>;
};
export declare type IndexAsset = {
    __typename?: 'IndexAsset';
    asset: Asset;
    id: Scalars['ID'];
    inactiveIndex?: Maybe<Index>;
    index?: Maybe<Index>;
    shares: Scalars['BigInt'];
    weight: Scalars['BigInt'];
};
export declare type IndexAsset_Filter = {
    /** Filter for the block changed event. */
    _change_block?: InputMaybe<BlockChangedFilter>;
    asset?: InputMaybe<Scalars['String']>;
    asset_?: InputMaybe<Asset_Filter>;
    asset_contains?: InputMaybe<Scalars['String']>;
    asset_contains_nocase?: InputMaybe<Scalars['String']>;
    asset_ends_with?: InputMaybe<Scalars['String']>;
    asset_ends_with_nocase?: InputMaybe<Scalars['String']>;
    asset_gt?: InputMaybe<Scalars['String']>;
    asset_gte?: InputMaybe<Scalars['String']>;
    asset_in?: InputMaybe<Array<Scalars['String']>>;
    asset_lt?: InputMaybe<Scalars['String']>;
    asset_lte?: InputMaybe<Scalars['String']>;
    asset_not?: InputMaybe<Scalars['String']>;
    asset_not_contains?: InputMaybe<Scalars['String']>;
    asset_not_contains_nocase?: InputMaybe<Scalars['String']>;
    asset_not_ends_with?: InputMaybe<Scalars['String']>;
    asset_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
    asset_not_in?: InputMaybe<Array<Scalars['String']>>;
    asset_not_starts_with?: InputMaybe<Scalars['String']>;
    asset_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
    asset_starts_with?: InputMaybe<Scalars['String']>;
    asset_starts_with_nocase?: InputMaybe<Scalars['String']>;
    id?: InputMaybe<Scalars['ID']>;
    id_gt?: InputMaybe<Scalars['ID']>;
    id_gte?: InputMaybe<Scalars['ID']>;
    id_in?: InputMaybe<Array<Scalars['ID']>>;
    id_lt?: InputMaybe<Scalars['ID']>;
    id_lte?: InputMaybe<Scalars['ID']>;
    id_not?: InputMaybe<Scalars['ID']>;
    id_not_in?: InputMaybe<Array<Scalars['ID']>>;
    inactiveIndex?: InputMaybe<Scalars['String']>;
    inactiveIndex_?: InputMaybe<Index_Filter>;
    inactiveIndex_contains?: InputMaybe<Scalars['String']>;
    inactiveIndex_contains_nocase?: InputMaybe<Scalars['String']>;
    inactiveIndex_ends_with?: InputMaybe<Scalars['String']>;
    inactiveIndex_ends_with_nocase?: InputMaybe<Scalars['String']>;
    inactiveIndex_gt?: InputMaybe<Scalars['String']>;
    inactiveIndex_gte?: InputMaybe<Scalars['String']>;
    inactiveIndex_in?: InputMaybe<Array<Scalars['String']>>;
    inactiveIndex_lt?: InputMaybe<Scalars['String']>;
    inactiveIndex_lte?: InputMaybe<Scalars['String']>;
    inactiveIndex_not?: InputMaybe<Scalars['String']>;
    inactiveIndex_not_contains?: InputMaybe<Scalars['String']>;
    inactiveIndex_not_contains_nocase?: InputMaybe<Scalars['String']>;
    inactiveIndex_not_ends_with?: InputMaybe<Scalars['String']>;
    inactiveIndex_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
    inactiveIndex_not_in?: InputMaybe<Array<Scalars['String']>>;
    inactiveIndex_not_starts_with?: InputMaybe<Scalars['String']>;
    inactiveIndex_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
    inactiveIndex_starts_with?: InputMaybe<Scalars['String']>;
    inactiveIndex_starts_with_nocase?: InputMaybe<Scalars['String']>;
    index?: InputMaybe<Scalars['String']>;
    index_?: InputMaybe<Index_Filter>;
    index_contains?: InputMaybe<Scalars['String']>;
    index_contains_nocase?: InputMaybe<Scalars['String']>;
    index_ends_with?: InputMaybe<Scalars['String']>;
    index_ends_with_nocase?: InputMaybe<Scalars['String']>;
    index_gt?: InputMaybe<Scalars['String']>;
    index_gte?: InputMaybe<Scalars['String']>;
    index_in?: InputMaybe<Array<Scalars['String']>>;
    index_lt?: InputMaybe<Scalars['String']>;
    index_lte?: InputMaybe<Scalars['String']>;
    index_not?: InputMaybe<Scalars['String']>;
    index_not_contains?: InputMaybe<Scalars['String']>;
    index_not_contains_nocase?: InputMaybe<Scalars['String']>;
    index_not_ends_with?: InputMaybe<Scalars['String']>;
    index_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
    index_not_in?: InputMaybe<Array<Scalars['String']>>;
    index_not_starts_with?: InputMaybe<Scalars['String']>;
    index_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
    index_starts_with?: InputMaybe<Scalars['String']>;
    index_starts_with_nocase?: InputMaybe<Scalars['String']>;
    shares?: InputMaybe<Scalars['BigInt']>;
    shares_gt?: InputMaybe<Scalars['BigInt']>;
    shares_gte?: InputMaybe<Scalars['BigInt']>;
    shares_in?: InputMaybe<Array<Scalars['BigInt']>>;
    shares_lt?: InputMaybe<Scalars['BigInt']>;
    shares_lte?: InputMaybe<Scalars['BigInt']>;
    shares_not?: InputMaybe<Scalars['BigInt']>;
    shares_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    weight?: InputMaybe<Scalars['BigInt']>;
    weight_gt?: InputMaybe<Scalars['BigInt']>;
    weight_gte?: InputMaybe<Scalars['BigInt']>;
    weight_in?: InputMaybe<Array<Scalars['BigInt']>>;
    weight_lt?: InputMaybe<Scalars['BigInt']>;
    weight_lte?: InputMaybe<Scalars['BigInt']>;
    weight_not?: InputMaybe<Scalars['BigInt']>;
    weight_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};
export declare enum IndexAsset_OrderBy {
    asset = "asset",
    id = "id",
    inactiveIndex = "inactiveIndex",
    index = "index",
    shares = "shares",
    weight = "weight"
}
export declare type IndexFactory = {
    __typename?: 'IndexFactory';
    /** Address (hash) of the factory */
    id: Scalars['ID'];
    indices: Array<Index>;
    type: Scalars['String'];
    vTokenFactory: Scalars['String'];
};
export declare type IndexFactoryIndicesArgs = {
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<Index_OrderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    where?: InputMaybe<Index_Filter>;
};
export declare type IndexFactory_Filter = {
    /** Filter for the block changed event. */
    _change_block?: InputMaybe<BlockChangedFilter>;
    id?: InputMaybe<Scalars['ID']>;
    id_gt?: InputMaybe<Scalars['ID']>;
    id_gte?: InputMaybe<Scalars['ID']>;
    id_in?: InputMaybe<Array<Scalars['ID']>>;
    id_lt?: InputMaybe<Scalars['ID']>;
    id_lte?: InputMaybe<Scalars['ID']>;
    id_not?: InputMaybe<Scalars['ID']>;
    id_not_in?: InputMaybe<Array<Scalars['ID']>>;
    indices_?: InputMaybe<Index_Filter>;
    type?: InputMaybe<Scalars['String']>;
    type_contains?: InputMaybe<Scalars['String']>;
    type_contains_nocase?: InputMaybe<Scalars['String']>;
    type_ends_with?: InputMaybe<Scalars['String']>;
    type_ends_with_nocase?: InputMaybe<Scalars['String']>;
    type_gt?: InputMaybe<Scalars['String']>;
    type_gte?: InputMaybe<Scalars['String']>;
    type_in?: InputMaybe<Array<Scalars['String']>>;
    type_lt?: InputMaybe<Scalars['String']>;
    type_lte?: InputMaybe<Scalars['String']>;
    type_not?: InputMaybe<Scalars['String']>;
    type_not_contains?: InputMaybe<Scalars['String']>;
    type_not_contains_nocase?: InputMaybe<Scalars['String']>;
    type_not_ends_with?: InputMaybe<Scalars['String']>;
    type_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
    type_not_in?: InputMaybe<Array<Scalars['String']>>;
    type_not_starts_with?: InputMaybe<Scalars['String']>;
    type_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
    type_starts_with?: InputMaybe<Scalars['String']>;
    type_starts_with_nocase?: InputMaybe<Scalars['String']>;
    vTokenFactory?: InputMaybe<Scalars['String']>;
    vTokenFactory_contains?: InputMaybe<Scalars['String']>;
    vTokenFactory_contains_nocase?: InputMaybe<Scalars['String']>;
    vTokenFactory_ends_with?: InputMaybe<Scalars['String']>;
    vTokenFactory_ends_with_nocase?: InputMaybe<Scalars['String']>;
    vTokenFactory_gt?: InputMaybe<Scalars['String']>;
    vTokenFactory_gte?: InputMaybe<Scalars['String']>;
    vTokenFactory_in?: InputMaybe<Array<Scalars['String']>>;
    vTokenFactory_lt?: InputMaybe<Scalars['String']>;
    vTokenFactory_lte?: InputMaybe<Scalars['String']>;
    vTokenFactory_not?: InputMaybe<Scalars['String']>;
    vTokenFactory_not_contains?: InputMaybe<Scalars['String']>;
    vTokenFactory_not_contains_nocase?: InputMaybe<Scalars['String']>;
    vTokenFactory_not_ends_with?: InputMaybe<Scalars['String']>;
    vTokenFactory_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
    vTokenFactory_not_in?: InputMaybe<Array<Scalars['String']>>;
    vTokenFactory_not_starts_with?: InputMaybe<Scalars['String']>;
    vTokenFactory_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
    vTokenFactory_starts_with?: InputMaybe<Scalars['String']>;
    vTokenFactory_starts_with_nocase?: InputMaybe<Scalars['String']>;
};
export declare enum IndexFactory_OrderBy {
    id = "id",
    indices = "indices",
    type = "type",
    vTokenFactory = "vTokenFactory"
}
export declare type Index_Filter = {
    _assets?: InputMaybe<Array<Scalars['ID']>>;
    _assets_contains?: InputMaybe<Array<Scalars['ID']>>;
    _assets_contains_nocase?: InputMaybe<Array<Scalars['ID']>>;
    _assets_not?: InputMaybe<Array<Scalars['ID']>>;
    _assets_not_contains?: InputMaybe<Array<Scalars['ID']>>;
    _assets_not_contains_nocase?: InputMaybe<Array<Scalars['ID']>>;
    /** Filter for the block changed event. */
    _change_block?: InputMaybe<BlockChangedFilter>;
    _inactiveAssets?: InputMaybe<Array<Scalars['ID']>>;
    _inactiveAssets_contains?: InputMaybe<Array<Scalars['ID']>>;
    _inactiveAssets_contains_nocase?: InputMaybe<Array<Scalars['ID']>>;
    _inactiveAssets_not?: InputMaybe<Array<Scalars['ID']>>;
    _inactiveAssets_not_contains?: InputMaybe<Array<Scalars['ID']>>;
    _inactiveAssets_not_contains_nocase?: InputMaybe<Array<Scalars['ID']>>;
    assets_?: InputMaybe<IndexAsset_Filter>;
    basePrice?: InputMaybe<Scalars['BigDecimal']>;
    basePriceETH?: InputMaybe<Scalars['BigDecimal']>;
    basePriceETH_gt?: InputMaybe<Scalars['BigDecimal']>;
    basePriceETH_gte?: InputMaybe<Scalars['BigDecimal']>;
    basePriceETH_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    basePriceETH_lt?: InputMaybe<Scalars['BigDecimal']>;
    basePriceETH_lte?: InputMaybe<Scalars['BigDecimal']>;
    basePriceETH_not?: InputMaybe<Scalars['BigDecimal']>;
    basePriceETH_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    basePrice_gt?: InputMaybe<Scalars['BigDecimal']>;
    basePrice_gte?: InputMaybe<Scalars['BigDecimal']>;
    basePrice_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    basePrice_lt?: InputMaybe<Scalars['BigDecimal']>;
    basePrice_lte?: InputMaybe<Scalars['BigDecimal']>;
    basePrice_not?: InputMaybe<Scalars['BigDecimal']>;
    basePrice_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    baseVolume?: InputMaybe<Scalars['BigDecimal']>;
    baseVolume_gt?: InputMaybe<Scalars['BigDecimal']>;
    baseVolume_gte?: InputMaybe<Scalars['BigDecimal']>;
    baseVolume_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    baseVolume_lt?: InputMaybe<Scalars['BigDecimal']>;
    baseVolume_lte?: InputMaybe<Scalars['BigDecimal']>;
    baseVolume_not?: InputMaybe<Scalars['BigDecimal']>;
    baseVolume_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    created?: InputMaybe<Scalars['BigInt']>;
    created_gt?: InputMaybe<Scalars['BigInt']>;
    created_gte?: InputMaybe<Scalars['BigInt']>;
    created_in?: InputMaybe<Array<Scalars['BigInt']>>;
    created_lt?: InputMaybe<Scalars['BigInt']>;
    created_lte?: InputMaybe<Scalars['BigInt']>;
    created_not?: InputMaybe<Scalars['BigInt']>;
    created_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    dailyStats_?: InputMaybe<DailyIndexStat_Filter>;
    decimals?: InputMaybe<Scalars['BigInt']>;
    decimals_gt?: InputMaybe<Scalars['BigInt']>;
    decimals_gte?: InputMaybe<Scalars['BigInt']>;
    decimals_in?: InputMaybe<Array<Scalars['BigInt']>>;
    decimals_lt?: InputMaybe<Scalars['BigInt']>;
    decimals_lte?: InputMaybe<Scalars['BigInt']>;
    decimals_not?: InputMaybe<Scalars['BigInt']>;
    decimals_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    feeAUMPercent?: InputMaybe<Scalars['BigDecimal']>;
    feeAUMPercent_gt?: InputMaybe<Scalars['BigDecimal']>;
    feeAUMPercent_gte?: InputMaybe<Scalars['BigDecimal']>;
    feeAUMPercent_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    feeAUMPercent_lt?: InputMaybe<Scalars['BigDecimal']>;
    feeAUMPercent_lte?: InputMaybe<Scalars['BigDecimal']>;
    feeAUMPercent_not?: InputMaybe<Scalars['BigDecimal']>;
    feeAUMPercent_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    feeBurn?: InputMaybe<Scalars['BigInt']>;
    feeBurn_gt?: InputMaybe<Scalars['BigInt']>;
    feeBurn_gte?: InputMaybe<Scalars['BigInt']>;
    feeBurn_in?: InputMaybe<Array<Scalars['BigInt']>>;
    feeBurn_lt?: InputMaybe<Scalars['BigInt']>;
    feeBurn_lte?: InputMaybe<Scalars['BigInt']>;
    feeBurn_not?: InputMaybe<Scalars['BigInt']>;
    feeBurn_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    feeMint?: InputMaybe<Scalars['BigInt']>;
    feeMint_gt?: InputMaybe<Scalars['BigInt']>;
    feeMint_gte?: InputMaybe<Scalars['BigInt']>;
    feeMint_in?: InputMaybe<Array<Scalars['BigInt']>>;
    feeMint_lt?: InputMaybe<Scalars['BigInt']>;
    feeMint_lte?: InputMaybe<Scalars['BigInt']>;
    feeMint_not?: InputMaybe<Scalars['BigInt']>;
    feeMint_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    hourlyStats_?: InputMaybe<HourlyIndexStat_Filter>;
    id?: InputMaybe<Scalars['ID']>;
    id_gt?: InputMaybe<Scalars['ID']>;
    id_gte?: InputMaybe<Scalars['ID']>;
    id_in?: InputMaybe<Array<Scalars['ID']>>;
    id_lt?: InputMaybe<Scalars['ID']>;
    id_lte?: InputMaybe<Scalars['ID']>;
    id_not?: InputMaybe<Scalars['ID']>;
    id_not_in?: InputMaybe<Array<Scalars['ID']>>;
    inactiveAssets_?: InputMaybe<IndexAsset_Filter>;
    indexFactory?: InputMaybe<Scalars['String']>;
    indexFactory_?: InputMaybe<IndexFactory_Filter>;
    indexFactory_contains?: InputMaybe<Scalars['String']>;
    indexFactory_contains_nocase?: InputMaybe<Scalars['String']>;
    indexFactory_ends_with?: InputMaybe<Scalars['String']>;
    indexFactory_ends_with_nocase?: InputMaybe<Scalars['String']>;
    indexFactory_gt?: InputMaybe<Scalars['String']>;
    indexFactory_gte?: InputMaybe<Scalars['String']>;
    indexFactory_in?: InputMaybe<Array<Scalars['String']>>;
    indexFactory_lt?: InputMaybe<Scalars['String']>;
    indexFactory_lte?: InputMaybe<Scalars['String']>;
    indexFactory_not?: InputMaybe<Scalars['String']>;
    indexFactory_not_contains?: InputMaybe<Scalars['String']>;
    indexFactory_not_contains_nocase?: InputMaybe<Scalars['String']>;
    indexFactory_not_ends_with?: InputMaybe<Scalars['String']>;
    indexFactory_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
    indexFactory_not_in?: InputMaybe<Array<Scalars['String']>>;
    indexFactory_not_starts_with?: InputMaybe<Scalars['String']>;
    indexFactory_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
    indexFactory_starts_with?: InputMaybe<Scalars['String']>;
    indexFactory_starts_with_nocase?: InputMaybe<Scalars['String']>;
    marketCap?: InputMaybe<Scalars['BigDecimal']>;
    marketCap_gt?: InputMaybe<Scalars['BigDecimal']>;
    marketCap_gte?: InputMaybe<Scalars['BigDecimal']>;
    marketCap_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    marketCap_lt?: InputMaybe<Scalars['BigDecimal']>;
    marketCap_lte?: InputMaybe<Scalars['BigDecimal']>;
    marketCap_not?: InputMaybe<Scalars['BigDecimal']>;
    marketCap_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    monthlyStats_?: InputMaybe<MonthlyIndexStat_Filter>;
    name?: InputMaybe<Scalars['String']>;
    name_contains?: InputMaybe<Scalars['String']>;
    name_contains_nocase?: InputMaybe<Scalars['String']>;
    name_ends_with?: InputMaybe<Scalars['String']>;
    name_ends_with_nocase?: InputMaybe<Scalars['String']>;
    name_gt?: InputMaybe<Scalars['String']>;
    name_gte?: InputMaybe<Scalars['String']>;
    name_in?: InputMaybe<Array<Scalars['String']>>;
    name_lt?: InputMaybe<Scalars['String']>;
    name_lte?: InputMaybe<Scalars['String']>;
    name_not?: InputMaybe<Scalars['String']>;
    name_not_contains?: InputMaybe<Scalars['String']>;
    name_not_contains_nocase?: InputMaybe<Scalars['String']>;
    name_not_ends_with?: InputMaybe<Scalars['String']>;
    name_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
    name_not_in?: InputMaybe<Array<Scalars['String']>>;
    name_not_starts_with?: InputMaybe<Scalars['String']>;
    name_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
    name_starts_with?: InputMaybe<Scalars['String']>;
    name_starts_with_nocase?: InputMaybe<Scalars['String']>;
    sector?: InputMaybe<Scalars['BigInt']>;
    sector_gt?: InputMaybe<Scalars['BigInt']>;
    sector_gte?: InputMaybe<Scalars['BigInt']>;
    sector_in?: InputMaybe<Array<Scalars['BigInt']>>;
    sector_lt?: InputMaybe<Scalars['BigInt']>;
    sector_lte?: InputMaybe<Scalars['BigInt']>;
    sector_not?: InputMaybe<Scalars['BigInt']>;
    sector_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    symbol?: InputMaybe<Scalars['String']>;
    symbol_contains?: InputMaybe<Scalars['String']>;
    symbol_contains_nocase?: InputMaybe<Scalars['String']>;
    symbol_ends_with?: InputMaybe<Scalars['String']>;
    symbol_ends_with_nocase?: InputMaybe<Scalars['String']>;
    symbol_gt?: InputMaybe<Scalars['String']>;
    symbol_gte?: InputMaybe<Scalars['String']>;
    symbol_in?: InputMaybe<Array<Scalars['String']>>;
    symbol_lt?: InputMaybe<Scalars['String']>;
    symbol_lte?: InputMaybe<Scalars['String']>;
    symbol_not?: InputMaybe<Scalars['String']>;
    symbol_not_contains?: InputMaybe<Scalars['String']>;
    symbol_not_contains_nocase?: InputMaybe<Scalars['String']>;
    symbol_not_ends_with?: InputMaybe<Scalars['String']>;
    symbol_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
    symbol_not_in?: InputMaybe<Array<Scalars['String']>>;
    symbol_not_starts_with?: InputMaybe<Scalars['String']>;
    symbol_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
    symbol_starts_with?: InputMaybe<Scalars['String']>;
    symbol_starts_with_nocase?: InputMaybe<Scalars['String']>;
    totalSupply?: InputMaybe<Scalars['BigInt']>;
    totalSupply_gt?: InputMaybe<Scalars['BigInt']>;
    totalSupply_gte?: InputMaybe<Scalars['BigInt']>;
    totalSupply_in?: InputMaybe<Array<Scalars['BigInt']>>;
    totalSupply_lt?: InputMaybe<Scalars['BigInt']>;
    totalSupply_lte?: InputMaybe<Scalars['BigInt']>;
    totalSupply_not?: InputMaybe<Scalars['BigInt']>;
    totalSupply_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    transaction?: InputMaybe<Scalars['String']>;
    transaction_?: InputMaybe<Transaction_Filter>;
    transaction_contains?: InputMaybe<Scalars['String']>;
    transaction_contains_nocase?: InputMaybe<Scalars['String']>;
    transaction_ends_with?: InputMaybe<Scalars['String']>;
    transaction_ends_with_nocase?: InputMaybe<Scalars['String']>;
    transaction_gt?: InputMaybe<Scalars['String']>;
    transaction_gte?: InputMaybe<Scalars['String']>;
    transaction_in?: InputMaybe<Array<Scalars['String']>>;
    transaction_lt?: InputMaybe<Scalars['String']>;
    transaction_lte?: InputMaybe<Scalars['String']>;
    transaction_not?: InputMaybe<Scalars['String']>;
    transaction_not_contains?: InputMaybe<Scalars['String']>;
    transaction_not_contains_nocase?: InputMaybe<Scalars['String']>;
    transaction_not_ends_with?: InputMaybe<Scalars['String']>;
    transaction_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
    transaction_not_in?: InputMaybe<Array<Scalars['String']>>;
    transaction_not_starts_with?: InputMaybe<Scalars['String']>;
    transaction_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
    transaction_starts_with?: InputMaybe<Scalars['String']>;
    transaction_starts_with_nocase?: InputMaybe<Scalars['String']>;
    type?: InputMaybe<Scalars['String']>;
    type_contains?: InputMaybe<Scalars['String']>;
    type_contains_nocase?: InputMaybe<Scalars['String']>;
    type_ends_with?: InputMaybe<Scalars['String']>;
    type_ends_with_nocase?: InputMaybe<Scalars['String']>;
    type_gt?: InputMaybe<Scalars['String']>;
    type_gte?: InputMaybe<Scalars['String']>;
    type_in?: InputMaybe<Array<Scalars['String']>>;
    type_lt?: InputMaybe<Scalars['String']>;
    type_lte?: InputMaybe<Scalars['String']>;
    type_not?: InputMaybe<Scalars['String']>;
    type_not_contains?: InputMaybe<Scalars['String']>;
    type_not_contains_nocase?: InputMaybe<Scalars['String']>;
    type_not_ends_with?: InputMaybe<Scalars['String']>;
    type_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
    type_not_in?: InputMaybe<Array<Scalars['String']>>;
    type_not_starts_with?: InputMaybe<Scalars['String']>;
    type_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
    type_starts_with?: InputMaybe<Scalars['String']>;
    type_starts_with_nocase?: InputMaybe<Scalars['String']>;
    uniqueHolders?: InputMaybe<Scalars['BigInt']>;
    uniqueHolders_gt?: InputMaybe<Scalars['BigInt']>;
    uniqueHolders_gte?: InputMaybe<Scalars['BigInt']>;
    uniqueHolders_in?: InputMaybe<Array<Scalars['BigInt']>>;
    uniqueHolders_lt?: InputMaybe<Scalars['BigInt']>;
    uniqueHolders_lte?: InputMaybe<Scalars['BigInt']>;
    uniqueHolders_not?: InputMaybe<Scalars['BigInt']>;
    uniqueHolders_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    users_?: InputMaybe<UserIndex_Filter>;
    weeklyStats_?: InputMaybe<WeeklyIndexStat_Filter>;
    yearlyStats_?: InputMaybe<YearlyIndexStat_Filter>;
};
export declare enum Index_OrderBy {
    _assets = "_assets",
    _inactiveAssets = "_inactiveAssets",
    assets = "assets",
    basePrice = "basePrice",
    basePriceETH = "basePriceETH",
    baseVolume = "baseVolume",
    created = "created",
    dailyStats = "dailyStats",
    decimals = "decimals",
    feeAUMPercent = "feeAUMPercent",
    feeBurn = "feeBurn",
    feeMint = "feeMint",
    hourlyStats = "hourlyStats",
    id = "id",
    inactiveAssets = "inactiveAssets",
    indexFactory = "indexFactory",
    marketCap = "marketCap",
    monthlyStats = "monthlyStats",
    name = "name",
    sector = "sector",
    symbol = "symbol",
    totalSupply = "totalSupply",
    transaction = "transaction",
    type = "type",
    uniqueHolders = "uniqueHolders",
    users = "users",
    weeklyStats = "weeklyStats",
    yearlyStats = "yearlyStats"
}
export declare type LastOrderIndex = {
    __typename?: 'LastOrderIndex';
    id: Scalars['ID'];
    index: Index;
    order: Order;
};
export declare type LastOrderIndex_Filter = {
    /** Filter for the block changed event. */
    _change_block?: InputMaybe<BlockChangedFilter>;
    id?: InputMaybe<Scalars['ID']>;
    id_gt?: InputMaybe<Scalars['ID']>;
    id_gte?: InputMaybe<Scalars['ID']>;
    id_in?: InputMaybe<Array<Scalars['ID']>>;
    id_lt?: InputMaybe<Scalars['ID']>;
    id_lte?: InputMaybe<Scalars['ID']>;
    id_not?: InputMaybe<Scalars['ID']>;
    id_not_in?: InputMaybe<Array<Scalars['ID']>>;
    index?: InputMaybe<Scalars['String']>;
    index_?: InputMaybe<Index_Filter>;
    index_contains?: InputMaybe<Scalars['String']>;
    index_contains_nocase?: InputMaybe<Scalars['String']>;
    index_ends_with?: InputMaybe<Scalars['String']>;
    index_ends_with_nocase?: InputMaybe<Scalars['String']>;
    index_gt?: InputMaybe<Scalars['String']>;
    index_gte?: InputMaybe<Scalars['String']>;
    index_in?: InputMaybe<Array<Scalars['String']>>;
    index_lt?: InputMaybe<Scalars['String']>;
    index_lte?: InputMaybe<Scalars['String']>;
    index_not?: InputMaybe<Scalars['String']>;
    index_not_contains?: InputMaybe<Scalars['String']>;
    index_not_contains_nocase?: InputMaybe<Scalars['String']>;
    index_not_ends_with?: InputMaybe<Scalars['String']>;
    index_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
    index_not_in?: InputMaybe<Array<Scalars['String']>>;
    index_not_starts_with?: InputMaybe<Scalars['String']>;
    index_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
    index_starts_with?: InputMaybe<Scalars['String']>;
    index_starts_with_nocase?: InputMaybe<Scalars['String']>;
    order?: InputMaybe<Scalars['String']>;
    order_?: InputMaybe<Order_Filter>;
    order_contains?: InputMaybe<Scalars['String']>;
    order_contains_nocase?: InputMaybe<Scalars['String']>;
    order_ends_with?: InputMaybe<Scalars['String']>;
    order_ends_with_nocase?: InputMaybe<Scalars['String']>;
    order_gt?: InputMaybe<Scalars['String']>;
    order_gte?: InputMaybe<Scalars['String']>;
    order_in?: InputMaybe<Array<Scalars['String']>>;
    order_lt?: InputMaybe<Scalars['String']>;
    order_lte?: InputMaybe<Scalars['String']>;
    order_not?: InputMaybe<Scalars['String']>;
    order_not_contains?: InputMaybe<Scalars['String']>;
    order_not_contains_nocase?: InputMaybe<Scalars['String']>;
    order_not_ends_with?: InputMaybe<Scalars['String']>;
    order_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
    order_not_in?: InputMaybe<Array<Scalars['String']>>;
    order_not_starts_with?: InputMaybe<Scalars['String']>;
    order_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
    order_starts_with?: InputMaybe<Scalars['String']>;
    order_starts_with_nocase?: InputMaybe<Scalars['String']>;
};
export declare enum LastOrderIndex_OrderBy {
    id = "id",
    index = "index",
    order = "order"
}
export declare type MonthlyIndexStat = {
    __typename?: 'MonthlyIndexStat';
    /** price of the index in USD */
    basePrice: Scalars['BigDecimal'];
    /** price of the index in ETH */
    basePriceETH: Scalars['BigDecimal'];
    baseVolume: Scalars['BigDecimal'];
    date: Scalars['Int'];
    id: Scalars['ID'];
    index: Index;
    marketCap: Scalars['BigDecimal'];
    uniqueHolders: Scalars['BigInt'];
};
export declare type MonthlyIndexStat_Filter = {
    /** Filter for the block changed event. */
    _change_block?: InputMaybe<BlockChangedFilter>;
    basePrice?: InputMaybe<Scalars['BigDecimal']>;
    basePriceETH?: InputMaybe<Scalars['BigDecimal']>;
    basePriceETH_gt?: InputMaybe<Scalars['BigDecimal']>;
    basePriceETH_gte?: InputMaybe<Scalars['BigDecimal']>;
    basePriceETH_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    basePriceETH_lt?: InputMaybe<Scalars['BigDecimal']>;
    basePriceETH_lte?: InputMaybe<Scalars['BigDecimal']>;
    basePriceETH_not?: InputMaybe<Scalars['BigDecimal']>;
    basePriceETH_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    basePrice_gt?: InputMaybe<Scalars['BigDecimal']>;
    basePrice_gte?: InputMaybe<Scalars['BigDecimal']>;
    basePrice_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    basePrice_lt?: InputMaybe<Scalars['BigDecimal']>;
    basePrice_lte?: InputMaybe<Scalars['BigDecimal']>;
    basePrice_not?: InputMaybe<Scalars['BigDecimal']>;
    basePrice_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    baseVolume?: InputMaybe<Scalars['BigDecimal']>;
    baseVolume_gt?: InputMaybe<Scalars['BigDecimal']>;
    baseVolume_gte?: InputMaybe<Scalars['BigDecimal']>;
    baseVolume_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    baseVolume_lt?: InputMaybe<Scalars['BigDecimal']>;
    baseVolume_lte?: InputMaybe<Scalars['BigDecimal']>;
    baseVolume_not?: InputMaybe<Scalars['BigDecimal']>;
    baseVolume_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    date?: InputMaybe<Scalars['Int']>;
    date_gt?: InputMaybe<Scalars['Int']>;
    date_gte?: InputMaybe<Scalars['Int']>;
    date_in?: InputMaybe<Array<Scalars['Int']>>;
    date_lt?: InputMaybe<Scalars['Int']>;
    date_lte?: InputMaybe<Scalars['Int']>;
    date_not?: InputMaybe<Scalars['Int']>;
    date_not_in?: InputMaybe<Array<Scalars['Int']>>;
    id?: InputMaybe<Scalars['ID']>;
    id_gt?: InputMaybe<Scalars['ID']>;
    id_gte?: InputMaybe<Scalars['ID']>;
    id_in?: InputMaybe<Array<Scalars['ID']>>;
    id_lt?: InputMaybe<Scalars['ID']>;
    id_lte?: InputMaybe<Scalars['ID']>;
    id_not?: InputMaybe<Scalars['ID']>;
    id_not_in?: InputMaybe<Array<Scalars['ID']>>;
    index?: InputMaybe<Scalars['String']>;
    index_?: InputMaybe<Index_Filter>;
    index_contains?: InputMaybe<Scalars['String']>;
    index_contains_nocase?: InputMaybe<Scalars['String']>;
    index_ends_with?: InputMaybe<Scalars['String']>;
    index_ends_with_nocase?: InputMaybe<Scalars['String']>;
    index_gt?: InputMaybe<Scalars['String']>;
    index_gte?: InputMaybe<Scalars['String']>;
    index_in?: InputMaybe<Array<Scalars['String']>>;
    index_lt?: InputMaybe<Scalars['String']>;
    index_lte?: InputMaybe<Scalars['String']>;
    index_not?: InputMaybe<Scalars['String']>;
    index_not_contains?: InputMaybe<Scalars['String']>;
    index_not_contains_nocase?: InputMaybe<Scalars['String']>;
    index_not_ends_with?: InputMaybe<Scalars['String']>;
    index_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
    index_not_in?: InputMaybe<Array<Scalars['String']>>;
    index_not_starts_with?: InputMaybe<Scalars['String']>;
    index_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
    index_starts_with?: InputMaybe<Scalars['String']>;
    index_starts_with_nocase?: InputMaybe<Scalars['String']>;
    marketCap?: InputMaybe<Scalars['BigDecimal']>;
    marketCap_gt?: InputMaybe<Scalars['BigDecimal']>;
    marketCap_gte?: InputMaybe<Scalars['BigDecimal']>;
    marketCap_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    marketCap_lt?: InputMaybe<Scalars['BigDecimal']>;
    marketCap_lte?: InputMaybe<Scalars['BigDecimal']>;
    marketCap_not?: InputMaybe<Scalars['BigDecimal']>;
    marketCap_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    uniqueHolders?: InputMaybe<Scalars['BigInt']>;
    uniqueHolders_gt?: InputMaybe<Scalars['BigInt']>;
    uniqueHolders_gte?: InputMaybe<Scalars['BigInt']>;
    uniqueHolders_in?: InputMaybe<Array<Scalars['BigInt']>>;
    uniqueHolders_lt?: InputMaybe<Scalars['BigInt']>;
    uniqueHolders_lte?: InputMaybe<Scalars['BigInt']>;
    uniqueHolders_not?: InputMaybe<Scalars['BigInt']>;
    uniqueHolders_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};
export declare enum MonthlyIndexStat_OrderBy {
    basePrice = "basePrice",
    basePriceETH = "basePriceETH",
    baseVolume = "baseVolume",
    date = "date",
    id = "id",
    index = "index",
    marketCap = "marketCap",
    uniqueHolders = "uniqueHolders"
}
export declare type Order = {
    __typename?: 'Order';
    /** Address (hash) */
    id: Scalars['ID'];
    index: Index;
    orderDetails: Array<OrderDetailsInfo>;
    order_id: Scalars['BigInt'];
};
export declare type OrderOrderDetailsArgs = {
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<OrderDetailsInfo_OrderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    where?: InputMaybe<OrderDetailsInfo_Filter>;
};
export declare type OrderDetailsInfo = {
    __typename?: 'OrderDetailsInfo';
    asset: Asset;
    id: Scalars['ID'];
    order: Order;
    shares: Scalars['BigInt'];
    side: Scalars['String'];
};
export declare type OrderDetailsInfo_Filter = {
    /** Filter for the block changed event. */
    _change_block?: InputMaybe<BlockChangedFilter>;
    asset?: InputMaybe<Scalars['String']>;
    asset_?: InputMaybe<Asset_Filter>;
    asset_contains?: InputMaybe<Scalars['String']>;
    asset_contains_nocase?: InputMaybe<Scalars['String']>;
    asset_ends_with?: InputMaybe<Scalars['String']>;
    asset_ends_with_nocase?: InputMaybe<Scalars['String']>;
    asset_gt?: InputMaybe<Scalars['String']>;
    asset_gte?: InputMaybe<Scalars['String']>;
    asset_in?: InputMaybe<Array<Scalars['String']>>;
    asset_lt?: InputMaybe<Scalars['String']>;
    asset_lte?: InputMaybe<Scalars['String']>;
    asset_not?: InputMaybe<Scalars['String']>;
    asset_not_contains?: InputMaybe<Scalars['String']>;
    asset_not_contains_nocase?: InputMaybe<Scalars['String']>;
    asset_not_ends_with?: InputMaybe<Scalars['String']>;
    asset_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
    asset_not_in?: InputMaybe<Array<Scalars['String']>>;
    asset_not_starts_with?: InputMaybe<Scalars['String']>;
    asset_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
    asset_starts_with?: InputMaybe<Scalars['String']>;
    asset_starts_with_nocase?: InputMaybe<Scalars['String']>;
    id?: InputMaybe<Scalars['ID']>;
    id_gt?: InputMaybe<Scalars['ID']>;
    id_gte?: InputMaybe<Scalars['ID']>;
    id_in?: InputMaybe<Array<Scalars['ID']>>;
    id_lt?: InputMaybe<Scalars['ID']>;
    id_lte?: InputMaybe<Scalars['ID']>;
    id_not?: InputMaybe<Scalars['ID']>;
    id_not_in?: InputMaybe<Array<Scalars['ID']>>;
    order?: InputMaybe<Scalars['String']>;
    order_?: InputMaybe<Order_Filter>;
    order_contains?: InputMaybe<Scalars['String']>;
    order_contains_nocase?: InputMaybe<Scalars['String']>;
    order_ends_with?: InputMaybe<Scalars['String']>;
    order_ends_with_nocase?: InputMaybe<Scalars['String']>;
    order_gt?: InputMaybe<Scalars['String']>;
    order_gte?: InputMaybe<Scalars['String']>;
    order_in?: InputMaybe<Array<Scalars['String']>>;
    order_lt?: InputMaybe<Scalars['String']>;
    order_lte?: InputMaybe<Scalars['String']>;
    order_not?: InputMaybe<Scalars['String']>;
    order_not_contains?: InputMaybe<Scalars['String']>;
    order_not_contains_nocase?: InputMaybe<Scalars['String']>;
    order_not_ends_with?: InputMaybe<Scalars['String']>;
    order_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
    order_not_in?: InputMaybe<Array<Scalars['String']>>;
    order_not_starts_with?: InputMaybe<Scalars['String']>;
    order_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
    order_starts_with?: InputMaybe<Scalars['String']>;
    order_starts_with_nocase?: InputMaybe<Scalars['String']>;
    shares?: InputMaybe<Scalars['BigInt']>;
    shares_gt?: InputMaybe<Scalars['BigInt']>;
    shares_gte?: InputMaybe<Scalars['BigInt']>;
    shares_in?: InputMaybe<Array<Scalars['BigInt']>>;
    shares_lt?: InputMaybe<Scalars['BigInt']>;
    shares_lte?: InputMaybe<Scalars['BigInt']>;
    shares_not?: InputMaybe<Scalars['BigInt']>;
    shares_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    side?: InputMaybe<Scalars['String']>;
    side_contains?: InputMaybe<Scalars['String']>;
    side_contains_nocase?: InputMaybe<Scalars['String']>;
    side_ends_with?: InputMaybe<Scalars['String']>;
    side_ends_with_nocase?: InputMaybe<Scalars['String']>;
    side_gt?: InputMaybe<Scalars['String']>;
    side_gte?: InputMaybe<Scalars['String']>;
    side_in?: InputMaybe<Array<Scalars['String']>>;
    side_lt?: InputMaybe<Scalars['String']>;
    side_lte?: InputMaybe<Scalars['String']>;
    side_not?: InputMaybe<Scalars['String']>;
    side_not_contains?: InputMaybe<Scalars['String']>;
    side_not_contains_nocase?: InputMaybe<Scalars['String']>;
    side_not_ends_with?: InputMaybe<Scalars['String']>;
    side_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
    side_not_in?: InputMaybe<Array<Scalars['String']>>;
    side_not_starts_with?: InputMaybe<Scalars['String']>;
    side_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
    side_starts_with?: InputMaybe<Scalars['String']>;
    side_starts_with_nocase?: InputMaybe<Scalars['String']>;
};
export declare enum OrderDetailsInfo_OrderBy {
    asset = "asset",
    id = "id",
    order = "order",
    shares = "shares",
    side = "side"
}
/** Defines the order direction, either ascending or descending */
export declare enum OrderDirection {
    asc = "asc",
    desc = "desc"
}
export declare type Order_Filter = {
    /** Filter for the block changed event. */
    _change_block?: InputMaybe<BlockChangedFilter>;
    id?: InputMaybe<Scalars['ID']>;
    id_gt?: InputMaybe<Scalars['ID']>;
    id_gte?: InputMaybe<Scalars['ID']>;
    id_in?: InputMaybe<Array<Scalars['ID']>>;
    id_lt?: InputMaybe<Scalars['ID']>;
    id_lte?: InputMaybe<Scalars['ID']>;
    id_not?: InputMaybe<Scalars['ID']>;
    id_not_in?: InputMaybe<Array<Scalars['ID']>>;
    index?: InputMaybe<Scalars['String']>;
    index_?: InputMaybe<Index_Filter>;
    index_contains?: InputMaybe<Scalars['String']>;
    index_contains_nocase?: InputMaybe<Scalars['String']>;
    index_ends_with?: InputMaybe<Scalars['String']>;
    index_ends_with_nocase?: InputMaybe<Scalars['String']>;
    index_gt?: InputMaybe<Scalars['String']>;
    index_gte?: InputMaybe<Scalars['String']>;
    index_in?: InputMaybe<Array<Scalars['String']>>;
    index_lt?: InputMaybe<Scalars['String']>;
    index_lte?: InputMaybe<Scalars['String']>;
    index_not?: InputMaybe<Scalars['String']>;
    index_not_contains?: InputMaybe<Scalars['String']>;
    index_not_contains_nocase?: InputMaybe<Scalars['String']>;
    index_not_ends_with?: InputMaybe<Scalars['String']>;
    index_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
    index_not_in?: InputMaybe<Array<Scalars['String']>>;
    index_not_starts_with?: InputMaybe<Scalars['String']>;
    index_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
    index_starts_with?: InputMaybe<Scalars['String']>;
    index_starts_with_nocase?: InputMaybe<Scalars['String']>;
    orderDetails_?: InputMaybe<OrderDetailsInfo_Filter>;
    order_id?: InputMaybe<Scalars['BigInt']>;
    order_id_gt?: InputMaybe<Scalars['BigInt']>;
    order_id_gte?: InputMaybe<Scalars['BigInt']>;
    order_id_in?: InputMaybe<Array<Scalars['BigInt']>>;
    order_id_lt?: InputMaybe<Scalars['BigInt']>;
    order_id_lte?: InputMaybe<Scalars['BigInt']>;
    order_id_not?: InputMaybe<Scalars['BigInt']>;
    order_id_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};
export declare enum Order_OrderBy {
    id = "id",
    index = "index",
    orderDetails = "orderDetails",
    order_id = "order_id"
}
export declare type Pair = {
    __typename?: 'Pair';
    asset0: Asset;
    asset0Reserve: Scalars['BigDecimal'];
    asset1: Asset;
    asset1Reserve: Scalars['BigDecimal'];
    id: Scalars['ID'];
    swap: Swap;
    totalSupply: Scalars['BigInt'];
};
export declare type Pair_Filter = {
    /** Filter for the block changed event. */
    _change_block?: InputMaybe<BlockChangedFilter>;
    asset0?: InputMaybe<Scalars['String']>;
    asset0Reserve?: InputMaybe<Scalars['BigDecimal']>;
    asset0Reserve_gt?: InputMaybe<Scalars['BigDecimal']>;
    asset0Reserve_gte?: InputMaybe<Scalars['BigDecimal']>;
    asset0Reserve_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    asset0Reserve_lt?: InputMaybe<Scalars['BigDecimal']>;
    asset0Reserve_lte?: InputMaybe<Scalars['BigDecimal']>;
    asset0Reserve_not?: InputMaybe<Scalars['BigDecimal']>;
    asset0Reserve_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    asset0_?: InputMaybe<Asset_Filter>;
    asset0_contains?: InputMaybe<Scalars['String']>;
    asset0_contains_nocase?: InputMaybe<Scalars['String']>;
    asset0_ends_with?: InputMaybe<Scalars['String']>;
    asset0_ends_with_nocase?: InputMaybe<Scalars['String']>;
    asset0_gt?: InputMaybe<Scalars['String']>;
    asset0_gte?: InputMaybe<Scalars['String']>;
    asset0_in?: InputMaybe<Array<Scalars['String']>>;
    asset0_lt?: InputMaybe<Scalars['String']>;
    asset0_lte?: InputMaybe<Scalars['String']>;
    asset0_not?: InputMaybe<Scalars['String']>;
    asset0_not_contains?: InputMaybe<Scalars['String']>;
    asset0_not_contains_nocase?: InputMaybe<Scalars['String']>;
    asset0_not_ends_with?: InputMaybe<Scalars['String']>;
    asset0_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
    asset0_not_in?: InputMaybe<Array<Scalars['String']>>;
    asset0_not_starts_with?: InputMaybe<Scalars['String']>;
    asset0_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
    asset0_starts_with?: InputMaybe<Scalars['String']>;
    asset0_starts_with_nocase?: InputMaybe<Scalars['String']>;
    asset1?: InputMaybe<Scalars['String']>;
    asset1Reserve?: InputMaybe<Scalars['BigDecimal']>;
    asset1Reserve_gt?: InputMaybe<Scalars['BigDecimal']>;
    asset1Reserve_gte?: InputMaybe<Scalars['BigDecimal']>;
    asset1Reserve_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    asset1Reserve_lt?: InputMaybe<Scalars['BigDecimal']>;
    asset1Reserve_lte?: InputMaybe<Scalars['BigDecimal']>;
    asset1Reserve_not?: InputMaybe<Scalars['BigDecimal']>;
    asset1Reserve_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    asset1_?: InputMaybe<Asset_Filter>;
    asset1_contains?: InputMaybe<Scalars['String']>;
    asset1_contains_nocase?: InputMaybe<Scalars['String']>;
    asset1_ends_with?: InputMaybe<Scalars['String']>;
    asset1_ends_with_nocase?: InputMaybe<Scalars['String']>;
    asset1_gt?: InputMaybe<Scalars['String']>;
    asset1_gte?: InputMaybe<Scalars['String']>;
    asset1_in?: InputMaybe<Array<Scalars['String']>>;
    asset1_lt?: InputMaybe<Scalars['String']>;
    asset1_lte?: InputMaybe<Scalars['String']>;
    asset1_not?: InputMaybe<Scalars['String']>;
    asset1_not_contains?: InputMaybe<Scalars['String']>;
    asset1_not_contains_nocase?: InputMaybe<Scalars['String']>;
    asset1_not_ends_with?: InputMaybe<Scalars['String']>;
    asset1_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
    asset1_not_in?: InputMaybe<Array<Scalars['String']>>;
    asset1_not_starts_with?: InputMaybe<Scalars['String']>;
    asset1_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
    asset1_starts_with?: InputMaybe<Scalars['String']>;
    asset1_starts_with_nocase?: InputMaybe<Scalars['String']>;
    id?: InputMaybe<Scalars['ID']>;
    id_gt?: InputMaybe<Scalars['ID']>;
    id_gte?: InputMaybe<Scalars['ID']>;
    id_in?: InputMaybe<Array<Scalars['ID']>>;
    id_lt?: InputMaybe<Scalars['ID']>;
    id_lte?: InputMaybe<Scalars['ID']>;
    id_not?: InputMaybe<Scalars['ID']>;
    id_not_in?: InputMaybe<Array<Scalars['ID']>>;
    swap?: InputMaybe<Scalars['String']>;
    swap_?: InputMaybe<Swap_Filter>;
    swap_contains?: InputMaybe<Scalars['String']>;
    swap_contains_nocase?: InputMaybe<Scalars['String']>;
    swap_ends_with?: InputMaybe<Scalars['String']>;
    swap_ends_with_nocase?: InputMaybe<Scalars['String']>;
    swap_gt?: InputMaybe<Scalars['String']>;
    swap_gte?: InputMaybe<Scalars['String']>;
    swap_in?: InputMaybe<Array<Scalars['String']>>;
    swap_lt?: InputMaybe<Scalars['String']>;
    swap_lte?: InputMaybe<Scalars['String']>;
    swap_not?: InputMaybe<Scalars['String']>;
    swap_not_contains?: InputMaybe<Scalars['String']>;
    swap_not_contains_nocase?: InputMaybe<Scalars['String']>;
    swap_not_ends_with?: InputMaybe<Scalars['String']>;
    swap_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
    swap_not_in?: InputMaybe<Array<Scalars['String']>>;
    swap_not_starts_with?: InputMaybe<Scalars['String']>;
    swap_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
    swap_starts_with?: InputMaybe<Scalars['String']>;
    swap_starts_with_nocase?: InputMaybe<Scalars['String']>;
    totalSupply?: InputMaybe<Scalars['BigInt']>;
    totalSupply_gt?: InputMaybe<Scalars['BigInt']>;
    totalSupply_gte?: InputMaybe<Scalars['BigInt']>;
    totalSupply_in?: InputMaybe<Array<Scalars['BigInt']>>;
    totalSupply_lt?: InputMaybe<Scalars['BigInt']>;
    totalSupply_lte?: InputMaybe<Scalars['BigInt']>;
    totalSupply_not?: InputMaybe<Scalars['BigInt']>;
    totalSupply_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};
export declare enum Pair_OrderBy {
    asset0 = "asset0",
    asset0Reserve = "asset0Reserve",
    asset1 = "asset1",
    asset1Reserve = "asset1Reserve",
    id = "id",
    swap = "swap",
    totalSupply = "totalSupply"
}
export declare type Query = {
    __typename?: 'Query';
    /** Access to subgraph metadata */
    _meta?: Maybe<_Meta_>;
    asset?: Maybe<Asset>;
    assets: Array<Asset>;
    chainLinkAgg?: Maybe<ChainLinkAgg>;
    chainLinkAggs: Array<ChainLinkAgg>;
    dailyAssetStat?: Maybe<DailyAssetStat>;
    dailyAssetStats: Array<DailyAssetStat>;
    dailyCapitalization?: Maybe<DailyCapitalization>;
    dailyCapitalizations: Array<DailyCapitalization>;
    dailyIndexStat?: Maybe<DailyIndexStat>;
    dailyIndexStats: Array<DailyIndexStat>;
    dailyStat?: Maybe<DailyStat>;
    dailyStats: Array<DailyStat>;
    dailyUserIndexHistories: Array<DailyUserIndexHistory>;
    dailyUserIndexHistory?: Maybe<DailyUserIndexHistory>;
    dex?: Maybe<Dex>;
    dexs: Array<Dex>;
    hourlyIndexStat?: Maybe<HourlyIndexStat>;
    hourlyIndexStats: Array<HourlyIndexStat>;
    index?: Maybe<Index>;
    indexAsset?: Maybe<IndexAsset>;
    indexAssets: Array<IndexAsset>;
    indexFactories: Array<IndexFactory>;
    indexFactory?: Maybe<IndexFactory>;
    indexes: Array<Index>;
    lastOrderIndex?: Maybe<LastOrderIndex>;
    lastOrderIndexes: Array<LastOrderIndex>;
    monthlyIndexStat?: Maybe<MonthlyIndexStat>;
    monthlyIndexStats: Array<MonthlyIndexStat>;
    order?: Maybe<Order>;
    orderDetailsInfo?: Maybe<OrderDetailsInfo>;
    orderDetailsInfos: Array<OrderDetailsInfo>;
    orders: Array<Order>;
    pair?: Maybe<Pair>;
    pairs: Array<Pair>;
    stat?: Maybe<Stat>;
    stats: Array<Stat>;
    sushiPair?: Maybe<SushiPair>;
    sushiPairs: Array<SushiPair>;
    swap?: Maybe<Swap>;
    swaps: Array<Swap>;
    transaction?: Maybe<Transaction>;
    transactions: Array<Transaction>;
    transfer?: Maybe<Transfer>;
    transfers: Array<Transfer>;
    user?: Maybe<User>;
    userCapitalization?: Maybe<UserCapitalization>;
    userCapitalizations: Array<UserCapitalization>;
    userIndex?: Maybe<UserIndex>;
    userIndexHistories: Array<UserIndexHistory>;
    userIndexHistory?: Maybe<UserIndexHistory>;
    userIndexes: Array<UserIndex>;
    users: Array<User>;
    vToken?: Maybe<VToken>;
    vTokens: Array<VToken>;
    weeklyIndexStat?: Maybe<WeeklyIndexStat>;
    weeklyIndexStats: Array<WeeklyIndexStat>;
    yearlyIndexStat?: Maybe<YearlyIndexStat>;
    yearlyIndexStats: Array<YearlyIndexStat>;
};
export declare type Query_MetaArgs = {
    block?: InputMaybe<Block_Height>;
};
export declare type QueryAssetArgs = {
    block?: InputMaybe<Block_Height>;
    id: Scalars['ID'];
    subgraphError?: _SubgraphErrorPolicy_;
};
export declare type QueryAssetsArgs = {
    block?: InputMaybe<Block_Height>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<Asset_OrderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    subgraphError?: _SubgraphErrorPolicy_;
    where?: InputMaybe<Asset_Filter>;
};
export declare type QueryChainLinkAggArgs = {
    block?: InputMaybe<Block_Height>;
    id: Scalars['ID'];
    subgraphError?: _SubgraphErrorPolicy_;
};
export declare type QueryChainLinkAggsArgs = {
    block?: InputMaybe<Block_Height>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<ChainLinkAgg_OrderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    subgraphError?: _SubgraphErrorPolicy_;
    where?: InputMaybe<ChainLinkAgg_Filter>;
};
export declare type QueryDailyAssetStatArgs = {
    block?: InputMaybe<Block_Height>;
    id: Scalars['ID'];
    subgraphError?: _SubgraphErrorPolicy_;
};
export declare type QueryDailyAssetStatsArgs = {
    block?: InputMaybe<Block_Height>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<DailyAssetStat_OrderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    subgraphError?: _SubgraphErrorPolicy_;
    where?: InputMaybe<DailyAssetStat_Filter>;
};
export declare type QueryDailyCapitalizationArgs = {
    block?: InputMaybe<Block_Height>;
    id: Scalars['ID'];
    subgraphError?: _SubgraphErrorPolicy_;
};
export declare type QueryDailyCapitalizationsArgs = {
    block?: InputMaybe<Block_Height>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<DailyCapitalization_OrderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    subgraphError?: _SubgraphErrorPolicy_;
    where?: InputMaybe<DailyCapitalization_Filter>;
};
export declare type QueryDailyIndexStatArgs = {
    block?: InputMaybe<Block_Height>;
    id: Scalars['ID'];
    subgraphError?: _SubgraphErrorPolicy_;
};
export declare type QueryDailyIndexStatsArgs = {
    block?: InputMaybe<Block_Height>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<DailyIndexStat_OrderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    subgraphError?: _SubgraphErrorPolicy_;
    where?: InputMaybe<DailyIndexStat_Filter>;
};
export declare type QueryDailyStatArgs = {
    block?: InputMaybe<Block_Height>;
    id: Scalars['ID'];
    subgraphError?: _SubgraphErrorPolicy_;
};
export declare type QueryDailyStatsArgs = {
    block?: InputMaybe<Block_Height>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<DailyStat_OrderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    subgraphError?: _SubgraphErrorPolicy_;
    where?: InputMaybe<DailyStat_Filter>;
};
export declare type QueryDailyUserIndexHistoriesArgs = {
    block?: InputMaybe<Block_Height>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<DailyUserIndexHistory_OrderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    subgraphError?: _SubgraphErrorPolicy_;
    where?: InputMaybe<DailyUserIndexHistory_Filter>;
};
export declare type QueryDailyUserIndexHistoryArgs = {
    block?: InputMaybe<Block_Height>;
    id: Scalars['ID'];
    subgraphError?: _SubgraphErrorPolicy_;
};
export declare type QueryDexArgs = {
    block?: InputMaybe<Block_Height>;
    id: Scalars['ID'];
    subgraphError?: _SubgraphErrorPolicy_;
};
export declare type QueryDexsArgs = {
    block?: InputMaybe<Block_Height>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<Dex_OrderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    subgraphError?: _SubgraphErrorPolicy_;
    where?: InputMaybe<Dex_Filter>;
};
export declare type QueryHourlyIndexStatArgs = {
    block?: InputMaybe<Block_Height>;
    id: Scalars['ID'];
    subgraphError?: _SubgraphErrorPolicy_;
};
export declare type QueryHourlyIndexStatsArgs = {
    block?: InputMaybe<Block_Height>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<HourlyIndexStat_OrderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    subgraphError?: _SubgraphErrorPolicy_;
    where?: InputMaybe<HourlyIndexStat_Filter>;
};
export declare type QueryIndexArgs = {
    block?: InputMaybe<Block_Height>;
    id: Scalars['ID'];
    subgraphError?: _SubgraphErrorPolicy_;
};
export declare type QueryIndexAssetArgs = {
    block?: InputMaybe<Block_Height>;
    id: Scalars['ID'];
    subgraphError?: _SubgraphErrorPolicy_;
};
export declare type QueryIndexAssetsArgs = {
    block?: InputMaybe<Block_Height>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<IndexAsset_OrderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    subgraphError?: _SubgraphErrorPolicy_;
    where?: InputMaybe<IndexAsset_Filter>;
};
export declare type QueryIndexFactoriesArgs = {
    block?: InputMaybe<Block_Height>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<IndexFactory_OrderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    subgraphError?: _SubgraphErrorPolicy_;
    where?: InputMaybe<IndexFactory_Filter>;
};
export declare type QueryIndexFactoryArgs = {
    block?: InputMaybe<Block_Height>;
    id: Scalars['ID'];
    subgraphError?: _SubgraphErrorPolicy_;
};
export declare type QueryIndexesArgs = {
    block?: InputMaybe<Block_Height>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<Index_OrderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    subgraphError?: _SubgraphErrorPolicy_;
    where?: InputMaybe<Index_Filter>;
};
export declare type QueryLastOrderIndexArgs = {
    block?: InputMaybe<Block_Height>;
    id: Scalars['ID'];
    subgraphError?: _SubgraphErrorPolicy_;
};
export declare type QueryLastOrderIndexesArgs = {
    block?: InputMaybe<Block_Height>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<LastOrderIndex_OrderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    subgraphError?: _SubgraphErrorPolicy_;
    where?: InputMaybe<LastOrderIndex_Filter>;
};
export declare type QueryMonthlyIndexStatArgs = {
    block?: InputMaybe<Block_Height>;
    id: Scalars['ID'];
    subgraphError?: _SubgraphErrorPolicy_;
};
export declare type QueryMonthlyIndexStatsArgs = {
    block?: InputMaybe<Block_Height>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<MonthlyIndexStat_OrderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    subgraphError?: _SubgraphErrorPolicy_;
    where?: InputMaybe<MonthlyIndexStat_Filter>;
};
export declare type QueryOrderArgs = {
    block?: InputMaybe<Block_Height>;
    id: Scalars['ID'];
    subgraphError?: _SubgraphErrorPolicy_;
};
export declare type QueryOrderDetailsInfoArgs = {
    block?: InputMaybe<Block_Height>;
    id: Scalars['ID'];
    subgraphError?: _SubgraphErrorPolicy_;
};
export declare type QueryOrderDetailsInfosArgs = {
    block?: InputMaybe<Block_Height>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<OrderDetailsInfo_OrderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    subgraphError?: _SubgraphErrorPolicy_;
    where?: InputMaybe<OrderDetailsInfo_Filter>;
};
export declare type QueryOrdersArgs = {
    block?: InputMaybe<Block_Height>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<Order_OrderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    subgraphError?: _SubgraphErrorPolicy_;
    where?: InputMaybe<Order_Filter>;
};
export declare type QueryPairArgs = {
    block?: InputMaybe<Block_Height>;
    id: Scalars['ID'];
    subgraphError?: _SubgraphErrorPolicy_;
};
export declare type QueryPairsArgs = {
    block?: InputMaybe<Block_Height>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<Pair_OrderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    subgraphError?: _SubgraphErrorPolicy_;
    where?: InputMaybe<Pair_Filter>;
};
export declare type QueryStatArgs = {
    block?: InputMaybe<Block_Height>;
    id: Scalars['ID'];
    subgraphError?: _SubgraphErrorPolicy_;
};
export declare type QueryStatsArgs = {
    block?: InputMaybe<Block_Height>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<Stat_OrderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    subgraphError?: _SubgraphErrorPolicy_;
    where?: InputMaybe<Stat_Filter>;
};
export declare type QuerySushiPairArgs = {
    block?: InputMaybe<Block_Height>;
    id: Scalars['ID'];
    subgraphError?: _SubgraphErrorPolicy_;
};
export declare type QuerySushiPairsArgs = {
    block?: InputMaybe<Block_Height>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<SushiPair_OrderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    subgraphError?: _SubgraphErrorPolicy_;
    where?: InputMaybe<SushiPair_Filter>;
};
export declare type QuerySwapArgs = {
    block?: InputMaybe<Block_Height>;
    id: Scalars['ID'];
    subgraphError?: _SubgraphErrorPolicy_;
};
export declare type QuerySwapsArgs = {
    block?: InputMaybe<Block_Height>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<Swap_OrderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    subgraphError?: _SubgraphErrorPolicy_;
    where?: InputMaybe<Swap_Filter>;
};
export declare type QueryTransactionArgs = {
    block?: InputMaybe<Block_Height>;
    id: Scalars['ID'];
    subgraphError?: _SubgraphErrorPolicy_;
};
export declare type QueryTransactionsArgs = {
    block?: InputMaybe<Block_Height>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<Transaction_OrderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    subgraphError?: _SubgraphErrorPolicy_;
    where?: InputMaybe<Transaction_Filter>;
};
export declare type QueryTransferArgs = {
    block?: InputMaybe<Block_Height>;
    id: Scalars['ID'];
    subgraphError?: _SubgraphErrorPolicy_;
};
export declare type QueryTransfersArgs = {
    block?: InputMaybe<Block_Height>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<Transfer_OrderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    subgraphError?: _SubgraphErrorPolicy_;
    where?: InputMaybe<Transfer_Filter>;
};
export declare type QueryUserArgs = {
    block?: InputMaybe<Block_Height>;
    id: Scalars['ID'];
    subgraphError?: _SubgraphErrorPolicy_;
};
export declare type QueryUserCapitalizationArgs = {
    block?: InputMaybe<Block_Height>;
    id: Scalars['ID'];
    subgraphError?: _SubgraphErrorPolicy_;
};
export declare type QueryUserCapitalizationsArgs = {
    block?: InputMaybe<Block_Height>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<UserCapitalization_OrderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    subgraphError?: _SubgraphErrorPolicy_;
    where?: InputMaybe<UserCapitalization_Filter>;
};
export declare type QueryUserIndexArgs = {
    block?: InputMaybe<Block_Height>;
    id: Scalars['ID'];
    subgraphError?: _SubgraphErrorPolicy_;
};
export declare type QueryUserIndexHistoriesArgs = {
    block?: InputMaybe<Block_Height>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<UserIndexHistory_OrderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    subgraphError?: _SubgraphErrorPolicy_;
    where?: InputMaybe<UserIndexHistory_Filter>;
};
export declare type QueryUserIndexHistoryArgs = {
    block?: InputMaybe<Block_Height>;
    id: Scalars['ID'];
    subgraphError?: _SubgraphErrorPolicy_;
};
export declare type QueryUserIndexesArgs = {
    block?: InputMaybe<Block_Height>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<UserIndex_OrderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    subgraphError?: _SubgraphErrorPolicy_;
    where?: InputMaybe<UserIndex_Filter>;
};
export declare type QueryUsersArgs = {
    block?: InputMaybe<Block_Height>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<User_OrderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    subgraphError?: _SubgraphErrorPolicy_;
    where?: InputMaybe<User_Filter>;
};
export declare type QueryVTokenArgs = {
    block?: InputMaybe<Block_Height>;
    id: Scalars['ID'];
    subgraphError?: _SubgraphErrorPolicy_;
};
export declare type QueryVTokensArgs = {
    block?: InputMaybe<Block_Height>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<VToken_OrderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    subgraphError?: _SubgraphErrorPolicy_;
    where?: InputMaybe<VToken_Filter>;
};
export declare type QueryWeeklyIndexStatArgs = {
    block?: InputMaybe<Block_Height>;
    id: Scalars['ID'];
    subgraphError?: _SubgraphErrorPolicy_;
};
export declare type QueryWeeklyIndexStatsArgs = {
    block?: InputMaybe<Block_Height>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<WeeklyIndexStat_OrderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    subgraphError?: _SubgraphErrorPolicy_;
    where?: InputMaybe<WeeklyIndexStat_Filter>;
};
export declare type QueryYearlyIndexStatArgs = {
    block?: InputMaybe<Block_Height>;
    id: Scalars['ID'];
    subgraphError?: _SubgraphErrorPolicy_;
};
export declare type QueryYearlyIndexStatsArgs = {
    block?: InputMaybe<Block_Height>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<YearlyIndexStat_OrderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    subgraphError?: _SubgraphErrorPolicy_;
    where?: InputMaybe<YearlyIndexStat_Filter>;
};
export declare type Stat = {
    __typename?: 'Stat';
    id: Scalars['ID'];
    indexCount: Scalars['BigInt'];
    totalValueLocked: Scalars['BigDecimal'];
};
export declare type Stat_Filter = {
    /** Filter for the block changed event. */
    _change_block?: InputMaybe<BlockChangedFilter>;
    id?: InputMaybe<Scalars['ID']>;
    id_gt?: InputMaybe<Scalars['ID']>;
    id_gte?: InputMaybe<Scalars['ID']>;
    id_in?: InputMaybe<Array<Scalars['ID']>>;
    id_lt?: InputMaybe<Scalars['ID']>;
    id_lte?: InputMaybe<Scalars['ID']>;
    id_not?: InputMaybe<Scalars['ID']>;
    id_not_in?: InputMaybe<Array<Scalars['ID']>>;
    indexCount?: InputMaybe<Scalars['BigInt']>;
    indexCount_gt?: InputMaybe<Scalars['BigInt']>;
    indexCount_gte?: InputMaybe<Scalars['BigInt']>;
    indexCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
    indexCount_lt?: InputMaybe<Scalars['BigInt']>;
    indexCount_lte?: InputMaybe<Scalars['BigInt']>;
    indexCount_not?: InputMaybe<Scalars['BigInt']>;
    indexCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    totalValueLocked?: InputMaybe<Scalars['BigDecimal']>;
    totalValueLocked_gt?: InputMaybe<Scalars['BigDecimal']>;
    totalValueLocked_gte?: InputMaybe<Scalars['BigDecimal']>;
    totalValueLocked_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    totalValueLocked_lt?: InputMaybe<Scalars['BigDecimal']>;
    totalValueLocked_lte?: InputMaybe<Scalars['BigDecimal']>;
    totalValueLocked_not?: InputMaybe<Scalars['BigDecimal']>;
    totalValueLocked_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
};
export declare enum Stat_OrderBy {
    id = "id",
    indexCount = "indexCount",
    totalValueLocked = "totalValueLocked"
}
export declare type Subscription = {
    __typename?: 'Subscription';
    /** Access to subgraph metadata */
    _meta?: Maybe<_Meta_>;
    asset?: Maybe<Asset>;
    assets: Array<Asset>;
    chainLinkAgg?: Maybe<ChainLinkAgg>;
    chainLinkAggs: Array<ChainLinkAgg>;
    dailyAssetStat?: Maybe<DailyAssetStat>;
    dailyAssetStats: Array<DailyAssetStat>;
    dailyCapitalization?: Maybe<DailyCapitalization>;
    dailyCapitalizations: Array<DailyCapitalization>;
    dailyIndexStat?: Maybe<DailyIndexStat>;
    dailyIndexStats: Array<DailyIndexStat>;
    dailyStat?: Maybe<DailyStat>;
    dailyStats: Array<DailyStat>;
    dailyUserIndexHistories: Array<DailyUserIndexHistory>;
    dailyUserIndexHistory?: Maybe<DailyUserIndexHistory>;
    dex?: Maybe<Dex>;
    dexs: Array<Dex>;
    hourlyIndexStat?: Maybe<HourlyIndexStat>;
    hourlyIndexStats: Array<HourlyIndexStat>;
    index?: Maybe<Index>;
    indexAsset?: Maybe<IndexAsset>;
    indexAssets: Array<IndexAsset>;
    indexFactories: Array<IndexFactory>;
    indexFactory?: Maybe<IndexFactory>;
    indexes: Array<Index>;
    lastOrderIndex?: Maybe<LastOrderIndex>;
    lastOrderIndexes: Array<LastOrderIndex>;
    monthlyIndexStat?: Maybe<MonthlyIndexStat>;
    monthlyIndexStats: Array<MonthlyIndexStat>;
    order?: Maybe<Order>;
    orderDetailsInfo?: Maybe<OrderDetailsInfo>;
    orderDetailsInfos: Array<OrderDetailsInfo>;
    orders: Array<Order>;
    pair?: Maybe<Pair>;
    pairs: Array<Pair>;
    stat?: Maybe<Stat>;
    stats: Array<Stat>;
    sushiPair?: Maybe<SushiPair>;
    sushiPairs: Array<SushiPair>;
    swap?: Maybe<Swap>;
    swaps: Array<Swap>;
    transaction?: Maybe<Transaction>;
    transactions: Array<Transaction>;
    transfer?: Maybe<Transfer>;
    transfers: Array<Transfer>;
    user?: Maybe<User>;
    userCapitalization?: Maybe<UserCapitalization>;
    userCapitalizations: Array<UserCapitalization>;
    userIndex?: Maybe<UserIndex>;
    userIndexHistories: Array<UserIndexHistory>;
    userIndexHistory?: Maybe<UserIndexHistory>;
    userIndexes: Array<UserIndex>;
    users: Array<User>;
    vToken?: Maybe<VToken>;
    vTokens: Array<VToken>;
    weeklyIndexStat?: Maybe<WeeklyIndexStat>;
    weeklyIndexStats: Array<WeeklyIndexStat>;
    yearlyIndexStat?: Maybe<YearlyIndexStat>;
    yearlyIndexStats: Array<YearlyIndexStat>;
};
export declare type Subscription_MetaArgs = {
    block?: InputMaybe<Block_Height>;
};
export declare type SubscriptionAssetArgs = {
    block?: InputMaybe<Block_Height>;
    id: Scalars['ID'];
    subgraphError?: _SubgraphErrorPolicy_;
};
export declare type SubscriptionAssetsArgs = {
    block?: InputMaybe<Block_Height>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<Asset_OrderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    subgraphError?: _SubgraphErrorPolicy_;
    where?: InputMaybe<Asset_Filter>;
};
export declare type SubscriptionChainLinkAggArgs = {
    block?: InputMaybe<Block_Height>;
    id: Scalars['ID'];
    subgraphError?: _SubgraphErrorPolicy_;
};
export declare type SubscriptionChainLinkAggsArgs = {
    block?: InputMaybe<Block_Height>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<ChainLinkAgg_OrderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    subgraphError?: _SubgraphErrorPolicy_;
    where?: InputMaybe<ChainLinkAgg_Filter>;
};
export declare type SubscriptionDailyAssetStatArgs = {
    block?: InputMaybe<Block_Height>;
    id: Scalars['ID'];
    subgraphError?: _SubgraphErrorPolicy_;
};
export declare type SubscriptionDailyAssetStatsArgs = {
    block?: InputMaybe<Block_Height>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<DailyAssetStat_OrderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    subgraphError?: _SubgraphErrorPolicy_;
    where?: InputMaybe<DailyAssetStat_Filter>;
};
export declare type SubscriptionDailyCapitalizationArgs = {
    block?: InputMaybe<Block_Height>;
    id: Scalars['ID'];
    subgraphError?: _SubgraphErrorPolicy_;
};
export declare type SubscriptionDailyCapitalizationsArgs = {
    block?: InputMaybe<Block_Height>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<DailyCapitalization_OrderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    subgraphError?: _SubgraphErrorPolicy_;
    where?: InputMaybe<DailyCapitalization_Filter>;
};
export declare type SubscriptionDailyIndexStatArgs = {
    block?: InputMaybe<Block_Height>;
    id: Scalars['ID'];
    subgraphError?: _SubgraphErrorPolicy_;
};
export declare type SubscriptionDailyIndexStatsArgs = {
    block?: InputMaybe<Block_Height>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<DailyIndexStat_OrderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    subgraphError?: _SubgraphErrorPolicy_;
    where?: InputMaybe<DailyIndexStat_Filter>;
};
export declare type SubscriptionDailyStatArgs = {
    block?: InputMaybe<Block_Height>;
    id: Scalars['ID'];
    subgraphError?: _SubgraphErrorPolicy_;
};
export declare type SubscriptionDailyStatsArgs = {
    block?: InputMaybe<Block_Height>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<DailyStat_OrderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    subgraphError?: _SubgraphErrorPolicy_;
    where?: InputMaybe<DailyStat_Filter>;
};
export declare type SubscriptionDailyUserIndexHistoriesArgs = {
    block?: InputMaybe<Block_Height>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<DailyUserIndexHistory_OrderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    subgraphError?: _SubgraphErrorPolicy_;
    where?: InputMaybe<DailyUserIndexHistory_Filter>;
};
export declare type SubscriptionDailyUserIndexHistoryArgs = {
    block?: InputMaybe<Block_Height>;
    id: Scalars['ID'];
    subgraphError?: _SubgraphErrorPolicy_;
};
export declare type SubscriptionDexArgs = {
    block?: InputMaybe<Block_Height>;
    id: Scalars['ID'];
    subgraphError?: _SubgraphErrorPolicy_;
};
export declare type SubscriptionDexsArgs = {
    block?: InputMaybe<Block_Height>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<Dex_OrderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    subgraphError?: _SubgraphErrorPolicy_;
    where?: InputMaybe<Dex_Filter>;
};
export declare type SubscriptionHourlyIndexStatArgs = {
    block?: InputMaybe<Block_Height>;
    id: Scalars['ID'];
    subgraphError?: _SubgraphErrorPolicy_;
};
export declare type SubscriptionHourlyIndexStatsArgs = {
    block?: InputMaybe<Block_Height>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<HourlyIndexStat_OrderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    subgraphError?: _SubgraphErrorPolicy_;
    where?: InputMaybe<HourlyIndexStat_Filter>;
};
export declare type SubscriptionIndexArgs = {
    block?: InputMaybe<Block_Height>;
    id: Scalars['ID'];
    subgraphError?: _SubgraphErrorPolicy_;
};
export declare type SubscriptionIndexAssetArgs = {
    block?: InputMaybe<Block_Height>;
    id: Scalars['ID'];
    subgraphError?: _SubgraphErrorPolicy_;
};
export declare type SubscriptionIndexAssetsArgs = {
    block?: InputMaybe<Block_Height>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<IndexAsset_OrderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    subgraphError?: _SubgraphErrorPolicy_;
    where?: InputMaybe<IndexAsset_Filter>;
};
export declare type SubscriptionIndexFactoriesArgs = {
    block?: InputMaybe<Block_Height>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<IndexFactory_OrderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    subgraphError?: _SubgraphErrorPolicy_;
    where?: InputMaybe<IndexFactory_Filter>;
};
export declare type SubscriptionIndexFactoryArgs = {
    block?: InputMaybe<Block_Height>;
    id: Scalars['ID'];
    subgraphError?: _SubgraphErrorPolicy_;
};
export declare type SubscriptionIndexesArgs = {
    block?: InputMaybe<Block_Height>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<Index_OrderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    subgraphError?: _SubgraphErrorPolicy_;
    where?: InputMaybe<Index_Filter>;
};
export declare type SubscriptionLastOrderIndexArgs = {
    block?: InputMaybe<Block_Height>;
    id: Scalars['ID'];
    subgraphError?: _SubgraphErrorPolicy_;
};
export declare type SubscriptionLastOrderIndexesArgs = {
    block?: InputMaybe<Block_Height>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<LastOrderIndex_OrderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    subgraphError?: _SubgraphErrorPolicy_;
    where?: InputMaybe<LastOrderIndex_Filter>;
};
export declare type SubscriptionMonthlyIndexStatArgs = {
    block?: InputMaybe<Block_Height>;
    id: Scalars['ID'];
    subgraphError?: _SubgraphErrorPolicy_;
};
export declare type SubscriptionMonthlyIndexStatsArgs = {
    block?: InputMaybe<Block_Height>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<MonthlyIndexStat_OrderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    subgraphError?: _SubgraphErrorPolicy_;
    where?: InputMaybe<MonthlyIndexStat_Filter>;
};
export declare type SubscriptionOrderArgs = {
    block?: InputMaybe<Block_Height>;
    id: Scalars['ID'];
    subgraphError?: _SubgraphErrorPolicy_;
};
export declare type SubscriptionOrderDetailsInfoArgs = {
    block?: InputMaybe<Block_Height>;
    id: Scalars['ID'];
    subgraphError?: _SubgraphErrorPolicy_;
};
export declare type SubscriptionOrderDetailsInfosArgs = {
    block?: InputMaybe<Block_Height>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<OrderDetailsInfo_OrderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    subgraphError?: _SubgraphErrorPolicy_;
    where?: InputMaybe<OrderDetailsInfo_Filter>;
};
export declare type SubscriptionOrdersArgs = {
    block?: InputMaybe<Block_Height>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<Order_OrderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    subgraphError?: _SubgraphErrorPolicy_;
    where?: InputMaybe<Order_Filter>;
};
export declare type SubscriptionPairArgs = {
    block?: InputMaybe<Block_Height>;
    id: Scalars['ID'];
    subgraphError?: _SubgraphErrorPolicy_;
};
export declare type SubscriptionPairsArgs = {
    block?: InputMaybe<Block_Height>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<Pair_OrderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    subgraphError?: _SubgraphErrorPolicy_;
    where?: InputMaybe<Pair_Filter>;
};
export declare type SubscriptionStatArgs = {
    block?: InputMaybe<Block_Height>;
    id: Scalars['ID'];
    subgraphError?: _SubgraphErrorPolicy_;
};
export declare type SubscriptionStatsArgs = {
    block?: InputMaybe<Block_Height>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<Stat_OrderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    subgraphError?: _SubgraphErrorPolicy_;
    where?: InputMaybe<Stat_Filter>;
};
export declare type SubscriptionSushiPairArgs = {
    block?: InputMaybe<Block_Height>;
    id: Scalars['ID'];
    subgraphError?: _SubgraphErrorPolicy_;
};
export declare type SubscriptionSushiPairsArgs = {
    block?: InputMaybe<Block_Height>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<SushiPair_OrderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    subgraphError?: _SubgraphErrorPolicy_;
    where?: InputMaybe<SushiPair_Filter>;
};
export declare type SubscriptionSwapArgs = {
    block?: InputMaybe<Block_Height>;
    id: Scalars['ID'];
    subgraphError?: _SubgraphErrorPolicy_;
};
export declare type SubscriptionSwapsArgs = {
    block?: InputMaybe<Block_Height>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<Swap_OrderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    subgraphError?: _SubgraphErrorPolicy_;
    where?: InputMaybe<Swap_Filter>;
};
export declare type SubscriptionTransactionArgs = {
    block?: InputMaybe<Block_Height>;
    id: Scalars['ID'];
    subgraphError?: _SubgraphErrorPolicy_;
};
export declare type SubscriptionTransactionsArgs = {
    block?: InputMaybe<Block_Height>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<Transaction_OrderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    subgraphError?: _SubgraphErrorPolicy_;
    where?: InputMaybe<Transaction_Filter>;
};
export declare type SubscriptionTransferArgs = {
    block?: InputMaybe<Block_Height>;
    id: Scalars['ID'];
    subgraphError?: _SubgraphErrorPolicy_;
};
export declare type SubscriptionTransfersArgs = {
    block?: InputMaybe<Block_Height>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<Transfer_OrderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    subgraphError?: _SubgraphErrorPolicy_;
    where?: InputMaybe<Transfer_Filter>;
};
export declare type SubscriptionUserArgs = {
    block?: InputMaybe<Block_Height>;
    id: Scalars['ID'];
    subgraphError?: _SubgraphErrorPolicy_;
};
export declare type SubscriptionUserCapitalizationArgs = {
    block?: InputMaybe<Block_Height>;
    id: Scalars['ID'];
    subgraphError?: _SubgraphErrorPolicy_;
};
export declare type SubscriptionUserCapitalizationsArgs = {
    block?: InputMaybe<Block_Height>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<UserCapitalization_OrderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    subgraphError?: _SubgraphErrorPolicy_;
    where?: InputMaybe<UserCapitalization_Filter>;
};
export declare type SubscriptionUserIndexArgs = {
    block?: InputMaybe<Block_Height>;
    id: Scalars['ID'];
    subgraphError?: _SubgraphErrorPolicy_;
};
export declare type SubscriptionUserIndexHistoriesArgs = {
    block?: InputMaybe<Block_Height>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<UserIndexHistory_OrderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    subgraphError?: _SubgraphErrorPolicy_;
    where?: InputMaybe<UserIndexHistory_Filter>;
};
export declare type SubscriptionUserIndexHistoryArgs = {
    block?: InputMaybe<Block_Height>;
    id: Scalars['ID'];
    subgraphError?: _SubgraphErrorPolicy_;
};
export declare type SubscriptionUserIndexesArgs = {
    block?: InputMaybe<Block_Height>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<UserIndex_OrderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    subgraphError?: _SubgraphErrorPolicy_;
    where?: InputMaybe<UserIndex_Filter>;
};
export declare type SubscriptionUsersArgs = {
    block?: InputMaybe<Block_Height>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<User_OrderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    subgraphError?: _SubgraphErrorPolicy_;
    where?: InputMaybe<User_Filter>;
};
export declare type SubscriptionVTokenArgs = {
    block?: InputMaybe<Block_Height>;
    id: Scalars['ID'];
    subgraphError?: _SubgraphErrorPolicy_;
};
export declare type SubscriptionVTokensArgs = {
    block?: InputMaybe<Block_Height>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<VToken_OrderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    subgraphError?: _SubgraphErrorPolicy_;
    where?: InputMaybe<VToken_Filter>;
};
export declare type SubscriptionWeeklyIndexStatArgs = {
    block?: InputMaybe<Block_Height>;
    id: Scalars['ID'];
    subgraphError?: _SubgraphErrorPolicy_;
};
export declare type SubscriptionWeeklyIndexStatsArgs = {
    block?: InputMaybe<Block_Height>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<WeeklyIndexStat_OrderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    subgraphError?: _SubgraphErrorPolicy_;
    where?: InputMaybe<WeeklyIndexStat_Filter>;
};
export declare type SubscriptionYearlyIndexStatArgs = {
    block?: InputMaybe<Block_Height>;
    id: Scalars['ID'];
    subgraphError?: _SubgraphErrorPolicy_;
};
export declare type SubscriptionYearlyIndexStatsArgs = {
    block?: InputMaybe<Block_Height>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<YearlyIndexStat_OrderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    subgraphError?: _SubgraphErrorPolicy_;
    where?: InputMaybe<YearlyIndexStat_Filter>;
};
export declare type SushiPair = {
    __typename?: 'SushiPair';
    asset0: Asset;
    asset0Reserve: Scalars['BigDecimal'];
    asset1: Asset;
    asset1Reserve: Scalars['BigDecimal'];
    id: Scalars['ID'];
    swap: Swap;
    totalSupply: Scalars['BigInt'];
};
export declare type SushiPair_Filter = {
    /** Filter for the block changed event. */
    _change_block?: InputMaybe<BlockChangedFilter>;
    asset0?: InputMaybe<Scalars['String']>;
    asset0Reserve?: InputMaybe<Scalars['BigDecimal']>;
    asset0Reserve_gt?: InputMaybe<Scalars['BigDecimal']>;
    asset0Reserve_gte?: InputMaybe<Scalars['BigDecimal']>;
    asset0Reserve_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    asset0Reserve_lt?: InputMaybe<Scalars['BigDecimal']>;
    asset0Reserve_lte?: InputMaybe<Scalars['BigDecimal']>;
    asset0Reserve_not?: InputMaybe<Scalars['BigDecimal']>;
    asset0Reserve_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    asset0_?: InputMaybe<Asset_Filter>;
    asset0_contains?: InputMaybe<Scalars['String']>;
    asset0_contains_nocase?: InputMaybe<Scalars['String']>;
    asset0_ends_with?: InputMaybe<Scalars['String']>;
    asset0_ends_with_nocase?: InputMaybe<Scalars['String']>;
    asset0_gt?: InputMaybe<Scalars['String']>;
    asset0_gte?: InputMaybe<Scalars['String']>;
    asset0_in?: InputMaybe<Array<Scalars['String']>>;
    asset0_lt?: InputMaybe<Scalars['String']>;
    asset0_lte?: InputMaybe<Scalars['String']>;
    asset0_not?: InputMaybe<Scalars['String']>;
    asset0_not_contains?: InputMaybe<Scalars['String']>;
    asset0_not_contains_nocase?: InputMaybe<Scalars['String']>;
    asset0_not_ends_with?: InputMaybe<Scalars['String']>;
    asset0_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
    asset0_not_in?: InputMaybe<Array<Scalars['String']>>;
    asset0_not_starts_with?: InputMaybe<Scalars['String']>;
    asset0_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
    asset0_starts_with?: InputMaybe<Scalars['String']>;
    asset0_starts_with_nocase?: InputMaybe<Scalars['String']>;
    asset1?: InputMaybe<Scalars['String']>;
    asset1Reserve?: InputMaybe<Scalars['BigDecimal']>;
    asset1Reserve_gt?: InputMaybe<Scalars['BigDecimal']>;
    asset1Reserve_gte?: InputMaybe<Scalars['BigDecimal']>;
    asset1Reserve_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    asset1Reserve_lt?: InputMaybe<Scalars['BigDecimal']>;
    asset1Reserve_lte?: InputMaybe<Scalars['BigDecimal']>;
    asset1Reserve_not?: InputMaybe<Scalars['BigDecimal']>;
    asset1Reserve_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    asset1_?: InputMaybe<Asset_Filter>;
    asset1_contains?: InputMaybe<Scalars['String']>;
    asset1_contains_nocase?: InputMaybe<Scalars['String']>;
    asset1_ends_with?: InputMaybe<Scalars['String']>;
    asset1_ends_with_nocase?: InputMaybe<Scalars['String']>;
    asset1_gt?: InputMaybe<Scalars['String']>;
    asset1_gte?: InputMaybe<Scalars['String']>;
    asset1_in?: InputMaybe<Array<Scalars['String']>>;
    asset1_lt?: InputMaybe<Scalars['String']>;
    asset1_lte?: InputMaybe<Scalars['String']>;
    asset1_not?: InputMaybe<Scalars['String']>;
    asset1_not_contains?: InputMaybe<Scalars['String']>;
    asset1_not_contains_nocase?: InputMaybe<Scalars['String']>;
    asset1_not_ends_with?: InputMaybe<Scalars['String']>;
    asset1_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
    asset1_not_in?: InputMaybe<Array<Scalars['String']>>;
    asset1_not_starts_with?: InputMaybe<Scalars['String']>;
    asset1_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
    asset1_starts_with?: InputMaybe<Scalars['String']>;
    asset1_starts_with_nocase?: InputMaybe<Scalars['String']>;
    id?: InputMaybe<Scalars['ID']>;
    id_gt?: InputMaybe<Scalars['ID']>;
    id_gte?: InputMaybe<Scalars['ID']>;
    id_in?: InputMaybe<Array<Scalars['ID']>>;
    id_lt?: InputMaybe<Scalars['ID']>;
    id_lte?: InputMaybe<Scalars['ID']>;
    id_not?: InputMaybe<Scalars['ID']>;
    id_not_in?: InputMaybe<Array<Scalars['ID']>>;
    swap?: InputMaybe<Scalars['String']>;
    swap_?: InputMaybe<Swap_Filter>;
    swap_contains?: InputMaybe<Scalars['String']>;
    swap_contains_nocase?: InputMaybe<Scalars['String']>;
    swap_ends_with?: InputMaybe<Scalars['String']>;
    swap_ends_with_nocase?: InputMaybe<Scalars['String']>;
    swap_gt?: InputMaybe<Scalars['String']>;
    swap_gte?: InputMaybe<Scalars['String']>;
    swap_in?: InputMaybe<Array<Scalars['String']>>;
    swap_lt?: InputMaybe<Scalars['String']>;
    swap_lte?: InputMaybe<Scalars['String']>;
    swap_not?: InputMaybe<Scalars['String']>;
    swap_not_contains?: InputMaybe<Scalars['String']>;
    swap_not_contains_nocase?: InputMaybe<Scalars['String']>;
    swap_not_ends_with?: InputMaybe<Scalars['String']>;
    swap_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
    swap_not_in?: InputMaybe<Array<Scalars['String']>>;
    swap_not_starts_with?: InputMaybe<Scalars['String']>;
    swap_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
    swap_starts_with?: InputMaybe<Scalars['String']>;
    swap_starts_with_nocase?: InputMaybe<Scalars['String']>;
    totalSupply?: InputMaybe<Scalars['BigInt']>;
    totalSupply_gt?: InputMaybe<Scalars['BigInt']>;
    totalSupply_gte?: InputMaybe<Scalars['BigInt']>;
    totalSupply_in?: InputMaybe<Array<Scalars['BigInt']>>;
    totalSupply_lt?: InputMaybe<Scalars['BigInt']>;
    totalSupply_lte?: InputMaybe<Scalars['BigInt']>;
    totalSupply_not?: InputMaybe<Scalars['BigInt']>;
    totalSupply_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};
export declare enum SushiPair_OrderBy {
    asset0 = "asset0",
    asset0Reserve = "asset0Reserve",
    asset1 = "asset1",
    asset1Reserve = "asset1Reserve",
    id = "id",
    swap = "swap",
    totalSupply = "totalSupply"
}
export declare type Swap = {
    __typename?: 'Swap';
    id: Scalars['ID'];
    pairs: Array<Pair>;
};
export declare type SwapPairsArgs = {
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<Pair_OrderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    where?: InputMaybe<Pair_Filter>;
};
export declare type Swap_Filter = {
    /** Filter for the block changed event. */
    _change_block?: InputMaybe<BlockChangedFilter>;
    id?: InputMaybe<Scalars['ID']>;
    id_gt?: InputMaybe<Scalars['ID']>;
    id_gte?: InputMaybe<Scalars['ID']>;
    id_in?: InputMaybe<Array<Scalars['ID']>>;
    id_lt?: InputMaybe<Scalars['ID']>;
    id_lte?: InputMaybe<Scalars['ID']>;
    id_not?: InputMaybe<Scalars['ID']>;
    id_not_in?: InputMaybe<Array<Scalars['ID']>>;
    pairs_?: InputMaybe<Pair_Filter>;
};
export declare enum Swap_OrderBy {
    id = "id",
    pairs = "pairs"
}
export declare type Transaction = {
    __typename?: 'Transaction';
    blockNumber: Scalars['BigInt'];
    gasPrice: Scalars['BigInt'];
    gasUsed: Scalars['BigInt'];
    id: Scalars['ID'];
    timestamp: Scalars['BigInt'];
    transfers: Array<Transfer>;
    value: Scalars['BigInt'];
};
export declare type TransactionTransfersArgs = {
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<Transfer_OrderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    where?: InputMaybe<Transfer_Filter>;
};
export declare type Transaction_Filter = {
    /** Filter for the block changed event. */
    _change_block?: InputMaybe<BlockChangedFilter>;
    blockNumber?: InputMaybe<Scalars['BigInt']>;
    blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
    blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
    blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
    blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
    blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
    blockNumber_not?: InputMaybe<Scalars['BigInt']>;
    blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    gasPrice?: InputMaybe<Scalars['BigInt']>;
    gasPrice_gt?: InputMaybe<Scalars['BigInt']>;
    gasPrice_gte?: InputMaybe<Scalars['BigInt']>;
    gasPrice_in?: InputMaybe<Array<Scalars['BigInt']>>;
    gasPrice_lt?: InputMaybe<Scalars['BigInt']>;
    gasPrice_lte?: InputMaybe<Scalars['BigInt']>;
    gasPrice_not?: InputMaybe<Scalars['BigInt']>;
    gasPrice_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    gasUsed?: InputMaybe<Scalars['BigInt']>;
    gasUsed_gt?: InputMaybe<Scalars['BigInt']>;
    gasUsed_gte?: InputMaybe<Scalars['BigInt']>;
    gasUsed_in?: InputMaybe<Array<Scalars['BigInt']>>;
    gasUsed_lt?: InputMaybe<Scalars['BigInt']>;
    gasUsed_lte?: InputMaybe<Scalars['BigInt']>;
    gasUsed_not?: InputMaybe<Scalars['BigInt']>;
    gasUsed_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    id?: InputMaybe<Scalars['ID']>;
    id_gt?: InputMaybe<Scalars['ID']>;
    id_gte?: InputMaybe<Scalars['ID']>;
    id_in?: InputMaybe<Array<Scalars['ID']>>;
    id_lt?: InputMaybe<Scalars['ID']>;
    id_lte?: InputMaybe<Scalars['ID']>;
    id_not?: InputMaybe<Scalars['ID']>;
    id_not_in?: InputMaybe<Array<Scalars['ID']>>;
    timestamp?: InputMaybe<Scalars['BigInt']>;
    timestamp_gt?: InputMaybe<Scalars['BigInt']>;
    timestamp_gte?: InputMaybe<Scalars['BigInt']>;
    timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
    timestamp_lt?: InputMaybe<Scalars['BigInt']>;
    timestamp_lte?: InputMaybe<Scalars['BigInt']>;
    timestamp_not?: InputMaybe<Scalars['BigInt']>;
    timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    transfers?: InputMaybe<Array<Scalars['String']>>;
    transfers_?: InputMaybe<Transfer_Filter>;
    transfers_contains?: InputMaybe<Array<Scalars['String']>>;
    transfers_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
    transfers_not?: InputMaybe<Array<Scalars['String']>>;
    transfers_not_contains?: InputMaybe<Array<Scalars['String']>>;
    transfers_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
    value?: InputMaybe<Scalars['BigInt']>;
    value_gt?: InputMaybe<Scalars['BigInt']>;
    value_gte?: InputMaybe<Scalars['BigInt']>;
    value_in?: InputMaybe<Array<Scalars['BigInt']>>;
    value_lt?: InputMaybe<Scalars['BigInt']>;
    value_lte?: InputMaybe<Scalars['BigInt']>;
    value_not?: InputMaybe<Scalars['BigInt']>;
    value_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};
export declare enum Transaction_OrderBy {
    blockNumber = "blockNumber",
    gasPrice = "gasPrice",
    gasUsed = "gasUsed",
    id = "id",
    timestamp = "timestamp",
    transfers = "transfers",
    value = "value"
}
export declare type Transfer = {
    __typename?: 'Transfer';
    from?: Maybe<Scalars['Bytes']>;
    id: Scalars['ID'];
    index: Index;
    to?: Maybe<Scalars['Bytes']>;
    transaction: Transaction;
    type: TransferType;
    value: Scalars['BigInt'];
};
export declare enum TransferType {
    Burn = "Burn",
    Mint = "Mint",
    Send = "Send"
}
export declare type Transfer_Filter = {
    /** Filter for the block changed event. */
    _change_block?: InputMaybe<BlockChangedFilter>;
    from?: InputMaybe<Scalars['Bytes']>;
    from_contains?: InputMaybe<Scalars['Bytes']>;
    from_in?: InputMaybe<Array<Scalars['Bytes']>>;
    from_not?: InputMaybe<Scalars['Bytes']>;
    from_not_contains?: InputMaybe<Scalars['Bytes']>;
    from_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
    id?: InputMaybe<Scalars['ID']>;
    id_gt?: InputMaybe<Scalars['ID']>;
    id_gte?: InputMaybe<Scalars['ID']>;
    id_in?: InputMaybe<Array<Scalars['ID']>>;
    id_lt?: InputMaybe<Scalars['ID']>;
    id_lte?: InputMaybe<Scalars['ID']>;
    id_not?: InputMaybe<Scalars['ID']>;
    id_not_in?: InputMaybe<Array<Scalars['ID']>>;
    index?: InputMaybe<Scalars['String']>;
    index_?: InputMaybe<Index_Filter>;
    index_contains?: InputMaybe<Scalars['String']>;
    index_contains_nocase?: InputMaybe<Scalars['String']>;
    index_ends_with?: InputMaybe<Scalars['String']>;
    index_ends_with_nocase?: InputMaybe<Scalars['String']>;
    index_gt?: InputMaybe<Scalars['String']>;
    index_gte?: InputMaybe<Scalars['String']>;
    index_in?: InputMaybe<Array<Scalars['String']>>;
    index_lt?: InputMaybe<Scalars['String']>;
    index_lte?: InputMaybe<Scalars['String']>;
    index_not?: InputMaybe<Scalars['String']>;
    index_not_contains?: InputMaybe<Scalars['String']>;
    index_not_contains_nocase?: InputMaybe<Scalars['String']>;
    index_not_ends_with?: InputMaybe<Scalars['String']>;
    index_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
    index_not_in?: InputMaybe<Array<Scalars['String']>>;
    index_not_starts_with?: InputMaybe<Scalars['String']>;
    index_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
    index_starts_with?: InputMaybe<Scalars['String']>;
    index_starts_with_nocase?: InputMaybe<Scalars['String']>;
    to?: InputMaybe<Scalars['Bytes']>;
    to_contains?: InputMaybe<Scalars['Bytes']>;
    to_in?: InputMaybe<Array<Scalars['Bytes']>>;
    to_not?: InputMaybe<Scalars['Bytes']>;
    to_not_contains?: InputMaybe<Scalars['Bytes']>;
    to_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
    transaction?: InputMaybe<Scalars['String']>;
    transaction_?: InputMaybe<Transaction_Filter>;
    transaction_contains?: InputMaybe<Scalars['String']>;
    transaction_contains_nocase?: InputMaybe<Scalars['String']>;
    transaction_ends_with?: InputMaybe<Scalars['String']>;
    transaction_ends_with_nocase?: InputMaybe<Scalars['String']>;
    transaction_gt?: InputMaybe<Scalars['String']>;
    transaction_gte?: InputMaybe<Scalars['String']>;
    transaction_in?: InputMaybe<Array<Scalars['String']>>;
    transaction_lt?: InputMaybe<Scalars['String']>;
    transaction_lte?: InputMaybe<Scalars['String']>;
    transaction_not?: InputMaybe<Scalars['String']>;
    transaction_not_contains?: InputMaybe<Scalars['String']>;
    transaction_not_contains_nocase?: InputMaybe<Scalars['String']>;
    transaction_not_ends_with?: InputMaybe<Scalars['String']>;
    transaction_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
    transaction_not_in?: InputMaybe<Array<Scalars['String']>>;
    transaction_not_starts_with?: InputMaybe<Scalars['String']>;
    transaction_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
    transaction_starts_with?: InputMaybe<Scalars['String']>;
    transaction_starts_with_nocase?: InputMaybe<Scalars['String']>;
    type?: InputMaybe<TransferType>;
    type_in?: InputMaybe<Array<TransferType>>;
    type_not?: InputMaybe<TransferType>;
    type_not_in?: InputMaybe<Array<TransferType>>;
    value?: InputMaybe<Scalars['BigInt']>;
    value_gt?: InputMaybe<Scalars['BigInt']>;
    value_gte?: InputMaybe<Scalars['BigInt']>;
    value_in?: InputMaybe<Array<Scalars['BigInt']>>;
    value_lt?: InputMaybe<Scalars['BigInt']>;
    value_lte?: InputMaybe<Scalars['BigInt']>;
    value_not?: InputMaybe<Scalars['BigInt']>;
    value_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};
export declare enum Transfer_OrderBy {
    from = "from",
    id = "id",
    index = "index",
    to = "to",
    transaction = "transaction",
    type = "type",
    value = "value"
}
export declare type User = {
    __typename?: 'User';
    id: Scalars['ID'];
    indexes: Array<UserIndex>;
};
export declare type UserIndexesArgs = {
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<UserIndex_OrderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    where?: InputMaybe<UserIndex_Filter>;
};
export declare type UserCapitalization = {
    __typename?: 'UserCapitalization';
    capitalization: Scalars['BigDecimal'];
    id: Scalars['ID'];
    index: Index;
    logIndex: Scalars['BigInt'];
    timestamp: Scalars['BigInt'];
};
export declare type UserCapitalization_Filter = {
    /** Filter for the block changed event. */
    _change_block?: InputMaybe<BlockChangedFilter>;
    capitalization?: InputMaybe<Scalars['BigDecimal']>;
    capitalization_gt?: InputMaybe<Scalars['BigDecimal']>;
    capitalization_gte?: InputMaybe<Scalars['BigDecimal']>;
    capitalization_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    capitalization_lt?: InputMaybe<Scalars['BigDecimal']>;
    capitalization_lte?: InputMaybe<Scalars['BigDecimal']>;
    capitalization_not?: InputMaybe<Scalars['BigDecimal']>;
    capitalization_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    id?: InputMaybe<Scalars['ID']>;
    id_gt?: InputMaybe<Scalars['ID']>;
    id_gte?: InputMaybe<Scalars['ID']>;
    id_in?: InputMaybe<Array<Scalars['ID']>>;
    id_lt?: InputMaybe<Scalars['ID']>;
    id_lte?: InputMaybe<Scalars['ID']>;
    id_not?: InputMaybe<Scalars['ID']>;
    id_not_in?: InputMaybe<Array<Scalars['ID']>>;
    index?: InputMaybe<Scalars['String']>;
    index_?: InputMaybe<Index_Filter>;
    index_contains?: InputMaybe<Scalars['String']>;
    index_contains_nocase?: InputMaybe<Scalars['String']>;
    index_ends_with?: InputMaybe<Scalars['String']>;
    index_ends_with_nocase?: InputMaybe<Scalars['String']>;
    index_gt?: InputMaybe<Scalars['String']>;
    index_gte?: InputMaybe<Scalars['String']>;
    index_in?: InputMaybe<Array<Scalars['String']>>;
    index_lt?: InputMaybe<Scalars['String']>;
    index_lte?: InputMaybe<Scalars['String']>;
    index_not?: InputMaybe<Scalars['String']>;
    index_not_contains?: InputMaybe<Scalars['String']>;
    index_not_contains_nocase?: InputMaybe<Scalars['String']>;
    index_not_ends_with?: InputMaybe<Scalars['String']>;
    index_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
    index_not_in?: InputMaybe<Array<Scalars['String']>>;
    index_not_starts_with?: InputMaybe<Scalars['String']>;
    index_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
    index_starts_with?: InputMaybe<Scalars['String']>;
    index_starts_with_nocase?: InputMaybe<Scalars['String']>;
    logIndex?: InputMaybe<Scalars['BigInt']>;
    logIndex_gt?: InputMaybe<Scalars['BigInt']>;
    logIndex_gte?: InputMaybe<Scalars['BigInt']>;
    logIndex_in?: InputMaybe<Array<Scalars['BigInt']>>;
    logIndex_lt?: InputMaybe<Scalars['BigInt']>;
    logIndex_lte?: InputMaybe<Scalars['BigInt']>;
    logIndex_not?: InputMaybe<Scalars['BigInt']>;
    logIndex_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    timestamp?: InputMaybe<Scalars['BigInt']>;
    timestamp_gt?: InputMaybe<Scalars['BigInt']>;
    timestamp_gte?: InputMaybe<Scalars['BigInt']>;
    timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
    timestamp_lt?: InputMaybe<Scalars['BigInt']>;
    timestamp_lte?: InputMaybe<Scalars['BigInt']>;
    timestamp_not?: InputMaybe<Scalars['BigInt']>;
    timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};
export declare enum UserCapitalization_OrderBy {
    capitalization = "capitalization",
    id = "id",
    index = "index",
    logIndex = "logIndex",
    timestamp = "timestamp"
}
export declare type UserIndex = {
    __typename?: 'UserIndex';
    balance: Scalars['BigDecimal'];
    capitalization: Scalars['BigDecimal'];
    id: Scalars['ID'];
    index: Index;
    user: User;
};
export declare type UserIndexHistory = {
    __typename?: 'UserIndexHistory';
    /** shares of the index in user account */
    balance: Scalars['BigDecimal'];
    /** USD equivalent of the user index holdings */
    capitalization: Scalars['BigDecimal'];
    id: Scalars['ID'];
    index: Index;
    /** holds orders of transfers in transaction */
    logIndex: Scalars['BigInt'];
    /** timestamp matching the starting of day GMT */
    timestamp: Scalars['BigInt'];
    /** index total supply on the moment of the user balance calculation */
    totalSupply: Scalars['BigInt'];
    /** user account of the specific index holdings */
    user: User;
};
export declare type UserIndexHistory_Filter = {
    /** Filter for the block changed event. */
    _change_block?: InputMaybe<BlockChangedFilter>;
    balance?: InputMaybe<Scalars['BigDecimal']>;
    balance_gt?: InputMaybe<Scalars['BigDecimal']>;
    balance_gte?: InputMaybe<Scalars['BigDecimal']>;
    balance_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    balance_lt?: InputMaybe<Scalars['BigDecimal']>;
    balance_lte?: InputMaybe<Scalars['BigDecimal']>;
    balance_not?: InputMaybe<Scalars['BigDecimal']>;
    balance_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    capitalization?: InputMaybe<Scalars['BigDecimal']>;
    capitalization_gt?: InputMaybe<Scalars['BigDecimal']>;
    capitalization_gte?: InputMaybe<Scalars['BigDecimal']>;
    capitalization_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    capitalization_lt?: InputMaybe<Scalars['BigDecimal']>;
    capitalization_lte?: InputMaybe<Scalars['BigDecimal']>;
    capitalization_not?: InputMaybe<Scalars['BigDecimal']>;
    capitalization_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    id?: InputMaybe<Scalars['ID']>;
    id_gt?: InputMaybe<Scalars['ID']>;
    id_gte?: InputMaybe<Scalars['ID']>;
    id_in?: InputMaybe<Array<Scalars['ID']>>;
    id_lt?: InputMaybe<Scalars['ID']>;
    id_lte?: InputMaybe<Scalars['ID']>;
    id_not?: InputMaybe<Scalars['ID']>;
    id_not_in?: InputMaybe<Array<Scalars['ID']>>;
    index?: InputMaybe<Scalars['String']>;
    index_?: InputMaybe<Index_Filter>;
    index_contains?: InputMaybe<Scalars['String']>;
    index_contains_nocase?: InputMaybe<Scalars['String']>;
    index_ends_with?: InputMaybe<Scalars['String']>;
    index_ends_with_nocase?: InputMaybe<Scalars['String']>;
    index_gt?: InputMaybe<Scalars['String']>;
    index_gte?: InputMaybe<Scalars['String']>;
    index_in?: InputMaybe<Array<Scalars['String']>>;
    index_lt?: InputMaybe<Scalars['String']>;
    index_lte?: InputMaybe<Scalars['String']>;
    index_not?: InputMaybe<Scalars['String']>;
    index_not_contains?: InputMaybe<Scalars['String']>;
    index_not_contains_nocase?: InputMaybe<Scalars['String']>;
    index_not_ends_with?: InputMaybe<Scalars['String']>;
    index_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
    index_not_in?: InputMaybe<Array<Scalars['String']>>;
    index_not_starts_with?: InputMaybe<Scalars['String']>;
    index_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
    index_starts_with?: InputMaybe<Scalars['String']>;
    index_starts_with_nocase?: InputMaybe<Scalars['String']>;
    logIndex?: InputMaybe<Scalars['BigInt']>;
    logIndex_gt?: InputMaybe<Scalars['BigInt']>;
    logIndex_gte?: InputMaybe<Scalars['BigInt']>;
    logIndex_in?: InputMaybe<Array<Scalars['BigInt']>>;
    logIndex_lt?: InputMaybe<Scalars['BigInt']>;
    logIndex_lte?: InputMaybe<Scalars['BigInt']>;
    logIndex_not?: InputMaybe<Scalars['BigInt']>;
    logIndex_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    timestamp?: InputMaybe<Scalars['BigInt']>;
    timestamp_gt?: InputMaybe<Scalars['BigInt']>;
    timestamp_gte?: InputMaybe<Scalars['BigInt']>;
    timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
    timestamp_lt?: InputMaybe<Scalars['BigInt']>;
    timestamp_lte?: InputMaybe<Scalars['BigInt']>;
    timestamp_not?: InputMaybe<Scalars['BigInt']>;
    timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    totalSupply?: InputMaybe<Scalars['BigInt']>;
    totalSupply_gt?: InputMaybe<Scalars['BigInt']>;
    totalSupply_gte?: InputMaybe<Scalars['BigInt']>;
    totalSupply_in?: InputMaybe<Array<Scalars['BigInt']>>;
    totalSupply_lt?: InputMaybe<Scalars['BigInt']>;
    totalSupply_lte?: InputMaybe<Scalars['BigInt']>;
    totalSupply_not?: InputMaybe<Scalars['BigInt']>;
    totalSupply_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    user?: InputMaybe<Scalars['String']>;
    user_?: InputMaybe<User_Filter>;
    user_contains?: InputMaybe<Scalars['String']>;
    user_contains_nocase?: InputMaybe<Scalars['String']>;
    user_ends_with?: InputMaybe<Scalars['String']>;
    user_ends_with_nocase?: InputMaybe<Scalars['String']>;
    user_gt?: InputMaybe<Scalars['String']>;
    user_gte?: InputMaybe<Scalars['String']>;
    user_in?: InputMaybe<Array<Scalars['String']>>;
    user_lt?: InputMaybe<Scalars['String']>;
    user_lte?: InputMaybe<Scalars['String']>;
    user_not?: InputMaybe<Scalars['String']>;
    user_not_contains?: InputMaybe<Scalars['String']>;
    user_not_contains_nocase?: InputMaybe<Scalars['String']>;
    user_not_ends_with?: InputMaybe<Scalars['String']>;
    user_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
    user_not_in?: InputMaybe<Array<Scalars['String']>>;
    user_not_starts_with?: InputMaybe<Scalars['String']>;
    user_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
    user_starts_with?: InputMaybe<Scalars['String']>;
    user_starts_with_nocase?: InputMaybe<Scalars['String']>;
};
export declare enum UserIndexHistory_OrderBy {
    balance = "balance",
    capitalization = "capitalization",
    id = "id",
    index = "index",
    logIndex = "logIndex",
    timestamp = "timestamp",
    totalSupply = "totalSupply",
    user = "user"
}
export declare type UserIndex_Filter = {
    /** Filter for the block changed event. */
    _change_block?: InputMaybe<BlockChangedFilter>;
    balance?: InputMaybe<Scalars['BigDecimal']>;
    balance_gt?: InputMaybe<Scalars['BigDecimal']>;
    balance_gte?: InputMaybe<Scalars['BigDecimal']>;
    balance_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    balance_lt?: InputMaybe<Scalars['BigDecimal']>;
    balance_lte?: InputMaybe<Scalars['BigDecimal']>;
    balance_not?: InputMaybe<Scalars['BigDecimal']>;
    balance_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    capitalization?: InputMaybe<Scalars['BigDecimal']>;
    capitalization_gt?: InputMaybe<Scalars['BigDecimal']>;
    capitalization_gte?: InputMaybe<Scalars['BigDecimal']>;
    capitalization_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    capitalization_lt?: InputMaybe<Scalars['BigDecimal']>;
    capitalization_lte?: InputMaybe<Scalars['BigDecimal']>;
    capitalization_not?: InputMaybe<Scalars['BigDecimal']>;
    capitalization_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    id?: InputMaybe<Scalars['ID']>;
    id_gt?: InputMaybe<Scalars['ID']>;
    id_gte?: InputMaybe<Scalars['ID']>;
    id_in?: InputMaybe<Array<Scalars['ID']>>;
    id_lt?: InputMaybe<Scalars['ID']>;
    id_lte?: InputMaybe<Scalars['ID']>;
    id_not?: InputMaybe<Scalars['ID']>;
    id_not_in?: InputMaybe<Array<Scalars['ID']>>;
    index?: InputMaybe<Scalars['String']>;
    index_?: InputMaybe<Index_Filter>;
    index_contains?: InputMaybe<Scalars['String']>;
    index_contains_nocase?: InputMaybe<Scalars['String']>;
    index_ends_with?: InputMaybe<Scalars['String']>;
    index_ends_with_nocase?: InputMaybe<Scalars['String']>;
    index_gt?: InputMaybe<Scalars['String']>;
    index_gte?: InputMaybe<Scalars['String']>;
    index_in?: InputMaybe<Array<Scalars['String']>>;
    index_lt?: InputMaybe<Scalars['String']>;
    index_lte?: InputMaybe<Scalars['String']>;
    index_not?: InputMaybe<Scalars['String']>;
    index_not_contains?: InputMaybe<Scalars['String']>;
    index_not_contains_nocase?: InputMaybe<Scalars['String']>;
    index_not_ends_with?: InputMaybe<Scalars['String']>;
    index_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
    index_not_in?: InputMaybe<Array<Scalars['String']>>;
    index_not_starts_with?: InputMaybe<Scalars['String']>;
    index_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
    index_starts_with?: InputMaybe<Scalars['String']>;
    index_starts_with_nocase?: InputMaybe<Scalars['String']>;
    user?: InputMaybe<Scalars['String']>;
    user_?: InputMaybe<User_Filter>;
    user_contains?: InputMaybe<Scalars['String']>;
    user_contains_nocase?: InputMaybe<Scalars['String']>;
    user_ends_with?: InputMaybe<Scalars['String']>;
    user_ends_with_nocase?: InputMaybe<Scalars['String']>;
    user_gt?: InputMaybe<Scalars['String']>;
    user_gte?: InputMaybe<Scalars['String']>;
    user_in?: InputMaybe<Array<Scalars['String']>>;
    user_lt?: InputMaybe<Scalars['String']>;
    user_lte?: InputMaybe<Scalars['String']>;
    user_not?: InputMaybe<Scalars['String']>;
    user_not_contains?: InputMaybe<Scalars['String']>;
    user_not_contains_nocase?: InputMaybe<Scalars['String']>;
    user_not_ends_with?: InputMaybe<Scalars['String']>;
    user_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
    user_not_in?: InputMaybe<Array<Scalars['String']>>;
    user_not_starts_with?: InputMaybe<Scalars['String']>;
    user_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
    user_starts_with?: InputMaybe<Scalars['String']>;
    user_starts_with_nocase?: InputMaybe<Scalars['String']>;
};
export declare enum UserIndex_OrderBy {
    balance = "balance",
    capitalization = "capitalization",
    id = "id",
    index = "index",
    user = "user"
}
export declare type User_Filter = {
    /** Filter for the block changed event. */
    _change_block?: InputMaybe<BlockChangedFilter>;
    id?: InputMaybe<Scalars['ID']>;
    id_gt?: InputMaybe<Scalars['ID']>;
    id_gte?: InputMaybe<Scalars['ID']>;
    id_in?: InputMaybe<Array<Scalars['ID']>>;
    id_lt?: InputMaybe<Scalars['ID']>;
    id_lte?: InputMaybe<Scalars['ID']>;
    id_not?: InputMaybe<Scalars['ID']>;
    id_not_in?: InputMaybe<Array<Scalars['ID']>>;
    indexes_?: InputMaybe<UserIndex_Filter>;
};
export declare enum User_OrderBy {
    id = "id",
    indexes = "indexes"
}
export declare type WeeklyIndexStat = {
    __typename?: 'WeeklyIndexStat';
    /** price of the index in USD */
    basePrice: Scalars['BigDecimal'];
    /** price of the index in ETH */
    basePriceETH: Scalars['BigDecimal'];
    baseVolume: Scalars['BigDecimal'];
    date: Scalars['Int'];
    id: Scalars['ID'];
    index: Index;
    marketCap: Scalars['BigDecimal'];
    uniqueHolders: Scalars['BigInt'];
};
export declare type WeeklyIndexStat_Filter = {
    /** Filter for the block changed event. */
    _change_block?: InputMaybe<BlockChangedFilter>;
    basePrice?: InputMaybe<Scalars['BigDecimal']>;
    basePriceETH?: InputMaybe<Scalars['BigDecimal']>;
    basePriceETH_gt?: InputMaybe<Scalars['BigDecimal']>;
    basePriceETH_gte?: InputMaybe<Scalars['BigDecimal']>;
    basePriceETH_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    basePriceETH_lt?: InputMaybe<Scalars['BigDecimal']>;
    basePriceETH_lte?: InputMaybe<Scalars['BigDecimal']>;
    basePriceETH_not?: InputMaybe<Scalars['BigDecimal']>;
    basePriceETH_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    basePrice_gt?: InputMaybe<Scalars['BigDecimal']>;
    basePrice_gte?: InputMaybe<Scalars['BigDecimal']>;
    basePrice_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    basePrice_lt?: InputMaybe<Scalars['BigDecimal']>;
    basePrice_lte?: InputMaybe<Scalars['BigDecimal']>;
    basePrice_not?: InputMaybe<Scalars['BigDecimal']>;
    basePrice_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    baseVolume?: InputMaybe<Scalars['BigDecimal']>;
    baseVolume_gt?: InputMaybe<Scalars['BigDecimal']>;
    baseVolume_gte?: InputMaybe<Scalars['BigDecimal']>;
    baseVolume_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    baseVolume_lt?: InputMaybe<Scalars['BigDecimal']>;
    baseVolume_lte?: InputMaybe<Scalars['BigDecimal']>;
    baseVolume_not?: InputMaybe<Scalars['BigDecimal']>;
    baseVolume_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    date?: InputMaybe<Scalars['Int']>;
    date_gt?: InputMaybe<Scalars['Int']>;
    date_gte?: InputMaybe<Scalars['Int']>;
    date_in?: InputMaybe<Array<Scalars['Int']>>;
    date_lt?: InputMaybe<Scalars['Int']>;
    date_lte?: InputMaybe<Scalars['Int']>;
    date_not?: InputMaybe<Scalars['Int']>;
    date_not_in?: InputMaybe<Array<Scalars['Int']>>;
    id?: InputMaybe<Scalars['ID']>;
    id_gt?: InputMaybe<Scalars['ID']>;
    id_gte?: InputMaybe<Scalars['ID']>;
    id_in?: InputMaybe<Array<Scalars['ID']>>;
    id_lt?: InputMaybe<Scalars['ID']>;
    id_lte?: InputMaybe<Scalars['ID']>;
    id_not?: InputMaybe<Scalars['ID']>;
    id_not_in?: InputMaybe<Array<Scalars['ID']>>;
    index?: InputMaybe<Scalars['String']>;
    index_?: InputMaybe<Index_Filter>;
    index_contains?: InputMaybe<Scalars['String']>;
    index_contains_nocase?: InputMaybe<Scalars['String']>;
    index_ends_with?: InputMaybe<Scalars['String']>;
    index_ends_with_nocase?: InputMaybe<Scalars['String']>;
    index_gt?: InputMaybe<Scalars['String']>;
    index_gte?: InputMaybe<Scalars['String']>;
    index_in?: InputMaybe<Array<Scalars['String']>>;
    index_lt?: InputMaybe<Scalars['String']>;
    index_lte?: InputMaybe<Scalars['String']>;
    index_not?: InputMaybe<Scalars['String']>;
    index_not_contains?: InputMaybe<Scalars['String']>;
    index_not_contains_nocase?: InputMaybe<Scalars['String']>;
    index_not_ends_with?: InputMaybe<Scalars['String']>;
    index_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
    index_not_in?: InputMaybe<Array<Scalars['String']>>;
    index_not_starts_with?: InputMaybe<Scalars['String']>;
    index_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
    index_starts_with?: InputMaybe<Scalars['String']>;
    index_starts_with_nocase?: InputMaybe<Scalars['String']>;
    marketCap?: InputMaybe<Scalars['BigDecimal']>;
    marketCap_gt?: InputMaybe<Scalars['BigDecimal']>;
    marketCap_gte?: InputMaybe<Scalars['BigDecimal']>;
    marketCap_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    marketCap_lt?: InputMaybe<Scalars['BigDecimal']>;
    marketCap_lte?: InputMaybe<Scalars['BigDecimal']>;
    marketCap_not?: InputMaybe<Scalars['BigDecimal']>;
    marketCap_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    uniqueHolders?: InputMaybe<Scalars['BigInt']>;
    uniqueHolders_gt?: InputMaybe<Scalars['BigInt']>;
    uniqueHolders_gte?: InputMaybe<Scalars['BigInt']>;
    uniqueHolders_in?: InputMaybe<Array<Scalars['BigInt']>>;
    uniqueHolders_lt?: InputMaybe<Scalars['BigInt']>;
    uniqueHolders_lte?: InputMaybe<Scalars['BigInt']>;
    uniqueHolders_not?: InputMaybe<Scalars['BigInt']>;
    uniqueHolders_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};
export declare enum WeeklyIndexStat_OrderBy {
    basePrice = "basePrice",
    basePriceETH = "basePriceETH",
    baseVolume = "baseVolume",
    date = "date",
    id = "id",
    index = "index",
    marketCap = "marketCap",
    uniqueHolders = "uniqueHolders"
}
export declare type YearlyIndexStat = {
    __typename?: 'YearlyIndexStat';
    /** price of the index in USD */
    basePrice: Scalars['BigDecimal'];
    /** price of the index in ETH */
    basePriceETH: Scalars['BigDecimal'];
    baseVolume: Scalars['BigDecimal'];
    date: Scalars['Int'];
    id: Scalars['ID'];
    index: Index;
    marketCap: Scalars['BigDecimal'];
    uniqueHolders: Scalars['BigInt'];
};
export declare type YearlyIndexStat_Filter = {
    /** Filter for the block changed event. */
    _change_block?: InputMaybe<BlockChangedFilter>;
    basePrice?: InputMaybe<Scalars['BigDecimal']>;
    basePriceETH?: InputMaybe<Scalars['BigDecimal']>;
    basePriceETH_gt?: InputMaybe<Scalars['BigDecimal']>;
    basePriceETH_gte?: InputMaybe<Scalars['BigDecimal']>;
    basePriceETH_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    basePriceETH_lt?: InputMaybe<Scalars['BigDecimal']>;
    basePriceETH_lte?: InputMaybe<Scalars['BigDecimal']>;
    basePriceETH_not?: InputMaybe<Scalars['BigDecimal']>;
    basePriceETH_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    basePrice_gt?: InputMaybe<Scalars['BigDecimal']>;
    basePrice_gte?: InputMaybe<Scalars['BigDecimal']>;
    basePrice_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    basePrice_lt?: InputMaybe<Scalars['BigDecimal']>;
    basePrice_lte?: InputMaybe<Scalars['BigDecimal']>;
    basePrice_not?: InputMaybe<Scalars['BigDecimal']>;
    basePrice_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    baseVolume?: InputMaybe<Scalars['BigDecimal']>;
    baseVolume_gt?: InputMaybe<Scalars['BigDecimal']>;
    baseVolume_gte?: InputMaybe<Scalars['BigDecimal']>;
    baseVolume_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    baseVolume_lt?: InputMaybe<Scalars['BigDecimal']>;
    baseVolume_lte?: InputMaybe<Scalars['BigDecimal']>;
    baseVolume_not?: InputMaybe<Scalars['BigDecimal']>;
    baseVolume_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    date?: InputMaybe<Scalars['Int']>;
    date_gt?: InputMaybe<Scalars['Int']>;
    date_gte?: InputMaybe<Scalars['Int']>;
    date_in?: InputMaybe<Array<Scalars['Int']>>;
    date_lt?: InputMaybe<Scalars['Int']>;
    date_lte?: InputMaybe<Scalars['Int']>;
    date_not?: InputMaybe<Scalars['Int']>;
    date_not_in?: InputMaybe<Array<Scalars['Int']>>;
    id?: InputMaybe<Scalars['ID']>;
    id_gt?: InputMaybe<Scalars['ID']>;
    id_gte?: InputMaybe<Scalars['ID']>;
    id_in?: InputMaybe<Array<Scalars['ID']>>;
    id_lt?: InputMaybe<Scalars['ID']>;
    id_lte?: InputMaybe<Scalars['ID']>;
    id_not?: InputMaybe<Scalars['ID']>;
    id_not_in?: InputMaybe<Array<Scalars['ID']>>;
    index?: InputMaybe<Scalars['String']>;
    index_?: InputMaybe<Index_Filter>;
    index_contains?: InputMaybe<Scalars['String']>;
    index_contains_nocase?: InputMaybe<Scalars['String']>;
    index_ends_with?: InputMaybe<Scalars['String']>;
    index_ends_with_nocase?: InputMaybe<Scalars['String']>;
    index_gt?: InputMaybe<Scalars['String']>;
    index_gte?: InputMaybe<Scalars['String']>;
    index_in?: InputMaybe<Array<Scalars['String']>>;
    index_lt?: InputMaybe<Scalars['String']>;
    index_lte?: InputMaybe<Scalars['String']>;
    index_not?: InputMaybe<Scalars['String']>;
    index_not_contains?: InputMaybe<Scalars['String']>;
    index_not_contains_nocase?: InputMaybe<Scalars['String']>;
    index_not_ends_with?: InputMaybe<Scalars['String']>;
    index_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
    index_not_in?: InputMaybe<Array<Scalars['String']>>;
    index_not_starts_with?: InputMaybe<Scalars['String']>;
    index_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
    index_starts_with?: InputMaybe<Scalars['String']>;
    index_starts_with_nocase?: InputMaybe<Scalars['String']>;
    marketCap?: InputMaybe<Scalars['BigDecimal']>;
    marketCap_gt?: InputMaybe<Scalars['BigDecimal']>;
    marketCap_gte?: InputMaybe<Scalars['BigDecimal']>;
    marketCap_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    marketCap_lt?: InputMaybe<Scalars['BigDecimal']>;
    marketCap_lte?: InputMaybe<Scalars['BigDecimal']>;
    marketCap_not?: InputMaybe<Scalars['BigDecimal']>;
    marketCap_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    uniqueHolders?: InputMaybe<Scalars['BigInt']>;
    uniqueHolders_gt?: InputMaybe<Scalars['BigInt']>;
    uniqueHolders_gte?: InputMaybe<Scalars['BigInt']>;
    uniqueHolders_in?: InputMaybe<Array<Scalars['BigInt']>>;
    uniqueHolders_lt?: InputMaybe<Scalars['BigInt']>;
    uniqueHolders_lte?: InputMaybe<Scalars['BigInt']>;
    uniqueHolders_not?: InputMaybe<Scalars['BigInt']>;
    uniqueHolders_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};
export declare enum YearlyIndexStat_OrderBy {
    basePrice = "basePrice",
    basePriceETH = "basePriceETH",
    baseVolume = "baseVolume",
    date = "date",
    id = "id",
    index = "index",
    marketCap = "marketCap",
    uniqueHolders = "uniqueHolders"
}
export declare type _Block_ = {
    __typename?: '_Block_';
    /** The hash of the block */
    hash?: Maybe<Scalars['Bytes']>;
    /** The block number */
    number: Scalars['Int'];
};
/** The type for the top-level _meta field */
export declare type _Meta_ = {
    __typename?: '_Meta_';
    /**
     * Information about a specific subgraph block. The hash of the block
     * will be null if the _meta field has a block constraint that asks for
     * a block number. It will be filled if the _meta field has no block constraint
     * and therefore asks for the latest  block
     *
     */
    block: _Block_;
    /** The deployment ID */
    deployment: Scalars['String'];
    /** If `true`, the subgraph encountered indexing errors at some past block */
    hasIndexingErrors: Scalars['Boolean'];
};
export declare enum _SubgraphErrorPolicy_ {
    /** Data will be returned even if the subgraph has indexing errors */
    allow = "allow",
    /** If the subgraph has indexing errors, data will be omitted. The default. */
    deny = "deny"
}
export declare type VToken = {
    __typename?: 'vToken';
    asset: Asset;
    /** reserveQuantity - quantity of the asset stored in vToken address */
    assetReserve: Scalars['BigInt'];
    capitalization: Scalars['BigDecimal'];
    /** depositedQuantity */
    deposited: Scalars['BigInt'];
    factory: Scalars['String'];
    /** Address (hash) */
    id: Scalars['ID'];
    platformTotalSupply: Scalars['BigInt'];
    platformTotalSupplyDec: Scalars['BigDecimal'];
    tokenType: Scalars['String'];
    /** totalAmount - is the sum of assetReserve and deposited without taking interests into account */
    totalAmount: Scalars['BigInt'];
};
export declare type VToken_Filter = {
    /** Filter for the block changed event. */
    _change_block?: InputMaybe<BlockChangedFilter>;
    asset?: InputMaybe<Scalars['String']>;
    assetReserve?: InputMaybe<Scalars['BigInt']>;
    assetReserve_gt?: InputMaybe<Scalars['BigInt']>;
    assetReserve_gte?: InputMaybe<Scalars['BigInt']>;
    assetReserve_in?: InputMaybe<Array<Scalars['BigInt']>>;
    assetReserve_lt?: InputMaybe<Scalars['BigInt']>;
    assetReserve_lte?: InputMaybe<Scalars['BigInt']>;
    assetReserve_not?: InputMaybe<Scalars['BigInt']>;
    assetReserve_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    asset_?: InputMaybe<Asset_Filter>;
    asset_contains?: InputMaybe<Scalars['String']>;
    asset_contains_nocase?: InputMaybe<Scalars['String']>;
    asset_ends_with?: InputMaybe<Scalars['String']>;
    asset_ends_with_nocase?: InputMaybe<Scalars['String']>;
    asset_gt?: InputMaybe<Scalars['String']>;
    asset_gte?: InputMaybe<Scalars['String']>;
    asset_in?: InputMaybe<Array<Scalars['String']>>;
    asset_lt?: InputMaybe<Scalars['String']>;
    asset_lte?: InputMaybe<Scalars['String']>;
    asset_not?: InputMaybe<Scalars['String']>;
    asset_not_contains?: InputMaybe<Scalars['String']>;
    asset_not_contains_nocase?: InputMaybe<Scalars['String']>;
    asset_not_ends_with?: InputMaybe<Scalars['String']>;
    asset_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
    asset_not_in?: InputMaybe<Array<Scalars['String']>>;
    asset_not_starts_with?: InputMaybe<Scalars['String']>;
    asset_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
    asset_starts_with?: InputMaybe<Scalars['String']>;
    asset_starts_with_nocase?: InputMaybe<Scalars['String']>;
    capitalization?: InputMaybe<Scalars['BigDecimal']>;
    capitalization_gt?: InputMaybe<Scalars['BigDecimal']>;
    capitalization_gte?: InputMaybe<Scalars['BigDecimal']>;
    capitalization_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    capitalization_lt?: InputMaybe<Scalars['BigDecimal']>;
    capitalization_lte?: InputMaybe<Scalars['BigDecimal']>;
    capitalization_not?: InputMaybe<Scalars['BigDecimal']>;
    capitalization_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    deposited?: InputMaybe<Scalars['BigInt']>;
    deposited_gt?: InputMaybe<Scalars['BigInt']>;
    deposited_gte?: InputMaybe<Scalars['BigInt']>;
    deposited_in?: InputMaybe<Array<Scalars['BigInt']>>;
    deposited_lt?: InputMaybe<Scalars['BigInt']>;
    deposited_lte?: InputMaybe<Scalars['BigInt']>;
    deposited_not?: InputMaybe<Scalars['BigInt']>;
    deposited_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    factory?: InputMaybe<Scalars['String']>;
    factory_contains?: InputMaybe<Scalars['String']>;
    factory_contains_nocase?: InputMaybe<Scalars['String']>;
    factory_ends_with?: InputMaybe<Scalars['String']>;
    factory_ends_with_nocase?: InputMaybe<Scalars['String']>;
    factory_gt?: InputMaybe<Scalars['String']>;
    factory_gte?: InputMaybe<Scalars['String']>;
    factory_in?: InputMaybe<Array<Scalars['String']>>;
    factory_lt?: InputMaybe<Scalars['String']>;
    factory_lte?: InputMaybe<Scalars['String']>;
    factory_not?: InputMaybe<Scalars['String']>;
    factory_not_contains?: InputMaybe<Scalars['String']>;
    factory_not_contains_nocase?: InputMaybe<Scalars['String']>;
    factory_not_ends_with?: InputMaybe<Scalars['String']>;
    factory_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
    factory_not_in?: InputMaybe<Array<Scalars['String']>>;
    factory_not_starts_with?: InputMaybe<Scalars['String']>;
    factory_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
    factory_starts_with?: InputMaybe<Scalars['String']>;
    factory_starts_with_nocase?: InputMaybe<Scalars['String']>;
    id?: InputMaybe<Scalars['ID']>;
    id_gt?: InputMaybe<Scalars['ID']>;
    id_gte?: InputMaybe<Scalars['ID']>;
    id_in?: InputMaybe<Array<Scalars['ID']>>;
    id_lt?: InputMaybe<Scalars['ID']>;
    id_lte?: InputMaybe<Scalars['ID']>;
    id_not?: InputMaybe<Scalars['ID']>;
    id_not_in?: InputMaybe<Array<Scalars['ID']>>;
    platformTotalSupply?: InputMaybe<Scalars['BigInt']>;
    platformTotalSupplyDec?: InputMaybe<Scalars['BigDecimal']>;
    platformTotalSupplyDec_gt?: InputMaybe<Scalars['BigDecimal']>;
    platformTotalSupplyDec_gte?: InputMaybe<Scalars['BigDecimal']>;
    platformTotalSupplyDec_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    platformTotalSupplyDec_lt?: InputMaybe<Scalars['BigDecimal']>;
    platformTotalSupplyDec_lte?: InputMaybe<Scalars['BigDecimal']>;
    platformTotalSupplyDec_not?: InputMaybe<Scalars['BigDecimal']>;
    platformTotalSupplyDec_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    platformTotalSupply_gt?: InputMaybe<Scalars['BigInt']>;
    platformTotalSupply_gte?: InputMaybe<Scalars['BigInt']>;
    platformTotalSupply_in?: InputMaybe<Array<Scalars['BigInt']>>;
    platformTotalSupply_lt?: InputMaybe<Scalars['BigInt']>;
    platformTotalSupply_lte?: InputMaybe<Scalars['BigInt']>;
    platformTotalSupply_not?: InputMaybe<Scalars['BigInt']>;
    platformTotalSupply_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    tokenType?: InputMaybe<Scalars['String']>;
    tokenType_contains?: InputMaybe<Scalars['String']>;
    tokenType_contains_nocase?: InputMaybe<Scalars['String']>;
    tokenType_ends_with?: InputMaybe<Scalars['String']>;
    tokenType_ends_with_nocase?: InputMaybe<Scalars['String']>;
    tokenType_gt?: InputMaybe<Scalars['String']>;
    tokenType_gte?: InputMaybe<Scalars['String']>;
    tokenType_in?: InputMaybe<Array<Scalars['String']>>;
    tokenType_lt?: InputMaybe<Scalars['String']>;
    tokenType_lte?: InputMaybe<Scalars['String']>;
    tokenType_not?: InputMaybe<Scalars['String']>;
    tokenType_not_contains?: InputMaybe<Scalars['String']>;
    tokenType_not_contains_nocase?: InputMaybe<Scalars['String']>;
    tokenType_not_ends_with?: InputMaybe<Scalars['String']>;
    tokenType_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
    tokenType_not_in?: InputMaybe<Array<Scalars['String']>>;
    tokenType_not_starts_with?: InputMaybe<Scalars['String']>;
    tokenType_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
    tokenType_starts_with?: InputMaybe<Scalars['String']>;
    tokenType_starts_with_nocase?: InputMaybe<Scalars['String']>;
    totalAmount?: InputMaybe<Scalars['BigInt']>;
    totalAmount_gt?: InputMaybe<Scalars['BigInt']>;
    totalAmount_gte?: InputMaybe<Scalars['BigInt']>;
    totalAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
    totalAmount_lt?: InputMaybe<Scalars['BigInt']>;
    totalAmount_lte?: InputMaybe<Scalars['BigInt']>;
    totalAmount_not?: InputMaybe<Scalars['BigInt']>;
    totalAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};
export declare enum VToken_OrderBy {
    asset = "asset",
    assetReserve = "assetReserve",
    capitalization = "capitalization",
    deposited = "deposited",
    factory = "factory",
    id = "id",
    platformTotalSupply = "platformTotalSupply",
    platformTotalSupplyDec = "platformTotalSupplyDec",
    tokenType = "tokenType",
    totalAmount = "totalAmount"
}
export declare type AssetKeySpecifier = ('_indexes' | '_vTokens' | 'basePrice' | 'basePriceSushi' | 'basePriceUni' | 'dailyStats' | 'decimals' | 'id' | 'indexCount' | 'indexes' | 'isWhitelisted' | 'marketCap' | 'name' | 'pairsAsAsset0' | 'pairsAsAsset1' | 'symbol' | 'totalSupply' | 'vTokens' | 'vaultBaseReserve' | 'vaultReserve' | AssetKeySpecifier)[];
export declare type AssetFieldPolicy = {
    _indexes?: FieldPolicy<any> | FieldReadFunction<any>;
    _vTokens?: FieldPolicy<any> | FieldReadFunction<any>;
    basePrice?: FieldPolicy<any> | FieldReadFunction<any>;
    basePriceSushi?: FieldPolicy<any> | FieldReadFunction<any>;
    basePriceUni?: FieldPolicy<any> | FieldReadFunction<any>;
    dailyStats?: FieldPolicy<any> | FieldReadFunction<any>;
    decimals?: FieldPolicy<any> | FieldReadFunction<any>;
    id?: FieldPolicy<any> | FieldReadFunction<any>;
    indexCount?: FieldPolicy<any> | FieldReadFunction<any>;
    indexes?: FieldPolicy<any> | FieldReadFunction<any>;
    isWhitelisted?: FieldPolicy<any> | FieldReadFunction<any>;
    marketCap?: FieldPolicy<any> | FieldReadFunction<any>;
    name?: FieldPolicy<any> | FieldReadFunction<any>;
    pairsAsAsset0?: FieldPolicy<any> | FieldReadFunction<any>;
    pairsAsAsset1?: FieldPolicy<any> | FieldReadFunction<any>;
    symbol?: FieldPolicy<any> | FieldReadFunction<any>;
    totalSupply?: FieldPolicy<any> | FieldReadFunction<any>;
    vTokens?: FieldPolicy<any> | FieldReadFunction<any>;
    vaultBaseReserve?: FieldPolicy<any> | FieldReadFunction<any>;
    vaultReserve?: FieldPolicy<any> | FieldReadFunction<any>;
};
export declare type ChainLinkAggKeySpecifier = ('answer' | 'asset' | 'decimals' | 'description' | 'id' | 'nextAgg' | 'updatedAt' | ChainLinkAggKeySpecifier)[];
export declare type ChainLinkAggFieldPolicy = {
    answer?: FieldPolicy<any> | FieldReadFunction<any>;
    asset?: FieldPolicy<any> | FieldReadFunction<any>;
    decimals?: FieldPolicy<any> | FieldReadFunction<any>;
    description?: FieldPolicy<any> | FieldReadFunction<any>;
    id?: FieldPolicy<any> | FieldReadFunction<any>;
    nextAgg?: FieldPolicy<any> | FieldReadFunction<any>;
    updatedAt?: FieldPolicy<any> | FieldReadFunction<any>;
};
export declare type DEXKeySpecifier = ('id' | 'router' | 'type' | DEXKeySpecifier)[];
export declare type DEXFieldPolicy = {
    id?: FieldPolicy<any> | FieldReadFunction<any>;
    router?: FieldPolicy<any> | FieldReadFunction<any>;
    type?: FieldPolicy<any> | FieldReadFunction<any>;
};
export declare type DailyAssetStatKeySpecifier = ('asset' | 'basePrice' | 'date' | 'id' | 'vaultBaseReserve' | 'vaultReserve' | DailyAssetStatKeySpecifier)[];
export declare type DailyAssetStatFieldPolicy = {
    asset?: FieldPolicy<any> | FieldReadFunction<any>;
    basePrice?: FieldPolicy<any> | FieldReadFunction<any>;
    date?: FieldPolicy<any> | FieldReadFunction<any>;
    id?: FieldPolicy<any> | FieldReadFunction<any>;
    vaultBaseReserve?: FieldPolicy<any> | FieldReadFunction<any>;
    vaultReserve?: FieldPolicy<any> | FieldReadFunction<any>;
};
export declare type DailyCapitalizationKeySpecifier = ('basePrice' | 'capitalization' | 'id' | 'index' | 'logIndex' | 'timestamp' | 'totalSupply' | DailyCapitalizationKeySpecifier)[];
export declare type DailyCapitalizationFieldPolicy = {
    basePrice?: FieldPolicy<any> | FieldReadFunction<any>;
    capitalization?: FieldPolicy<any> | FieldReadFunction<any>;
    id?: FieldPolicy<any> | FieldReadFunction<any>;
    index?: FieldPolicy<any> | FieldReadFunction<any>;
    logIndex?: FieldPolicy<any> | FieldReadFunction<any>;
    timestamp?: FieldPolicy<any> | FieldReadFunction<any>;
    totalSupply?: FieldPolicy<any> | FieldReadFunction<any>;
};
export declare type DailyIndexStatKeySpecifier = ('basePrice' | 'basePriceETH' | 'baseVolume' | 'date' | 'id' | 'index' | 'marketCap' | 'uniqueHolders' | DailyIndexStatKeySpecifier)[];
export declare type DailyIndexStatFieldPolicy = {
    basePrice?: FieldPolicy<any> | FieldReadFunction<any>;
    basePriceETH?: FieldPolicy<any> | FieldReadFunction<any>;
    baseVolume?: FieldPolicy<any> | FieldReadFunction<any>;
    date?: FieldPolicy<any> | FieldReadFunction<any>;
    id?: FieldPolicy<any> | FieldReadFunction<any>;
    index?: FieldPolicy<any> | FieldReadFunction<any>;
    marketCap?: FieldPolicy<any> | FieldReadFunction<any>;
    uniqueHolders?: FieldPolicy<any> | FieldReadFunction<any>;
};
export declare type DailyStatKeySpecifier = ('date' | 'id' | 'indexCount' | 'totalValueLocked' | DailyStatKeySpecifier)[];
export declare type DailyStatFieldPolicy = {
    date?: FieldPolicy<any> | FieldReadFunction<any>;
    id?: FieldPolicy<any> | FieldReadFunction<any>;
    indexCount?: FieldPolicy<any> | FieldReadFunction<any>;
    totalValueLocked?: FieldPolicy<any> | FieldReadFunction<any>;
};
export declare type DailyUserIndexHistoryKeySpecifier = ('avgBalance' | 'avgCapitalization' | 'id' | 'index' | 'logIndex' | 'number' | 'timestamp' | 'total' | 'totalCap' | 'totalSupply' | 'user' | DailyUserIndexHistoryKeySpecifier)[];
export declare type DailyUserIndexHistoryFieldPolicy = {
    avgBalance?: FieldPolicy<any> | FieldReadFunction<any>;
    avgCapitalization?: FieldPolicy<any> | FieldReadFunction<any>;
    id?: FieldPolicy<any> | FieldReadFunction<any>;
    index?: FieldPolicy<any> | FieldReadFunction<any>;
    logIndex?: FieldPolicy<any> | FieldReadFunction<any>;
    number?: FieldPolicy<any> | FieldReadFunction<any>;
    timestamp?: FieldPolicy<any> | FieldReadFunction<any>;
    total?: FieldPolicy<any> | FieldReadFunction<any>;
    totalCap?: FieldPolicy<any> | FieldReadFunction<any>;
    totalSupply?: FieldPolicy<any> | FieldReadFunction<any>;
    user?: FieldPolicy<any> | FieldReadFunction<any>;
};
export declare type HourlyIndexStatKeySpecifier = ('basePrice' | 'baseVolume' | 'date' | 'id' | 'index' | 'marketCap' | 'uniqueHolders' | HourlyIndexStatKeySpecifier)[];
export declare type HourlyIndexStatFieldPolicy = {
    basePrice?: FieldPolicy<any> | FieldReadFunction<any>;
    baseVolume?: FieldPolicy<any> | FieldReadFunction<any>;
    date?: FieldPolicy<any> | FieldReadFunction<any>;
    id?: FieldPolicy<any> | FieldReadFunction<any>;
    index?: FieldPolicy<any> | FieldReadFunction<any>;
    marketCap?: FieldPolicy<any> | FieldReadFunction<any>;
    uniqueHolders?: FieldPolicy<any> | FieldReadFunction<any>;
};
export declare type IndexKeySpecifier = ('_assets' | '_inactiveAssets' | 'assets' | 'basePrice' | 'basePriceETH' | 'baseVolume' | 'created' | 'dailyStats' | 'decimals' | 'feeAUMPercent' | 'feeBurn' | 'feeMint' | 'hourlyStats' | 'id' | 'inactiveAssets' | 'indexFactory' | 'marketCap' | 'monthlyStats' | 'name' | 'sector' | 'symbol' | 'totalSupply' | 'transaction' | 'type' | 'uniqueHolders' | 'users' | 'weeklyStats' | 'yearlyStats' | IndexKeySpecifier)[];
export declare type IndexFieldPolicy = {
    _assets?: FieldPolicy<any> | FieldReadFunction<any>;
    _inactiveAssets?: FieldPolicy<any> | FieldReadFunction<any>;
    assets?: FieldPolicy<any> | FieldReadFunction<any>;
    basePrice?: FieldPolicy<any> | FieldReadFunction<any>;
    basePriceETH?: FieldPolicy<any> | FieldReadFunction<any>;
    baseVolume?: FieldPolicy<any> | FieldReadFunction<any>;
    created?: FieldPolicy<any> | FieldReadFunction<any>;
    dailyStats?: FieldPolicy<any> | FieldReadFunction<any>;
    decimals?: FieldPolicy<any> | FieldReadFunction<any>;
    feeAUMPercent?: FieldPolicy<any> | FieldReadFunction<any>;
    feeBurn?: FieldPolicy<any> | FieldReadFunction<any>;
    feeMint?: FieldPolicy<any> | FieldReadFunction<any>;
    hourlyStats?: FieldPolicy<any> | FieldReadFunction<any>;
    id?: FieldPolicy<any> | FieldReadFunction<any>;
    inactiveAssets?: FieldPolicy<any> | FieldReadFunction<any>;
    indexFactory?: FieldPolicy<any> | FieldReadFunction<any>;
    marketCap?: FieldPolicy<any> | FieldReadFunction<any>;
    monthlyStats?: FieldPolicy<any> | FieldReadFunction<any>;
    name?: FieldPolicy<any> | FieldReadFunction<any>;
    sector?: FieldPolicy<any> | FieldReadFunction<any>;
    symbol?: FieldPolicy<any> | FieldReadFunction<any>;
    totalSupply?: FieldPolicy<any> | FieldReadFunction<any>;
    transaction?: FieldPolicy<any> | FieldReadFunction<any>;
    type?: FieldPolicy<any> | FieldReadFunction<any>;
    uniqueHolders?: FieldPolicy<any> | FieldReadFunction<any>;
    users?: FieldPolicy<any> | FieldReadFunction<any>;
    weeklyStats?: FieldPolicy<any> | FieldReadFunction<any>;
    yearlyStats?: FieldPolicy<any> | FieldReadFunction<any>;
};
export declare type IndexAssetKeySpecifier = ('asset' | 'id' | 'inactiveIndex' | 'index' | 'shares' | 'weight' | IndexAssetKeySpecifier)[];
export declare type IndexAssetFieldPolicy = {
    asset?: FieldPolicy<any> | FieldReadFunction<any>;
    id?: FieldPolicy<any> | FieldReadFunction<any>;
    inactiveIndex?: FieldPolicy<any> | FieldReadFunction<any>;
    index?: FieldPolicy<any> | FieldReadFunction<any>;
    shares?: FieldPolicy<any> | FieldReadFunction<any>;
    weight?: FieldPolicy<any> | FieldReadFunction<any>;
};
export declare type IndexFactoryKeySpecifier = ('id' | 'indices' | 'type' | 'vTokenFactory' | IndexFactoryKeySpecifier)[];
export declare type IndexFactoryFieldPolicy = {
    id?: FieldPolicy<any> | FieldReadFunction<any>;
    indices?: FieldPolicy<any> | FieldReadFunction<any>;
    type?: FieldPolicy<any> | FieldReadFunction<any>;
    vTokenFactory?: FieldPolicy<any> | FieldReadFunction<any>;
};
export declare type LastOrderIndexKeySpecifier = ('id' | 'index' | 'order' | LastOrderIndexKeySpecifier)[];
export declare type LastOrderIndexFieldPolicy = {
    id?: FieldPolicy<any> | FieldReadFunction<any>;
    index?: FieldPolicy<any> | FieldReadFunction<any>;
    order?: FieldPolicy<any> | FieldReadFunction<any>;
};
export declare type MonthlyIndexStatKeySpecifier = ('basePrice' | 'basePriceETH' | 'baseVolume' | 'date' | 'id' | 'index' | 'marketCap' | 'uniqueHolders' | MonthlyIndexStatKeySpecifier)[];
export declare type MonthlyIndexStatFieldPolicy = {
    basePrice?: FieldPolicy<any> | FieldReadFunction<any>;
    basePriceETH?: FieldPolicy<any> | FieldReadFunction<any>;
    baseVolume?: FieldPolicy<any> | FieldReadFunction<any>;
    date?: FieldPolicy<any> | FieldReadFunction<any>;
    id?: FieldPolicy<any> | FieldReadFunction<any>;
    index?: FieldPolicy<any> | FieldReadFunction<any>;
    marketCap?: FieldPolicy<any> | FieldReadFunction<any>;
    uniqueHolders?: FieldPolicy<any> | FieldReadFunction<any>;
};
export declare type OrderKeySpecifier = ('id' | 'index' | 'orderDetails' | 'order_id' | OrderKeySpecifier)[];
export declare type OrderFieldPolicy = {
    id?: FieldPolicy<any> | FieldReadFunction<any>;
    index?: FieldPolicy<any> | FieldReadFunction<any>;
    orderDetails?: FieldPolicy<any> | FieldReadFunction<any>;
    order_id?: FieldPolicy<any> | FieldReadFunction<any>;
};
export declare type OrderDetailsInfoKeySpecifier = ('asset' | 'id' | 'order' | 'shares' | 'side' | OrderDetailsInfoKeySpecifier)[];
export declare type OrderDetailsInfoFieldPolicy = {
    asset?: FieldPolicy<any> | FieldReadFunction<any>;
    id?: FieldPolicy<any> | FieldReadFunction<any>;
    order?: FieldPolicy<any> | FieldReadFunction<any>;
    shares?: FieldPolicy<any> | FieldReadFunction<any>;
    side?: FieldPolicy<any> | FieldReadFunction<any>;
};
export declare type PairKeySpecifier = ('asset0' | 'asset0Reserve' | 'asset1' | 'asset1Reserve' | 'id' | 'swap' | 'totalSupply' | PairKeySpecifier)[];
export declare type PairFieldPolicy = {
    asset0?: FieldPolicy<any> | FieldReadFunction<any>;
    asset0Reserve?: FieldPolicy<any> | FieldReadFunction<any>;
    asset1?: FieldPolicy<any> | FieldReadFunction<any>;
    asset1Reserve?: FieldPolicy<any> | FieldReadFunction<any>;
    id?: FieldPolicy<any> | FieldReadFunction<any>;
    swap?: FieldPolicy<any> | FieldReadFunction<any>;
    totalSupply?: FieldPolicy<any> | FieldReadFunction<any>;
};
export declare type QueryKeySpecifier = ('_meta' | 'asset' | 'assets' | 'chainLinkAgg' | 'chainLinkAggs' | 'dailyAssetStat' | 'dailyAssetStats' | 'dailyCapitalization' | 'dailyCapitalizations' | 'dailyIndexStat' | 'dailyIndexStats' | 'dailyStat' | 'dailyStats' | 'dailyUserIndexHistories' | 'dailyUserIndexHistory' | 'dex' | 'dexs' | 'hourlyIndexStat' | 'hourlyIndexStats' | 'index' | 'indexAsset' | 'indexAssets' | 'indexFactories' | 'indexFactory' | 'indexes' | 'lastOrderIndex' | 'lastOrderIndexes' | 'monthlyIndexStat' | 'monthlyIndexStats' | 'order' | 'orderDetailsInfo' | 'orderDetailsInfos' | 'orders' | 'pair' | 'pairs' | 'stat' | 'stats' | 'sushiPair' | 'sushiPairs' | 'swap' | 'swaps' | 'transaction' | 'transactions' | 'transfer' | 'transfers' | 'user' | 'userCapitalization' | 'userCapitalizations' | 'userIndex' | 'userIndexHistories' | 'userIndexHistory' | 'userIndexes' | 'users' | 'vToken' | 'vTokens' | 'weeklyIndexStat' | 'weeklyIndexStats' | 'yearlyIndexStat' | 'yearlyIndexStats' | QueryKeySpecifier)[];
export declare type QueryFieldPolicy = {
    _meta?: FieldPolicy<any> | FieldReadFunction<any>;
    asset?: FieldPolicy<any> | FieldReadFunction<any>;
    assets?: FieldPolicy<any> | FieldReadFunction<any>;
    chainLinkAgg?: FieldPolicy<any> | FieldReadFunction<any>;
    chainLinkAggs?: FieldPolicy<any> | FieldReadFunction<any>;
    dailyAssetStat?: FieldPolicy<any> | FieldReadFunction<any>;
    dailyAssetStats?: FieldPolicy<any> | FieldReadFunction<any>;
    dailyCapitalization?: FieldPolicy<any> | FieldReadFunction<any>;
    dailyCapitalizations?: FieldPolicy<any> | FieldReadFunction<any>;
    dailyIndexStat?: FieldPolicy<any> | FieldReadFunction<any>;
    dailyIndexStats?: FieldPolicy<any> | FieldReadFunction<any>;
    dailyStat?: FieldPolicy<any> | FieldReadFunction<any>;
    dailyStats?: FieldPolicy<any> | FieldReadFunction<any>;
    dailyUserIndexHistories?: FieldPolicy<any> | FieldReadFunction<any>;
    dailyUserIndexHistory?: FieldPolicy<any> | FieldReadFunction<any>;
    dex?: FieldPolicy<any> | FieldReadFunction<any>;
    dexs?: FieldPolicy<any> | FieldReadFunction<any>;
    hourlyIndexStat?: FieldPolicy<any> | FieldReadFunction<any>;
    hourlyIndexStats?: FieldPolicy<any> | FieldReadFunction<any>;
    index?: FieldPolicy<any> | FieldReadFunction<any>;
    indexAsset?: FieldPolicy<any> | FieldReadFunction<any>;
    indexAssets?: FieldPolicy<any> | FieldReadFunction<any>;
    indexFactories?: FieldPolicy<any> | FieldReadFunction<any>;
    indexFactory?: FieldPolicy<any> | FieldReadFunction<any>;
    indexes?: FieldPolicy<any> | FieldReadFunction<any>;
    lastOrderIndex?: FieldPolicy<any> | FieldReadFunction<any>;
    lastOrderIndexes?: FieldPolicy<any> | FieldReadFunction<any>;
    monthlyIndexStat?: FieldPolicy<any> | FieldReadFunction<any>;
    monthlyIndexStats?: FieldPolicy<any> | FieldReadFunction<any>;
    order?: FieldPolicy<any> | FieldReadFunction<any>;
    orderDetailsInfo?: FieldPolicy<any> | FieldReadFunction<any>;
    orderDetailsInfos?: FieldPolicy<any> | FieldReadFunction<any>;
    orders?: FieldPolicy<any> | FieldReadFunction<any>;
    pair?: FieldPolicy<any> | FieldReadFunction<any>;
    pairs?: FieldPolicy<any> | FieldReadFunction<any>;
    stat?: FieldPolicy<any> | FieldReadFunction<any>;
    stats?: FieldPolicy<any> | FieldReadFunction<any>;
    sushiPair?: FieldPolicy<any> | FieldReadFunction<any>;
    sushiPairs?: FieldPolicy<any> | FieldReadFunction<any>;
    swap?: FieldPolicy<any> | FieldReadFunction<any>;
    swaps?: FieldPolicy<any> | FieldReadFunction<any>;
    transaction?: FieldPolicy<any> | FieldReadFunction<any>;
    transactions?: FieldPolicy<any> | FieldReadFunction<any>;
    transfer?: FieldPolicy<any> | FieldReadFunction<any>;
    transfers?: FieldPolicy<any> | FieldReadFunction<any>;
    user?: FieldPolicy<any> | FieldReadFunction<any>;
    userCapitalization?: FieldPolicy<any> | FieldReadFunction<any>;
    userCapitalizations?: FieldPolicy<any> | FieldReadFunction<any>;
    userIndex?: FieldPolicy<any> | FieldReadFunction<any>;
    userIndexHistories?: FieldPolicy<any> | FieldReadFunction<any>;
    userIndexHistory?: FieldPolicy<any> | FieldReadFunction<any>;
    userIndexes?: FieldPolicy<any> | FieldReadFunction<any>;
    users?: FieldPolicy<any> | FieldReadFunction<any>;
    vToken?: FieldPolicy<any> | FieldReadFunction<any>;
    vTokens?: FieldPolicy<any> | FieldReadFunction<any>;
    weeklyIndexStat?: FieldPolicy<any> | FieldReadFunction<any>;
    weeklyIndexStats?: FieldPolicy<any> | FieldReadFunction<any>;
    yearlyIndexStat?: FieldPolicy<any> | FieldReadFunction<any>;
    yearlyIndexStats?: FieldPolicy<any> | FieldReadFunction<any>;
};
export declare type StatKeySpecifier = ('id' | 'indexCount' | 'totalValueLocked' | StatKeySpecifier)[];
export declare type StatFieldPolicy = {
    id?: FieldPolicy<any> | FieldReadFunction<any>;
    indexCount?: FieldPolicy<any> | FieldReadFunction<any>;
    totalValueLocked?: FieldPolicy<any> | FieldReadFunction<any>;
};
export declare type SubscriptionKeySpecifier = ('_meta' | 'asset' | 'assets' | 'chainLinkAgg' | 'chainLinkAggs' | 'dailyAssetStat' | 'dailyAssetStats' | 'dailyCapitalization' | 'dailyCapitalizations' | 'dailyIndexStat' | 'dailyIndexStats' | 'dailyStat' | 'dailyStats' | 'dailyUserIndexHistories' | 'dailyUserIndexHistory' | 'dex' | 'dexs' | 'hourlyIndexStat' | 'hourlyIndexStats' | 'index' | 'indexAsset' | 'indexAssets' | 'indexFactories' | 'indexFactory' | 'indexes' | 'lastOrderIndex' | 'lastOrderIndexes' | 'monthlyIndexStat' | 'monthlyIndexStats' | 'order' | 'orderDetailsInfo' | 'orderDetailsInfos' | 'orders' | 'pair' | 'pairs' | 'stat' | 'stats' | 'sushiPair' | 'sushiPairs' | 'swap' | 'swaps' | 'transaction' | 'transactions' | 'transfer' | 'transfers' | 'user' | 'userCapitalization' | 'userCapitalizations' | 'userIndex' | 'userIndexHistories' | 'userIndexHistory' | 'userIndexes' | 'users' | 'vToken' | 'vTokens' | 'weeklyIndexStat' | 'weeklyIndexStats' | 'yearlyIndexStat' | 'yearlyIndexStats' | SubscriptionKeySpecifier)[];
export declare type SubscriptionFieldPolicy = {
    _meta?: FieldPolicy<any> | FieldReadFunction<any>;
    asset?: FieldPolicy<any> | FieldReadFunction<any>;
    assets?: FieldPolicy<any> | FieldReadFunction<any>;
    chainLinkAgg?: FieldPolicy<any> | FieldReadFunction<any>;
    chainLinkAggs?: FieldPolicy<any> | FieldReadFunction<any>;
    dailyAssetStat?: FieldPolicy<any> | FieldReadFunction<any>;
    dailyAssetStats?: FieldPolicy<any> | FieldReadFunction<any>;
    dailyCapitalization?: FieldPolicy<any> | FieldReadFunction<any>;
    dailyCapitalizations?: FieldPolicy<any> | FieldReadFunction<any>;
    dailyIndexStat?: FieldPolicy<any> | FieldReadFunction<any>;
    dailyIndexStats?: FieldPolicy<any> | FieldReadFunction<any>;
    dailyStat?: FieldPolicy<any> | FieldReadFunction<any>;
    dailyStats?: FieldPolicy<any> | FieldReadFunction<any>;
    dailyUserIndexHistories?: FieldPolicy<any> | FieldReadFunction<any>;
    dailyUserIndexHistory?: FieldPolicy<any> | FieldReadFunction<any>;
    dex?: FieldPolicy<any> | FieldReadFunction<any>;
    dexs?: FieldPolicy<any> | FieldReadFunction<any>;
    hourlyIndexStat?: FieldPolicy<any> | FieldReadFunction<any>;
    hourlyIndexStats?: FieldPolicy<any> | FieldReadFunction<any>;
    index?: FieldPolicy<any> | FieldReadFunction<any>;
    indexAsset?: FieldPolicy<any> | FieldReadFunction<any>;
    indexAssets?: FieldPolicy<any> | FieldReadFunction<any>;
    indexFactories?: FieldPolicy<any> | FieldReadFunction<any>;
    indexFactory?: FieldPolicy<any> | FieldReadFunction<any>;
    indexes?: FieldPolicy<any> | FieldReadFunction<any>;
    lastOrderIndex?: FieldPolicy<any> | FieldReadFunction<any>;
    lastOrderIndexes?: FieldPolicy<any> | FieldReadFunction<any>;
    monthlyIndexStat?: FieldPolicy<any> | FieldReadFunction<any>;
    monthlyIndexStats?: FieldPolicy<any> | FieldReadFunction<any>;
    order?: FieldPolicy<any> | FieldReadFunction<any>;
    orderDetailsInfo?: FieldPolicy<any> | FieldReadFunction<any>;
    orderDetailsInfos?: FieldPolicy<any> | FieldReadFunction<any>;
    orders?: FieldPolicy<any> | FieldReadFunction<any>;
    pair?: FieldPolicy<any> | FieldReadFunction<any>;
    pairs?: FieldPolicy<any> | FieldReadFunction<any>;
    stat?: FieldPolicy<any> | FieldReadFunction<any>;
    stats?: FieldPolicy<any> | FieldReadFunction<any>;
    sushiPair?: FieldPolicy<any> | FieldReadFunction<any>;
    sushiPairs?: FieldPolicy<any> | FieldReadFunction<any>;
    swap?: FieldPolicy<any> | FieldReadFunction<any>;
    swaps?: FieldPolicy<any> | FieldReadFunction<any>;
    transaction?: FieldPolicy<any> | FieldReadFunction<any>;
    transactions?: FieldPolicy<any> | FieldReadFunction<any>;
    transfer?: FieldPolicy<any> | FieldReadFunction<any>;
    transfers?: FieldPolicy<any> | FieldReadFunction<any>;
    user?: FieldPolicy<any> | FieldReadFunction<any>;
    userCapitalization?: FieldPolicy<any> | FieldReadFunction<any>;
    userCapitalizations?: FieldPolicy<any> | FieldReadFunction<any>;
    userIndex?: FieldPolicy<any> | FieldReadFunction<any>;
    userIndexHistories?: FieldPolicy<any> | FieldReadFunction<any>;
    userIndexHistory?: FieldPolicy<any> | FieldReadFunction<any>;
    userIndexes?: FieldPolicy<any> | FieldReadFunction<any>;
    users?: FieldPolicy<any> | FieldReadFunction<any>;
    vToken?: FieldPolicy<any> | FieldReadFunction<any>;
    vTokens?: FieldPolicy<any> | FieldReadFunction<any>;
    weeklyIndexStat?: FieldPolicy<any> | FieldReadFunction<any>;
    weeklyIndexStats?: FieldPolicy<any> | FieldReadFunction<any>;
    yearlyIndexStat?: FieldPolicy<any> | FieldReadFunction<any>;
    yearlyIndexStats?: FieldPolicy<any> | FieldReadFunction<any>;
};
export declare type SushiPairKeySpecifier = ('asset0' | 'asset0Reserve' | 'asset1' | 'asset1Reserve' | 'id' | 'swap' | 'totalSupply' | SushiPairKeySpecifier)[];
export declare type SushiPairFieldPolicy = {
    asset0?: FieldPolicy<any> | FieldReadFunction<any>;
    asset0Reserve?: FieldPolicy<any> | FieldReadFunction<any>;
    asset1?: FieldPolicy<any> | FieldReadFunction<any>;
    asset1Reserve?: FieldPolicy<any> | FieldReadFunction<any>;
    id?: FieldPolicy<any> | FieldReadFunction<any>;
    swap?: FieldPolicy<any> | FieldReadFunction<any>;
    totalSupply?: FieldPolicy<any> | FieldReadFunction<any>;
};
export declare type SwapKeySpecifier = ('id' | 'pairs' | SwapKeySpecifier)[];
export declare type SwapFieldPolicy = {
    id?: FieldPolicy<any> | FieldReadFunction<any>;
    pairs?: FieldPolicy<any> | FieldReadFunction<any>;
};
export declare type TransactionKeySpecifier = ('blockNumber' | 'gasPrice' | 'gasUsed' | 'id' | 'timestamp' | 'transfers' | 'value' | TransactionKeySpecifier)[];
export declare type TransactionFieldPolicy = {
    blockNumber?: FieldPolicy<any> | FieldReadFunction<any>;
    gasPrice?: FieldPolicy<any> | FieldReadFunction<any>;
    gasUsed?: FieldPolicy<any> | FieldReadFunction<any>;
    id?: FieldPolicy<any> | FieldReadFunction<any>;
    timestamp?: FieldPolicy<any> | FieldReadFunction<any>;
    transfers?: FieldPolicy<any> | FieldReadFunction<any>;
    value?: FieldPolicy<any> | FieldReadFunction<any>;
};
export declare type TransferKeySpecifier = ('from' | 'id' | 'index' | 'to' | 'transaction' | 'type' | 'value' | TransferKeySpecifier)[];
export declare type TransferFieldPolicy = {
    from?: FieldPolicy<any> | FieldReadFunction<any>;
    id?: FieldPolicy<any> | FieldReadFunction<any>;
    index?: FieldPolicy<any> | FieldReadFunction<any>;
    to?: FieldPolicy<any> | FieldReadFunction<any>;
    transaction?: FieldPolicy<any> | FieldReadFunction<any>;
    type?: FieldPolicy<any> | FieldReadFunction<any>;
    value?: FieldPolicy<any> | FieldReadFunction<any>;
};
export declare type UserKeySpecifier = ('id' | 'indexes' | UserKeySpecifier)[];
export declare type UserFieldPolicy = {
    id?: FieldPolicy<any> | FieldReadFunction<any>;
    indexes?: FieldPolicy<any> | FieldReadFunction<any>;
};
export declare type UserCapitalizationKeySpecifier = ('capitalization' | 'id' | 'index' | 'logIndex' | 'timestamp' | UserCapitalizationKeySpecifier)[];
export declare type UserCapitalizationFieldPolicy = {
    capitalization?: FieldPolicy<any> | FieldReadFunction<any>;
    id?: FieldPolicy<any> | FieldReadFunction<any>;
    index?: FieldPolicy<any> | FieldReadFunction<any>;
    logIndex?: FieldPolicy<any> | FieldReadFunction<any>;
    timestamp?: FieldPolicy<any> | FieldReadFunction<any>;
};
export declare type UserIndexKeySpecifier = ('balance' | 'capitalization' | 'id' | 'index' | 'user' | UserIndexKeySpecifier)[];
export declare type UserIndexFieldPolicy = {
    balance?: FieldPolicy<any> | FieldReadFunction<any>;
    capitalization?: FieldPolicy<any> | FieldReadFunction<any>;
    id?: FieldPolicy<any> | FieldReadFunction<any>;
    index?: FieldPolicy<any> | FieldReadFunction<any>;
    user?: FieldPolicy<any> | FieldReadFunction<any>;
};
export declare type UserIndexHistoryKeySpecifier = ('balance' | 'capitalization' | 'id' | 'index' | 'logIndex' | 'timestamp' | 'totalSupply' | 'user' | UserIndexHistoryKeySpecifier)[];
export declare type UserIndexHistoryFieldPolicy = {
    balance?: FieldPolicy<any> | FieldReadFunction<any>;
    capitalization?: FieldPolicy<any> | FieldReadFunction<any>;
    id?: FieldPolicy<any> | FieldReadFunction<any>;
    index?: FieldPolicy<any> | FieldReadFunction<any>;
    logIndex?: FieldPolicy<any> | FieldReadFunction<any>;
    timestamp?: FieldPolicy<any> | FieldReadFunction<any>;
    totalSupply?: FieldPolicy<any> | FieldReadFunction<any>;
    user?: FieldPolicy<any> | FieldReadFunction<any>;
};
export declare type WeeklyIndexStatKeySpecifier = ('basePrice' | 'basePriceETH' | 'baseVolume' | 'date' | 'id' | 'index' | 'marketCap' | 'uniqueHolders' | WeeklyIndexStatKeySpecifier)[];
export declare type WeeklyIndexStatFieldPolicy = {
    basePrice?: FieldPolicy<any> | FieldReadFunction<any>;
    basePriceETH?: FieldPolicy<any> | FieldReadFunction<any>;
    baseVolume?: FieldPolicy<any> | FieldReadFunction<any>;
    date?: FieldPolicy<any> | FieldReadFunction<any>;
    id?: FieldPolicy<any> | FieldReadFunction<any>;
    index?: FieldPolicy<any> | FieldReadFunction<any>;
    marketCap?: FieldPolicy<any> | FieldReadFunction<any>;
    uniqueHolders?: FieldPolicy<any> | FieldReadFunction<any>;
};
export declare type YearlyIndexStatKeySpecifier = ('basePrice' | 'basePriceETH' | 'baseVolume' | 'date' | 'id' | 'index' | 'marketCap' | 'uniqueHolders' | YearlyIndexStatKeySpecifier)[];
export declare type YearlyIndexStatFieldPolicy = {
    basePrice?: FieldPolicy<any> | FieldReadFunction<any>;
    basePriceETH?: FieldPolicy<any> | FieldReadFunction<any>;
    baseVolume?: FieldPolicy<any> | FieldReadFunction<any>;
    date?: FieldPolicy<any> | FieldReadFunction<any>;
    id?: FieldPolicy<any> | FieldReadFunction<any>;
    index?: FieldPolicy<any> | FieldReadFunction<any>;
    marketCap?: FieldPolicy<any> | FieldReadFunction<any>;
    uniqueHolders?: FieldPolicy<any> | FieldReadFunction<any>;
};
export declare type _Block_KeySpecifier = ('hash' | 'number' | _Block_KeySpecifier)[];
export declare type _Block_FieldPolicy = {
    hash?: FieldPolicy<any> | FieldReadFunction<any>;
    number?: FieldPolicy<any> | FieldReadFunction<any>;
};
export declare type _Meta_KeySpecifier = ('block' | 'deployment' | 'hasIndexingErrors' | _Meta_KeySpecifier)[];
export declare type _Meta_FieldPolicy = {
    block?: FieldPolicy<any> | FieldReadFunction<any>;
    deployment?: FieldPolicy<any> | FieldReadFunction<any>;
    hasIndexingErrors?: FieldPolicy<any> | FieldReadFunction<any>;
};
export declare type vTokenKeySpecifier = ('asset' | 'assetReserve' | 'capitalization' | 'deposited' | 'factory' | 'id' | 'platformTotalSupply' | 'platformTotalSupplyDec' | 'tokenType' | 'totalAmount' | vTokenKeySpecifier)[];
export declare type vTokenFieldPolicy = {
    asset?: FieldPolicy<any> | FieldReadFunction<any>;
    assetReserve?: FieldPolicy<any> | FieldReadFunction<any>;
    capitalization?: FieldPolicy<any> | FieldReadFunction<any>;
    deposited?: FieldPolicy<any> | FieldReadFunction<any>;
    factory?: FieldPolicy<any> | FieldReadFunction<any>;
    id?: FieldPolicy<any> | FieldReadFunction<any>;
    platformTotalSupply?: FieldPolicy<any> | FieldReadFunction<any>;
    platformTotalSupplyDec?: FieldPolicy<any> | FieldReadFunction<any>;
    tokenType?: FieldPolicy<any> | FieldReadFunction<any>;
    totalAmount?: FieldPolicy<any> | FieldReadFunction<any>;
};
export declare type StrictTypedTypePolicies = {
    Asset?: Omit<TypePolicy, "fields" | "keyFields"> & {
        keyFields?: false | AssetKeySpecifier | (() => undefined | AssetKeySpecifier);
        fields?: AssetFieldPolicy;
    };
    ChainLinkAgg?: Omit<TypePolicy, "fields" | "keyFields"> & {
        keyFields?: false | ChainLinkAggKeySpecifier | (() => undefined | ChainLinkAggKeySpecifier);
        fields?: ChainLinkAggFieldPolicy;
    };
    DEX?: Omit<TypePolicy, "fields" | "keyFields"> & {
        keyFields?: false | DEXKeySpecifier | (() => undefined | DEXKeySpecifier);
        fields?: DEXFieldPolicy;
    };
    DailyAssetStat?: Omit<TypePolicy, "fields" | "keyFields"> & {
        keyFields?: false | DailyAssetStatKeySpecifier | (() => undefined | DailyAssetStatKeySpecifier);
        fields?: DailyAssetStatFieldPolicy;
    };
    DailyCapitalization?: Omit<TypePolicy, "fields" | "keyFields"> & {
        keyFields?: false | DailyCapitalizationKeySpecifier | (() => undefined | DailyCapitalizationKeySpecifier);
        fields?: DailyCapitalizationFieldPolicy;
    };
    DailyIndexStat?: Omit<TypePolicy, "fields" | "keyFields"> & {
        keyFields?: false | DailyIndexStatKeySpecifier | (() => undefined | DailyIndexStatKeySpecifier);
        fields?: DailyIndexStatFieldPolicy;
    };
    DailyStat?: Omit<TypePolicy, "fields" | "keyFields"> & {
        keyFields?: false | DailyStatKeySpecifier | (() => undefined | DailyStatKeySpecifier);
        fields?: DailyStatFieldPolicy;
    };
    DailyUserIndexHistory?: Omit<TypePolicy, "fields" | "keyFields"> & {
        keyFields?: false | DailyUserIndexHistoryKeySpecifier | (() => undefined | DailyUserIndexHistoryKeySpecifier);
        fields?: DailyUserIndexHistoryFieldPolicy;
    };
    HourlyIndexStat?: Omit<TypePolicy, "fields" | "keyFields"> & {
        keyFields?: false | HourlyIndexStatKeySpecifier | (() => undefined | HourlyIndexStatKeySpecifier);
        fields?: HourlyIndexStatFieldPolicy;
    };
    Index?: Omit<TypePolicy, "fields" | "keyFields"> & {
        keyFields?: false | IndexKeySpecifier | (() => undefined | IndexKeySpecifier);
        fields?: IndexFieldPolicy;
    };
    IndexAsset?: Omit<TypePolicy, "fields" | "keyFields"> & {
        keyFields?: false | IndexAssetKeySpecifier | (() => undefined | IndexAssetKeySpecifier);
        fields?: IndexAssetFieldPolicy;
    };
    IndexFactory?: Omit<TypePolicy, "fields" | "keyFields"> & {
        keyFields?: false | IndexFactoryKeySpecifier | (() => undefined | IndexFactoryKeySpecifier);
        fields?: IndexFactoryFieldPolicy;
    };
    LastOrderIndex?: Omit<TypePolicy, "fields" | "keyFields"> & {
        keyFields?: false | LastOrderIndexKeySpecifier | (() => undefined | LastOrderIndexKeySpecifier);
        fields?: LastOrderIndexFieldPolicy;
    };
    MonthlyIndexStat?: Omit<TypePolicy, "fields" | "keyFields"> & {
        keyFields?: false | MonthlyIndexStatKeySpecifier | (() => undefined | MonthlyIndexStatKeySpecifier);
        fields?: MonthlyIndexStatFieldPolicy;
    };
    Order?: Omit<TypePolicy, "fields" | "keyFields"> & {
        keyFields?: false | OrderKeySpecifier | (() => undefined | OrderKeySpecifier);
        fields?: OrderFieldPolicy;
    };
    OrderDetailsInfo?: Omit<TypePolicy, "fields" | "keyFields"> & {
        keyFields?: false | OrderDetailsInfoKeySpecifier | (() => undefined | OrderDetailsInfoKeySpecifier);
        fields?: OrderDetailsInfoFieldPolicy;
    };
    Pair?: Omit<TypePolicy, "fields" | "keyFields"> & {
        keyFields?: false | PairKeySpecifier | (() => undefined | PairKeySpecifier);
        fields?: PairFieldPolicy;
    };
    Query?: Omit<TypePolicy, "fields" | "keyFields"> & {
        keyFields?: false | QueryKeySpecifier | (() => undefined | QueryKeySpecifier);
        fields?: QueryFieldPolicy;
    };
    Stat?: Omit<TypePolicy, "fields" | "keyFields"> & {
        keyFields?: false | StatKeySpecifier | (() => undefined | StatKeySpecifier);
        fields?: StatFieldPolicy;
    };
    Subscription?: Omit<TypePolicy, "fields" | "keyFields"> & {
        keyFields?: false | SubscriptionKeySpecifier | (() => undefined | SubscriptionKeySpecifier);
        fields?: SubscriptionFieldPolicy;
    };
    SushiPair?: Omit<TypePolicy, "fields" | "keyFields"> & {
        keyFields?: false | SushiPairKeySpecifier | (() => undefined | SushiPairKeySpecifier);
        fields?: SushiPairFieldPolicy;
    };
    Swap?: Omit<TypePolicy, "fields" | "keyFields"> & {
        keyFields?: false | SwapKeySpecifier | (() => undefined | SwapKeySpecifier);
        fields?: SwapFieldPolicy;
    };
    Transaction?: Omit<TypePolicy, "fields" | "keyFields"> & {
        keyFields?: false | TransactionKeySpecifier | (() => undefined | TransactionKeySpecifier);
        fields?: TransactionFieldPolicy;
    };
    Transfer?: Omit<TypePolicy, "fields" | "keyFields"> & {
        keyFields?: false | TransferKeySpecifier | (() => undefined | TransferKeySpecifier);
        fields?: TransferFieldPolicy;
    };
    User?: Omit<TypePolicy, "fields" | "keyFields"> & {
        keyFields?: false | UserKeySpecifier | (() => undefined | UserKeySpecifier);
        fields?: UserFieldPolicy;
    };
    UserCapitalization?: Omit<TypePolicy, "fields" | "keyFields"> & {
        keyFields?: false | UserCapitalizationKeySpecifier | (() => undefined | UserCapitalizationKeySpecifier);
        fields?: UserCapitalizationFieldPolicy;
    };
    UserIndex?: Omit<TypePolicy, "fields" | "keyFields"> & {
        keyFields?: false | UserIndexKeySpecifier | (() => undefined | UserIndexKeySpecifier);
        fields?: UserIndexFieldPolicy;
    };
    UserIndexHistory?: Omit<TypePolicy, "fields" | "keyFields"> & {
        keyFields?: false | UserIndexHistoryKeySpecifier | (() => undefined | UserIndexHistoryKeySpecifier);
        fields?: UserIndexHistoryFieldPolicy;
    };
    WeeklyIndexStat?: Omit<TypePolicy, "fields" | "keyFields"> & {
        keyFields?: false | WeeklyIndexStatKeySpecifier | (() => undefined | WeeklyIndexStatKeySpecifier);
        fields?: WeeklyIndexStatFieldPolicy;
    };
    YearlyIndexStat?: Omit<TypePolicy, "fields" | "keyFields"> & {
        keyFields?: false | YearlyIndexStatKeySpecifier | (() => undefined | YearlyIndexStatKeySpecifier);
        fields?: YearlyIndexStatFieldPolicy;
    };
    _Block_?: Omit<TypePolicy, "fields" | "keyFields"> & {
        keyFields?: false | _Block_KeySpecifier | (() => undefined | _Block_KeySpecifier);
        fields?: _Block_FieldPolicy;
    };
    _Meta_?: Omit<TypePolicy, "fields" | "keyFields"> & {
        keyFields?: false | _Meta_KeySpecifier | (() => undefined | _Meta_KeySpecifier);
        fields?: _Meta_FieldPolicy;
    };
    vToken?: Omit<TypePolicy, "fields" | "keyFields"> & {
        keyFields?: false | vTokenKeySpecifier | (() => undefined | vTokenKeySpecifier);
        fields?: vTokenFieldPolicy;
    };
};
export declare type TypedTypePolicies = StrictTypedTypePolicies & TypePolicies;
