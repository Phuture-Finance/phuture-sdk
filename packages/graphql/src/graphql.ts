import { GraphQLClient } from 'graphql-request'
import { PatchedRequestInit } from 'graphql-request/dist/types'
import { getSdk as getPhutureSdk } from './generated/phuturegraphql';
import { getSdk as getlmSdk, getSdk } from './generated/lmgraphql';

const PHUTURE_GRAPH_ENDPOINT = "https://graph.dev.phuture.finance/subgraphs/name/phuture/mvp";
const LIQUIDITY_MINING_ENDPOINT = "https://api.thegraph.com/subgraphs/name/hvrlk/lm"

/**
 * ### The client layer for making requests to graph ql. 
 * 
 * This layer exists to allow easier client layer swapping
 * @param endpoint the subgraph uri
 * @param options additional options
 * @returns @see GraphQLClient
 */
export const getGraphQLClient = (endpoint: string, options?: PatchedRequestInit): GraphQLClient => new GraphQLClient(endpoint, options);

/**
 * ### Expose queries available on the phuture GraphQL network
 * @param endpoint the graphql uri endpoint
 * @param options options to pass into the graphql client @see PatchedRequestInit
 * @returns GraphQLClient @see GraphQLClient
 */
export const phutureGraphQL = (endpoint = PHUTURE_GRAPH_ENDPOINT,options?: PatchedRequestInit) => getPhutureSdk(getGraphQLClient(endpoint, options));

/**
 * ### Expose queries available on the phuture liquidity mining GraphQL network
 * @param endpoint the graphql uri endpoint
 * @param options options to pass into the graphql client @see PatchedRequestInit
 * @returns GraphQLClient @see GraphQLClient
 */
export const lmGraphQL = (endpoint = LIQUIDITY_MINING_ENDPOINT, options?: PatchedRequestInit) => getlmSdk(getGraphQLClient(endpoint, options));