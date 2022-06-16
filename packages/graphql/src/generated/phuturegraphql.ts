import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
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
  _indexes = '_indexes',
  _vTokens = '_vTokens',
  basePrice = 'basePrice',
  basePriceSushi = 'basePriceSushi',
  basePriceUni = 'basePriceUni',
  dailyStats = 'dailyStats',
  decimals = 'decimals',
  id = 'id',
  indexCount = 'indexCount',
  indexes = 'indexes',
  isWhitelisted = 'isWhitelisted',
  marketCap = 'marketCap',
  name = 'name',
  pairsAsAsset0 = 'pairsAsAsset0',
  pairsAsAsset1 = 'pairsAsAsset1',
  symbol = 'symbol',
  totalSupply = 'totalSupply',
  vTokens = 'vTokens',
  vaultBaseReserve = 'vaultBaseReserve',
  vaultReserve = 'vaultReserve'
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
  answer = 'answer',
  asset = 'asset',
  decimals = 'decimals',
  description = 'description',
  id = 'id',
  nextAgg = 'nextAgg',
  updatedAt = 'updatedAt'
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
  id = 'id',
  router = 'router',
  type = 'type'
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
  asset = 'asset',
  basePrice = 'basePrice',
  date = 'date',
  id = 'id',
  vaultBaseReserve = 'vaultBaseReserve',
  vaultReserve = 'vaultReserve'
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
  capitalization = 'capitalization',
  id = 'id',
  index = 'index',
  logIndex = 'logIndex',
  timestamp = 'timestamp'
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
  basePrice = 'basePrice',
  basePriceETH = 'basePriceETH',
  baseVolume = 'baseVolume',
  date = 'date',
  id = 'id',
  index = 'index',
  marketCap = 'marketCap',
  uniqueHolders = 'uniqueHolders'
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
  date = 'date',
  id = 'id',
  indexCount = 'indexCount',
  totalValueLocked = 'totalValueLocked'
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
  avgBalance = 'avgBalance',
  avgCapitalization = 'avgCapitalization',
  id = 'id',
  index = 'index',
  logIndex = 'logIndex',
  number = 'number',
  timestamp = 'timestamp',
  total = 'total',
  totalCap = 'totalCap',
  totalSupply = 'totalSupply',
  user = 'user'
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
  basePrice = 'basePrice',
  baseVolume = 'baseVolume',
  date = 'date',
  id = 'id',
  index = 'index',
  marketCap = 'marketCap',
  uniqueHolders = 'uniqueHolders'
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
  asset = 'asset',
  id = 'id',
  inactiveIndex = 'inactiveIndex',
  index = 'index',
  shares = 'shares',
  weight = 'weight'
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
  id = 'id',
  indices = 'indices',
  type = 'type',
  vTokenFactory = 'vTokenFactory'
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
  _assets = '_assets',
  _inactiveAssets = '_inactiveAssets',
  assets = 'assets',
  basePrice = 'basePrice',
  basePriceETH = 'basePriceETH',
  baseVolume = 'baseVolume',
  created = 'created',
  dailyStats = 'dailyStats',
  decimals = 'decimals',
  feeAUMPercent = 'feeAUMPercent',
  feeBurn = 'feeBurn',
  feeMint = 'feeMint',
  hourlyStats = 'hourlyStats',
  id = 'id',
  inactiveAssets = 'inactiveAssets',
  indexFactory = 'indexFactory',
  marketCap = 'marketCap',
  monthlyStats = 'monthlyStats',
  name = 'name',
  sector = 'sector',
  symbol = 'symbol',
  totalSupply = 'totalSupply',
  transaction = 'transaction',
  type = 'type',
  uniqueHolders = 'uniqueHolders',
  users = 'users',
  weeklyStats = 'weeklyStats',
  yearlyStats = 'yearlyStats'
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
  id = 'id',
  index = 'index',
  order = 'order'
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
  basePrice = 'basePrice',
  basePriceETH = 'basePriceETH',
  baseVolume = 'baseVolume',
  date = 'date',
  id = 'id',
  index = 'index',
  marketCap = 'marketCap',
  uniqueHolders = 'uniqueHolders'
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
  asset = 'asset',
  id = 'id',
  order = 'order',
  shares = 'shares',
  side = 'side'
}

