import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigDecimal: any;
  BigInt: any;
  Bytes: any;
};

export type Asset = {
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


export type AssetDailyStatsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<DailyAssetStat_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<DailyAssetStat_Filter>;
};


export type AssetIndexesArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<IndexAsset_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<IndexAsset_Filter>;
};


export type AssetPairsAsAsset0Args = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Pair_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Pair_Filter>;
};


export type AssetPairsAsAsset1Args = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Pair_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Pair_Filter>;
};


export type AssetVTokensArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<VToken_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<VToken_Filter>;
};

export type Asset_Filter = {
  _indexes?: InputMaybe<Array<Scalars['ID']>>;
  _indexes_contains?: InputMaybe<Array<Scalars['ID']>>;
  _indexes_not?: InputMaybe<Array<Scalars['ID']>>;
  _indexes_not_contains?: InputMaybe<Array<Scalars['ID']>>;
  _vTokens?: InputMaybe<Array<Scalars['ID']>>;
  _vTokens_contains?: InputMaybe<Array<Scalars['ID']>>;
  _vTokens_not?: InputMaybe<Array<Scalars['ID']>>;
  _vTokens_not_contains?: InputMaybe<Array<Scalars['ID']>>;
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
  name_ends_with?: InputMaybe<Scalars['String']>;
  name_gt?: InputMaybe<Scalars['String']>;
  name_gte?: InputMaybe<Scalars['String']>;
  name_in?: InputMaybe<Array<Scalars['String']>>;
  name_lt?: InputMaybe<Scalars['String']>;
  name_lte?: InputMaybe<Scalars['String']>;
  name_not?: InputMaybe<Scalars['String']>;
  name_not_contains?: InputMaybe<Scalars['String']>;
  name_not_ends_with?: InputMaybe<Scalars['String']>;
  name_not_in?: InputMaybe<Array<Scalars['String']>>;
  name_not_starts_with?: InputMaybe<Scalars['String']>;
  name_starts_with?: InputMaybe<Scalars['String']>;
  symbol?: InputMaybe<Scalars['String']>;
  symbol_contains?: InputMaybe<Scalars['String']>;
  symbol_ends_with?: InputMaybe<Scalars['String']>;
  symbol_gt?: InputMaybe<Scalars['String']>;
  symbol_gte?: InputMaybe<Scalars['String']>;
  symbol_in?: InputMaybe<Array<Scalars['String']>>;
  symbol_lt?: InputMaybe<Scalars['String']>;
  symbol_lte?: InputMaybe<Scalars['String']>;
  symbol_not?: InputMaybe<Scalars['String']>;
  symbol_not_contains?: InputMaybe<Scalars['String']>;
  symbol_not_ends_with?: InputMaybe<Scalars['String']>;
  symbol_not_in?: InputMaybe<Array<Scalars['String']>>;
  symbol_not_starts_with?: InputMaybe<Scalars['String']>;
  symbol_starts_with?: InputMaybe<Scalars['String']>;
  totalSupply?: InputMaybe<Scalars['BigInt']>;
  totalSupply_gt?: InputMaybe<Scalars['BigInt']>;
  totalSupply_gte?: InputMaybe<Scalars['BigInt']>;
  totalSupply_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalSupply_lt?: InputMaybe<Scalars['BigInt']>;
  totalSupply_lte?: InputMaybe<Scalars['BigInt']>;
  totalSupply_not?: InputMaybe<Scalars['BigInt']>;
  totalSupply_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
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

export enum Asset_OrderBy {
  Indexes = '_indexes',
  VTokens = '_vTokens',
  BasePrice = 'basePrice',
  BasePriceSushi = 'basePriceSushi',
  BasePriceUni = 'basePriceUni',
  DailyStats = 'dailyStats',
  Decimals = 'decimals',
  Id = 'id',
  IndexCount = 'indexCount',
  Indexes = 'indexes',
  IsWhitelisted = 'isWhitelisted',
  MarketCap = 'marketCap',
  Name = 'name',
  PairsAsAsset0 = 'pairsAsAsset0',
  PairsAsAsset1 = 'pairsAsAsset1',
  Symbol = 'symbol',
  TotalSupply = 'totalSupply',
  VTokens = 'vTokens',
  VaultBaseReserve = 'vaultBaseReserve',
  VaultReserve = 'vaultReserve'
}

export type Block_Height = {
  hash?: InputMaybe<Scalars['Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type ChainLinkAgg = {
  __typename?: 'ChainLinkAgg';
  answer: Scalars['BigInt'];
  asset: Asset;
  decimals: Scalars['BigInt'];
  description: Scalars['String'];
  id: Scalars['ID'];
  nextAgg?: Maybe<ChainLinkAgg>;
  updatedAt: Scalars['BigInt'];
};

export type ChainLinkAgg_Filter = {
  answer?: InputMaybe<Scalars['BigInt']>;
  answer_gt?: InputMaybe<Scalars['BigInt']>;
  answer_gte?: InputMaybe<Scalars['BigInt']>;
  answer_in?: InputMaybe<Array<Scalars['BigInt']>>;
  answer_lt?: InputMaybe<Scalars['BigInt']>;
  answer_lte?: InputMaybe<Scalars['BigInt']>;
  answer_not?: InputMaybe<Scalars['BigInt']>;
  answer_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  asset?: InputMaybe<Scalars['String']>;
  asset_contains?: InputMaybe<Scalars['String']>;
  asset_ends_with?: InputMaybe<Scalars['String']>;
  asset_gt?: InputMaybe<Scalars['String']>;
  asset_gte?: InputMaybe<Scalars['String']>;
  asset_in?: InputMaybe<Array<Scalars['String']>>;
  asset_lt?: InputMaybe<Scalars['String']>;
  asset_lte?: InputMaybe<Scalars['String']>;
  asset_not?: InputMaybe<Scalars['String']>;
  asset_not_contains?: InputMaybe<Scalars['String']>;
  asset_not_ends_with?: InputMaybe<Scalars['String']>;
  asset_not_in?: InputMaybe<Array<Scalars['String']>>;
  asset_not_starts_with?: InputMaybe<Scalars['String']>;
  asset_starts_with?: InputMaybe<Scalars['String']>;
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
  description_ends_with?: InputMaybe<Scalars['String']>;
  description_gt?: InputMaybe<Scalars['String']>;
  description_gte?: InputMaybe<Scalars['String']>;
  description_in?: InputMaybe<Array<Scalars['String']>>;
  description_lt?: InputMaybe<Scalars['String']>;
  description_lte?: InputMaybe<Scalars['String']>;
  description_not?: InputMaybe<Scalars['String']>;
  description_not_contains?: InputMaybe<Scalars['String']>;
  description_not_ends_with?: InputMaybe<Scalars['String']>;
  description_not_in?: InputMaybe<Array<Scalars['String']>>;
  description_not_starts_with?: InputMaybe<Scalars['String']>;
  description_starts_with?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  nextAgg?: InputMaybe<Scalars['String']>;
  nextAgg_contains?: InputMaybe<Scalars['String']>;
  nextAgg_ends_with?: InputMaybe<Scalars['String']>;
  nextAgg_gt?: InputMaybe<Scalars['String']>;
  nextAgg_gte?: InputMaybe<Scalars['String']>;
  nextAgg_in?: InputMaybe<Array<Scalars['String']>>;
  nextAgg_lt?: InputMaybe<Scalars['String']>;
  nextAgg_lte?: InputMaybe<Scalars['String']>;
  nextAgg_not?: InputMaybe<Scalars['String']>;
  nextAgg_not_contains?: InputMaybe<Scalars['String']>;
  nextAgg_not_ends_with?: InputMaybe<Scalars['String']>;
  nextAgg_not_in?: InputMaybe<Array<Scalars['String']>>;
  nextAgg_not_starts_with?: InputMaybe<Scalars['String']>;
  nextAgg_starts_with?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['BigInt']>;
  updatedAt_gt?: InputMaybe<Scalars['BigInt']>;
  updatedAt_gte?: InputMaybe<Scalars['BigInt']>;
  updatedAt_in?: InputMaybe<Array<Scalars['BigInt']>>;
  updatedAt_lt?: InputMaybe<Scalars['BigInt']>;
  updatedAt_lte?: InputMaybe<Scalars['BigInt']>;
  updatedAt_not?: InputMaybe<Scalars['BigInt']>;
  updatedAt_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum ChainLinkAgg_OrderBy {
  Answer = 'answer',
  Asset = 'asset',
  Decimals = 'decimals',
  Description = 'description',
  Id = 'id',
  NextAgg = 'nextAgg',
  UpdatedAt = 'updatedAt'
}

export type Dex = {
  __typename?: 'DEX';
  id: Scalars['ID'];
  router: Scalars['String'];
  type: Scalars['String'];
};

export type Dex_Filter = {
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
  router_ends_with?: InputMaybe<Scalars['String']>;
  router_gt?: InputMaybe<Scalars['String']>;
  router_gte?: InputMaybe<Scalars['String']>;
  router_in?: InputMaybe<Array<Scalars['String']>>;
  router_lt?: InputMaybe<Scalars['String']>;
  router_lte?: InputMaybe<Scalars['String']>;
  router_not?: InputMaybe<Scalars['String']>;
  router_not_contains?: InputMaybe<Scalars['String']>;
  router_not_ends_with?: InputMaybe<Scalars['String']>;
  router_not_in?: InputMaybe<Array<Scalars['String']>>;
  router_not_starts_with?: InputMaybe<Scalars['String']>;
  router_starts_with?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
  type_contains?: InputMaybe<Scalars['String']>;
  type_ends_with?: InputMaybe<Scalars['String']>;
  type_gt?: InputMaybe<Scalars['String']>;
  type_gte?: InputMaybe<Scalars['String']>;
  type_in?: InputMaybe<Array<Scalars['String']>>;
  type_lt?: InputMaybe<Scalars['String']>;
  type_lte?: InputMaybe<Scalars['String']>;
  type_not?: InputMaybe<Scalars['String']>;
  type_not_contains?: InputMaybe<Scalars['String']>;
  type_not_ends_with?: InputMaybe<Scalars['String']>;
  type_not_in?: InputMaybe<Array<Scalars['String']>>;
  type_not_starts_with?: InputMaybe<Scalars['String']>;
  type_starts_with?: InputMaybe<Scalars['String']>;
};

export enum Dex_OrderBy {
  Id = 'id',
  Router = 'router',
  Type = 'type'
}

export type DailyAssetStat = {
  __typename?: 'DailyAssetStat';
  asset: Asset;
  basePrice: Scalars['BigDecimal'];
  date: Scalars['Int'];
  id: Scalars['ID'];
  vaultBaseReserve: Scalars['BigDecimal'];
  vaultReserve: Scalars['BigDecimal'];
};

export type DailyAssetStat_Filter = {
  asset?: InputMaybe<Scalars['String']>;
  asset_contains?: InputMaybe<Scalars['String']>;
  asset_ends_with?: InputMaybe<Scalars['String']>;
  asset_gt?: InputMaybe<Scalars['String']>;
  asset_gte?: InputMaybe<Scalars['String']>;
  asset_in?: InputMaybe<Array<Scalars['String']>>;
  asset_lt?: InputMaybe<Scalars['String']>;
  asset_lte?: InputMaybe<Scalars['String']>;
  asset_not?: InputMaybe<Scalars['String']>;
  asset_not_contains?: InputMaybe<Scalars['String']>;
  asset_not_ends_with?: InputMaybe<Scalars['String']>;
  asset_not_in?: InputMaybe<Array<Scalars['String']>>;
  asset_not_starts_with?: InputMaybe<Scalars['String']>;
  asset_starts_with?: InputMaybe<Scalars['String']>;
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

export enum DailyAssetStat_OrderBy {
  Asset = 'asset',
  BasePrice = 'basePrice',
  Date = 'date',
  Id = 'id',
  VaultBaseReserve = 'vaultBaseReserve',
  VaultReserve = 'vaultReserve'
}

export type DailyCapitalization = {
  __typename?: 'DailyCapitalization';
  capitalization: Scalars['BigDecimal'];
  id: Scalars['ID'];
  index: Index;
  logIndex: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
};

export type DailyCapitalization_Filter = {
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
  index_contains?: InputMaybe<Scalars['String']>;
  index_ends_with?: InputMaybe<Scalars['String']>;
  index_gt?: InputMaybe<Scalars['String']>;
  index_gte?: InputMaybe<Scalars['String']>;
  index_in?: InputMaybe<Array<Scalars['String']>>;
  index_lt?: InputMaybe<Scalars['String']>;
  index_lte?: InputMaybe<Scalars['String']>;
  index_not?: InputMaybe<Scalars['String']>;
  index_not_contains?: InputMaybe<Scalars['String']>;
  index_not_ends_with?: InputMaybe<Scalars['String']>;
  index_not_in?: InputMaybe<Array<Scalars['String']>>;
  index_not_starts_with?: InputMaybe<Scalars['String']>;
  index_starts_with?: InputMaybe<Scalars['String']>;
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

export enum DailyCapitalization_OrderBy {
  Capitalization = 'capitalization',
  Id = 'id',
  Index = 'index',
  LogIndex = 'logIndex',
  Timestamp = 'timestamp'
}

export type DailyIndexStat = {
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

export type DailyIndexStat_Filter = {
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
  index_contains?: InputMaybe<Scalars['String']>;
  index_ends_with?: InputMaybe<Scalars['String']>;
  index_gt?: InputMaybe<Scalars['String']>;
  index_gte?: InputMaybe<Scalars['String']>;
  index_in?: InputMaybe<Array<Scalars['String']>>;
  index_lt?: InputMaybe<Scalars['String']>;
  index_lte?: InputMaybe<Scalars['String']>;
  index_not?: InputMaybe<Scalars['String']>;
  index_not_contains?: InputMaybe<Scalars['String']>;
  index_not_ends_with?: InputMaybe<Scalars['String']>;
  index_not_in?: InputMaybe<Array<Scalars['String']>>;
  index_not_starts_with?: InputMaybe<Scalars['String']>;
  index_starts_with?: InputMaybe<Scalars['String']>;
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

export enum DailyIndexStat_OrderBy {
  BasePrice = 'basePrice',
  BasePriceEth = 'basePriceETH',
  BaseVolume = 'baseVolume',
  Date = 'date',
  Id = 'id',
  Index = 'index',
  MarketCap = 'marketCap',
  UniqueHolders = 'uniqueHolders'
}

export type DailyStat = {
  __typename?: 'DailyStat';
  date: Scalars['Int'];
  id: Scalars['ID'];
  indexCount: Scalars['BigInt'];
  totalValueLocked: Scalars['BigDecimal'];
};

export type DailyStat_Filter = {
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

export enum DailyStat_OrderBy {
  Date = 'date',
  Id = 'id',
  IndexCount = 'indexCount',
  TotalValueLocked = 'totalValueLocked'
}

export type DailyUserIndexHistory = {
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

export type DailyUserIndexHistory_Filter = {
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
  index_contains?: InputMaybe<Scalars['String']>;
  index_ends_with?: InputMaybe<Scalars['String']>;
  index_gt?: InputMaybe<Scalars['String']>;
  index_gte?: InputMaybe<Scalars['String']>;
  index_in?: InputMaybe<Array<Scalars['String']>>;
  index_lt?: InputMaybe<Scalars['String']>;
  index_lte?: InputMaybe<Scalars['String']>;
  index_not?: InputMaybe<Scalars['String']>;
  index_not_contains?: InputMaybe<Scalars['String']>;
  index_not_ends_with?: InputMaybe<Scalars['String']>;
  index_not_in?: InputMaybe<Array<Scalars['String']>>;
  index_not_starts_with?: InputMaybe<Scalars['String']>;
  index_starts_with?: InputMaybe<Scalars['String']>;
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
  user_contains?: InputMaybe<Scalars['String']>;
  user_ends_with?: InputMaybe<Scalars['String']>;
  user_gt?: InputMaybe<Scalars['String']>;
  user_gte?: InputMaybe<Scalars['String']>;
  user_in?: InputMaybe<Array<Scalars['String']>>;
  user_lt?: InputMaybe<Scalars['String']>;
  user_lte?: InputMaybe<Scalars['String']>;
  user_not?: InputMaybe<Scalars['String']>;
  user_not_contains?: InputMaybe<Scalars['String']>;
  user_not_ends_with?: InputMaybe<Scalars['String']>;
  user_not_in?: InputMaybe<Array<Scalars['String']>>;
  user_not_starts_with?: InputMaybe<Scalars['String']>;
  user_starts_with?: InputMaybe<Scalars['String']>;
};

export enum DailyUserIndexHistory_OrderBy {
  AvgBalance = 'avgBalance',
  AvgCapitalization = 'avgCapitalization',
  Id = 'id',
  Index = 'index',
  LogIndex = 'logIndex',
  Number = 'number',
  Timestamp = 'timestamp',
  Total = 'total',
  TotalCap = 'totalCap',
  TotalSupply = 'totalSupply',
  User = 'user'
}

export type HourlyIndexStat = {
  __typename?: 'HourlyIndexStat';
  basePrice: Scalars['BigDecimal'];
  baseVolume: Scalars['BigDecimal'];
  date: Scalars['Int'];
  id: Scalars['ID'];
  index: Index;
  marketCap: Scalars['BigDecimal'];
  uniqueHolders: Scalars['BigInt'];
};

export type HourlyIndexStat_Filter = {
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
  index_contains?: InputMaybe<Scalars['String']>;
  index_ends_with?: InputMaybe<Scalars['String']>;
  index_gt?: InputMaybe<Scalars['String']>;
  index_gte?: InputMaybe<Scalars['String']>;
  index_in?: InputMaybe<Array<Scalars['String']>>;
  index_lt?: InputMaybe<Scalars['String']>;
  index_lte?: InputMaybe<Scalars['String']>;
  index_not?: InputMaybe<Scalars['String']>;
  index_not_contains?: InputMaybe<Scalars['String']>;
  index_not_ends_with?: InputMaybe<Scalars['String']>;
  index_not_in?: InputMaybe<Array<Scalars['String']>>;
  index_not_starts_with?: InputMaybe<Scalars['String']>;
  index_starts_with?: InputMaybe<Scalars['String']>;
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

export enum HourlyIndexStat_OrderBy {
  BasePrice = 'basePrice',
  BaseVolume = 'baseVolume',
  Date = 'date',
  Id = 'id',
  Index = 'index',
  MarketCap = 'marketCap',
  UniqueHolders = 'uniqueHolders'
}

export type Index = {
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


export type IndexAssetsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<IndexAsset_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<IndexAsset_Filter>;
};


export type IndexDailyStatsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<DailyIndexStat_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<DailyIndexStat_Filter>;
};


export type IndexHourlyStatsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<HourlyIndexStat_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<HourlyIndexStat_Filter>;
};


export type IndexInactiveAssetsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<IndexAsset_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<IndexAsset_Filter>;
};


export type IndexMonthlyStatsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<MonthlyIndexStat_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<MonthlyIndexStat_Filter>;
};


export type IndexUsersArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UserIndex_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserIndex_Filter>;
};


export type IndexWeeklyStatsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<WeeklyIndexStat_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<WeeklyIndexStat_Filter>;
};


export type IndexYearlyStatsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<YearlyIndexStat_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<YearlyIndexStat_Filter>;
};

export type IndexAsset = {
  __typename?: 'IndexAsset';
  asset: Asset;
  id: Scalars['ID'];
  inactiveIndex?: Maybe<Index>;
  index?: Maybe<Index>;
  shares: Scalars['BigInt'];
  weight: Scalars['BigInt'];
};

export type IndexAsset_Filter = {
  asset?: InputMaybe<Scalars['String']>;
  asset_contains?: InputMaybe<Scalars['String']>;
  asset_ends_with?: InputMaybe<Scalars['String']>;
  asset_gt?: InputMaybe<Scalars['String']>;
  asset_gte?: InputMaybe<Scalars['String']>;
  asset_in?: InputMaybe<Array<Scalars['String']>>;
  asset_lt?: InputMaybe<Scalars['String']>;
  asset_lte?: InputMaybe<Scalars['String']>;
  asset_not?: InputMaybe<Scalars['String']>;
  asset_not_contains?: InputMaybe<Scalars['String']>;
  asset_not_ends_with?: InputMaybe<Scalars['String']>;
  asset_not_in?: InputMaybe<Array<Scalars['String']>>;
  asset_not_starts_with?: InputMaybe<Scalars['String']>;
  asset_starts_with?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  inactiveIndex?: InputMaybe<Scalars['String']>;
  inactiveIndex_contains?: InputMaybe<Scalars['String']>;
  inactiveIndex_ends_with?: InputMaybe<Scalars['String']>;
  inactiveIndex_gt?: InputMaybe<Scalars['String']>;
  inactiveIndex_gte?: InputMaybe<Scalars['String']>;
  inactiveIndex_in?: InputMaybe<Array<Scalars['String']>>;
  inactiveIndex_lt?: InputMaybe<Scalars['String']>;
  inactiveIndex_lte?: InputMaybe<Scalars['String']>;
  inactiveIndex_not?: InputMaybe<Scalars['String']>;
  inactiveIndex_not_contains?: InputMaybe<Scalars['String']>;
  inactiveIndex_not_ends_with?: InputMaybe<Scalars['String']>;
  inactiveIndex_not_in?: InputMaybe<Array<Scalars['String']>>;
  inactiveIndex_not_starts_with?: InputMaybe<Scalars['String']>;
  inactiveIndex_starts_with?: InputMaybe<Scalars['String']>;
  index?: InputMaybe<Scalars['String']>;
  index_contains?: InputMaybe<Scalars['String']>;
  index_ends_with?: InputMaybe<Scalars['String']>;
  index_gt?: InputMaybe<Scalars['String']>;
  index_gte?: InputMaybe<Scalars['String']>;
  index_in?: InputMaybe<Array<Scalars['String']>>;
  index_lt?: InputMaybe<Scalars['String']>;
  index_lte?: InputMaybe<Scalars['String']>;
  index_not?: InputMaybe<Scalars['String']>;
  index_not_contains?: InputMaybe<Scalars['String']>;
  index_not_ends_with?: InputMaybe<Scalars['String']>;
  index_not_in?: InputMaybe<Array<Scalars['String']>>;
  index_not_starts_with?: InputMaybe<Scalars['String']>;
  index_starts_with?: InputMaybe<Scalars['String']>;
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

export enum IndexAsset_OrderBy {
  Asset = 'asset',
  Id = 'id',
  InactiveIndex = 'inactiveIndex',
  Index = 'index',
  Shares = 'shares',
  Weight = 'weight'
}

export type IndexFactory = {
  __typename?: 'IndexFactory';
  /** Address (hash) of the factory */
  id: Scalars['ID'];
  indices: Array<Index>;
  type: Scalars['String'];
  vTokenFactory: Scalars['String'];
};


export type IndexFactoryIndicesArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Index_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Index_Filter>;
};

export type IndexFactory_Filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  type?: InputMaybe<Scalars['String']>;
  type_contains?: InputMaybe<Scalars['String']>;
  type_ends_with?: InputMaybe<Scalars['String']>;
  type_gt?: InputMaybe<Scalars['String']>;
  type_gte?: InputMaybe<Scalars['String']>;
  type_in?: InputMaybe<Array<Scalars['String']>>;
  type_lt?: InputMaybe<Scalars['String']>;
  type_lte?: InputMaybe<Scalars['String']>;
  type_not?: InputMaybe<Scalars['String']>;
  type_not_contains?: InputMaybe<Scalars['String']>;
  type_not_ends_with?: InputMaybe<Scalars['String']>;
  type_not_in?: InputMaybe<Array<Scalars['String']>>;
  type_not_starts_with?: InputMaybe<Scalars['String']>;
  type_starts_with?: InputMaybe<Scalars['String']>;
  vTokenFactory?: InputMaybe<Scalars['String']>;
  vTokenFactory_contains?: InputMaybe<Scalars['String']>;
  vTokenFactory_ends_with?: InputMaybe<Scalars['String']>;
  vTokenFactory_gt?: InputMaybe<Scalars['String']>;
  vTokenFactory_gte?: InputMaybe<Scalars['String']>;
  vTokenFactory_in?: InputMaybe<Array<Scalars['String']>>;
  vTokenFactory_lt?: InputMaybe<Scalars['String']>;
  vTokenFactory_lte?: InputMaybe<Scalars['String']>;
  vTokenFactory_not?: InputMaybe<Scalars['String']>;
  vTokenFactory_not_contains?: InputMaybe<Scalars['String']>;
  vTokenFactory_not_ends_with?: InputMaybe<Scalars['String']>;
  vTokenFactory_not_in?: InputMaybe<Array<Scalars['String']>>;
  vTokenFactory_not_starts_with?: InputMaybe<Scalars['String']>;
  vTokenFactory_starts_with?: InputMaybe<Scalars['String']>;
};

export enum IndexFactory_OrderBy {
  Id = 'id',
  Indices = 'indices',
  Type = 'type',
  VTokenFactory = 'vTokenFactory'
}

export type Index_Filter = {
  _assets?: InputMaybe<Array<Scalars['ID']>>;
  _assets_contains?: InputMaybe<Array<Scalars['ID']>>;
  _assets_not?: InputMaybe<Array<Scalars['ID']>>;
  _assets_not_contains?: InputMaybe<Array<Scalars['ID']>>;
  _inactiveAssets?: InputMaybe<Array<Scalars['ID']>>;
  _inactiveAssets_contains?: InputMaybe<Array<Scalars['ID']>>;
  _inactiveAssets_not?: InputMaybe<Array<Scalars['ID']>>;
  _inactiveAssets_not_contains?: InputMaybe<Array<Scalars['ID']>>;
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
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  indexFactory?: InputMaybe<Scalars['String']>;
  indexFactory_contains?: InputMaybe<Scalars['String']>;
  indexFactory_ends_with?: InputMaybe<Scalars['String']>;
  indexFactory_gt?: InputMaybe<Scalars['String']>;
  indexFactory_gte?: InputMaybe<Scalars['String']>;
  indexFactory_in?: InputMaybe<Array<Scalars['String']>>;
  indexFactory_lt?: InputMaybe<Scalars['String']>;
  indexFactory_lte?: InputMaybe<Scalars['String']>;
  indexFactory_not?: InputMaybe<Scalars['String']>;
  indexFactory_not_contains?: InputMaybe<Scalars['String']>;
  indexFactory_not_ends_with?: InputMaybe<Scalars['String']>;
  indexFactory_not_in?: InputMaybe<Array<Scalars['String']>>;
  indexFactory_not_starts_with?: InputMaybe<Scalars['String']>;
  indexFactory_starts_with?: InputMaybe<Scalars['String']>;
  marketCap?: InputMaybe<Scalars['BigDecimal']>;
  marketCap_gt?: InputMaybe<Scalars['BigDecimal']>;
  marketCap_gte?: InputMaybe<Scalars['BigDecimal']>;
  marketCap_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  marketCap_lt?: InputMaybe<Scalars['BigDecimal']>;
  marketCap_lte?: InputMaybe<Scalars['BigDecimal']>;
  marketCap_not?: InputMaybe<Scalars['BigDecimal']>;
  marketCap_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  name?: InputMaybe<Scalars['String']>;
  name_contains?: InputMaybe<Scalars['String']>;
  name_ends_with?: InputMaybe<Scalars['String']>;
  name_gt?: InputMaybe<Scalars['String']>;
  name_gte?: InputMaybe<Scalars['String']>;
  name_in?: InputMaybe<Array<Scalars['String']>>;
  name_lt?: InputMaybe<Scalars['String']>;
  name_lte?: InputMaybe<Scalars['String']>;
  name_not?: InputMaybe<Scalars['String']>;
  name_not_contains?: InputMaybe<Scalars['String']>;
  name_not_ends_with?: InputMaybe<Scalars['String']>;
  name_not_in?: InputMaybe<Array<Scalars['String']>>;
  name_not_starts_with?: InputMaybe<Scalars['String']>;
  name_starts_with?: InputMaybe<Scalars['String']>;
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
  symbol_ends_with?: InputMaybe<Scalars['String']>;
  symbol_gt?: InputMaybe<Scalars['String']>;
  symbol_gte?: InputMaybe<Scalars['String']>;
  symbol_in?: InputMaybe<Array<Scalars['String']>>;
  symbol_lt?: InputMaybe<Scalars['String']>;
  symbol_lte?: InputMaybe<Scalars['String']>;
  symbol_not?: InputMaybe<Scalars['String']>;
  symbol_not_contains?: InputMaybe<Scalars['String']>;
  symbol_not_ends_with?: InputMaybe<Scalars['String']>;
  symbol_not_in?: InputMaybe<Array<Scalars['String']>>;
  symbol_not_starts_with?: InputMaybe<Scalars['String']>;
  symbol_starts_with?: InputMaybe<Scalars['String']>;
  totalSupply?: InputMaybe<Scalars['BigInt']>;
  totalSupply_gt?: InputMaybe<Scalars['BigInt']>;
  totalSupply_gte?: InputMaybe<Scalars['BigInt']>;
  totalSupply_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalSupply_lt?: InputMaybe<Scalars['BigInt']>;
  totalSupply_lte?: InputMaybe<Scalars['BigInt']>;
  totalSupply_not?: InputMaybe<Scalars['BigInt']>;
  totalSupply_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transaction?: InputMaybe<Scalars['String']>;
  transaction_contains?: InputMaybe<Scalars['String']>;
  transaction_ends_with?: InputMaybe<Scalars['String']>;
  transaction_gt?: InputMaybe<Scalars['String']>;
  transaction_gte?: InputMaybe<Scalars['String']>;
  transaction_in?: InputMaybe<Array<Scalars['String']>>;
  transaction_lt?: InputMaybe<Scalars['String']>;
  transaction_lte?: InputMaybe<Scalars['String']>;
  transaction_not?: InputMaybe<Scalars['String']>;
  transaction_not_contains?: InputMaybe<Scalars['String']>;
  transaction_not_ends_with?: InputMaybe<Scalars['String']>;
  transaction_not_in?: InputMaybe<Array<Scalars['String']>>;
  transaction_not_starts_with?: InputMaybe<Scalars['String']>;
  transaction_starts_with?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
  type_contains?: InputMaybe<Scalars['String']>;
  type_ends_with?: InputMaybe<Scalars['String']>;
  type_gt?: InputMaybe<Scalars['String']>;
  type_gte?: InputMaybe<Scalars['String']>;
  type_in?: InputMaybe<Array<Scalars['String']>>;
  type_lt?: InputMaybe<Scalars['String']>;
  type_lte?: InputMaybe<Scalars['String']>;
  type_not?: InputMaybe<Scalars['String']>;
  type_not_contains?: InputMaybe<Scalars['String']>;
  type_not_ends_with?: InputMaybe<Scalars['String']>;
  type_not_in?: InputMaybe<Array<Scalars['String']>>;
  type_not_starts_with?: InputMaybe<Scalars['String']>;
  type_starts_with?: InputMaybe<Scalars['String']>;
  uniqueHolders?: InputMaybe<Scalars['BigInt']>;
  uniqueHolders_gt?: InputMaybe<Scalars['BigInt']>;
  uniqueHolders_gte?: InputMaybe<Scalars['BigInt']>;
  uniqueHolders_in?: InputMaybe<Array<Scalars['BigInt']>>;
  uniqueHolders_lt?: InputMaybe<Scalars['BigInt']>;
  uniqueHolders_lte?: InputMaybe<Scalars['BigInt']>;
  uniqueHolders_not?: InputMaybe<Scalars['BigInt']>;
  uniqueHolders_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum Index_OrderBy {
  Assets = '_assets',
  InactiveAssets = '_inactiveAssets',
  Assets = 'assets',
  BasePrice = 'basePrice',
  BasePriceEth = 'basePriceETH',
  BaseVolume = 'baseVolume',
  Created = 'created',
  DailyStats = 'dailyStats',
  Decimals = 'decimals',
  FeeAumPercent = 'feeAUMPercent',
  FeeBurn = 'feeBurn',
  FeeMint = 'feeMint',
  HourlyStats = 'hourlyStats',
  Id = 'id',
  InactiveAssets = 'inactiveAssets',
  IndexFactory = 'indexFactory',
  MarketCap = 'marketCap',
  MonthlyStats = 'monthlyStats',
  Name = 'name',
  Sector = 'sector',
  Symbol = 'symbol',
  TotalSupply = 'totalSupply',
  Transaction = 'transaction',
  Type = 'type',
  UniqueHolders = 'uniqueHolders',
  Users = 'users',
  WeeklyStats = 'weeklyStats',
  YearlyStats = 'yearlyStats'
}

export type LastOrderIndex = {
  __typename?: 'LastOrderIndex';
  id: Scalars['ID'];
  index: Index;
  order: Order;
};

export type LastOrderIndex_Filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  index?: InputMaybe<Scalars['String']>;
  index_contains?: InputMaybe<Scalars['String']>;
  index_ends_with?: InputMaybe<Scalars['String']>;
  index_gt?: InputMaybe<Scalars['String']>;
  index_gte?: InputMaybe<Scalars['String']>;
  index_in?: InputMaybe<Array<Scalars['String']>>;
  index_lt?: InputMaybe<Scalars['String']>;
  index_lte?: InputMaybe<Scalars['String']>;
  index_not?: InputMaybe<Scalars['String']>;
  index_not_contains?: InputMaybe<Scalars['String']>;
  index_not_ends_with?: InputMaybe<Scalars['String']>;
  index_not_in?: InputMaybe<Array<Scalars['String']>>;
  index_not_starts_with?: InputMaybe<Scalars['String']>;
  index_starts_with?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Scalars['String']>;
  order_contains?: InputMaybe<Scalars['String']>;
  order_ends_with?: InputMaybe<Scalars['String']>;
  order_gt?: InputMaybe<Scalars['String']>;
  order_gte?: InputMaybe<Scalars['String']>;
  order_in?: InputMaybe<Array<Scalars['String']>>;
  order_lt?: InputMaybe<Scalars['String']>;
  order_lte?: InputMaybe<Scalars['String']>;
  order_not?: InputMaybe<Scalars['String']>;
  order_not_contains?: InputMaybe<Scalars['String']>;
  order_not_ends_with?: InputMaybe<Scalars['String']>;
  order_not_in?: InputMaybe<Array<Scalars['String']>>;
  order_not_starts_with?: InputMaybe<Scalars['String']>;
  order_starts_with?: InputMaybe<Scalars['String']>;
};

export enum LastOrderIndex_OrderBy {
  Id = 'id',
  Index = 'index',
  Order = 'order'
}

export type MonthlyIndexStat = {
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

export type MonthlyIndexStat_Filter = {
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
  index_contains?: InputMaybe<Scalars['String']>;
  index_ends_with?: InputMaybe<Scalars['String']>;
  index_gt?: InputMaybe<Scalars['String']>;
  index_gte?: InputMaybe<Scalars['String']>;
  index_in?: InputMaybe<Array<Scalars['String']>>;
  index_lt?: InputMaybe<Scalars['String']>;
  index_lte?: InputMaybe<Scalars['String']>;
  index_not?: InputMaybe<Scalars['String']>;
  index_not_contains?: InputMaybe<Scalars['String']>;
  index_not_ends_with?: InputMaybe<Scalars['String']>;
  index_not_in?: InputMaybe<Array<Scalars['String']>>;
  index_not_starts_with?: InputMaybe<Scalars['String']>;
  index_starts_with?: InputMaybe<Scalars['String']>;
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

export enum MonthlyIndexStat_OrderBy {
  BasePrice = 'basePrice',
  BasePriceEth = 'basePriceETH',
  BaseVolume = 'baseVolume',
  Date = 'date',
  Id = 'id',
  Index = 'index',
  MarketCap = 'marketCap',
  UniqueHolders = 'uniqueHolders'
}

export type Order = {
  __typename?: 'Order';
  /** Address (hash) */
  id: Scalars['ID'];
  index: Index;
  orderDetails: Array<OrderDetailsInfo>;
  order_id: Scalars['BigInt'];
};


export type OrderOrderDetailsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<OrderDetailsInfo_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<OrderDetailsInfo_Filter>;
};

export type OrderDetailsInfo = {
  __typename?: 'OrderDetailsInfo';
  asset: Asset;
  id: Scalars['ID'];
  order: Order;
  shares: Scalars['BigInt'];
  side: Scalars['String'];
};

export type OrderDetailsInfo_Filter = {
  asset?: InputMaybe<Scalars['String']>;
  asset_contains?: InputMaybe<Scalars['String']>;
  asset_ends_with?: InputMaybe<Scalars['String']>;
  asset_gt?: InputMaybe<Scalars['String']>;
  asset_gte?: InputMaybe<Scalars['String']>;
  asset_in?: InputMaybe<Array<Scalars['String']>>;
  asset_lt?: InputMaybe<Scalars['String']>;
  asset_lte?: InputMaybe<Scalars['String']>;
  asset_not?: InputMaybe<Scalars['String']>;
  asset_not_contains?: InputMaybe<Scalars['String']>;
  asset_not_ends_with?: InputMaybe<Scalars['String']>;
  asset_not_in?: InputMaybe<Array<Scalars['String']>>;
  asset_not_starts_with?: InputMaybe<Scalars['String']>;
  asset_starts_with?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  order?: InputMaybe<Scalars['String']>;
  order_contains?: InputMaybe<Scalars['String']>;
  order_ends_with?: InputMaybe<Scalars['String']>;
  order_gt?: InputMaybe<Scalars['String']>;
  order_gte?: InputMaybe<Scalars['String']>;
  order_in?: InputMaybe<Array<Scalars['String']>>;
  order_lt?: InputMaybe<Scalars['String']>;
  order_lte?: InputMaybe<Scalars['String']>;
  order_not?: InputMaybe<Scalars['String']>;
  order_not_contains?: InputMaybe<Scalars['String']>;
  order_not_ends_with?: InputMaybe<Scalars['String']>;
  order_not_in?: InputMaybe<Array<Scalars['String']>>;
  order_not_starts_with?: InputMaybe<Scalars['String']>;
  order_starts_with?: InputMaybe<Scalars['String']>;
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
  side_ends_with?: InputMaybe<Scalars['String']>;
  side_gt?: InputMaybe<Scalars['String']>;
  side_gte?: InputMaybe<Scalars['String']>;
  side_in?: InputMaybe<Array<Scalars['String']>>;
  side_lt?: InputMaybe<Scalars['String']>;
  side_lte?: InputMaybe<Scalars['String']>;
  side_not?: InputMaybe<Scalars['String']>;
  side_not_contains?: InputMaybe<Scalars['String']>;
  side_not_ends_with?: InputMaybe<Scalars['String']>;
  side_not_in?: InputMaybe<Array<Scalars['String']>>;
  side_not_starts_with?: InputMaybe<Scalars['String']>;
  side_starts_with?: InputMaybe<Scalars['String']>;
};

export enum OrderDetailsInfo_OrderBy {
  Asset = 'asset',
  Id = 'id',
  Order = 'order',
  Shares = 'shares',
  Side = 'side'
}

export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type Order_Filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  index?: InputMaybe<Scalars['String']>;
  index_contains?: InputMaybe<Scalars['String']>;
  index_ends_with?: InputMaybe<Scalars['String']>;
  index_gt?: InputMaybe<Scalars['String']>;
  index_gte?: InputMaybe<Scalars['String']>;
  index_in?: InputMaybe<Array<Scalars['String']>>;
  index_lt?: InputMaybe<Scalars['String']>;
  index_lte?: InputMaybe<Scalars['String']>;
  index_not?: InputMaybe<Scalars['String']>;
  index_not_contains?: InputMaybe<Scalars['String']>;
  index_not_ends_with?: InputMaybe<Scalars['String']>;
  index_not_in?: InputMaybe<Array<Scalars['String']>>;
  index_not_starts_with?: InputMaybe<Scalars['String']>;
  index_starts_with?: InputMaybe<Scalars['String']>;
  order_id?: InputMaybe<Scalars['BigInt']>;
  order_id_gt?: InputMaybe<Scalars['BigInt']>;
  order_id_gte?: InputMaybe<Scalars['BigInt']>;
  order_id_in?: InputMaybe<Array<Scalars['BigInt']>>;
  order_id_lt?: InputMaybe<Scalars['BigInt']>;
  order_id_lte?: InputMaybe<Scalars['BigInt']>;
  order_id_not?: InputMaybe<Scalars['BigInt']>;
  order_id_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum Order_OrderBy {
  Id = 'id',
  Index = 'index',
  OrderDetails = 'orderDetails',
  OrderId = 'order_id'
}

export type Pair = {
  __typename?: 'Pair';
  asset0: Asset;
  asset0Reserve: Scalars['BigDecimal'];
  asset1: Asset;
  asset1Reserve: Scalars['BigDecimal'];
  id: Scalars['ID'];
  swap: Swap;
  totalSupply: Scalars['BigInt'];
};

export type Pair_Filter = {
  asset0?: InputMaybe<Scalars['String']>;
  asset0Reserve?: InputMaybe<Scalars['BigDecimal']>;
  asset0Reserve_gt?: InputMaybe<Scalars['BigDecimal']>;
  asset0Reserve_gte?: InputMaybe<Scalars['BigDecimal']>;
  asset0Reserve_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  asset0Reserve_lt?: InputMaybe<Scalars['BigDecimal']>;
  asset0Reserve_lte?: InputMaybe<Scalars['BigDecimal']>;
  asset0Reserve_not?: InputMaybe<Scalars['BigDecimal']>;
  asset0Reserve_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  asset0_contains?: InputMaybe<Scalars['String']>;
  asset0_ends_with?: InputMaybe<Scalars['String']>;
  asset0_gt?: InputMaybe<Scalars['String']>;
  asset0_gte?: InputMaybe<Scalars['String']>;
  asset0_in?: InputMaybe<Array<Scalars['String']>>;
  asset0_lt?: InputMaybe<Scalars['String']>;
  asset0_lte?: InputMaybe<Scalars['String']>;
  asset0_not?: InputMaybe<Scalars['String']>;
  asset0_not_contains?: InputMaybe<Scalars['String']>;
  asset0_not_ends_with?: InputMaybe<Scalars['String']>;
  asset0_not_in?: InputMaybe<Array<Scalars['String']>>;
  asset0_not_starts_with?: InputMaybe<Scalars['String']>;
  asset0_starts_with?: InputMaybe<Scalars['String']>;
  asset1?: InputMaybe<Scalars['String']>;
  asset1Reserve?: InputMaybe<Scalars['BigDecimal']>;
  asset1Reserve_gt?: InputMaybe<Scalars['BigDecimal']>;
  asset1Reserve_gte?: InputMaybe<Scalars['BigDecimal']>;
  asset1Reserve_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  asset1Reserve_lt?: InputMaybe<Scalars['BigDecimal']>;
  asset1Reserve_lte?: InputMaybe<Scalars['BigDecimal']>;
  asset1Reserve_not?: InputMaybe<Scalars['BigDecimal']>;
  asset1Reserve_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  asset1_contains?: InputMaybe<Scalars['String']>;
  asset1_ends_with?: InputMaybe<Scalars['String']>;
  asset1_gt?: InputMaybe<Scalars['String']>;
  asset1_gte?: InputMaybe<Scalars['String']>;
  asset1_in?: InputMaybe<Array<Scalars['String']>>;
  asset1_lt?: InputMaybe<Scalars['String']>;
  asset1_lte?: InputMaybe<Scalars['String']>;
  asset1_not?: InputMaybe<Scalars['String']>;
  asset1_not_contains?: InputMaybe<Scalars['String']>;
  asset1_not_ends_with?: InputMaybe<Scalars['String']>;
  asset1_not_in?: InputMaybe<Array<Scalars['String']>>;
  asset1_not_starts_with?: InputMaybe<Scalars['String']>;
  asset1_starts_with?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  swap?: InputMaybe<Scalars['String']>;
  swap_contains?: InputMaybe<Scalars['String']>;
  swap_ends_with?: InputMaybe<Scalars['String']>;
  swap_gt?: InputMaybe<Scalars['String']>;
  swap_gte?: InputMaybe<Scalars['String']>;
  swap_in?: InputMaybe<Array<Scalars['String']>>;
  swap_lt?: InputMaybe<Scalars['String']>;
  swap_lte?: InputMaybe<Scalars['String']>;
  swap_not?: InputMaybe<Scalars['String']>;
  swap_not_contains?: InputMaybe<Scalars['String']>;
  swap_not_ends_with?: InputMaybe<Scalars['String']>;
  swap_not_in?: InputMaybe<Array<Scalars['String']>>;
  swap_not_starts_with?: InputMaybe<Scalars['String']>;
  swap_starts_with?: InputMaybe<Scalars['String']>;
  totalSupply?: InputMaybe<Scalars['BigInt']>;
  totalSupply_gt?: InputMaybe<Scalars['BigInt']>;
  totalSupply_gte?: InputMaybe<Scalars['BigInt']>;
  totalSupply_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalSupply_lt?: InputMaybe<Scalars['BigInt']>;
  totalSupply_lte?: InputMaybe<Scalars['BigInt']>;
  totalSupply_not?: InputMaybe<Scalars['BigInt']>;
  totalSupply_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum Pair_OrderBy {
  Asset0 = 'asset0',
  Asset0Reserve = 'asset0Reserve',
  Asset1 = 'asset1',
  Asset1Reserve = 'asset1Reserve',
  Id = 'id',
  Swap = 'swap',
  TotalSupply = 'totalSupply'
}

export type Query = {
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


export type Query_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};


export type QueryAssetArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryAssetsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Asset_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Asset_Filter>;
};


export type QueryChainLinkAggArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryChainLinkAggsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ChainLinkAgg_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ChainLinkAgg_Filter>;
};


export type QueryDailyAssetStatArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryDailyAssetStatsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<DailyAssetStat_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<DailyAssetStat_Filter>;
};


export type QueryDailyCapitalizationArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryDailyCapitalizationsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<DailyCapitalization_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<DailyCapitalization_Filter>;
};


