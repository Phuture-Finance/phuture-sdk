import { Subgraph, Types } from '@phuture/subgraph';
import { AccountRepo } from './interfaces';
import {Address} from "@phuture/types";
import { gql } from "@apollo/client";

/** ### Subgraph Account Repository */
export class SubgraphAccountRepo implements AccountRepo {
	/** ### Subgraph client instance */
	private readonly _subgraph: Subgraph;

	/**
	 * ### Creates a new Subgraph Index Repository instance
	 *
	 * @param {Subgraph} _subgraph Subgraph client instance
	 *
	 * @returns {SubgraphAccountRepo} Subgraph Index Repository instance
	 */
	constructor(_subgraph: Subgraph) {
		this._subgraph = _subgraph;
	}

	/**
	 * ### Get indexes held by an account
	 *
	 * @param {Address} accountAddress The address of the account
	 *
	 * @returns {Promise<Address[]>} Addresses of the holders
	 */
	async indexes(accountAddress: Address): Promise<Types.UserIndex[]> {
		interface AccountIndexesData {
			indexes: Types.UserIndex[];
		}

		// TODO: fix pagination for large array of indexes
		const {data} = await this._subgraph.query<AccountIndexesData>({
			query: gql`
				query AccountIndexes($accountAddress: ID!) {
					user(id: $accountAddress) {
						indexes {
							balance
							index {
								id
								name
								symbol
								decimals
								totalSupply
								basePrice
							}
						}
					}
				}
			`,
			variables: {
				accountAddress,
			},
		});

		return data.indexes
	}
}
