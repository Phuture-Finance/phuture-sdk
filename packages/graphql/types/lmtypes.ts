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

export type Apr = {
  __typename?: 'APR';
  Wn: Scalars['BigDecimal'];
  id: Scalars['ID'];
  n: Scalars['BigDecimal'];
};

export type Apr_Filter = {
  Wn?: InputMaybe<Scalars['BigDecimal']>;
  Wn_gt?: InputMaybe<Scalars['BigDecimal']>;
  Wn_gte?: InputMaybe<Scalars['BigDecimal']>;
  Wn_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  Wn_lt?: InputMaybe<Scalars['BigDecimal']>;
  Wn_lte?: InputMaybe<Scalars['BigDecimal']>;
  Wn_not?: InputMaybe<Scalars['BigDecimal']>;
  Wn_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
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
  n?: InputMaybe<Scalars['BigDecimal']>;
  n_gt?: InputMaybe<Scalars['BigDecimal']>;
  n_gte?: InputMaybe<Scalars['BigDecimal']>;
  n_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  n_lt?: InputMaybe<Scalars['BigDecimal']>;
  n_lte?: InputMaybe<Scalars['BigDecimal']>;
  n_not?: InputMaybe<Scalars['BigDecimal']>;
  n_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
};

export enum Apr_OrderBy {
  Wn = 'Wn',
  Id = 'id',
  N = 'n'
}

export type BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type Block_Height = {
  hash?: InputMaybe<Scalars['Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

/** Defines the order direction, either ascending or descending */
export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type Query = {
  __typename?: 'Query';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  apr?: Maybe<Apr>;
  aprs: Array<Apr>;
  reserve?: Maybe<Reserve>;
  reserves: Array<Reserve>;
  reward?: Maybe<Reward>;
  rewards: Array<Reward>;
  total?: Maybe<Total>;
  totals: Array<Total>;
  vestingRange?: Maybe<VestingRange>;
  vestingRanges: Array<VestingRange>;
};


export type Query_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};


export type QueryAprArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryAprsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Apr_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Apr_Filter>;
};


export type QueryReserveArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryReservesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Reserve_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Reserve_Filter>;
};


export type QueryRewardArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryRewardsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Reward_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Reward_Filter>;
};


export type QueryTotalArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryTotalsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Total_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Total_Filter>;
};


export type QueryVestingRangeArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryVestingRangesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<VestingRange_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<VestingRange_Filter>;
};

export type Reserve = {
  __typename?: 'Reserve';
  id: Scalars['ID'];
  reserve0: Scalars['BigInt'];
  reserve1: Scalars['BigInt'];
  token0: Scalars['String'];
  token0Decimals: Scalars['BigInt'];
  token1: Scalars['String'];
  token1Decimals: Scalars['BigInt'];
  totalSupply: Scalars['BigInt'];
};

