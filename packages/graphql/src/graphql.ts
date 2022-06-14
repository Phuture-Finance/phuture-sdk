import { GraphQLClient } from 'graphql-request'
import { PatchedRequestInit } from 'graphql-request/dist/types'

/**
 * ### The client layer for making requests to graph ql
 * @param endpoint the subgraph uri
 * @param options additional options
 * @returns @see GraphQLClient
 */
const graphQLClient = (endpoint: string, options?: PatchedRequestInit): GraphQLClient => new GraphQLClient(endpoint, options);

export default graphQLClient;