export type QueryDailyIndexStatArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryDailyIndexStatsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<DailyIndexStat_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<DailyIndexStat_Filter>;
};


export type QueryDailyStatArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryDailyStatsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<DailyStat_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<DailyStat_Filter>;
};


export type QueryDailyUserIndexHistoriesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<DailyUserIndexHistory_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<DailyUserIndexHistory_Filter>;
};


export type QueryDailyUserIndexHistoryArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryDexArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryDexsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Dex_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Dex_Filter>;
};


export type QueryHourlyIndexStatArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryHourlyIndexStatsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<HourlyIndexStat_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<HourlyIndexStat_Filter>;
};


export type QueryIndexArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryIndexAssetArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryIndexAssetsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<IndexAsset_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<IndexAsset_Filter>;
};


export type QueryIndexFactoriesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<IndexFactory_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<IndexFactory_Filter>;
};


export type QueryIndexFactoryArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryIndexesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Index_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Index_Filter>;
};


export type QueryLastOrderIndexArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryLastOrderIndexesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<LastOrderIndex_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<LastOrderIndex_Filter>;
};


export type QueryMonthlyIndexStatArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryMonthlyIndexStatsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<MonthlyIndexStat_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<MonthlyIndexStat_Filter>;
};