export type Reserve_Filter = {
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
  reserve0?: InputMaybe<Scalars['BigInt']>;
  reserve0_gt?: InputMaybe<Scalars['BigInt']>;
  reserve0_gte?: InputMaybe<Scalars['BigInt']>;
  reserve0_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reserve0_lt?: InputMaybe<Scalars['BigInt']>;
  reserve0_lte?: InputMaybe<Scalars['BigInt']>;
  reserve0_not?: InputMaybe<Scalars['BigInt']>;
  reserve0_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reserve1?: InputMaybe<Scalars['BigInt']>;
  reserve1_gt?: InputMaybe<Scalars['BigInt']>;
  reserve1_gte?: InputMaybe<Scalars['BigInt']>;
  reserve1_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reserve1_lt?: InputMaybe<Scalars['BigInt']>;
  reserve1_lte?: InputMaybe<Scalars['BigInt']>;
  reserve1_not?: InputMaybe<Scalars['BigInt']>;
  reserve1_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  token0?: InputMaybe<Scalars['String']>;
  token0Decimals?: InputMaybe<Scalars['BigInt']>;
  token0Decimals_gt?: InputMaybe<Scalars['BigInt']>;
  token0Decimals_gte?: InputMaybe<Scalars['BigInt']>;
  token0Decimals_in?: InputMaybe<Array<Scalars['BigInt']>>;
  token0Decimals_lt?: InputMaybe<Scalars['BigInt']>;
  token0Decimals_lte?: InputMaybe<Scalars['BigInt']>;
  token0Decimals_not?: InputMaybe<Scalars['BigInt']>;
  token0Decimals_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  token0_contains?: InputMaybe<Scalars['String']>;
  token0_contains_nocase?: InputMaybe<Scalars['String']>;
  token0_ends_with?: InputMaybe<Scalars['String']>;
  token0_ends_with_nocase?: InputMaybe<Scalars['String']>;
  token0_gt?: InputMaybe<Scalars['String']>;
  token0_gte?: InputMaybe<Scalars['String']>;
  token0_in?: InputMaybe<Array<Scalars['String']>>;
  token0_lt?: InputMaybe<Scalars['String']>;
  token0_lte?: InputMaybe<Scalars['String']>;
  token0_not?: InputMaybe<Scalars['String']>;
  token0_not_contains?: InputMaybe<Scalars['String']>;
  token0_not_contains_nocase?: InputMaybe<Scalars['String']>;
  token0_not_ends_with?: InputMaybe<Scalars['String']>;
  token0_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  token0_not_in?: InputMaybe<Array<Scalars['String']>>;
  token0_not_starts_with?: InputMaybe<Scalars['String']>;
  token0_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  token0_starts_with?: InputMaybe<Scalars['String']>;
  token0_starts_with_nocase?: InputMaybe<Scalars['String']>;
  token1?: InputMaybe<Scalars['String']>;
  token1Decimals?: InputMaybe<Scalars['BigInt']>;
  token1Decimals_gt?: InputMaybe<Scalars['BigInt']>;
  token1Decimals_gte?: InputMaybe<Scalars['BigInt']>;
  token1Decimals_in?: InputMaybe<Array<Scalars['BigInt']>>;
  token1Decimals_lt?: InputMaybe<Scalars['BigInt']>;
  token1Decimals_lte?: InputMaybe<Scalars['BigInt']>;
  token1Decimals_not?: InputMaybe<Scalars['BigInt']>;
  token1Decimals_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  token1_contains?: InputMaybe<Scalars['String']>;
  token1_contains_nocase?: InputMaybe<Scalars['String']>;
  token1_ends_with?: InputMaybe<Scalars['String']>;
  token1_ends_with_nocase?: InputMaybe<Scalars['String']>;
  token1_gt?: InputMaybe<Scalars['String']>;
  token1_gte?: InputMaybe<Scalars['String']>;
  token1_in?: InputMaybe<Array<Scalars['String']>>;
  token1_lt?: InputMaybe<Scalars['String']>;
  token1_lte?: InputMaybe<Scalars['String']>;
  token1_not?: InputMaybe<Scalars['String']>;
  token1_not_contains?: InputMaybe<Scalars['String']>;
  token1_not_contains_nocase?: InputMaybe<Scalars['String']>;
  token1_not_ends_with?: InputMaybe<Scalars['String']>;
  token1_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  token1_not_in?: InputMaybe<Array<Scalars['String']>>;
  token1_not_starts_with?: InputMaybe<Scalars['String']>;
  token1_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  token1_starts_with?: InputMaybe<Scalars['String']>;
  token1_starts_with_nocase?: InputMaybe<Scalars['String']>;
  totalSupply?: InputMaybe<Scalars['BigInt']>;
  totalSupply_gt?: InputMaybe<Scalars['BigInt']>;
  totalSupply_gte?: InputMaybe<Scalars['BigInt']>;
  totalSupply_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalSupply_lt?: InputMaybe<Scalars['BigInt']>;
  totalSupply_lte?: InputMaybe<Scalars['BigInt']>;
  totalSupply_not?: InputMaybe<Scalars['BigInt']>;
  totalSupply_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum Reserve_OrderBy {
  Id = 'id',
  Reserve0 = 'reserve0',
  Reserve1 = 'reserve1',
  Token0 = 'token0',
  Token0Decimals = 'token0Decimals',
  Token1 = 'token1',
  Token1Decimals = 'token1Decimals',
  TotalSupply = 'totalSupply'
}

export type Reward = {
  __typename?: 'Reward';
  amount: Scalars['BigInt'];
  id: Scalars['ID'];
};

export type Reward_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  amount?: InputMaybe<Scalars['BigInt']>;
  amount_gt?: InputMaybe<Scalars['BigInt']>;
  amount_gte?: InputMaybe<Scalars['BigInt']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amount_lt?: InputMaybe<Scalars['BigInt']>;
  amount_lte?: InputMaybe<Scalars['BigInt']>;
  amount_not?: InputMaybe<Scalars['BigInt']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
};