export enum OrderDirection {
  asc = 'asc',
  desc = 'desc'
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
  id = 'id',
  index = 'index',
  orderDetails = 'orderDetails',
  order_id = 'order_id'
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
  asset0 = 'asset0',
  asset0Reserve = 'asset0Reserve',
  asset1 = 'asset1',
  asset1Reserve = 'asset1Reserve',
  id = 'id',
  swap = 'swap',
  totalSupply = 'totalSupply'
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
  id = 'id',
  indexCount = 'indexCount',
  totalValueLocked = 'totalValueLocked'
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
  asset0 = 'asset0',
  asset0Reserve = 'asset0Reserve',
  asset1 = 'asset1',
  asset1Reserve = 'asset1Reserve',
  id = 'id',
  swap = 'swap',
  totalSupply = 'totalSupply'
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
  id = 'id',
  pairs = 'pairs'
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
  blockNumber = 'blockNumber',
  gasPrice = 'gasPrice',
  gasUsed = 'gasUsed',
  id = 'id',
  timestamp = 'timestamp',
  transfers = 'transfers',
  value = 'value'
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
  from = 'from',
  id = 'id',
  index = 'index',
  to = 'to',
  transaction = 'transaction',
  type = 'type',
  value = 'value'
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
  capitalization = 'capitalization',
  id = 'id',
  index = 'index',
  logIndex = 'logIndex',
  timestamp = 'timestamp'
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
  balance = 'balance',
  capitalization = 'capitalization',
  id = 'id',
  index = 'index',
  logIndex = 'logIndex',
  timestamp = 'timestamp',
  totalSupply = 'totalSupply',
  user = 'user'
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
  balance = 'balance',
  capitalization = 'capitalization',
  id = 'id',
  index = 'index',
  user = 'user'
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
  id = 'id',
  indexes = 'indexes'
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
  basePrice = 'basePrice',
  basePriceETH = 'basePriceETH',
  baseVolume = 'baseVolume',
  date = 'date',
  id = 'id',
  index = 'index',
  marketCap = 'marketCap',
  uniqueHolders = 'uniqueHolders'
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
  basePrice = 'basePrice',
  basePriceETH = 'basePriceETH',
  baseVolume = 'baseVolume',
  date = 'date',
  id = 'id',
  index = 'index',
  marketCap = 'marketCap',
  uniqueHolders = 'uniqueHolders'
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
  allow = 'allow',
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  deny = 'deny'
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
  asset = 'asset',
  assetReserve = 'assetReserve',
  capitalization = 'capitalization',
  deposited = 'deposited',
  factory = 'factory',
  id = 'id',
  platformTotalSupply = 'platformTotalSupply',
  platformTotalSupplyDec = 'platformTotalSupplyDec',
  tokenType = 'tokenType',
  totalAmount = 'totalAmount'
}

export type GetAllIndicesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllIndicesQuery = { __typename?: 'Query', indexes: Array<{ __typename?: 'Index', id: string, totalSupply: any, created: any, type: string, symbol: string, name: string, decimals: any, basePrice: any, marketCap: any, baseVolume: any, uniqueHolders: any, users: Array<{ __typename?: 'UserIndex', id: string, balance: any }>, assets?: Array<{ __typename?: 'IndexAsset', id: string, weight: any, asset: { __typename?: 'Asset', id: string, decimals: any, name: string, symbol: string, vaultReserve: any, basePrice: any } }> | null, transaction: { __typename?: 'Transaction', id: string, timestamp: any, blockNumber: any }, dailyStats: Array<{ __typename?: 'DailyIndexStat', id: string, date: number, basePrice: any, marketCap: any, baseVolume: any, uniqueHolders: any }> }> };

export type GetCapitalizationsQueryVariables = Exact<{
  timestamp: Scalars['BigInt'];
}>;


export type GetCapitalizationsQuery = { __typename?: 'Query', dailyCapitalizations: Array<{ __typename?: 'DailyCapitalization', id: string, capitalization: any, timestamp: any, logIndex: any, index: { __typename?: 'Index', id: string, symbol: string } }> };

export type GetChartDataQueryVariables = Exact<{
  id: Scalars['ID'];
  dateNow: Scalars['Int'];
  dateEnd: Scalars['Int'];
}>;


export type GetChartDataQuery = { __typename?: 'Query', index?: { __typename?: 'Index', basePrice: any, baseVolume: any, dailyStats: Array<{ __typename?: 'DailyIndexStat', basePrice: any, date: number }> } | null };

