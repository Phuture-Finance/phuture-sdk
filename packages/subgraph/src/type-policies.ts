/* eslint-disable @typescript-eslint/naming-convention */
import {StrictTypedTypePolicies} from './generated/phuture.graphql';

export const typePolicies: StrictTypedTypePolicies = {
	Index: {
		keyFields: ['id', 'symbol', 'name'],
	},
	User: {
		keyFields: ['id'],
	},
};
