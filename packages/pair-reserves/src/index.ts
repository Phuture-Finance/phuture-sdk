import {ethers, Signer} from 'ethers';
import {PairInfo, TokensPair} from '@phuture/types';
import {
	PairReserves as PairReservesContract,
	PairReserves__factory,
} from './types';
import {getGroupOfPairs} from './get-group-of-pairs';

export enum PairReservesContractAddress {
	Mainnet = '0x920FA7ba74423D7b8b1B347259dbbce95C12ee76',
}

export class PairReserves {
	public readonly contract: PairReservesContract;

	constructor(
		contractAddress: string = PairReservesContractAddress.Mainnet,
		signerOrProvider?: Signer | ethers.providers.Provider,
	) {
		signerOrProvider ??= ethers.providers.getDefaultProvider();

		this.contract = PairReserves__factory.connect(
			contractAddress,
			signerOrProvider,
		);
	}

	async getPairReserves(
		assets: TokensPair[],
		factoryAddress: string,
		codeHash: string,
	): Promise<PairInfo[]> {
		const pairAddresses = getGroupOfPairs(assets, factoryAddress, codeHash);
		const reserves = await this.contract.getReserves(pairAddresses);

		return reserves
			.filter(([token]) => token !== ethers.constants.AddressZero)
			.map(([token, reserve0, reserve1], index) => ({
				reserve0,
				reserve1,
				token0: token.toLowerCase(),
				token1:
					token.toLowerCase() === assets[index].token1.toLowerCase()
						? assets[index].token0.toLowerCase()
						: assets[index].token1.toLowerCase(),
			}));
	}
}

export default PairReserves