export type GetDailyCapQueryVariables = Exact<{
  date: Scalars['BigInt'];
}>;


export type GetDailyCapQuery = { __typename?: 'Query', dailyCapitalizations: Array<{ __typename?: 'DailyCapitalization', id: string, capitalization: any, timestamp: any, logIndex: any, index: { __typename?: 'Index', id: string, symbol: string } }> };

export type GetIndexQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetIndexQuery = { __typename?: 'Query', indexes: Array<{ __typename?: 'Index', id: string, totalSupply: any, symbol: string, name: string, decimals: any, type: string, basePrice: any, basePriceETH: any, marketCap: any, baseVolume: any, uniqueHolders: any, feeBurn: any, feeMint: any, feeAUMPercent: any, created: any, sector: any, users: Array<{ __typename?: 'UserIndex', id: string, balance: any, user: { __typename?: 'User', id: string } }>, assets?: Array<{ __typename?: 'IndexAsset', id: string, shares: any, weight: any, asset: { __typename?: 'Asset', decimals: any, id: string, name: string, symbol: string, vaultReserve: any, basePrice: any, vTokens: Array<{ __typename?: 'vToken', id: string, tokenType: string, factory: string, deposited: any, platformTotalSupply: any, platformTotalSupplyDec: any, capitalization: any, assetReserve: any, totalAmount: any }> } }> | null, inactiveAssets?: Array<{ __typename?: 'IndexAsset', id: string, shares: any, weight: any, asset: { __typename?: 'Asset', decimals: any, id: string, name: string, symbol: string, vaultReserve: any, basePrice: any, vTokens: Array<{ __typename?: 'vToken', id: string, tokenType: string, factory: string, deposited: any, platformTotalSupply: any, platformTotalSupplyDec: any, capitalization: any, assetReserve: any, totalAmount: any }> } }> | null, transaction: { __typename?: 'Transaction', id: string, timestamp: any, blockNumber: any }, indexFactory: { __typename?: 'IndexFactory', id: string, type: string, vTokenFactory: string }, dailyStats: Array<{ __typename?: 'DailyIndexStat', basePrice: any, basePriceETH: any, date: number }> }> };

export type GetPortfolioDataQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetPortfolioDataQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', indexes: Array<{ __typename?: 'UserIndex', index: { __typename?: 'Index', id: string, totalSupply: any, type: string, symbol: string, decimals: any, name: string, basePrice: any, marketCap: any, baseVolume: any, uniqueHolders: any, users: Array<{ __typename?: 'UserIndex', id: string, balance: any }>, assets?: Array<{ __typename?: 'IndexAsset', id: string, weight: any, index?: { __typename?: 'Index', id: string } | null, asset: { __typename?: 'Asset', decimals: any, id: string, symbol: string, vaultReserve: any, basePrice: any } }> | null, transaction: { __typename?: 'Transaction', id: string, timestamp: any }, dailyStats: Array<{ __typename?: 'DailyIndexStat', id: string, date: number, basePrice: any, marketCap: any, baseVolume: any, uniqueHolders: any, index: { __typename?: 'Index', id: string } }> } }> }> };

export type GetIndexDetailedQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetIndexDetailedQuery = { __typename?: 'Query', indexes: Array<{ __typename?: 'Index', id: string, totalSupply: any, symbol: string, name: string, decimals: any, type: string, basePrice: any, basePriceETH: any, marketCap: any, baseVolume: any, uniqueHolders: any, feeBurn: any, feeMint: any, feeAUMPercent: any, created: any, sector: any, users: Array<{ __typename?: 'UserIndex', id: string, balance: any, user: { __typename?: 'User', id: string } }>, assets?: Array<{ __typename?: 'IndexAsset', id: string, shares: any, weight: any, asset: { __typename?: 'Asset', decimals: any, id: string, name: string, symbol: string, vaultReserve: any, basePrice: any, vTokens: Array<{ __typename?: 'vToken', id: string, tokenType: string, factory: string, deposited: any, platformTotalSupply: any, platformTotalSupplyDec: any, capitalization: any, assetReserve: any, totalAmount: any }> } }> | null, inactiveAssets?: Array<{ __typename?: 'IndexAsset', id: string, shares: any, weight: any, asset: { __typename?: 'Asset', decimals: any, id: string, name: string, symbol: string, vaultReserve: any, basePrice: any, vTokens: Array<{ __typename?: 'vToken', id: string, tokenType: string, factory: string, deposited: any, platformTotalSupply: any, platformTotalSupplyDec: any, capitalization: any, assetReserve: any, totalAmount: any }> } }> | null, transaction: { __typename?: 'Transaction', id: string, timestamp: any, blockNumber: any }, indexFactory: { __typename?: 'IndexFactory', id: string, type: string, vTokenFactory: string }, dailyStats: Array<{ __typename?: 'DailyIndexStat', basePrice: any, basePriceETH: any, date: number }> }> };