export enum Reward_OrderBy {
  Amount = 'amount',
  Id = 'id'
}

export type Subscription = {
  __typename?: 'Subscription';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  apr?: Maybe<Apr>;
  aprs: Array<Apr>;
  reserve?: Maybe<Reserve>;
  reserves: Array<Reserve>;
  reward?: Maybe<Reward>;
  rewards: Array<Reward>;
  total?: Maybe<Total>;
  totals: Array<Total>;
  vestingRange?: Maybe<VestingRange>;
  vestingRanges: Array<VestingRange>;
};


export type Subscription_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};


export type SubscriptionAprArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionAprsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Apr_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Apr_Filter>;
};


export type SubscriptionReserveArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionReservesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Reserve_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Reserve_Filter>;
};


export type SubscriptionRewardArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionRewardsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Reward_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Reward_Filter>;
};


export type SubscriptionTotalArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionTotalsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Total_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Total_Filter>;
};


export type SubscriptionVestingRangeArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionVestingRangesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<VestingRange_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<VestingRange_Filter>;
};

export type Total = {
  __typename?: 'Total';
  APR: Scalars['BigDecimal'];
  id: Scalars['ID'];
  reward: Scalars['BigInt'];
};

export type Total_Filter = {
  APR?: InputMaybe<Scalars['BigDecimal']>;
  APR_gt?: InputMaybe<Scalars['BigDecimal']>;
  APR_gte?: InputMaybe<Scalars['BigDecimal']>;
  APR_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  APR_lt?: InputMaybe<Scalars['BigDecimal']>;
  APR_lte?: InputMaybe<Scalars['BigDecimal']>;
  APR_not?: InputMaybe<Scalars['BigDecimal']>;
  APR_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
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
  reward?: InputMaybe<Scalars['BigInt']>;
  reward_gt?: InputMaybe<Scalars['BigInt']>;
  reward_gte?: InputMaybe<Scalars['BigInt']>;
  reward_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reward_lt?: InputMaybe<Scalars['BigInt']>;
  reward_lte?: InputMaybe<Scalars['BigInt']>;
  reward_not?: InputMaybe<Scalars['BigInt']>;
  reward_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum Total_OrderBy {
  Apr = 'APR',
  Id = 'id',
  Reward = 'reward'
}

export type VestingRange = {
  __typename?: 'VestingRange';
  account: Scalars['String'];
  amount: Scalars['BigInt'];
  id: Scalars['ID'];
  rangeEndIndex: Scalars['BigInt'];
  rangeStartIndex: Scalars['BigInt'];
  unstaked: Scalars['Boolean'];
};

export type VestingRange_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  account?: InputMaybe<Scalars['String']>;
  account_contains?: InputMaybe<Scalars['String']>;
  account_contains_nocase?: InputMaybe<Scalars['String']>;
  account_ends_with?: InputMaybe<Scalars['String']>;
  account_ends_with_nocase?: InputMaybe<Scalars['String']>;
  account_gt?: InputMaybe<Scalars['String']>;
  account_gte?: InputMaybe<Scalars['String']>;
  account_in?: InputMaybe<Array<Scalars['String']>>;
  account_lt?: InputMaybe<Scalars['String']>;
  account_lte?: InputMaybe<Scalars['String']>;
  account_not?: InputMaybe<Scalars['String']>;
  account_not_contains?: InputMaybe<Scalars['String']>;
  account_not_contains_nocase?: InputMaybe<Scalars['String']>;
  account_not_ends_with?: InputMaybe<Scalars['String']>;
  account_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  account_not_in?: InputMaybe<Array<Scalars['String']>>;
  account_not_starts_with?: InputMaybe<Scalars['String']>;
  account_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  account_starts_with?: InputMaybe<Scalars['String']>;
  account_starts_with_nocase?: InputMaybe<Scalars['String']>;
  amount?: InputMaybe<Scalars['BigInt']>;
  amount_gt?: InputMaybe<Scalars['BigInt']>;
  amount_gte?: InputMaybe<Scalars['BigInt']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amount_lt?: InputMaybe<Scalars['BigInt']>;
  amount_lte?: InputMaybe<Scalars['BigInt']>;
  amount_not?: InputMaybe<Scalars['BigInt']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  rangeEndIndex?: InputMaybe<Scalars['BigInt']>;
  rangeEndIndex_gt?: InputMaybe<Scalars['BigInt']>;
  rangeEndIndex_gte?: InputMaybe<Scalars['BigInt']>;
  rangeEndIndex_in?: InputMaybe<Array<Scalars['BigInt']>>;
  rangeEndIndex_lt?: InputMaybe<Scalars['BigInt']>;
  rangeEndIndex_lte?: InputMaybe<Scalars['BigInt']>;
  rangeEndIndex_not?: InputMaybe<Scalars['BigInt']>;
  rangeEndIndex_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  rangeStartIndex?: InputMaybe<Scalars['BigInt']>;
  rangeStartIndex_gt?: InputMaybe<Scalars['BigInt']>;
  rangeStartIndex_gte?: InputMaybe<Scalars['BigInt']>;
  rangeStartIndex_in?: InputMaybe<Array<Scalars['BigInt']>>;
  rangeStartIndex_lt?: InputMaybe<Scalars['BigInt']>;
  rangeStartIndex_lte?: InputMaybe<Scalars['BigInt']>;
  rangeStartIndex_not?: InputMaybe<Scalars['BigInt']>;
  rangeStartIndex_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  unstaked?: InputMaybe<Scalars['Boolean']>;
  unstaked_in?: InputMaybe<Array<Scalars['Boolean']>>;
  unstaked_not?: InputMaybe<Scalars['Boolean']>;
  unstaked_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
};

