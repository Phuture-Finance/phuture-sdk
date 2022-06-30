import {Address} from '@phuture/types';
import {Signer, utils} from 'ethers';
import {formatUnits} from 'ethers/lib/utils';
import {ERC20 as ERC20ContractInterface, ERC20__factory} from './types';

export enum NetworkType {
	Mainnet = 'mainnet',
}

interface AssetsInterface {
	usdc: Address;
	weth: Address;
}

/** ### Default addresses for network ### */
export const setOfAssets: {
	[key in NetworkType]: AssetsInterface;
} = {
	/** ### Default addresses on mainnet. */
	mainnet: {
		usdc: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
		weth: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
	},
};

/**
 * ### ERC20 Token Contract
 */
export class Erc20<C extends ERC20ContractInterface = ERC20ContractInterface> {
	/** ### ERC20 contract instance */
	public contract: C;
	public _signer: Signer;
	/** ### Decimals of the token */
	private _decimals?: number;

	/**
	 * ### Creates a new ERC20 instance
	 *
	 * @param signer Signer or provider to use for interacting with the contract
	 * @param contract Contract instance or address of the ERC20 token contract
	 * @returns New ERC20 token instance
	 */
	constructor(signer: Signer, contract: Address | C) {
		this._signer = signer;

		if (typeof contract === 'string') {
			if (!utils.isAddress(contract))
				throw new TypeError(`Invalid contract address: ${contract}`);

			this.contract = ERC20__factory.connect(contract, signer) as C;
		} else {
			this.contract = contract;
		}
	}

	get address(): Address {
		return this.contract.address;
	}

	/**
	 * ### Get the address of the token
	 *
	 * @returns Address of the token
	 */
	get address(): Address {
		return this.contract.address;
	}

	/**
	 * ### Get the decimals of the token
	 *
	 * @returns Decimals of the token
	 */
	async decimals(): Promise<number> {
		if (this._decimals) return this._decimals;

		this._decimals = await this.contract.decimals();

		return this._decimals;
	}

	/**
	 * ### Get the formatted total supply of the token
	 *
	 * @returns Formatted total supply of the token
	 */
	async formattedTotalSupply(): Promise<string> {
		const totalSupply = await this.contract.totalSupply();
		const decimals = await this.decimals();

		return formatUnits(totalSupply, decimals);
	}

	/**
	 * ### Get the formatted balance of the account
	 *
	 * @param account Address of the account
	 *
	 * @returns Formatted balance of the account
	 */
	async formattedBalanceOf(account: string): Promise<string> {
		const balance = await this.contract.balanceOf(account);
		const decimals = await this.decimals();

		return formatUnits(balance, decimals);
	}
}
