import {BigNumber, constants, ethers, Signer, utils} from 'ethers';
import {formatUnits} from 'ethers/lib/utils';
import {ERC20 as ERC20ContractInterface, ERC20__factory} from './types';

export enum DefaultUsdcAddress {
	/** ### Default USDC Address  on mainnet. */
	Mainnet = '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
}

export class Erc20 {
	/**
	 * ### Get new ERC20 token instance from the contract instance
	 *
	 * @param _contract ERC20 contract instance
	 *
	 * @returns New ERC20 token instance
	 */
	static fromContract(_contract: ERC20ContractInterface): Erc20 {
		const erc20 = new this(
			_contract.provider,
			_contract.address ?? constants.AddressZero,
		);

		erc20.contract = _contract;

		return erc20;
	}

	/** ### ERC20 contract instance */
	public contract: ERC20ContractInterface;
	/** ### Decimals of the token */
	private _decimals?: number;

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