export enum VestingRange_OrderBy {
  Account = 'account',
  Amount = 'amount',
  Id = 'id',
  RangeEndIndex = 'rangeEndIndex',
  RangeStartIndex = 'rangeStartIndex',
  Unstaked = 'unstaked'
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
  APR: ResolverTypeWrapper<Apr>;
  APR_filter: Apr_Filter;
  APR_orderBy: Apr_OrderBy;
  BigDecimal: ResolverTypeWrapper<Scalars['BigDecimal']>;
  BigInt: ResolverTypeWrapper<Scalars['BigInt']>;
  BlockChangedFilter: BlockChangedFilter;
  Block_height: Block_Height;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Bytes: ResolverTypeWrapper<Scalars['Bytes']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  OrderDirection: OrderDirection;
  Query: ResolverTypeWrapper<{}>;
  Reserve: ResolverTypeWrapper<Reserve>;
  Reserve_filter: Reserve_Filter;
  Reserve_orderBy: Reserve_OrderBy;
  Reward: ResolverTypeWrapper<Reward>;
  Reward_filter: Reward_Filter;
  Reward_orderBy: Reward_OrderBy;
  String: ResolverTypeWrapper<Scalars['String']>;
  Subscription: ResolverTypeWrapper<{}>;
  Total: ResolverTypeWrapper<Total>;
  Total_filter: Total_Filter;
  Total_orderBy: Total_OrderBy;
  VestingRange: ResolverTypeWrapper<VestingRange>;
  VestingRange_filter: VestingRange_Filter;
  VestingRange_orderBy: VestingRange_OrderBy;
  _Block_: ResolverTypeWrapper<_Block_>;
  _Meta_: ResolverTypeWrapper<_Meta_>;
  _SubgraphErrorPolicy_: _SubgraphErrorPolicy_;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  APR: Apr;
  APR_filter: Apr_Filter;
  BigDecimal: Scalars['BigDecimal'];
  BigInt: Scalars['BigInt'];
  BlockChangedFilter: BlockChangedFilter;
  Block_height: Block_Height;
  Boolean: Scalars['Boolean'];
  Bytes: Scalars['Bytes'];
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  Query: {};
  Reserve: Reserve;
  Reserve_filter: Reserve_Filter;
  Reward: Reward;
  Reward_filter: Reward_Filter;
  String: Scalars['String'];
  Subscription: {};
  Total: Total;
  Total_filter: Total_Filter;
  VestingRange: VestingRange;
  VestingRange_filter: VestingRange_Filter;
  _Block_: _Block_;
  _Meta_: _Meta_;
};

