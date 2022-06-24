import {
	Erc20,
	Erc20Permit,
	StandardPermitArguments,
	SetOfAssets,
} from '@phuture/erc-20';
import {Address, MaybeArray} from '@phuture/types';
import {
	BigNumber,
	BigNumberish,
	ContractTransaction,
	ethers,
	Signer,
	utils,
} from 'ethers';
import {MintOptions} from './mint-options';
import {BurnOptions} from './redeem-options';
import {
	IndexRouter as IndexRouterContractInterface,
	IndexRouter__factory,
} from './types';
import {IIndexRouter} from './types/IndexRouter';
// Import { SetOfAssets } from "../../erc-20/src/erc-20";

/** ### Default IndexRouter address for network */
export enum DefaultIndexRouterAddress {
	/** ### Default IndexRouter address on mainnet. */
	Mainnet = '0x7b6c3e5486d9e6959441ab554a889099eed76290',
}

/**
 * ### IndexRouter Contract
 */
export class IndexRouter {
	/** ### IndexRouter contract instance */
	public contract: IndexRouterContractInterface;
	sellToken?: MaybeArray<Erc20 | Erc20Permit>;
	withPermit = false;

	constructor(contract: IndexRouterContractInterface);

	constructor(
		contractAddress: string,
		signerOrProvider?: Signer | ethers.providers.Provider,
	);

	/**
	 * ### Creates a new IndexRouter instance
	 *
	 * @param contract Contract instance or address of the IndexRouter contract
	 * @param signerOrProvider Signer or provider to use for interacting with the contract
	 *
	 * @returns New IndexRouter token instance
	 */
	constructor(
		contract:
			| IndexRouterContractInterface
			| Address = DefaultIndexRouterAddress.Mainnet,
		signerOrProvider?: Signer | ethers.providers.Provider,
	) {
		if (typeof contract === 'string') {
			if (!utils.isAddress(contract))
				throw new TypeError(`Invalid contract address: ${contract}`);

			signerOrProvider ??= ethers.providers.getDefaultProvider();

			this.contract = IndexRouter__factory.connect(contract, signerOrProvider);
		} else {
			this.contract = contract;
		}
	}

	// Mint swap for native token
	mint(
		options: IIndexRouter.MintSwapValueParamsStruct,
		sellAmount: BigNumberish,
	): Promise<ContractTransaction>;
	// Mint swap for single sell token
	mint(
		options: IIndexRouter.MintSwapParamsStruct,
		sellAmount: BigNumberish,
		sellToken: Erc20,
	): Promise<ContractTransaction>;
	// Mint swap for sell token with permit
	mint(
		options: IIndexRouter.MintSwapParamsStruct,
		sellAmount: BigNumberish,
		sellToken: Erc20Permit,
		permitOptions: Omit<StandardPermitArguments, 'amount'>,
	): Promise<ContractTransaction>;

	async mint(
		options: MintOptions,
		sellAmount: BigNumberish,
		sellToken?: Erc20 | Erc20Permit,
		permitOptions?: Omit<StandardPermitArguments, 'amount'>,
	): Promise<ContractTransaction> {
		if (sellToken === undefined) {
			return this.contract.mintSwapValue(
				options as IIndexRouter.MintSwapValueParamsStruct,
				{value: sellAmount},
			);
		}

		if (sellToken instanceof Erc20Permit && permitOptions !== undefined) {
			return this.contract.mintSwapWithPermit(
				options as IIndexRouter.MintSwapParamsStruct,
				permitOptions.deadline,
				permitOptions.v,
				permitOptions.r,
				permitOptions.s,
			);
		}

		const allowance = await sellToken.contract.allowance(
			await this.contract.signer.getAddress(),
			this.contract.address,
		);
		if (allowance.lt(sellAmount)) throw new Error('Insufficient allowance');

		return this.contract.mintSwap(options as IIndexRouter.MintSwapParamsStruct);
	}

	// Mint swap for native token
	mintIndexAmount(
		options: IIndexRouter.MintSwapValueParamsStruct,
		sellAmount: BigNumberish,
	): Promise<BigNumber>;
	// Mint swap for single sell token
	mintIndexAmount(
		options: IIndexRouter.MintSwapParamsStruct,
		sellAmount: BigNumberish,
		sellToken: Erc20 | Erc20Permit,
	): Promise<BigNumber>;

	async mintIndexAmount(
		options: MintOptions,
		sellAmount: BigNumberish,
		sellToken?: Erc20 | Erc20Permit,
	): Promise<BigNumber> {
		if (sellToken === undefined) {
			// TODO: mintIndexAmount for native token
		}

		// TODO: mintIndexAmount for single sell token token

		throw new Error('Not implemented');
	}

	// Burn swap for multi tokens
	burn(
		options: IIndexRouter.BurnParamsStruct,
		sellAmount: BigNumberish,
	): Promise<ContractTransaction>;

	// Burn swap for single(or native) sell token
	burn(
		options: IIndexRouter.BurnSwapParamsStruct,
		sellAmount: BigNumberish,
		buyToken: Erc20,
	): Promise<ContractTransaction>;

	// Burn swap for sell token(or multi tokens) with permit
	burn(
		options: IIndexRouter.BurnSwapParamsStruct | IIndexRouter.BurnParamsStruct,
		sellAmount: BigNumberish,
		buyToken: Erc20Permit,
		permitOptions: Omit<StandardPermitArguments, 'amount'>,
	): Promise<ContractTransaction>;

	async burn(
		options: BurnOptions,
		sellAmount: BigNumberish,
		buyToken?: Erc20 | Erc20Permit,
		permitOptions?: Omit<StandardPermitArguments, 'amount'>,
	): Promise<ContractTransaction> {
		if (buyToken instanceof Erc20Permit && permitOptions !== undefined) {
			if (buyToken === undefined) {
				return this.contract.burnWithPermit(
					options as IIndexRouter.BurnParamsStruct,
					permitOptions.deadline,
					permitOptions.v,
					permitOptions.r,
					permitOptions.s,
				);
			}

			if (buyToken.contract.address === SetOfAssets.Mainnet.WETH) {
				return this.contract.burnSwapValueWithPermit(
					options as IIndexRouter.BurnSwapParamsStruct,
					permitOptions.deadline,
					permitOptions.v,
					permitOptions.r,
					permitOptions.s,
				);
			}

			return this.contract.burnSwapWithPermit(
				options as IIndexRouter.BurnSwapParamsStruct,
				permitOptions.deadline,
				permitOptions.v,
				permitOptions.r,
				permitOptions.s,
			);
		}

		const allowance = await new Erc20(options.index).contract.allowance(
			await this.contract.signer.getAddress(),
			this.contract.address,
		);
		if (allowance.gte(sellAmount)) {
			if (buyToken === undefined) {
				return this.contract.burn(options as IIndexRouter.BurnParamsStruct);
			}

			if (buyToken.contract.address === SetOfAssets.Mainnet.WETH) {
				return this.contract.burnSwapValue(
					options as IIndexRouter.BurnSwapParamsStruct,
				);
			}

			return this.contract.burnSwap(
				options as IIndexRouter.BurnSwapParamsStruct,
			);
		}

		throw new Error('Insufficient allowance');
	}

	async burnTokensAmount(): Promise<Record<Address, BigNumber>> {
		// TODO: call contract.burnTokensAmount and index.anatomy method
		// merge the results of the two into a single object with the address as the key and the amount as the value
		throw new Error('Not implemented');
	}

	async burnSwapTokenAmount() {
		// TODO: reduce through the result of burnTokensAmount applying base price to each asset
		throw new Error('Not implemented');
	}
}