export type QueryOrderArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryOrderDetailsInfoArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryOrderDetailsInfosArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<OrderDetailsInfo_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<OrderDetailsInfo_Filter>;
};


export type QueryOrdersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Order_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Order_Filter>;
};


export type QueryPairArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryPairsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Pair_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Pair_Filter>;
};


export type QueryStatArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryStatsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Stat_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Stat_Filter>;
};


export type QuerySushiPairArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerySushiPairsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<SushiPair_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<SushiPair_Filter>;
};


export type QuerySwapArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerySwapsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Swap_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Swap_Filter>;
};


export type QueryTransactionArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryTransactionsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Transaction_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Transaction_Filter>;
};


export type QueryTransferArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryTransfersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Transfer_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Transfer_Filter>;
};


export type QueryUserArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryUserCapitalizationArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryUserCapitalizationsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UserCapitalization_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<UserCapitalization_Filter>;
};


export type QueryUserIndexArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryUserIndexHistoriesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UserIndexHistory_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<UserIndexHistory_Filter>;
};


export type QueryUserIndexHistoryArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryUserIndexesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UserIndex_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<UserIndex_Filter>;
};


export type QueryUsersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<User_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<User_Filter>;
};


export type QueryVTokenArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryVTokensArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<VToken_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<VToken_Filter>;
};


export type QueryWeeklyIndexStatArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryWeeklyIndexStatsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<WeeklyIndexStat_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<WeeklyIndexStat_Filter>;
};


export type QueryYearlyIndexStatArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryYearlyIndexStatsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<YearlyIndexStat_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<YearlyIndexStat_Filter>;
};

export type Stat = {
  __typename?: 'Stat';
  id: Scalars['ID'];
  indexCount: Scalars['BigInt'];
  totalValueLocked: Scalars['BigDecimal'];
};

export type Stat_Filter = {
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

export enum Stat_OrderBy {
  Id = 'id',
  IndexCount = 'indexCount',
  TotalValueLocked = 'totalValueLocked'
}

export type Subscription = {
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


export type Subscription_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};


export type SubscriptionAssetArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionAssetsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Asset_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Asset_Filter>;
};


export type SubscriptionChainLinkAggArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionChainLinkAggsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ChainLinkAgg_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ChainLinkAgg_Filter>;
};


export type SubscriptionDailyAssetStatArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionDailyAssetStatsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<DailyAssetStat_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<DailyAssetStat_Filter>;
};


export type SubscriptionDailyCapitalizationArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionDailyCapitalizationsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<DailyCapitalization_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<DailyCapitalization_Filter>;
};


export type SubscriptionDailyIndexStatArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionDailyIndexStatsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<DailyIndexStat_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<DailyIndexStat_Filter>;
};


export type SubscriptionDailyStatArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionDailyStatsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<DailyStat_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<DailyStat_Filter>;
};


export type SubscriptionDailyUserIndexHistoriesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<DailyUserIndexHistory_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<DailyUserIndexHistory_Filter>;
};


export type SubscriptionDailyUserIndexHistoryArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionDexArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionDexsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Dex_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Dex_Filter>;
};


export type SubscriptionHourlyIndexStatArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionHourlyIndexStatsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<HourlyIndexStat_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<HourlyIndexStat_Filter>;
};


export type SubscriptionIndexArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionIndexAssetArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionIndexAssetsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<IndexAsset_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<IndexAsset_Filter>;
};


export type SubscriptionIndexFactoriesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<IndexFactory_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<IndexFactory_Filter>;
};


export type SubscriptionIndexFactoryArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionIndexesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Index_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Index_Filter>;
};


export type SubscriptionLastOrderIndexArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionLastOrderIndexesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<LastOrderIndex_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<LastOrderIndex_Filter>;
};


export type SubscriptionMonthlyIndexStatArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionMonthlyIndexStatsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<MonthlyIndexStat_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<MonthlyIndexStat_Filter>;
};


export type SubscriptionOrderArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionOrderDetailsInfoArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionOrderDetailsInfosArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<OrderDetailsInfo_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<OrderDetailsInfo_Filter>;
};


export type SubscriptionOrdersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Order_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Order_Filter>;
};


export type SubscriptionPairArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionPairsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Pair_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Pair_Filter>;
};


export type SubscriptionStatArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionStatsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Stat_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Stat_Filter>;
};


export type SubscriptionSushiPairArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionSushiPairsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<SushiPair_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<SushiPair_Filter>;
};


export type SubscriptionSwapArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionSwapsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Swap_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Swap_Filter>;
};


export type SubscriptionTransactionArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionTransactionsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Transaction_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Transaction_Filter>;
};


export type SubscriptionTransferArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionTransfersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Transfer_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Transfer_Filter>;
};


export type SubscriptionUserArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionUserCapitalizationArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionUserCapitalizationsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UserCapitalization_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<UserCapitalization_Filter>;
};


export type SubscriptionUserIndexArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionUserIndexHistoriesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UserIndexHistory_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<UserIndexHistory_Filter>;
};


export type SubscriptionUserIndexHistoryArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionUserIndexesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UserIndex_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<UserIndex_Filter>;
};


export type SubscriptionUsersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<User_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<User_Filter>;
};


export type SubscriptionVTokenArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionVTokensArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<VToken_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<VToken_Filter>;
};


export type SubscriptionWeeklyIndexStatArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionWeeklyIndexStatsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<WeeklyIndexStat_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<WeeklyIndexStat_Filter>;
};


export type SubscriptionYearlyIndexStatArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionYearlyIndexStatsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<YearlyIndexStat_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<YearlyIndexStat_Filter>;
};

export type SushiPair = {
  __typename?: 'SushiPair';
  asset0: Asset;
  asset0Reserve: Scalars['BigDecimal'];
  asset1: Asset;
  asset1Reserve: Scalars['BigDecimal'];
  id: Scalars['ID'];
  swap: Swap;
  totalSupply: Scalars['BigInt'];
};

export type SushiPair_Filter = {
  asset0?: InputMaybe<Scalars['String']>;
  asset0Reserve?: InputMaybe<Scalars['BigDecimal']>;
  asset0Reserve_gt?: InputMaybe<Scalars['BigDecimal']>;
  asset0Reserve_gte?: InputMaybe<Scalars['BigDecimal']>;
  asset0Reserve_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  asset0Reserve_lt?: InputMaybe<Scalars['BigDecimal']>;
  asset0Reserve_lte?: InputMaybe<Scalars['BigDecimal']>;
  asset0Reserve_not?: InputMaybe<Scalars['BigDecimal']>;
  asset0Reserve_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  asset0_contains?: InputMaybe<Scalars['String']>;
  asset0_ends_with?: InputMaybe<Scalars['String']>;
  asset0_gt?: InputMaybe<Scalars['String']>;
  asset0_gte?: InputMaybe<Scalars['String']>;
  asset0_in?: InputMaybe<Array<Scalars['String']>>;
  asset0_lt?: InputMaybe<Scalars['String']>;
  asset0_lte?: InputMaybe<Scalars['String']>;
  asset0_not?: InputMaybe<Scalars['String']>;
  asset0_not_contains?: InputMaybe<Scalars['String']>;
  asset0_not_ends_with?: InputMaybe<Scalars['String']>;
  asset0_not_in?: InputMaybe<Array<Scalars['String']>>;
  asset0_not_starts_with?: InputMaybe<Scalars['String']>;
  asset0_starts_with?: InputMaybe<Scalars['String']>;
  asset1?: InputMaybe<Scalars['String']>;
  asset1Reserve?: InputMaybe<Scalars['BigDecimal']>;
  asset1Reserve_gt?: InputMaybe<Scalars['BigDecimal']>;
  asset1Reserve_gte?: InputMaybe<Scalars['BigDecimal']>;
  asset1Reserve_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  asset1Reserve_lt?: InputMaybe<Scalars['BigDecimal']>;
  asset1Reserve_lte?: InputMaybe<Scalars['BigDecimal']>;
  asset1Reserve_not?: InputMaybe<Scalars['BigDecimal']>;
  asset1Reserve_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  asset1_contains?: InputMaybe<Scalars['String']>;
  asset1_ends_with?: InputMaybe<Scalars['String']>;
  asset1_gt?: InputMaybe<Scalars['String']>;
  asset1_gte?: InputMaybe<Scalars['String']>;
  asset1_in?: InputMaybe<Array<Scalars['String']>>;
  asset1_lt?: InputMaybe<Scalars['String']>;
  asset1_lte?: InputMaybe<Scalars['String']>;
  asset1_not?: InputMaybe<Scalars['String']>;
  asset1_not_contains?: InputMaybe<Scalars['String']>;
  asset1_not_ends_with?: InputMaybe<Scalars['String']>;
  asset1_not_in?: InputMaybe<Array<Scalars['String']>>;
  asset1_not_starts_with?: InputMaybe<Scalars['String']>;
  asset1_starts_with?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  swap?: InputMaybe<Scalars['String']>;
  swap_contains?: InputMaybe<Scalars['String']>;
  swap_ends_with?: InputMaybe<Scalars['String']>;
  swap_gt?: InputMaybe<Scalars['String']>;
  swap_gte?: InputMaybe<Scalars['String']>;
  swap_in?: InputMaybe<Array<Scalars['String']>>;
  swap_lt?: InputMaybe<Scalars['String']>;
  swap_lte?: InputMaybe<Scalars['String']>;
  swap_not?: InputMaybe<Scalars['String']>;
  swap_not_contains?: InputMaybe<Scalars['String']>;
  swap_not_ends_with?: InputMaybe<Scalars['String']>;
  swap_not_in?: InputMaybe<Array<Scalars['String']>>;
  swap_not_starts_with?: InputMaybe<Scalars['String']>;
  swap_starts_with?: InputMaybe<Scalars['String']>;
  totalSupply?: InputMaybe<Scalars['BigInt']>;
  totalSupply_gt?: InputMaybe<Scalars['BigInt']>;
  totalSupply_gte?: InputMaybe<Scalars['BigInt']>;
  totalSupply_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalSupply_lt?: InputMaybe<Scalars['BigInt']>;
  totalSupply_lte?: InputMaybe<Scalars['BigInt']>;
  totalSupply_not?: InputMaybe<Scalars['BigInt']>;
  totalSupply_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum SushiPair_OrderBy {
  Asset0 = 'asset0',
  Asset0Reserve = 'asset0Reserve',
  Asset1 = 'asset1',
  Asset1Reserve = 'asset1Reserve',
  Id = 'id',
  Swap = 'swap',
  TotalSupply = 'totalSupply'
}

export type Swap = {
  __typename?: 'Swap';
  id: Scalars['ID'];
  pairs: Array<Pair>;
};


export type SwapPairsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Pair_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Pair_Filter>;
};

export type Swap_Filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
};

export enum Swap_OrderBy {
  Id = 'id',
  Pairs = 'pairs'
}

export type Transaction = {
  __typename?: 'Transaction';
  blockNumber: Scalars['BigInt'];
  gasPrice: Scalars['BigInt'];
  gasUsed: Scalars['BigInt'];
  id: Scalars['ID'];
  timestamp: Scalars['BigInt'];
  transfers: Array<Transfer>;
  value: Scalars['BigInt'];
};


export type TransactionTransfersArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Transfer_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Transfer_Filter>;
};

export type Transaction_Filter = {
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
  transfers_contains?: InputMaybe<Array<Scalars['String']>>;
  transfers_not?: InputMaybe<Array<Scalars['String']>>;
  transfers_not_contains?: InputMaybe<Array<Scalars['String']>>;
  value?: InputMaybe<Scalars['BigInt']>;
  value_gt?: InputMaybe<Scalars['BigInt']>;
  value_gte?: InputMaybe<Scalars['BigInt']>;
  value_in?: InputMaybe<Array<Scalars['BigInt']>>;
  value_lt?: InputMaybe<Scalars['BigInt']>;
  value_lte?: InputMaybe<Scalars['BigInt']>;
  value_not?: InputMaybe<Scalars['BigInt']>;
  value_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum Transaction_OrderBy {
  BlockNumber = 'blockNumber',
  GasPrice = 'gasPrice',
  GasUsed = 'gasUsed',
  Id = 'id',
  Timestamp = 'timestamp',
  Transfers = 'transfers',
  Value = 'value'
}

export type Transfer = {
  __typename?: 'Transfer';
  from?: Maybe<Scalars['Bytes']>;
  id: Scalars['ID'];
  index: Index;
  to?: Maybe<Scalars['Bytes']>;
  transaction: Transaction;
  type: TransferType;
  value: Scalars['BigInt'];
};

export enum TransferType {
  Burn = 'Burn',
  Mint = 'Mint',
  Send = 'Send'
}

export type Transfer_Filter = {
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
  index_contains?: InputMaybe<Scalars['String']>;
  index_ends_with?: InputMaybe<Scalars['String']>;
  index_gt?: InputMaybe<Scalars['String']>;
  index_gte?: InputMaybe<Scalars['String']>;
  index_in?: InputMaybe<Array<Scalars['String']>>;
  index_lt?: InputMaybe<Scalars['String']>;
  index_lte?: InputMaybe<Scalars['String']>;
  index_not?: InputMaybe<Scalars['String']>;
  index_not_contains?: InputMaybe<Scalars['String']>;
  index_not_ends_with?: InputMaybe<Scalars['String']>;
  index_not_in?: InputMaybe<Array<Scalars['String']>>;
  index_not_starts_with?: InputMaybe<Scalars['String']>;
  index_starts_with?: InputMaybe<Scalars['String']>;
  to?: InputMaybe<Scalars['Bytes']>;
  to_contains?: InputMaybe<Scalars['Bytes']>;
  to_in?: InputMaybe<Array<Scalars['Bytes']>>;
  to_not?: InputMaybe<Scalars['Bytes']>;
  to_not_contains?: InputMaybe<Scalars['Bytes']>;
  to_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transaction?: InputMaybe<Scalars['String']>;
  transaction_contains?: InputMaybe<Scalars['String']>;
  transaction_ends_with?: InputMaybe<Scalars['String']>;
  transaction_gt?: InputMaybe<Scalars['String']>;
  transaction_gte?: InputMaybe<Scalars['String']>;
  transaction_in?: InputMaybe<Array<Scalars['String']>>;
  transaction_lt?: InputMaybe<Scalars['String']>;
  transaction_lte?: InputMaybe<Scalars['String']>;
  transaction_not?: InputMaybe<Scalars['String']>;
  transaction_not_contains?: InputMaybe<Scalars['String']>;
  transaction_not_ends_with?: InputMaybe<Scalars['String']>;
  transaction_not_in?: InputMaybe<Array<Scalars['String']>>;
  transaction_not_starts_with?: InputMaybe<Scalars['String']>;
  transaction_starts_with?: InputMaybe<Scalars['String']>;
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

export enum Transfer_OrderBy {
  From = 'from',
  Id = 'id',
  Index = 'index',
  To = 'to',
  Transaction = 'transaction',
  Type = 'type',
  Value = 'value'
}

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  indexes: Array<UserIndex>;
};


export type UserIndexesArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UserIndex_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserIndex_Filter>;
};

export type UserCapitalization = {
  __typename?: 'UserCapitalization';
  capitalization: Scalars['BigDecimal'];
  id: Scalars['ID'];
  index: Index;
  logIndex: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
};