export type DerivedFromDirectiveArgs = {
  field: Scalars['String'];
};

export type DerivedFromDirectiveResolver<Result, Parent, ContextType = any, Args = DerivedFromDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type EntityDirectiveArgs = { };

export type EntityDirectiveResolver<Result, Parent, ContextType = any, Args = EntityDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type SubgraphIdDirectiveArgs = {
  id: Scalars['String'];
};

export type SubgraphIdDirectiveResolver<Result, Parent, ContextType = any, Args = SubgraphIdDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AprResolvers<ContextType = any, ParentType extends ResolversParentTypes['APR'] = ResolversParentTypes['APR']> = {
  Wn?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  n?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
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

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  _meta?: Resolver<Maybe<ResolversTypes['_Meta_']>, ParentType, ContextType, Partial<Query_MetaArgs>>;
  apr?: Resolver<Maybe<ResolversTypes['APR']>, ParentType, ContextType, RequireFields<QueryAprArgs, 'id' | 'subgraphError'>>;
  aprs?: Resolver<Array<ResolversTypes['APR']>, ParentType, ContextType, RequireFields<QueryAprsArgs, 'first' | 'skip' | 'subgraphError'>>;
  reserve?: Resolver<Maybe<ResolversTypes['Reserve']>, ParentType, ContextType, RequireFields<QueryReserveArgs, 'id' | 'subgraphError'>>;
  reserves?: Resolver<Array<ResolversTypes['Reserve']>, ParentType, ContextType, RequireFields<QueryReservesArgs, 'first' | 'skip' | 'subgraphError'>>;
  reward?: Resolver<Maybe<ResolversTypes['Reward']>, ParentType, ContextType, RequireFields<QueryRewardArgs, 'id' | 'subgraphError'>>;
  rewards?: Resolver<Array<ResolversTypes['Reward']>, ParentType, ContextType, RequireFields<QueryRewardsArgs, 'first' | 'skip' | 'subgraphError'>>;
  total?: Resolver<Maybe<ResolversTypes['Total']>, ParentType, ContextType, RequireFields<QueryTotalArgs, 'id' | 'subgraphError'>>;
  totals?: Resolver<Array<ResolversTypes['Total']>, ParentType, ContextType, RequireFields<QueryTotalsArgs, 'first' | 'skip' | 'subgraphError'>>;
  vestingRange?: Resolver<Maybe<ResolversTypes['VestingRange']>, ParentType, ContextType, RequireFields<QueryVestingRangeArgs, 'id' | 'subgraphError'>>;
  vestingRanges?: Resolver<Array<ResolversTypes['VestingRange']>, ParentType, ContextType, RequireFields<QueryVestingRangesArgs, 'first' | 'skip' | 'subgraphError'>>;
};

