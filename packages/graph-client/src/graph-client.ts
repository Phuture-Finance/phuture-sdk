import {
	ApolloClient,
	DefaultOptions,
	HttpLink,
	InMemoryCache,
} from '@apollo/client/core';
import {ApolloClientOptions} from '@apollo/client/core/ApolloClient';
import {concatPagination} from '@apollo/client/utilities';
import {NormalizedCacheObject} from '@apollo/client/cache/inmemory/types';

const apolloClients: Record<string, ApolloClient<any>> = {};

const defaultOptions: DefaultOptions = {
	watchQuery: {
		fetchPolicy: 'no-cache',
		errorPolicy: 'ignore',
	},
	query: {
		fetchPolicy: 'no-cache',
		errorPolicy: 'all',
	},
};

export const newGraphClient = (
	uri: string,
	options?: ApolloClientOptions<NormalizedCacheObject>,
): ApolloClient<NormalizedCacheObject> => {
	return new ApolloClient<NormalizedCacheObject>({
		ssrMode: typeof window === 'undefined',
		link: new HttpLink({
			uri,
		}),
		cache: new InMemoryCache(),
		defaultOptions,
	});
};
