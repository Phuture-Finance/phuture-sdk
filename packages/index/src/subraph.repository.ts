import {gql, Subgraph} from '@phuture/subgraph';
import {constants} from 'ethers';
import {Address} from '@phuture/types';
import {Fees, IndexRepo} from './interfaces';

/** ### Subgraph Index Repository */
export class SubgraphIndexRepo implements IndexRepo {
	/** ### Subgraph client instance */
	private readonly _subgraph: Subgraph;

	/**
	 * ### Creates a new Subgraph Index Repository instance
	 *
	 * @param {Subgraph} _subgraph Subgraph client instance
	 *
	 * @returns {SubgraphIndexRepo} Subgraph Index Repository instance
	 */
	constructor(_subgraph?: Subgraph) {
		this._subgraph = _subgraph ?? Subgraph.fromUrl();
	}

	/**
	 * ### Get the holders of the index
	 *
	 * @param {Address} indexAddress The address of the index
	 *
	 * @returns {Promise<Address[]>} Addresses of the holders
	 */
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

	/**
	 * ### Get the count of holders of the index
	 *
	 * @param {Address} indexAddress The address of the index
	 *
	 * @returns {Promise<number>} The count of holders
	 */
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

	/**
	 * ### Get fees of the index
	 *
	 * @param {Address} indexAddress The address of the index
	 *
	 * @returns {Promise<Fees>} Fees of the index
	 */
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

/** ### Subgraph Index Repository Singleton */
export const subgraphIndexRepo = new SubgraphIndexRepo();
