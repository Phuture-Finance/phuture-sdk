import { ApolloClient, ApolloQueryResult, NormalizedCacheObject, OperationVariables, QueryOptions } from '@apollo/client/core';
import { Url } from '@phuture/types';
export { gql } from '@apollo/client/core';
/** Subgraph client */
export declare class Subgraph<CacheShape = NormalizedCacheObject> {
    private readonly client;
    /**
     * ### Creates a new Subgraph client from the given url
     *
     * @param {Url} uri The url of the Subgraph
     *
     * @returns {Subgraph} The new Subgraph client
     */
    static fromUrl(uri?: Url): Subgraph;
    /**
     * ### Creates a new Subgraph client
     *
     * @param client The Apollo client
     *
     * @returns {Subgraph} The new Subgraph client
     */
    constructor(client: ApolloClient<CacheShape>);
    /**
     * ### Queries the Subgraph
     *
     * @param {QueryOptions} options The query options
     *
     * @returns {Promise<ApolloQueryResult>} The query result
     */
    query<T = any, Variables = OperationVariables>(options: QueryOptions<Variables, T>): Promise<ApolloQueryResult<T>>;
}
