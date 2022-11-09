import {
	ApolloClient,
	ApolloQueryResult,
	HttpLink,
	InMemoryCache,
	NormalizedCacheObject,
	OperationVariables,
	QueryOptions,
} from '@apollo/client/core';
import { Network, Networkish, Url } from '@phuture/types';
import fetch from 'cross-fetch';

export { gql } from '@apollo/client/core';

/** ### Defaults Phuture Subgraph address */
export const defaultPhutureSubgraphUrl: Record<Networkish, Url> = {
	[Network.Mainnet]:
		'https://api.thegraph.com/subgraphs/name/phuture-finance/phuture-v1',
	[Network.CChain]:
		'https://api.thegraph.com/subgraphs/name/phuture-finance/phuture-avax-core',
};

/** Subgraph client */
export class Subgraph<CacheShape = NormalizedCacheObject> {
	/**
	 * ### Creates a new Subgraph client
	 *
	 * @param client The Apollo client
	 *
	 * @returns {Subgraph} The new Subgraph client
	 */
	constructor(private readonly client: ApolloClient<CacheShape>) {}

	/**
	 * ### Creates a new Subgraph client from the given url
	 *
	 * @param {Url} uri The url of the Subgraph
	 *
	 * @returns {Subgraph} The new Subgraph client
	 */
	public static fromUrl(
		uri: Url = defaultPhutureSubgraphUrl[Network.Mainnet]
	): Subgraph {
		const client = new ApolloClient({
			link: new HttpLink({ uri, fetch }),
			cache: new InMemoryCache(),
		});

		return new Subgraph(client);
	}

	/**
	 * ### Queries the Subgraph
	 *
	 * @param {QueryOptions} options The query options
	 *
	 * @returns {Promise<ApolloQueryResult>} The query result
	 */
	public async query<T = any, Variables = OperationVariables>(
		options: QueryOptions<Variables, T>
	): Promise<ApolloQueryResult<T>> {
		return this.client.query(options);
	}
}
