import {GraphQLClient} from 'graphql-request';
import {PatchedRequestInit} from 'graphql-request/dist/types';
import {getSdk as getPhutureSdk} from './generated/phuturegraphql';
import {getSdk as getlmSdk} from './generated/lmgraphql';

const phutureGraphQlEndpoint =
	'https://graph.dev.phuture.finance/subgraphs/name/phuture/mvp';
const liquidityMiningEndpoint =
	'https://api.thegraph.com/subgraphs/name/hvrlk/lm';

/**
 * ### The client layer for making requests to graph ql.
 *
 * This layer exists to allow easier client layer swapping
 * @param endpoint the subgraph uri
 * @param options additional options
 * @returns @see GraphQLClient
 */
export const getGraphQlClient = (
	endpoint: string,
	options?: PatchedRequestInit,
): GraphQLClient => new GraphQLClient(endpoint, options);

/**
 * ### Expose queries available on the phuture GraphQL network
 * @param endpoint the graphql uri endpoint
 * @param options options to pass into the graphql client @see PatchedRequestInit
 * @returns GraphQLClient @see GraphQLClient
 */
export const phutureGraphQl = (
	endpoint = phutureGraphQlEndpoint,
	options?: PatchedRequestInit,
) => getPhutureSdk(getGraphQlClient(endpoint, options));

/**
 * ### Expose queries available on the phuture liquidity mining GraphQL network
 * @param endpoint the graphql uri endpoint
 * @param options options to pass into the graphql client @see PatchedRequestInit
 * @returns GraphQLClient @see GraphQLClient
 */
export const lmGraphQl = (
	endpoint = liquidityMiningEndpoint,
	options?: PatchedRequestInit,
) => getlmSdk(getGraphQlClient(endpoint, options));
