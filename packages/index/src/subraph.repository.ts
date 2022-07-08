import {gql, Subgraph} from '@phuture/subgraph';
import {constants} from 'ethers';
import {Address} from '@phuture/types';
import {Fees, IndexRepo} from './interfaces';

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

		// TODO: fix pagination for large array of holders
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

	public async holdersCount(indexAddress: Address): Promise<number> {
		interface IndexUniqueHoldersData {
			index: {
				uniqueHolders: number;
			};
		}

		const {data} = await this._subgraph.query<IndexUniqueHoldersData>({
			query: gql`
				query IndexHolders($indexAddress: ID!) {
					index(id: $indexAddress) {
						uniqueHolders
					}
				}
			`,
			variables: {
				indexAddress,
			},
		});

		return data.index.uniqueHolders;
	}

	public async fees(indexAddress: Address): Promise<Fees> {
		interface IndexUniqueHoldersData {
			index: {
				feeBurn: number;
				feeMint: number;
				feeAUMPercent: number;
			};
		}

		const {data} = await this._subgraph.query<IndexUniqueHoldersData>({
			query: gql`
				query IndexHolders($indexAddress: ID!) {
					index(id: $indexAddress) {
						feeBurn
						feeMint
						feeAUMPercent
					}
				}
			`,
			variables: {
				indexAddress,
			},
		});

		return {
			minting: data.index.feeMint,
			management: data.index.feeBurn,
			redemption: data.index.feeAUMPercent,
		};
	}
}

export const subgraphIndexRepo = new SubgraphIndexRepo();
