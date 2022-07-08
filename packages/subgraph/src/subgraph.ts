import {
	ApolloClient,
	ApolloQueryResult,
	gql,
	HttpLink,
	InMemoryCache,
	NormalizedCacheObject,
	OperationVariables,
	QueryOptions
} from "@apollo/client/core";
import { Url } from "@phuture/types";
import fetch from "cross-fetch";
import { typePolicies } from "./type-policies";

export { gql } from "@apollo/client/core";

/** ### Defaults Phuture Subgraph address */
const defaultPhutureSubgraphUrl =
	"https://api.thegraph.com/subgraphs/name/phuture-finance/phuture-v1";

/** Subgraph client */
export class Subgraph<CacheShape = NormalizedCacheObject> {
	/**
	 * ### Creates a new Subgraph client from the given url
	 *
	 * @param {Url} uri The url of the Subgraph
	 *
	 * @returns {Subgraph} The new Subgraph client
	 */
	public static fromUrl(uri: Url = defaultPhutureSubgraphUrl): Subgraph {
		const client = new ApolloClient({
			link: new HttpLink({ uri, fetch }),
			cache: new InMemoryCache({ typePolicies })
		});

		return new Subgraph(client);
	}

	/**
	 * ### Creates a new Subgraph client
	 *
	 * @param client The Apollo client
	 *
	 * @returns {Subgraph} The new Subgraph client
	 */
	constructor(private readonly client: ApolloClient<CacheShape>) {
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