export type GetIndexInfoQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetIndexInfoQuery = { __typename?: 'Query', index?: { __typename?: 'Index', id: string, totalSupply: any, symbol: string, decimals: any, name: string, basePrice: any, marketCap: any, baseVolume: any, uniqueHolders: any } | null };

export type GetIndicesPageQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
}>;


export type GetIndicesPageQuery = { __typename?: 'Query', indexes: Array<{ __typename?: 'Index', id: string, totalSupply: any, type: string, symbol: string, name: string, decimals: any, basePrice: any, marketCap: any, baseVolume: any, uniqueHolders: any, users: Array<{ __typename?: 'UserIndex', id: string, balance: any }>, assets?: Array<{ __typename?: 'IndexAsset', id: string, weight: any, index?: { __typename?: 'Index', id: string } | null, asset: { __typename?: 'Asset', id: string, decimals: any, symbol: string, vaultReserve: any, basePrice: any } }> | null, transaction: { __typename?: 'Transaction', id: string, timestamp: any }, dailyStats: Array<{ __typename?: 'DailyIndexStat', id: string, date: number, basePrice: any, marketCap: any, baseVolume: any, uniqueHolders: any, index: { __typename?: 'Index', id: string } }> }> };

export type GetStatsQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetStatsQuery = { __typename?: 'Query', stat?: { __typename?: 'Stat', id: string, indexCount: any, totalValueLocked: any } | null };

export type GetUserIndicesQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetUserIndicesQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', indexes: Array<{ __typename?: 'UserIndex', index: { __typename?: 'Index', id: string, symbol: string, name: string } }> }> };

export type GetUserIndexHistoriesQueryVariables = Exact<{
  id: Scalars['String'];
  dateLimit: Scalars['BigInt'];
}>;


export type GetUserIndexHistoriesQuery = { __typename?: 'Query', userIndexHistories: Array<{ __typename?: 'UserIndexHistory', balance: any, capitalization: any, totalSupply: any, logIndex: any, timestamp: any, index: { __typename?: 'Index', id: string, symbol: string }, user: { __typename?: 'User', id: string } }> };

export type GetUserIndicesDetailedQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetUserIndicesDetailedQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: string, indexes: Array<{ __typename?: 'UserIndex', index: { __typename?: 'Index', id: string, totalSupply: any, type: string, symbol: string, decimals: any, name: string, basePrice: any, marketCap: any, baseVolume: any, uniqueHolders: any, users: Array<{ __typename?: 'UserIndex', id: string, balance: any }>, assets?: Array<{ __typename?: 'IndexAsset', id: string, weight: any, index?: { __typename?: 'Index', id: string } | null, asset: { __typename?: 'Asset', decimals: any, id: string, symbol: string, vaultReserve: any, basePrice: any } }> | null, transaction: { __typename?: 'Transaction', id: string, timestamp: any }, dailyStats: Array<{ __typename?: 'DailyIndexStat', id: string, date: number, basePrice: any, marketCap: any, baseVolume: any, uniqueHolders: any, index: { __typename?: 'Index', id: string } }> } }> }> };


export const GetAllIndicesDocument = gql`
    query getAllIndices {
  indexes {
    id
    totalSupply
    created
    type
    symbol
    name
    decimals
    users {
      id
      balance
    }
    assets {
      id
      weight
      asset {
        id
        decimals
        name
        symbol
        vaultReserve
        basePrice
      }
    }
    transaction {
      id
      timestamp
      blockNumber
    }
    dailyStats {
      id
      date
      basePrice
      marketCap
      baseVolume
      uniqueHolders
    }
    basePrice
    marketCap
    baseVolume
    uniqueHolders
  }
}
    `;
