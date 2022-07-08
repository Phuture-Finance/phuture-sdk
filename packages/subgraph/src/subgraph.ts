import {
	ApolloClient,
	ApolloQueryResult,
	gql,
	HttpLink,
	InMemoryCache,
	NormalizedCacheObject,
	OperationVariables,
	QueryOptions,
} from '@apollo/client/core';
import {Url} from '@phuture/types';
import fetch from 'cross-fetch';
import {typePolicies} from './type-policies';

export {gql} from '@apollo/client/core';

const defaultPhutureSubgraphUrl =
	'https://api.thegraph.com/subgraphs/name/phuture-finance/phuture-v1';

export class Subgraph<CacheShape = NormalizedCacheObject> {
	public static fromUrl(uri: Url = defaultPhutureSubgraphUrl): Subgraph {
		const client = new ApolloClient({
			link: new HttpLink({uri, fetch}),
			cache: new InMemoryCache({typePolicies}),
		});

		return new Subgraph(client);
	}

	constructor(private readonly client: ApolloClient<CacheShape>) {}

	public async query<T = any, Variables = OperationVariables>(
		options: QueryOptions<Variables, T>,
	): Promise<ApolloQueryResult<T>> {
		return this.client.query(options);
	}
}
