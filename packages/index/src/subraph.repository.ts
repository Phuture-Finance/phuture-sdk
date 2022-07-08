import {gql, Subgraph} from '@phuture/subgraph';
import {constants} from 'ethers';
import {Address} from '@phuture/types';
import {IndexRepo} from './interfaces';

export class SubgraphIndexRepo implements IndexRepo {
	private readonly _subgraph: Subgraph;

	constructor(_subgraph?: Subgraph) {
		this._subgraph = _subgraph ?? Subgraph.fromUrl();
	}

	async holders(indexAddress: Address): Promise<Address[]> {
		interface IndexHoldersData {
			index: {
				users: Array<Record<'user', {id: Address}>>;
			};
		}

		const {data} = await this._subgraph.query<IndexHoldersData>({
			query: gql`
				query IndexHolders($indexAddress: ID!) {
					index(id: $indexAddress) {
						users {
							user {
								id
							}
						}
					}
				}
			`,
			variables: {
				indexAddress,
			},
		});

		// TODO: move dead address to global constants
		return data.index.users
			.map(({user}) => user.id)
			.filter(
				(address) =>
					address !== '0x000000000000000000000000000000000000dead' &&
					address !== constants.AddressZero,
			);
	}
}

export const subgraphIndexRepo = new SubgraphIndexRepo();