export const GetCapitalizationsDocument = gql`
    query getCapitalizations($timestamp: BigInt!) {
  dailyCapitalizations(where: {timestamp_gte: $timestamp}, orderBy: id) {
    id
    index {
      id
      symbol
    }
    capitalization
    timestamp
    logIndex
  }
}
    `;
export const GetChartDataDocument = gql`
    query getChartData($id: ID!, $dateNow: Int!, $dateEnd: Int!) {
  index(id: $id) {
    basePrice
    baseVolume
    dailyStats(where: {date_lte: $dateNow, date_gte: $dateEnd}, orderBy: date) {
      basePrice
      date
    }
  }
}
    `;
export const GetDailyCapDocument = gql`
    query getDailyCap($date: BigInt!) {
  dailyCapitalizations(where: {timestamp_gte: $date}, orderBy: id) {
    id
    index {
      id
      symbol
    }
    capitalization
    timestamp
    logIndex
  }
}
    `;
export const GetIndexDocument = gql`
    query getIndex($id: ID!) {
  indexes(where: {id: $id}) {
    id
    totalSupply
    symbol
    name
    decimals
    type
    users {
      id
      user {
        id
      }
      balance
    }
    assets {
      id
      shares
      weight
      asset {
        decimals
        id
        name
        symbol
        vaultReserve
        basePrice
        vTokens {
          id
          tokenType
          factory
          deposited
          platformTotalSupply
          platformTotalSupplyDec
          capitalization
          assetReserve
          totalAmount
        }
      }
    }
    inactiveAssets {
      id
      shares
      weight
      asset {
        decimals
        id
        name
        symbol
        vaultReserve
        basePrice
        vTokens {
          id
          tokenType
          factory
          deposited
          platformTotalSupply
          platformTotalSupplyDec
          capitalization
          assetReserve
          totalAmount
        }
      }
    }
    transaction {
      id
      timestamp
      blockNumber
    }
    indexFactory {
      id
      type
      vTokenFactory
    }
    basePrice
    basePriceETH
    dailyStats {
      basePrice
      basePriceETH
      date
    }
    marketCap
    baseVolume
    uniqueHolders
    feeBurn
    feeMint
    feeAUMPercent
    created
    sector
  }
}
    `;
export const GetPortfolioDataDocument = gql`
    query getPortfolioData($id: ID!) {
  users(where: {id: $id}) {
    indexes {
      index {
        id
        totalSupply
        type
        symbol
        decimals
        name
        users {
          id
          balance
        }
        assets {
          id
          index {
            id
          }
          weight
          asset {
            decimals
            id
            symbol
            vaultReserve
            basePrice
          }
        }
        transaction {
          id
          timestamp
        }
        dailyStats {
          id
          date
          index {
            id
          }
          basePrice
          marketCap
          baseVolume
          uniqueHolders
        }
        basePrice
        marketCap
        baseVolume
        uniqueHolders
      }
    }
  }
}
    `;
export const GetIndexDetailedDocument = gql`
    query getIndexDetailed($id: ID!) {
  indexes(where: {id: $id}) {
    id
    totalSupply
    symbol
    name
    decimals
    type
    users {
      id
      user {
        id
      }
      balance
    }
    assets {
      id
      shares
      weight
      asset {
        decimals
        id
        name
        symbol
        vaultReserve
        basePrice
        vTokens {
          id
          tokenType
          factory
          deposited
          platformTotalSupply
          platformTotalSupplyDec
          capitalization
          assetReserve
          totalAmount
        }
      }
    }
    inactiveAssets {
      id
      shares
      weight
      asset {
        decimals
        id
        name
        symbol
        vaultReserve
        basePrice
        vTokens {
          id
          tokenType
          factory
          deposited
          platformTotalSupply
          platformTotalSupplyDec
          capitalization
          assetReserve
          totalAmount
        }
      }
    }
    transaction {
      id
      timestamp
      blockNumber
    }
    indexFactory {
      id
      type
      vTokenFactory
    }
    basePrice
    basePriceETH
    dailyStats {
      basePrice
      basePriceETH
      date
    }
    marketCap
    baseVolume
    uniqueHolders
    feeBurn
    feeMint
    feeAUMPercent
    created
    sector
  }
}
    `;
export const GetIndexInfoDocument = gql`
    query getIndexInfo($id: ID!) {
  index(id: $id) {
    id
    totalSupply
    symbol
    decimals
    name
    basePrice
    marketCap
    baseVolume
    uniqueHolders
  }
}
    `;
