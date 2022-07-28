/* eslint-disable @typescript-eslint/naming-convention */
import { StrictTypedTypePolicies } from '../generated/phuture.graphql';

/** The type policies for the Subgraph Schema */
export const typePolicies: StrictTypedTypePolicies = {
	Index: {
		keyFields: ['id'],
	},
	User: {
		keyFields: ['id'],
	},
};