export type UserCapitalization_Filter = {
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
  index_contains?: InputMaybe<Scalars['String']>;
  index_ends_with?: InputMaybe<Scalars['String']>;
  index_gt?: InputMaybe<Scalars['String']>;
  index_gte?: InputMaybe<Scalars['String']>;
  index_in?: InputMaybe<Array<Scalars['String']>>;
  index_lt?: InputMaybe<Scalars['String']>;
  index_lte?: InputMaybe<Scalars['String']>;
  index_not?: InputMaybe<Scalars['String']>;
  index_not_contains?: InputMaybe<Scalars['String']>;
  index_not_ends_with?: InputMaybe<Scalars['String']>;
  index_not_in?: InputMaybe<Array<Scalars['String']>>;
  index_not_starts_with?: InputMaybe<Scalars['String']>;
  index_starts_with?: InputMaybe<Scalars['String']>;
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

export enum UserCapitalization_OrderBy {
  Capitalization = 'capitalization',
  Id = 'id',
  Index = 'index',
  LogIndex = 'logIndex',
  Timestamp = 'timestamp'
}

export type UserIndex = {
  __typename?: 'UserIndex';
  balance: Scalars['BigDecimal'];
  capitalization: Scalars['BigDecimal'];
  id: Scalars['ID'];
  index: Index;
  user: User;
};

export type UserIndexHistory = {
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

export type UserIndexHistory_Filter = {
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
  index_contains?: InputMaybe<Scalars['String']>;
  index_ends_with?: InputMaybe<Scalars['String']>;
  index_gt?: InputMaybe<Scalars['String']>;
  index_gte?: InputMaybe<Scalars['String']>;
  index_in?: InputMaybe<Array<Scalars['String']>>;
  index_lt?: InputMaybe<Scalars['String']>;
  index_lte?: InputMaybe<Scalars['String']>;
  index_not?: InputMaybe<Scalars['String']>;
  index_not_contains?: InputMaybe<Scalars['String']>;
  index_not_ends_with?: InputMaybe<Scalars['String']>;
  index_not_in?: InputMaybe<Array<Scalars['String']>>;
  index_not_starts_with?: InputMaybe<Scalars['String']>;
  index_starts_with?: InputMaybe<Scalars['String']>;
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
  user_contains?: InputMaybe<Scalars['String']>;
  user_ends_with?: InputMaybe<Scalars['String']>;
  user_gt?: InputMaybe<Scalars['String']>;
  user_gte?: InputMaybe<Scalars['String']>;
  user_in?: InputMaybe<Array<Scalars['String']>>;
  user_lt?: InputMaybe<Scalars['String']>;
  user_lte?: InputMaybe<Scalars['String']>;
  user_not?: InputMaybe<Scalars['String']>;
  user_not_contains?: InputMaybe<Scalars['String']>;
  user_not_ends_with?: InputMaybe<Scalars['String']>;
  user_not_in?: InputMaybe<Array<Scalars['String']>>;
  user_not_starts_with?: InputMaybe<Scalars['String']>;
  user_starts_with?: InputMaybe<Scalars['String']>;
};

export enum UserIndexHistory_OrderBy {
  Balance = 'balance',
  Capitalization = 'capitalization',
  Id = 'id',
  Index = 'index',
  LogIndex = 'logIndex',
  Timestamp = 'timestamp',
  TotalSupply = 'totalSupply',
  User = 'user'
}

export type UserIndex_Filter = {
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
  index_contains?: InputMaybe<Scalars['String']>;
  index_ends_with?: InputMaybe<Scalars['String']>;
  index_gt?: InputMaybe<Scalars['String']>;
  index_gte?: InputMaybe<Scalars['String']>;
  index_in?: InputMaybe<Array<Scalars['String']>>;
  index_lt?: InputMaybe<Scalars['String']>;
  index_lte?: InputMaybe<Scalars['String']>;
  index_not?: InputMaybe<Scalars['String']>;
  index_not_contains?: InputMaybe<Scalars['String']>;
  index_not_ends_with?: InputMaybe<Scalars['String']>;
  index_not_in?: InputMaybe<Array<Scalars['String']>>;
  index_not_starts_with?: InputMaybe<Scalars['String']>;
  index_starts_with?: InputMaybe<Scalars['String']>;
  user?: InputMaybe<Scalars['String']>;
  user_contains?: InputMaybe<Scalars['String']>;
  user_ends_with?: InputMaybe<Scalars['String']>;
  user_gt?: InputMaybe<Scalars['String']>;
  user_gte?: InputMaybe<Scalars['String']>;
  user_in?: InputMaybe<Array<Scalars['String']>>;
  user_lt?: InputMaybe<Scalars['String']>;
  user_lte?: InputMaybe<Scalars['String']>;
  user_not?: InputMaybe<Scalars['String']>;
  user_not_contains?: InputMaybe<Scalars['String']>;
  user_not_ends_with?: InputMaybe<Scalars['String']>;
  user_not_in?: InputMaybe<Array<Scalars['String']>>;
  user_not_starts_with?: InputMaybe<Scalars['String']>;
  user_starts_with?: InputMaybe<Scalars['String']>;
};

export enum UserIndex_OrderBy {
  Balance = 'balance',
  Capitalization = 'capitalization',
  Id = 'id',
  Index = 'index',
  User = 'user'
}

export type User_Filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
};

export enum User_OrderBy {
  Id = 'id',
  Indexes = 'indexes'
}

export type WeeklyIndexStat = {
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

export type WeeklyIndexStat_Filter = {
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
  index_contains?: InputMaybe<Scalars['String']>;
  index_ends_with?: InputMaybe<Scalars['String']>;
  index_gt?: InputMaybe<Scalars['String']>;
  index_gte?: InputMaybe<Scalars['String']>;
  index_in?: InputMaybe<Array<Scalars['String']>>;
  index_lt?: InputMaybe<Scalars['String']>;
  index_lte?: InputMaybe<Scalars['String']>;
  index_not?: InputMaybe<Scalars['String']>;
  index_not_contains?: InputMaybe<Scalars['String']>;
  index_not_ends_with?: InputMaybe<Scalars['String']>;
  index_not_in?: InputMaybe<Array<Scalars['String']>>;
  index_not_starts_with?: InputMaybe<Scalars['String']>;
  index_starts_with?: InputMaybe<Scalars['String']>;
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

export enum WeeklyIndexStat_OrderBy {
  BasePrice = 'basePrice',
  BasePriceEth = 'basePriceETH',
  BaseVolume = 'baseVolume',
  Date = 'date',
  Id = 'id',
  Index = 'index',
  MarketCap = 'marketCap',
  UniqueHolders = 'uniqueHolders'
}

export type YearlyIndexStat = {
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

export type YearlyIndexStat_Filter = {
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
  index_contains?: InputMaybe<Scalars['String']>;
  index_ends_with?: InputMaybe<Scalars['String']>;
  index_gt?: InputMaybe<Scalars['String']>;
  index_gte?: InputMaybe<Scalars['String']>;
  index_in?: InputMaybe<Array<Scalars['String']>>;
  index_lt?: InputMaybe<Scalars['String']>;
  index_lte?: InputMaybe<Scalars['String']>;
  index_not?: InputMaybe<Scalars['String']>;
  index_not_contains?: InputMaybe<Scalars['String']>;
  index_not_ends_with?: InputMaybe<Scalars['String']>;
  index_not_in?: InputMaybe<Array<Scalars['String']>>;
  index_not_starts_with?: InputMaybe<Scalars['String']>;
  index_starts_with?: InputMaybe<Scalars['String']>;
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

export enum YearlyIndexStat_OrderBy {
  BasePrice = 'basePrice',
  BasePriceEth = 'basePriceETH',
  BaseVolume = 'baseVolume',
  Date = 'date',
  Id = 'id',
  Index = 'index',
  MarketCap = 'marketCap',
  UniqueHolders = 'uniqueHolders'
}

export type _Block_ = {
  __typename?: '_Block_';
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']>;
  /** The block number */
  number: Scalars['Int'];
};

/** The type for the top-level _meta field */
export type _Meta_ = {
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

export enum _SubgraphErrorPolicy_ {
  /** Data will be returned even if the subgraph has indexing errors */
  Allow = 'allow',
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  Deny = 'deny'
}

export type VToken = {
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

export type VToken_Filter = {
  asset?: InputMaybe<Scalars['String']>;
  assetReserve?: InputMaybe<Scalars['BigInt']>;
  assetReserve_gt?: InputMaybe<Scalars['BigInt']>;
  assetReserve_gte?: InputMaybe<Scalars['BigInt']>;
  assetReserve_in?: InputMaybe<Array<Scalars['BigInt']>>;
  assetReserve_lt?: InputMaybe<Scalars['BigInt']>;
  assetReserve_lte?: InputMaybe<Scalars['BigInt']>;
  assetReserve_not?: InputMaybe<Scalars['BigInt']>;
  assetReserve_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  asset_contains?: InputMaybe<Scalars['String']>;
  asset_ends_with?: InputMaybe<Scalars['String']>;
  asset_gt?: InputMaybe<Scalars['String']>;
  asset_gte?: InputMaybe<Scalars['String']>;
  asset_in?: InputMaybe<Array<Scalars['String']>>;
  asset_lt?: InputMaybe<Scalars['String']>;
  asset_lte?: InputMaybe<Scalars['String']>;
  asset_not?: InputMaybe<Scalars['String']>;
  asset_not_contains?: InputMaybe<Scalars['String']>;
  asset_not_ends_with?: InputMaybe<Scalars['String']>;
  asset_not_in?: InputMaybe<Array<Scalars['String']>>;
  asset_not_starts_with?: InputMaybe<Scalars['String']>;
  asset_starts_with?: InputMaybe<Scalars['String']>;
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
  factory_ends_with?: InputMaybe<Scalars['String']>;
  factory_gt?: InputMaybe<Scalars['String']>;
  factory_gte?: InputMaybe<Scalars['String']>;
  factory_in?: InputMaybe<Array<Scalars['String']>>;
  factory_lt?: InputMaybe<Scalars['String']>;
  factory_lte?: InputMaybe<Scalars['String']>;
  factory_not?: InputMaybe<Scalars['String']>;
  factory_not_contains?: InputMaybe<Scalars['String']>;
  factory_not_ends_with?: InputMaybe<Scalars['String']>;
  factory_not_in?: InputMaybe<Array<Scalars['String']>>;
  factory_not_starts_with?: InputMaybe<Scalars['String']>;
  factory_starts_with?: InputMaybe<Scalars['String']>;
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
  tokenType_ends_with?: InputMaybe<Scalars['String']>;
  tokenType_gt?: InputMaybe<Scalars['String']>;
  tokenType_gte?: InputMaybe<Scalars['String']>;
  tokenType_in?: InputMaybe<Array<Scalars['String']>>;
  tokenType_lt?: InputMaybe<Scalars['String']>;
  tokenType_lte?: InputMaybe<Scalars['String']>;
  tokenType_not?: InputMaybe<Scalars['String']>;
  tokenType_not_contains?: InputMaybe<Scalars['String']>;
  tokenType_not_ends_with?: InputMaybe<Scalars['String']>;
  tokenType_not_in?: InputMaybe<Array<Scalars['String']>>;
  tokenType_not_starts_with?: InputMaybe<Scalars['String']>;
  tokenType_starts_with?: InputMaybe<Scalars['String']>;
  totalAmount?: InputMaybe<Scalars['BigInt']>;
  totalAmount_gt?: InputMaybe<Scalars['BigInt']>;
  totalAmount_gte?: InputMaybe<Scalars['BigInt']>;
  totalAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalAmount_lt?: InputMaybe<Scalars['BigInt']>;
  totalAmount_lte?: InputMaybe<Scalars['BigInt']>;
  totalAmount_not?: InputMaybe<Scalars['BigInt']>;
  totalAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum VToken_OrderBy {
  Asset = 'asset',
  AssetReserve = 'assetReserve',
  Capitalization = 'capitalization',
  Deposited = 'deposited',
  Factory = 'factory',
  Id = 'id',
  PlatformTotalSupply = 'platformTotalSupply',
  PlatformTotalSupplyDec = 'platformTotalSupplyDec',
  TokenType = 'tokenType',
  TotalAmount = 'totalAmount'
}



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Asset: ResolverTypeWrapper<Asset>;
  Asset_filter: Asset_Filter;
  Asset_orderBy: Asset_OrderBy;
  BigDecimal: ResolverTypeWrapper<Scalars['BigDecimal']>;
  BigInt: ResolverTypeWrapper<Scalars['BigInt']>;
  Block_height: Block_Height;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Bytes: ResolverTypeWrapper<Scalars['Bytes']>;
  ChainLinkAgg: ResolverTypeWrapper<ChainLinkAgg>;
  ChainLinkAgg_filter: ChainLinkAgg_Filter;
  ChainLinkAgg_orderBy: ChainLinkAgg_OrderBy;
  DEX: ResolverTypeWrapper<Dex>;
  DEX_filter: Dex_Filter;
  DEX_orderBy: Dex_OrderBy;
  DailyAssetStat: ResolverTypeWrapper<DailyAssetStat>;
  DailyAssetStat_filter: DailyAssetStat_Filter;
  DailyAssetStat_orderBy: DailyAssetStat_OrderBy;
  DailyCapitalization: ResolverTypeWrapper<DailyCapitalization>;
  DailyCapitalization_filter: DailyCapitalization_Filter;
  DailyCapitalization_orderBy: DailyCapitalization_OrderBy;
  DailyIndexStat: ResolverTypeWrapper<DailyIndexStat>;
  DailyIndexStat_filter: DailyIndexStat_Filter;
  DailyIndexStat_orderBy: DailyIndexStat_OrderBy;
  DailyStat: ResolverTypeWrapper<DailyStat>;
  DailyStat_filter: DailyStat_Filter;
  DailyStat_orderBy: DailyStat_OrderBy;
  DailyUserIndexHistory: ResolverTypeWrapper<DailyUserIndexHistory>;
  DailyUserIndexHistory_filter: DailyUserIndexHistory_Filter;
  DailyUserIndexHistory_orderBy: DailyUserIndexHistory_OrderBy;
  HourlyIndexStat: ResolverTypeWrapper<HourlyIndexStat>;
  HourlyIndexStat_filter: HourlyIndexStat_Filter;
  HourlyIndexStat_orderBy: HourlyIndexStat_OrderBy;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Index: ResolverTypeWrapper<Index>;
  IndexAsset: ResolverTypeWrapper<IndexAsset>;
  IndexAsset_filter: IndexAsset_Filter;
  IndexAsset_orderBy: IndexAsset_OrderBy;
  IndexFactory: ResolverTypeWrapper<IndexFactory>;
  IndexFactory_filter: IndexFactory_Filter;
  IndexFactory_orderBy: IndexFactory_OrderBy;
  Index_filter: Index_Filter;
  Index_orderBy: Index_OrderBy;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  LastOrderIndex: ResolverTypeWrapper<LastOrderIndex>;
  LastOrderIndex_filter: LastOrderIndex_Filter;
  LastOrderIndex_orderBy: LastOrderIndex_OrderBy;
  MonthlyIndexStat: ResolverTypeWrapper<MonthlyIndexStat>;
  MonthlyIndexStat_filter: MonthlyIndexStat_Filter;
  MonthlyIndexStat_orderBy: MonthlyIndexStat_OrderBy;
  Order: ResolverTypeWrapper<Order>;
  OrderDetailsInfo: ResolverTypeWrapper<OrderDetailsInfo>;
  OrderDetailsInfo_filter: OrderDetailsInfo_Filter;
  OrderDetailsInfo_orderBy: OrderDetailsInfo_OrderBy;
  OrderDirection: OrderDirection;
  Order_filter: Order_Filter;
  Order_orderBy: Order_OrderBy;
  Pair: ResolverTypeWrapper<Pair>;
  Pair_filter: Pair_Filter;
  Pair_orderBy: Pair_OrderBy;
  Query: ResolverTypeWrapper<{}>;
  Stat: ResolverTypeWrapper<Stat>;
  Stat_filter: Stat_Filter;
  Stat_orderBy: Stat_OrderBy;
  String: ResolverTypeWrapper<Scalars['String']>;
  Subscription: ResolverTypeWrapper<{}>;
  SushiPair: ResolverTypeWrapper<SushiPair>;
  SushiPair_filter: SushiPair_Filter;
  SushiPair_orderBy: SushiPair_OrderBy;
  Swap: ResolverTypeWrapper<Swap>;
  Swap_filter: Swap_Filter;
  Swap_orderBy: Swap_OrderBy;
  Transaction: ResolverTypeWrapper<Transaction>;
  Transaction_filter: Transaction_Filter;
  Transaction_orderBy: Transaction_OrderBy;
  Transfer: ResolverTypeWrapper<Transfer>;
  TransferType: TransferType;
  Transfer_filter: Transfer_Filter;
  Transfer_orderBy: Transfer_OrderBy;
  User: ResolverTypeWrapper<User>;
  UserCapitalization: ResolverTypeWrapper<UserCapitalization>;
  UserCapitalization_filter: UserCapitalization_Filter;
  UserCapitalization_orderBy: UserCapitalization_OrderBy;
  UserIndex: ResolverTypeWrapper<UserIndex>;
  UserIndexHistory: ResolverTypeWrapper<UserIndexHistory>;
  UserIndexHistory_filter: UserIndexHistory_Filter;
  UserIndexHistory_orderBy: UserIndexHistory_OrderBy;
  UserIndex_filter: UserIndex_Filter;
  UserIndex_orderBy: UserIndex_OrderBy;
  User_filter: User_Filter;
  User_orderBy: User_OrderBy;
  WeeklyIndexStat: ResolverTypeWrapper<WeeklyIndexStat>;
  WeeklyIndexStat_filter: WeeklyIndexStat_Filter;
  WeeklyIndexStat_orderBy: WeeklyIndexStat_OrderBy;
  YearlyIndexStat: ResolverTypeWrapper<YearlyIndexStat>;
  YearlyIndexStat_filter: YearlyIndexStat_Filter;
  YearlyIndexStat_orderBy: YearlyIndexStat_OrderBy;
  _Block_: ResolverTypeWrapper<_Block_>;
  _Meta_: ResolverTypeWrapper<_Meta_>;
  _SubgraphErrorPolicy_: _SubgraphErrorPolicy_;
  vToken: ResolverTypeWrapper<VToken>;
  vToken_filter: VToken_Filter;
  vToken_orderBy: VToken_OrderBy;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Asset: Asset;
  Asset_filter: Asset_Filter;
  BigDecimal: Scalars['BigDecimal'];
  BigInt: Scalars['BigInt'];
  Block_height: Block_Height;
  Boolean: Scalars['Boolean'];
  Bytes: Scalars['Bytes'];
  ChainLinkAgg: ChainLinkAgg;
  ChainLinkAgg_filter: ChainLinkAgg_Filter;
  DEX: Dex;
  DEX_filter: Dex_Filter;
  DailyAssetStat: DailyAssetStat;
  DailyAssetStat_filter: DailyAssetStat_Filter;
  DailyCapitalization: DailyCapitalization;
  DailyCapitalization_filter: DailyCapitalization_Filter;
  DailyIndexStat: DailyIndexStat;
  DailyIndexStat_filter: DailyIndexStat_Filter;
  DailyStat: DailyStat;
  DailyStat_filter: DailyStat_Filter;
  DailyUserIndexHistory: DailyUserIndexHistory;
  DailyUserIndexHistory_filter: DailyUserIndexHistory_Filter;
  HourlyIndexStat: HourlyIndexStat;
  HourlyIndexStat_filter: HourlyIndexStat_Filter;
  ID: Scalars['ID'];
  Index: Index;
  IndexAsset: IndexAsset;
  IndexAsset_filter: IndexAsset_Filter;
  IndexFactory: IndexFactory;
  IndexFactory_filter: IndexFactory_Filter;
  Index_filter: Index_Filter;
  Int: Scalars['Int'];
  LastOrderIndex: LastOrderIndex;
  LastOrderIndex_filter: LastOrderIndex_Filter;
  MonthlyIndexStat: MonthlyIndexStat;
  MonthlyIndexStat_filter: MonthlyIndexStat_Filter;
  Order: Order;
  OrderDetailsInfo: OrderDetailsInfo;
  OrderDetailsInfo_filter: OrderDetailsInfo_Filter;
  Order_filter: Order_Filter;
  Pair: Pair;
  Pair_filter: Pair_Filter;
  Query: {};
  Stat: Stat;
  Stat_filter: Stat_Filter;
  String: Scalars['String'];
  Subscription: {};
  SushiPair: SushiPair;
  SushiPair_filter: SushiPair_Filter;
  Swap: Swap;
  Swap_filter: Swap_Filter;
  Transaction: Transaction;
  Transaction_filter: Transaction_Filter;
  Transfer: Transfer;
  Transfer_filter: Transfer_Filter;
  User: User;
  UserCapitalization: UserCapitalization;
  UserCapitalization_filter: UserCapitalization_Filter;
  UserIndex: UserIndex;
  UserIndexHistory: UserIndexHistory;
  UserIndexHistory_filter: UserIndexHistory_Filter;
  UserIndex_filter: UserIndex_Filter;
  User_filter: User_Filter;
  WeeklyIndexStat: WeeklyIndexStat;
  WeeklyIndexStat_filter: WeeklyIndexStat_Filter;
  YearlyIndexStat: YearlyIndexStat;
  YearlyIndexStat_filter: YearlyIndexStat_Filter;
  _Block_: _Block_;
  _Meta_: _Meta_;
  vToken: VToken;
  vToken_filter: VToken_Filter;
};

export type DerivedFromDirectiveArgs = {
  field?: Maybe<Scalars['String']>;
};

export type DerivedFromDirectiveResolver<Result, Parent, ContextType = any, Args = DerivedFromDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type EntityDirectiveArgs = { };

export type EntityDirectiveResolver<Result, Parent, ContextType = any, Args = EntityDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type SubgraphIdDirectiveArgs = {
  id?: Maybe<Scalars['String']>;
};

export type SubgraphIdDirectiveResolver<Result, Parent, ContextType = any, Args = SubgraphIdDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AssetResolvers<ContextType = any, ParentType extends ResolversParentTypes['Asset'] = ResolversParentTypes['Asset']> = {
  _indexes?: Resolver<Array<ResolversTypes['ID']>, ParentType, ContextType>;
  _vTokens?: Resolver<Array<ResolversTypes['ID']>, ParentType, ContextType>;
  basePrice?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  basePriceSushi?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  basePriceUni?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  dailyStats?: Resolver<Array<ResolversTypes['DailyAssetStat']>, ParentType, ContextType, RequireFields<AssetDailyStatsArgs, 'first' | 'skip'>>;
  decimals?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  indexCount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  indexes?: Resolver<Array<ResolversTypes['IndexAsset']>, ParentType, ContextType, RequireFields<AssetIndexesArgs, 'first' | 'skip'>>;
  isWhitelisted?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  marketCap?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  pairsAsAsset0?: Resolver<Array<ResolversTypes['Pair']>, ParentType, ContextType, RequireFields<AssetPairsAsAsset0Args, 'first' | 'skip'>>;
  pairsAsAsset1?: Resolver<Array<ResolversTypes['Pair']>, ParentType, ContextType, RequireFields<AssetPairsAsAsset1Args, 'first' | 'skip'>>;
  symbol?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  totalSupply?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  vTokens?: Resolver<Array<ResolversTypes['vToken']>, ParentType, ContextType, RequireFields<AssetVTokensArgs, 'first' | 'skip'>>;
  vaultBaseReserve?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  vaultReserve?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface BigDecimalScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigDecimal'], any> {
  name: 'BigDecimal';
}

export interface BigIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigInt'], any> {
  name: 'BigInt';
}

export interface BytesScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Bytes'], any> {
  name: 'Bytes';
}

export type ChainLinkAggResolvers<ContextType = any, ParentType extends ResolversParentTypes['ChainLinkAgg'] = ResolversParentTypes['ChainLinkAgg']> = {
  answer?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  asset?: Resolver<ResolversTypes['Asset'], ParentType, ContextType>;
  decimals?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  nextAgg?: Resolver<Maybe<ResolversTypes['ChainLinkAgg']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DexResolvers<ContextType = any, ParentType extends ResolversParentTypes['DEX'] = ResolversParentTypes['DEX']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  router?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DailyAssetStatResolvers<ContextType = any, ParentType extends ResolversParentTypes['DailyAssetStat'] = ResolversParentTypes['DailyAssetStat']> = {
  asset?: Resolver<ResolversTypes['Asset'], ParentType, ContextType>;
  basePrice?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  date?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  vaultBaseReserve?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  vaultReserve?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DailyCapitalizationResolvers<ContextType = any, ParentType extends ResolversParentTypes['DailyCapitalization'] = ResolversParentTypes['DailyCapitalization']> = {
  capitalization?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  index?: Resolver<ResolversTypes['Index'], ParentType, ContextType>;
  logIndex?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DailyIndexStatResolvers<ContextType = any, ParentType extends ResolversParentTypes['DailyIndexStat'] = ResolversParentTypes['DailyIndexStat']> = {
  basePrice?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  basePriceETH?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  baseVolume?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  date?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  index?: Resolver<ResolversTypes['Index'], ParentType, ContextType>;
  marketCap?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  uniqueHolders?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DailyStatResolvers<ContextType = any, ParentType extends ResolversParentTypes['DailyStat'] = ResolversParentTypes['DailyStat']> = {
  date?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  indexCount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  totalValueLocked?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DailyUserIndexHistoryResolvers<ContextType = any, ParentType extends ResolversParentTypes['DailyUserIndexHistory'] = ResolversParentTypes['DailyUserIndexHistory']> = {
  avgBalance?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  avgCapitalization?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  index?: Resolver<ResolversTypes['Index'], ParentType, ContextType>;
  logIndex?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  number?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  total?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  totalCap?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  totalSupply?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type HourlyIndexStatResolvers<ContextType = any, ParentType extends ResolversParentTypes['HourlyIndexStat'] = ResolversParentTypes['HourlyIndexStat']> = {
  basePrice?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  baseVolume?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  date?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  index?: Resolver<ResolversTypes['Index'], ParentType, ContextType>;
  marketCap?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  uniqueHolders?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type IndexResolvers<ContextType = any, ParentType extends ResolversParentTypes['Index'] = ResolversParentTypes['Index']> = {
  _assets?: Resolver<Array<ResolversTypes['ID']>, ParentType, ContextType>;
  _inactiveAssets?: Resolver<Array<ResolversTypes['ID']>, ParentType, ContextType>;
  assets?: Resolver<Maybe<Array<ResolversTypes['IndexAsset']>>, ParentType, ContextType, RequireFields<IndexAssetsArgs, 'first' | 'skip'>>;
  basePrice?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  basePriceETH?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  baseVolume?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  created?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  dailyStats?: Resolver<Array<ResolversTypes['DailyIndexStat']>, ParentType, ContextType, RequireFields<IndexDailyStatsArgs, 'first' | 'skip'>>;
  decimals?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  feeAUMPercent?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  feeBurn?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  feeMint?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  hourlyStats?: Resolver<Array<ResolversTypes['HourlyIndexStat']>, ParentType, ContextType, RequireFields<IndexHourlyStatsArgs, 'first' | 'skip'>>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  inactiveAssets?: Resolver<Maybe<Array<ResolversTypes['IndexAsset']>>, ParentType, ContextType, RequireFields<IndexInactiveAssetsArgs, 'first' | 'skip'>>;
  indexFactory?: Resolver<ResolversTypes['IndexFactory'], ParentType, ContextType>;
  marketCap?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  monthlyStats?: Resolver<Array<ResolversTypes['MonthlyIndexStat']>, ParentType, ContextType, RequireFields<IndexMonthlyStatsArgs, 'first' | 'skip'>>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  sector?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  symbol?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  totalSupply?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transaction?: Resolver<ResolversTypes['Transaction'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  uniqueHolders?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  users?: Resolver<Array<ResolversTypes['UserIndex']>, ParentType, ContextType, RequireFields<IndexUsersArgs, 'first' | 'skip'>>;
  weeklyStats?: Resolver<Array<ResolversTypes['WeeklyIndexStat']>, ParentType, ContextType, RequireFields<IndexWeeklyStatsArgs, 'first' | 'skip'>>;
  yearlyStats?: Resolver<Array<ResolversTypes['YearlyIndexStat']>, ParentType, ContextType, RequireFields<IndexYearlyStatsArgs, 'first' | 'skip'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type IndexAssetResolvers<ContextType = any, ParentType extends ResolversParentTypes['IndexAsset'] = ResolversParentTypes['IndexAsset']> = {
  asset?: Resolver<ResolversTypes['Asset'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  inactiveIndex?: Resolver<Maybe<ResolversTypes['Index']>, ParentType, ContextType>;
  index?: Resolver<Maybe<ResolversTypes['Index']>, ParentType, ContextType>;
  shares?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  weight?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type IndexFactoryResolvers<ContextType = any, ParentType extends ResolversParentTypes['IndexFactory'] = ResolversParentTypes['IndexFactory']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  indices?: Resolver<Array<ResolversTypes['Index']>, ParentType, ContextType, RequireFields<IndexFactoryIndicesArgs, 'first' | 'skip'>>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  vTokenFactory?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LastOrderIndexResolvers<ContextType = any, ParentType extends ResolversParentTypes['LastOrderIndex'] = ResolversParentTypes['LastOrderIndex']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  index?: Resolver<ResolversTypes['Index'], ParentType, ContextType>;
  order?: Resolver<ResolversTypes['Order'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MonthlyIndexStatResolvers<ContextType = any, ParentType extends ResolversParentTypes['MonthlyIndexStat'] = ResolversParentTypes['MonthlyIndexStat']> = {
  basePrice?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  basePriceETH?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  baseVolume?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  date?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  index?: Resolver<ResolversTypes['Index'], ParentType, ContextType>;
  marketCap?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  uniqueHolders?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrderResolvers<ContextType = any, ParentType extends ResolversParentTypes['Order'] = ResolversParentTypes['Order']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  index?: Resolver<ResolversTypes['Index'], ParentType, ContextType>;
  orderDetails?: Resolver<Array<ResolversTypes['OrderDetailsInfo']>, ParentType, ContextType, RequireFields<OrderOrderDetailsArgs, 'first' | 'skip'>>;
  order_id?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrderDetailsInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['OrderDetailsInfo'] = ResolversParentTypes['OrderDetailsInfo']> = {
  asset?: Resolver<ResolversTypes['Asset'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  order?: Resolver<ResolversTypes['Order'], ParentType, ContextType>;
  shares?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  side?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PairResolvers<ContextType = any, ParentType extends ResolversParentTypes['Pair'] = ResolversParentTypes['Pair']> = {
  asset0?: Resolver<ResolversTypes['Asset'], ParentType, ContextType>;
  asset0Reserve?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  asset1?: Resolver<ResolversTypes['Asset'], ParentType, ContextType>;
  asset1Reserve?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  swap?: Resolver<ResolversTypes['Swap'], ParentType, ContextType>;
  totalSupply?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  _meta?: Resolver<Maybe<ResolversTypes['_Meta_']>, ParentType, ContextType, Partial<Query_MetaArgs>>;
  asset?: Resolver<Maybe<ResolversTypes['Asset']>, ParentType, ContextType, RequireFields<QueryAssetArgs, 'id' | 'subgraphError'>>;
  assets?: Resolver<Array<ResolversTypes['Asset']>, ParentType, ContextType, RequireFields<QueryAssetsArgs, 'first' | 'skip' | 'subgraphError'>>;
  chainLinkAgg?: Resolver<Maybe<ResolversTypes['ChainLinkAgg']>, ParentType, ContextType, RequireFields<QueryChainLinkAggArgs, 'id' | 'subgraphError'>>;
  chainLinkAggs?: Resolver<Array<ResolversTypes['ChainLinkAgg']>, ParentType, ContextType, RequireFields<QueryChainLinkAggsArgs, 'first' | 'skip' | 'subgraphError'>>;
  dailyAssetStat?: Resolver<Maybe<ResolversTypes['DailyAssetStat']>, ParentType, ContextType, RequireFields<QueryDailyAssetStatArgs, 'id' | 'subgraphError'>>;
  dailyAssetStats?: Resolver<Array<ResolversTypes['DailyAssetStat']>, ParentType, ContextType, RequireFields<QueryDailyAssetStatsArgs, 'first' | 'skip' | 'subgraphError'>>;
  dailyCapitalization?: Resolver<Maybe<ResolversTypes['DailyCapitalization']>, ParentType, ContextType, RequireFields<QueryDailyCapitalizationArgs, 'id' | 'subgraphError'>>;
  dailyCapitalizations?: Resolver<Array<ResolversTypes['DailyCapitalization']>, ParentType, ContextType, RequireFields<QueryDailyCapitalizationsArgs, 'first' | 'skip' | 'subgraphError'>>;
  dailyIndexStat?: Resolver<Maybe<ResolversTypes['DailyIndexStat']>, ParentType, ContextType, RequireFields<QueryDailyIndexStatArgs, 'id' | 'subgraphError'>>;
  dailyIndexStats?: Resolver<Array<ResolversTypes['DailyIndexStat']>, ParentType, ContextType, RequireFields<QueryDailyIndexStatsArgs, 'first' | 'skip' | 'subgraphError'>>;
  dailyStat?: Resolver<Maybe<ResolversTypes['DailyStat']>, ParentType, ContextType, RequireFields<QueryDailyStatArgs, 'id' | 'subgraphError'>>;
  dailyStats?: Resolver<Array<ResolversTypes['DailyStat']>, ParentType, ContextType, RequireFields<QueryDailyStatsArgs, 'first' | 'skip' | 'subgraphError'>>;
  dailyUserIndexHistories?: Resolver<Array<ResolversTypes['DailyUserIndexHistory']>, ParentType, ContextType, RequireFields<QueryDailyUserIndexHistoriesArgs, 'first' | 'skip' | 'subgraphError'>>;
  dailyUserIndexHistory?: Resolver<Maybe<ResolversTypes['DailyUserIndexHistory']>, ParentType, ContextType, RequireFields<QueryDailyUserIndexHistoryArgs, 'id' | 'subgraphError'>>;
  dex?: Resolver<Maybe<ResolversTypes['DEX']>, ParentType, ContextType, RequireFields<QueryDexArgs, 'id' | 'subgraphError'>>;
  dexs?: Resolver<Array<ResolversTypes['DEX']>, ParentType, ContextType, RequireFields<QueryDexsArgs, 'first' | 'skip' | 'subgraphError'>>;
  hourlyIndexStat?: Resolver<Maybe<ResolversTypes['HourlyIndexStat']>, ParentType, ContextType, RequireFields<QueryHourlyIndexStatArgs, 'id' | 'subgraphError'>>;
  hourlyIndexStats?: Resolver<Array<ResolversTypes['HourlyIndexStat']>, ParentType, ContextType, RequireFields<QueryHourlyIndexStatsArgs, 'first' | 'skip' | 'subgraphError'>>;
  index?: Resolver<Maybe<ResolversTypes['Index']>, ParentType, ContextType, RequireFields<QueryIndexArgs, 'id' | 'subgraphError'>>;
  indexAsset?: Resolver<Maybe<ResolversTypes['IndexAsset']>, ParentType, ContextType, RequireFields<QueryIndexAssetArgs, 'id' | 'subgraphError'>>;
  indexAssets?: Resolver<Array<ResolversTypes['IndexAsset']>, ParentType, ContextType, RequireFields<QueryIndexAssetsArgs, 'first' | 'skip' | 'subgraphError'>>;
  indexFactories?: Resolver<Array<ResolversTypes['IndexFactory']>, ParentType, ContextType, RequireFields<QueryIndexFactoriesArgs, 'first' | 'skip' | 'subgraphError'>>;
  indexFactory?: Resolver<Maybe<ResolversTypes['IndexFactory']>, ParentType, ContextType, RequireFields<QueryIndexFactoryArgs, 'id' | 'subgraphError'>>;
  indexes?: Resolver<Array<ResolversTypes['Index']>, ParentType, ContextType, RequireFields<QueryIndexesArgs, 'first' | 'skip' | 'subgraphError'>>;
  lastOrderIndex?: Resolver<Maybe<ResolversTypes['LastOrderIndex']>, ParentType, ContextType, RequireFields<QueryLastOrderIndexArgs, 'id' | 'subgraphError'>>;
  lastOrderIndexes?: Resolver<Array<ResolversTypes['LastOrderIndex']>, ParentType, ContextType, RequireFields<QueryLastOrderIndexesArgs, 'first' | 'skip' | 'subgraphError'>>;
  monthlyIndexStat?: Resolver<Maybe<ResolversTypes['MonthlyIndexStat']>, ParentType, ContextType, RequireFields<QueryMonthlyIndexStatArgs, 'id' | 'subgraphError'>>;
  monthlyIndexStats?: Resolver<Array<ResolversTypes['MonthlyIndexStat']>, ParentType, ContextType, RequireFields<QueryMonthlyIndexStatsArgs, 'first' | 'skip' | 'subgraphError'>>;
  order?: Resolver<Maybe<ResolversTypes['Order']>, ParentType, ContextType, RequireFields<QueryOrderArgs, 'id' | 'subgraphError'>>;
  orderDetailsInfo?: Resolver<Maybe<ResolversTypes['OrderDetailsInfo']>, ParentType, ContextType, RequireFields<QueryOrderDetailsInfoArgs, 'id' | 'subgraphError'>>;
  orderDetailsInfos?: Resolver<Array<ResolversTypes['OrderDetailsInfo']>, ParentType, ContextType, RequireFields<QueryOrderDetailsInfosArgs, 'first' | 'skip' | 'subgraphError'>>;
  orders?: Resolver<Array<ResolversTypes['Order']>, ParentType, ContextType, RequireFields<QueryOrdersArgs, 'first' | 'skip' | 'subgraphError'>>;
  pair?: Resolver<Maybe<ResolversTypes['Pair']>, ParentType, ContextType, RequireFields<QueryPairArgs, 'id' | 'subgraphError'>>;
  pairs?: Resolver<Array<ResolversTypes['Pair']>, ParentType, ContextType, RequireFields<QueryPairsArgs, 'first' | 'skip' | 'subgraphError'>>;
  stat?: Resolver<Maybe<ResolversTypes['Stat']>, ParentType, ContextType, RequireFields<QueryStatArgs, 'id' | 'subgraphError'>>;
  stats?: Resolver<Array<ResolversTypes['Stat']>, ParentType, ContextType, RequireFields<QueryStatsArgs, 'first' | 'skip' | 'subgraphError'>>;
  sushiPair?: Resolver<Maybe<ResolversTypes['SushiPair']>, ParentType, ContextType, RequireFields<QuerySushiPairArgs, 'id' | 'subgraphError'>>;
  sushiPairs?: Resolver<Array<ResolversTypes['SushiPair']>, ParentType, ContextType, RequireFields<QuerySushiPairsArgs, 'first' | 'skip' | 'subgraphError'>>;
  swap?: Resolver<Maybe<ResolversTypes['Swap']>, ParentType, ContextType, RequireFields<QuerySwapArgs, 'id' | 'subgraphError'>>;
  swaps?: Resolver<Array<ResolversTypes['Swap']>, ParentType, ContextType, RequireFields<QuerySwapsArgs, 'first' | 'skip' | 'subgraphError'>>;
  transaction?: Resolver<Maybe<ResolversTypes['Transaction']>, ParentType, ContextType, RequireFields<QueryTransactionArgs, 'id' | 'subgraphError'>>;
  transactions?: Resolver<Array<ResolversTypes['Transaction']>, ParentType, ContextType, RequireFields<QueryTransactionsArgs, 'first' | 'skip' | 'subgraphError'>>;
  transfer?: Resolver<Maybe<ResolversTypes['Transfer']>, ParentType, ContextType, RequireFields<QueryTransferArgs, 'id' | 'subgraphError'>>;
  transfers?: Resolver<Array<ResolversTypes['Transfer']>, ParentType, ContextType, RequireFields<QueryTransfersArgs, 'first' | 'skip' | 'subgraphError'>>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserArgs, 'id' | 'subgraphError'>>;
  userCapitalization?: Resolver<Maybe<ResolversTypes['UserCapitalization']>, ParentType, ContextType, RequireFields<QueryUserCapitalizationArgs, 'id' | 'subgraphError'>>;
  userCapitalizations?: Resolver<Array<ResolversTypes['UserCapitalization']>, ParentType, ContextType, RequireFields<QueryUserCapitalizationsArgs, 'first' | 'skip' | 'subgraphError'>>;
  userIndex?: Resolver<Maybe<ResolversTypes['UserIndex']>, ParentType, ContextType, RequireFields<QueryUserIndexArgs, 'id' | 'subgraphError'>>;
  userIndexHistories?: Resolver<Array<ResolversTypes['UserIndexHistory']>, ParentType, ContextType, RequireFields<QueryUserIndexHistoriesArgs, 'first' | 'skip' | 'subgraphError'>>;
  userIndexHistory?: Resolver<Maybe<ResolversTypes['UserIndexHistory']>, ParentType, ContextType, RequireFields<QueryUserIndexHistoryArgs, 'id' | 'subgraphError'>>;
  userIndexes?: Resolver<Array<ResolversTypes['UserIndex']>, ParentType, ContextType, RequireFields<QueryUserIndexesArgs, 'first' | 'skip' | 'subgraphError'>>;
  users?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUsersArgs, 'first' | 'skip' | 'subgraphError'>>;
  vToken?: Resolver<Maybe<ResolversTypes['vToken']>, ParentType, ContextType, RequireFields<QueryVTokenArgs, 'id' | 'subgraphError'>>;
  vTokens?: Resolver<Array<ResolversTypes['vToken']>, ParentType, ContextType, RequireFields<QueryVTokensArgs, 'first' | 'skip' | 'subgraphError'>>;
  weeklyIndexStat?: Resolver<Maybe<ResolversTypes['WeeklyIndexStat']>, ParentType, ContextType, RequireFields<QueryWeeklyIndexStatArgs, 'id' | 'subgraphError'>>;
  weeklyIndexStats?: Resolver<Array<ResolversTypes['WeeklyIndexStat']>, ParentType, ContextType, RequireFields<QueryWeeklyIndexStatsArgs, 'first' | 'skip' | 'subgraphError'>>;
  yearlyIndexStat?: Resolver<Maybe<ResolversTypes['YearlyIndexStat']>, ParentType, ContextType, RequireFields<QueryYearlyIndexStatArgs, 'id' | 'subgraphError'>>;
  yearlyIndexStats?: Resolver<Array<ResolversTypes['YearlyIndexStat']>, ParentType, ContextType, RequireFields<QueryYearlyIndexStatsArgs, 'first' | 'skip' | 'subgraphError'>>;
};

export type StatResolvers<ContextType = any, ParentType extends ResolversParentTypes['Stat'] = ResolversParentTypes['Stat']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  indexCount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  totalValueLocked?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  _meta?: SubscriptionResolver<Maybe<ResolversTypes['_Meta_']>, "_meta", ParentType, ContextType, Partial<Subscription_MetaArgs>>;
  asset?: SubscriptionResolver<Maybe<ResolversTypes['Asset']>, "asset", ParentType, ContextType, RequireFields<SubscriptionAssetArgs, 'id' | 'subgraphError'>>;
  assets?: SubscriptionResolver<Array<ResolversTypes['Asset']>, "assets", ParentType, ContextType, RequireFields<SubscriptionAssetsArgs, 'first' | 'skip' | 'subgraphError'>>;
  chainLinkAgg?: SubscriptionResolver<Maybe<ResolversTypes['ChainLinkAgg']>, "chainLinkAgg", ParentType, ContextType, RequireFields<SubscriptionChainLinkAggArgs, 'id' | 'subgraphError'>>;
  chainLinkAggs?: SubscriptionResolver<Array<ResolversTypes['ChainLinkAgg']>, "chainLinkAggs", ParentType, ContextType, RequireFields<SubscriptionChainLinkAggsArgs, 'first' | 'skip' | 'subgraphError'>>;
  dailyAssetStat?: SubscriptionResolver<Maybe<ResolversTypes['DailyAssetStat']>, "dailyAssetStat", ParentType, ContextType, RequireFields<SubscriptionDailyAssetStatArgs, 'id' | 'subgraphError'>>;
  dailyAssetStats?: SubscriptionResolver<Array<ResolversTypes['DailyAssetStat']>, "dailyAssetStats", ParentType, ContextType, RequireFields<SubscriptionDailyAssetStatsArgs, 'first' | 'skip' | 'subgraphError'>>;
  dailyCapitalization?: SubscriptionResolver<Maybe<ResolversTypes['DailyCapitalization']>, "dailyCapitalization", ParentType, ContextType, RequireFields<SubscriptionDailyCapitalizationArgs, 'id' | 'subgraphError'>>;
  dailyCapitalizations?: SubscriptionResolver<Array<ResolversTypes['DailyCapitalization']>, "dailyCapitalizations", ParentType, ContextType, RequireFields<SubscriptionDailyCapitalizationsArgs, 'first' | 'skip' | 'subgraphError'>>;
  dailyIndexStat?: SubscriptionResolver<Maybe<ResolversTypes['DailyIndexStat']>, "dailyIndexStat", ParentType, ContextType, RequireFields<SubscriptionDailyIndexStatArgs, 'id' | 'subgraphError'>>;
  dailyIndexStats?: SubscriptionResolver<Array<ResolversTypes['DailyIndexStat']>, "dailyIndexStats", ParentType, ContextType, RequireFields<SubscriptionDailyIndexStatsArgs, 'first' | 'skip' | 'subgraphError'>>;
  dailyStat?: SubscriptionResolver<Maybe<ResolversTypes['DailyStat']>, "dailyStat", ParentType, ContextType, RequireFields<SubscriptionDailyStatArgs, 'id' | 'subgraphError'>>;
  dailyStats?: SubscriptionResolver<Array<ResolversTypes['DailyStat']>, "dailyStats", ParentType, ContextType, RequireFields<SubscriptionDailyStatsArgs, 'first' | 'skip' | 'subgraphError'>>;
  dailyUserIndexHistories?: SubscriptionResolver<Array<ResolversTypes['DailyUserIndexHistory']>, "dailyUserIndexHistories", ParentType, ContextType, RequireFields<SubscriptionDailyUserIndexHistoriesArgs, 'first' | 'skip' | 'subgraphError'>>;
  dailyUserIndexHistory?: SubscriptionResolver<Maybe<ResolversTypes['DailyUserIndexHistory']>, "dailyUserIndexHistory", ParentType, ContextType, RequireFields<SubscriptionDailyUserIndexHistoryArgs, 'id' | 'subgraphError'>>;
  dex?: SubscriptionResolver<Maybe<ResolversTypes['DEX']>, "dex", ParentType, ContextType, RequireFields<SubscriptionDexArgs, 'id' | 'subgraphError'>>;
  dexs?: SubscriptionResolver<Array<ResolversTypes['DEX']>, "dexs", ParentType, ContextType, RequireFields<SubscriptionDexsArgs, 'first' | 'skip' | 'subgraphError'>>;
  hourlyIndexStat?: SubscriptionResolver<Maybe<ResolversTypes['HourlyIndexStat']>, "hourlyIndexStat", ParentType, ContextType, RequireFields<SubscriptionHourlyIndexStatArgs, 'id' | 'subgraphError'>>;
  hourlyIndexStats?: SubscriptionResolver<Array<ResolversTypes['HourlyIndexStat']>, "hourlyIndexStats", ParentType, ContextType, RequireFields<SubscriptionHourlyIndexStatsArgs, 'first' | 'skip' | 'subgraphError'>>;
  index?: SubscriptionResolver<Maybe<ResolversTypes['Index']>, "index", ParentType, ContextType, RequireFields<SubscriptionIndexArgs, 'id' | 'subgraphError'>>;
  indexAsset?: SubscriptionResolver<Maybe<ResolversTypes['IndexAsset']>, "indexAsset", ParentType, ContextType, RequireFields<SubscriptionIndexAssetArgs, 'id' | 'subgraphError'>>;
  indexAssets?: SubscriptionResolver<Array<ResolversTypes['IndexAsset']>, "indexAssets", ParentType, ContextType, RequireFields<SubscriptionIndexAssetsArgs, 'first' | 'skip' | 'subgraphError'>>;
  indexFactories?: SubscriptionResolver<Array<ResolversTypes['IndexFactory']>, "indexFactories", ParentType, ContextType, RequireFields<SubscriptionIndexFactoriesArgs, 'first' | 'skip' | 'subgraphError'>>;
  indexFactory?: SubscriptionResolver<Maybe<ResolversTypes['IndexFactory']>, "indexFactory", ParentType, ContextType, RequireFields<SubscriptionIndexFactoryArgs, 'id' | 'subgraphError'>>;
  indexes?: SubscriptionResolver<Array<ResolversTypes['Index']>, "indexes", ParentType, ContextType, RequireFields<SubscriptionIndexesArgs, 'first' | 'skip' | 'subgraphError'>>;
  lastOrderIndex?: SubscriptionResolver<Maybe<ResolversTypes['LastOrderIndex']>, "lastOrderIndex", ParentType, ContextType, RequireFields<SubscriptionLastOrderIndexArgs, 'id' | 'subgraphError'>>;
  lastOrderIndexes?: SubscriptionResolver<Array<ResolversTypes['LastOrderIndex']>, "lastOrderIndexes", ParentType, ContextType, RequireFields<SubscriptionLastOrderIndexesArgs, 'first' | 'skip' | 'subgraphError'>>;
  monthlyIndexStat?: SubscriptionResolver<Maybe<ResolversTypes['MonthlyIndexStat']>, "monthlyIndexStat", ParentType, ContextType, RequireFields<SubscriptionMonthlyIndexStatArgs, 'id' | 'subgraphError'>>;
  monthlyIndexStats?: SubscriptionResolver<Array<ResolversTypes['MonthlyIndexStat']>, "monthlyIndexStats", ParentType, ContextType, RequireFields<SubscriptionMonthlyIndexStatsArgs, 'first' | 'skip' | 'subgraphError'>>;
  order?: SubscriptionResolver<Maybe<ResolversTypes['Order']>, "order", ParentType, ContextType, RequireFields<SubscriptionOrderArgs, 'id' | 'subgraphError'>>;
  orderDetailsInfo?: SubscriptionResolver<Maybe<ResolversTypes['OrderDetailsInfo']>, "orderDetailsInfo", ParentType, ContextType, RequireFields<SubscriptionOrderDetailsInfoArgs, 'id' | 'subgraphError'>>;
  orderDetailsInfos?: SubscriptionResolver<Array<ResolversTypes['OrderDetailsInfo']>, "orderDetailsInfos", ParentType, ContextType, RequireFields<SubscriptionOrderDetailsInfosArgs, 'first' | 'skip' | 'subgraphError'>>;
  orders?: SubscriptionResolver<Array<ResolversTypes['Order']>, "orders", ParentType, ContextType, RequireFields<SubscriptionOrdersArgs, 'first' | 'skip' | 'subgraphError'>>;
  pair?: SubscriptionResolver<Maybe<ResolversTypes['Pair']>, "pair", ParentType, ContextType, RequireFields<SubscriptionPairArgs, 'id' | 'subgraphError'>>;
  pairs?: SubscriptionResolver<Array<ResolversTypes['Pair']>, "pairs", ParentType, ContextType, RequireFields<SubscriptionPairsArgs, 'first' | 'skip' | 'subgraphError'>>;
  stat?: SubscriptionResolver<Maybe<ResolversTypes['Stat']>, "stat", ParentType, ContextType, RequireFields<SubscriptionStatArgs, 'id' | 'subgraphError'>>;
  stats?: SubscriptionResolver<Array<ResolversTypes['Stat']>, "stats", ParentType, ContextType, RequireFields<SubscriptionStatsArgs, 'first' | 'skip' | 'subgraphError'>>;
  sushiPair?: SubscriptionResolver<Maybe<ResolversTypes['SushiPair']>, "sushiPair", ParentType, ContextType, RequireFields<SubscriptionSushiPairArgs, 'id' | 'subgraphError'>>;
  sushiPairs?: SubscriptionResolver<Array<ResolversTypes['SushiPair']>, "sushiPairs", ParentType, ContextType, RequireFields<SubscriptionSushiPairsArgs, 'first' | 'skip' | 'subgraphError'>>;
  swap?: SubscriptionResolver<Maybe<ResolversTypes['Swap']>, "swap", ParentType, ContextType, RequireFields<SubscriptionSwapArgs, 'id' | 'subgraphError'>>;
  swaps?: SubscriptionResolver<Array<ResolversTypes['Swap']>, "swaps", ParentType, ContextType, RequireFields<SubscriptionSwapsArgs, 'first' | 'skip' | 'subgraphError'>>;
  transaction?: SubscriptionResolver<Maybe<ResolversTypes['Transaction']>, "transaction", ParentType, ContextType, RequireFields<SubscriptionTransactionArgs, 'id' | 'subgraphError'>>;
  transactions?: SubscriptionResolver<Array<ResolversTypes['Transaction']>, "transactions", ParentType, ContextType, RequireFields<SubscriptionTransactionsArgs, 'first' | 'skip' | 'subgraphError'>>;
  transfer?: SubscriptionResolver<Maybe<ResolversTypes['Transfer']>, "transfer", ParentType, ContextType, RequireFields<SubscriptionTransferArgs, 'id' | 'subgraphError'>>;
  transfers?: SubscriptionResolver<Array<ResolversTypes['Transfer']>, "transfers", ParentType, ContextType, RequireFields<SubscriptionTransfersArgs, 'first' | 'skip' | 'subgraphError'>>;
  user?: SubscriptionResolver<Maybe<ResolversTypes['User']>, "user", ParentType, ContextType, RequireFields<SubscriptionUserArgs, 'id' | 'subgraphError'>>;
  userCapitalization?: SubscriptionResolver<Maybe<ResolversTypes['UserCapitalization']>, "userCapitalization", ParentType, ContextType, RequireFields<SubscriptionUserCapitalizationArgs, 'id' | 'subgraphError'>>;
  userCapitalizations?: SubscriptionResolver<Array<ResolversTypes['UserCapitalization']>, "userCapitalizations", ParentType, ContextType, RequireFields<SubscriptionUserCapitalizationsArgs, 'first' | 'skip' | 'subgraphError'>>;
  userIndex?: SubscriptionResolver<Maybe<ResolversTypes['UserIndex']>, "userIndex", ParentType, ContextType, RequireFields<SubscriptionUserIndexArgs, 'id' | 'subgraphError'>>;
  userIndexHistories?: SubscriptionResolver<Array<ResolversTypes['UserIndexHistory']>, "userIndexHistories", ParentType, ContextType, RequireFields<SubscriptionUserIndexHistoriesArgs, 'first' | 'skip' | 'subgraphError'>>;
  userIndexHistory?: SubscriptionResolver<Maybe<ResolversTypes['UserIndexHistory']>, "userIndexHistory", ParentType, ContextType, RequireFields<SubscriptionUserIndexHistoryArgs, 'id' | 'subgraphError'>>;
  userIndexes?: SubscriptionResolver<Array<ResolversTypes['UserIndex']>, "userIndexes", ParentType, ContextType, RequireFields<SubscriptionUserIndexesArgs, 'first' | 'skip' | 'subgraphError'>>;
  users?: SubscriptionResolver<Array<ResolversTypes['User']>, "users", ParentType, ContextType, RequireFields<SubscriptionUsersArgs, 'first' | 'skip' | 'subgraphError'>>;
  vToken?: SubscriptionResolver<Maybe<ResolversTypes['vToken']>, "vToken", ParentType, ContextType, RequireFields<SubscriptionVTokenArgs, 'id' | 'subgraphError'>>;
  vTokens?: SubscriptionResolver<Array<ResolversTypes['vToken']>, "vTokens", ParentType, ContextType, RequireFields<SubscriptionVTokensArgs, 'first' | 'skip' | 'subgraphError'>>;
  weeklyIndexStat?: SubscriptionResolver<Maybe<ResolversTypes['WeeklyIndexStat']>, "weeklyIndexStat", ParentType, ContextType, RequireFields<SubscriptionWeeklyIndexStatArgs, 'id' | 'subgraphError'>>;
  weeklyIndexStats?: SubscriptionResolver<Array<ResolversTypes['WeeklyIndexStat']>, "weeklyIndexStats", ParentType, ContextType, RequireFields<SubscriptionWeeklyIndexStatsArgs, 'first' | 'skip' | 'subgraphError'>>;
  yearlyIndexStat?: SubscriptionResolver<Maybe<ResolversTypes['YearlyIndexStat']>, "yearlyIndexStat", ParentType, ContextType, RequireFields<SubscriptionYearlyIndexStatArgs, 'id' | 'subgraphError'>>;
  yearlyIndexStats?: SubscriptionResolver<Array<ResolversTypes['YearlyIndexStat']>, "yearlyIndexStats", ParentType, ContextType, RequireFields<SubscriptionYearlyIndexStatsArgs, 'first' | 'skip' | 'subgraphError'>>;
};

export type SushiPairResolvers<ContextType = any, ParentType extends ResolversParentTypes['SushiPair'] = ResolversParentTypes['SushiPair']> = {
  asset0?: Resolver<ResolversTypes['Asset'], ParentType, ContextType>;
  asset0Reserve?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  asset1?: Resolver<ResolversTypes['Asset'], ParentType, ContextType>;
  asset1Reserve?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  swap?: Resolver<ResolversTypes['Swap'], ParentType, ContextType>;
  totalSupply?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SwapResolvers<ContextType = any, ParentType extends ResolversParentTypes['Swap'] = ResolversParentTypes['Swap']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  pairs?: Resolver<Array<ResolversTypes['Pair']>, ParentType, ContextType, RequireFields<SwapPairsArgs, 'first' | 'skip'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TransactionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Transaction'] = ResolversParentTypes['Transaction']> = {
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  gasPrice?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  gasUsed?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transfers?: Resolver<Array<ResolversTypes['Transfer']>, ParentType, ContextType, RequireFields<TransactionTransfersArgs, 'first' | 'skip'>>;
  value?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TransferResolvers<ContextType = any, ParentType extends ResolversParentTypes['Transfer'] = ResolversParentTypes['Transfer']> = {
  from?: Resolver<Maybe<ResolversTypes['Bytes']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  index?: Resolver<ResolversTypes['Index'], ParentType, ContextType>;
  to?: Resolver<Maybe<ResolversTypes['Bytes']>, ParentType, ContextType>;
  transaction?: Resolver<ResolversTypes['Transaction'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['TransferType'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  indexes?: Resolver<Array<ResolversTypes['UserIndex']>, ParentType, ContextType, RequireFields<UserIndexesArgs, 'first' | 'skip'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserCapitalizationResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserCapitalization'] = ResolversParentTypes['UserCapitalization']> = {
  capitalization?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  index?: Resolver<ResolversTypes['Index'], ParentType, ContextType>;
  logIndex?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserIndexResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserIndex'] = ResolversParentTypes['UserIndex']> = {
  balance?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  capitalization?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  index?: Resolver<ResolversTypes['Index'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserIndexHistoryResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserIndexHistory'] = ResolversParentTypes['UserIndexHistory']> = {
  balance?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  capitalization?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  index?: Resolver<ResolversTypes['Index'], ParentType, ContextType>;
  logIndex?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  totalSupply?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WeeklyIndexStatResolvers<ContextType = any, ParentType extends ResolversParentTypes['WeeklyIndexStat'] = ResolversParentTypes['WeeklyIndexStat']> = {
  basePrice?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  basePriceETH?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  baseVolume?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  date?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  index?: Resolver<ResolversTypes['Index'], ParentType, ContextType>;
  marketCap?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  uniqueHolders?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type YearlyIndexStatResolvers<ContextType = any, ParentType extends ResolversParentTypes['YearlyIndexStat'] = ResolversParentTypes['YearlyIndexStat']> = {
  basePrice?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  basePriceETH?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  baseVolume?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  date?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  index?: Resolver<ResolversTypes['Index'], ParentType, ContextType>;
  marketCap?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  uniqueHolders?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type _Block_Resolvers<ContextType = any, ParentType extends ResolversParentTypes['_Block_'] = ResolversParentTypes['_Block_']> = {
  hash?: Resolver<Maybe<ResolversTypes['Bytes']>, ParentType, ContextType>;
  number?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type _Meta_Resolvers<ContextType = any, ParentType extends ResolversParentTypes['_Meta_'] = ResolversParentTypes['_Meta_']> = {
  block?: Resolver<ResolversTypes['_Block_'], ParentType, ContextType>;
  deployment?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hasIndexingErrors?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VTokenResolvers<ContextType = any, ParentType extends ResolversParentTypes['vToken'] = ResolversParentTypes['vToken']> = {
  asset?: Resolver<ResolversTypes['Asset'], ParentType, ContextType>;
  assetReserve?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  capitalization?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  deposited?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  factory?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  platformTotalSupply?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  platformTotalSupplyDec?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  tokenType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  totalAmount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Asset?: AssetResolvers<ContextType>;
  BigDecimal?: GraphQLScalarType;
  BigInt?: GraphQLScalarType;
  Bytes?: GraphQLScalarType;
  ChainLinkAgg?: ChainLinkAggResolvers<ContextType>;
  DEX?: DexResolvers<ContextType>;
  DailyAssetStat?: DailyAssetStatResolvers<ContextType>;
  DailyCapitalization?: DailyCapitalizationResolvers<ContextType>;
  DailyIndexStat?: DailyIndexStatResolvers<ContextType>;
  DailyStat?: DailyStatResolvers<ContextType>;
  DailyUserIndexHistory?: DailyUserIndexHistoryResolvers<ContextType>;
  HourlyIndexStat?: HourlyIndexStatResolvers<ContextType>;
  Index?: IndexResolvers<ContextType>;
  IndexAsset?: IndexAssetResolvers<ContextType>;
  IndexFactory?: IndexFactoryResolvers<ContextType>;
  LastOrderIndex?: LastOrderIndexResolvers<ContextType>;
  MonthlyIndexStat?: MonthlyIndexStatResolvers<ContextType>;
  Order?: OrderResolvers<ContextType>;
  OrderDetailsInfo?: OrderDetailsInfoResolvers<ContextType>;
  Pair?: PairResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Stat?: StatResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  SushiPair?: SushiPairResolvers<ContextType>;
  Swap?: SwapResolvers<ContextType>;
  Transaction?: TransactionResolvers<ContextType>;
  Transfer?: TransferResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserCapitalization?: UserCapitalizationResolvers<ContextType>;
  UserIndex?: UserIndexResolvers<ContextType>;
  UserIndexHistory?: UserIndexHistoryResolvers<ContextType>;
  WeeklyIndexStat?: WeeklyIndexStatResolvers<ContextType>;
  YearlyIndexStat?: YearlyIndexStatResolvers<ContextType>;
  _Block_?: _Block_Resolvers<ContextType>;
  _Meta_?: _Meta_Resolvers<ContextType>;
  vToken?: VTokenResolvers<ContextType>;
};

export type DirectiveResolvers<ContextType = any> = {
  derivedFrom?: DerivedFromDirectiveResolver<any, any, ContextType>;
  entity?: EntityDirectiveResolver<any, any, ContextType>;
  subgraphId?: SubgraphIdDirectiveResolver<any, any, ContextType>;
};