export const GetIndicesPageDocument = gql`
    query getIndicesPage($first: Int, $skip: Int) {
  indexes(first: $first, skip: $skip) {
    id
    totalSupply
    type
    symbol
    name
    decimals
    users {
      id
      balance
    }
    assets {
      id
      index {
        id
      }
      weight
      asset {
        id
        decimals
        symbol
        vaultReserve
        basePrice
      }
    }
    transaction {
      id
      timestamp
    }
    dailyStats {
      id
      date
      index {
        id
      }
      basePrice
      marketCap
      baseVolume
      uniqueHolders
    }
    basePrice
    marketCap
    baseVolume
    uniqueHolders
  }
}
    `;
export const GetStatsDocument = gql`
    query getStats($id: ID!) {
  stat(id: $id) {
    id
    indexCount
    totalValueLocked
  }
}
    `;
export const GetUserIndicesDocument = gql`
    query getUserIndices($id: ID!) {
  users(where: {id: $id}) {
    indexes {
      index {
        id
        symbol
        name
      }
    }
  }
}
    `;
export const GetUserIndexHistoriesDocument = gql`
    query getUserIndexHistories($id: String!, $dateLimit: BigInt!) {
  userIndexHistories(where: {user: $id, timestamp_gte: $dateLimit}, orderBy: id) {
    index {
      id
      symbol
    }
    user {
      id
    }
    balance
    capitalization
    totalSupply
    logIndex
    timestamp
  }
}
    `;
export const GetUserIndicesDetailedDocument = gql`
    query getUserIndicesDetailed($id: ID!) {
  users(where: {id: $id}) {
    id
    indexes {
      index {
        id
        totalSupply
        type
        symbol
        decimals
        name
        users {
          id
          balance
        }
        assets {
          id
          index {
            id
          }
          weight
          asset {
            decimals
            id
            symbol
            vaultReserve
            basePrice
          }
        }
        transaction {
          id
          timestamp
        }
        dailyStats {
          id
          date
          index {
            id
          }
          basePrice
          marketCap
          baseVolume
          uniqueHolders
        }
        basePrice
        marketCap
        baseVolume
        uniqueHolders
      }
    }
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    getAllIndices(variables?: GetAllIndicesQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetAllIndicesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetAllIndicesQuery>(GetAllIndicesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getAllIndices', 'query');
    },
    getCapitalizations(variables: GetCapitalizationsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetCapitalizationsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetCapitalizationsQuery>(GetCapitalizationsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getCapitalizations', 'query');
    },
    getChartData(variables: GetChartDataQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetChartDataQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetChartDataQuery>(GetChartDataDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getChartData', 'query');
    },
    getDailyCap(variables: GetDailyCapQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetDailyCapQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetDailyCapQuery>(GetDailyCapDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getDailyCap', 'query');
    },
    getIndex(variables: GetIndexQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetIndexQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetIndexQuery>(GetIndexDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getIndex', 'query');
    },
    getPortfolioData(variables: GetPortfolioDataQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetPortfolioDataQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetPortfolioDataQuery>(GetPortfolioDataDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getPortfolioData', 'query');
    },
    getIndexDetailed(variables: GetIndexDetailedQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetIndexDetailedQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetIndexDetailedQuery>(GetIndexDetailedDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getIndexDetailed', 'query');
    },
    getIndexInfo(variables: GetIndexInfoQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetIndexInfoQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetIndexInfoQuery>(GetIndexInfoDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getIndexInfo', 'query');
    },
    getIndicesPage(variables?: GetIndicesPageQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetIndicesPageQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetIndicesPageQuery>(GetIndicesPageDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getIndicesPage', 'query');
    },
    getStats(variables: GetStatsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetStatsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetStatsQuery>(GetStatsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getStats', 'query');
    },
    getUserIndices(variables: GetUserIndicesQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetUserIndicesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetUserIndicesQuery>(GetUserIndicesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getUserIndices', 'query');
    },
    getUserIndexHistories(variables: GetUserIndexHistoriesQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetUserIndexHistoriesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetUserIndexHistoriesQuery>(GetUserIndexHistoriesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getUserIndexHistories', 'query');
    },
    getUserIndicesDetailed(variables: GetUserIndicesDetailedQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetUserIndicesDetailedQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetUserIndicesDetailedQuery>(GetUserIndicesDetailedDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getUserIndicesDetailed', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;