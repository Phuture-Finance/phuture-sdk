import {BigNumber, ethers, Signer, utils} from 'ethers';
import {ERC20 as ERC20ContractInterface, ERC20__factory} from './types';

export enum DefaultUsdcAddress {
	/** ### Default USDC Address  on mainnet. */
	Mainnet = '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
}

export interface Erc20Interface {
	contract: ERC20ContractInterface;
	address: string;
	symbol: string;
	name: string;
	decimals: number;
	totalSupply: BigNumber;
}

export class Erc20Contract {
	/** ### ERC20 contract instance */
	public readonly contract: ERC20ContractInterface;

	/**
	 * ### Creates a new ERC20 instance
	 *
	 * @param contractAddress Address of the ERC20 token contract
	 * @param signerOrProvider Signer or provider to use for interacting with the contract
	 * @returns New ERC20 token instance
	 */
	constructor(
		signerOrProvider: Signer | ethers.providers.Provider,
		contractAddress: string = DefaultUsdcAddress.Mainnet,
	) {
		signerOrProvider ??= ethers.providers.getDefaultProvider();

		if (!utils.isAddress(contractAddress))
			throw new TypeError(`Invalid contract address: ${contractAddress}`);

		this.contract = ERC20__factory.connect(contractAddress, signerOrProvider);
	}

	async getMetaData(): Promise<Erc20Interface> {
		const erc20: Erc20Interface = {
			contract: this.contract,
			address: this.contract.address,
			name: '',
			symbol: '',
			decimals: 18,
			totalSupply: BigNumber.from(0),
		};

		try {
			const [name, symbol, decimals, totalSupply] = await Promise.allSettled([
				this.contract.name(),
				this.contract.symbol(),
				this.contract.decimals(),
				this.contract.totalSupply(),
			]);
			Object.assign(erc20, {name, symbol, decimals, totalSupply});
		} catch (error: unknown) {
			console.error('useERC20 DETAILS:', error);
		}

		return erc20;
	}
}
// Add allowance function
// add balances function