export type ReserveResolvers<ContextType = any, ParentType extends ResolversParentTypes['Reserve'] = ResolversParentTypes['Reserve']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  reserve0?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  reserve1?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  token0?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  token0Decimals?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  token1?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  token1Decimals?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  totalSupply?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RewardResolvers<ContextType = any, ParentType extends ResolversParentTypes['Reward'] = ResolversParentTypes['Reward']> = {
  amount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  _meta?: SubscriptionResolver<Maybe<ResolversTypes['_Meta_']>, "_meta", ParentType, ContextType, Partial<Subscription_MetaArgs>>;
  apr?: SubscriptionResolver<Maybe<ResolversTypes['APR']>, "apr", ParentType, ContextType, RequireFields<SubscriptionAprArgs, 'id' | 'subgraphError'>>;
  aprs?: SubscriptionResolver<Array<ResolversTypes['APR']>, "aprs", ParentType, ContextType, RequireFields<SubscriptionAprsArgs, 'first' | 'skip' | 'subgraphError'>>;
  reserve?: SubscriptionResolver<Maybe<ResolversTypes['Reserve']>, "reserve", ParentType, ContextType, RequireFields<SubscriptionReserveArgs, 'id' | 'subgraphError'>>;
  reserves?: SubscriptionResolver<Array<ResolversTypes['Reserve']>, "reserves", ParentType, ContextType, RequireFields<SubscriptionReservesArgs, 'first' | 'skip' | 'subgraphError'>>;
  reward?: SubscriptionResolver<Maybe<ResolversTypes['Reward']>, "reward", ParentType, ContextType, RequireFields<SubscriptionRewardArgs, 'id' | 'subgraphError'>>;
  rewards?: SubscriptionResolver<Array<ResolversTypes['Reward']>, "rewards", ParentType, ContextType, RequireFields<SubscriptionRewardsArgs, 'first' | 'skip' | 'subgraphError'>>;
  total?: SubscriptionResolver<Maybe<ResolversTypes['Total']>, "total", ParentType, ContextType, RequireFields<SubscriptionTotalArgs, 'id' | 'subgraphError'>>;
  totals?: SubscriptionResolver<Array<ResolversTypes['Total']>, "totals", ParentType, ContextType, RequireFields<SubscriptionTotalsArgs, 'first' | 'skip' | 'subgraphError'>>;
  vestingRange?: SubscriptionResolver<Maybe<ResolversTypes['VestingRange']>, "vestingRange", ParentType, ContextType, RequireFields<SubscriptionVestingRangeArgs, 'id' | 'subgraphError'>>;
  vestingRanges?: SubscriptionResolver<Array<ResolversTypes['VestingRange']>, "vestingRanges", ParentType, ContextType, RequireFields<SubscriptionVestingRangesArgs, 'first' | 'skip' | 'subgraphError'>>;
};

export type TotalResolvers<ContextType = any, ParentType extends ResolversParentTypes['Total'] = ResolversParentTypes['Total']> = {
  APR?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  reward?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VestingRangeResolvers<ContextType = any, ParentType extends ResolversParentTypes['VestingRange'] = ResolversParentTypes['VestingRange']> = {
  account?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  amount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  rangeEndIndex?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  rangeStartIndex?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  unstaked?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
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

export type Resolvers<ContextType = any> = {
  APR?: AprResolvers<ContextType>;
  BigDecimal?: GraphQLScalarType;
  BigInt?: GraphQLScalarType;
  Bytes?: GraphQLScalarType;
  Query?: QueryResolvers<ContextType>;
  Reserve?: ReserveResolvers<ContextType>;
  Reward?: RewardResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  Total?: TotalResolvers<ContextType>;
  VestingRange?: VestingRangeResolvers<ContextType>;
  _Block_?: _Block_Resolvers<ContextType>;
  _Meta_?: _Meta_Resolvers<ContextType>;
};

export type DirectiveResolvers<ContextType = any> = {
  derivedFrom?: DerivedFromDirectiveResolver<any, any, ContextType>;
  entity?: EntityDirectiveResolver<any, any, ContextType>;
  subgraphId?: SubgraphIdDirectiveResolver<any, any, ContextType>;
};
