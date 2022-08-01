import {Address, ContractFactory, isAddress, Signature} from '@phuture/types';
import {BigNumber, BigNumberish, utils} from 'ethers';
import {Interface} from '@ethersproject/abi';
import {Account} from '@phuture/account';
import {Erc20} from './erc-20';
import {ERC20Permit as ERC20PermitContractInterface, ERC20Permit__factory,} from '../types';

/** ### Standard permit arguments */
export interface StandardPermitArguments extends Signature {
	amount: BigNumberish;
	deadline: BigNumberish;
}

/** ### Allowed permit arguments */
export interface AllowedPermitArguments extends Signature {
	nonce: BigNumberish;
	expiry: BigNumberish;
}

/** ### Erc20Permit options type */
export type PermitOptions = StandardPermitArguments | AllowedPermitArguments;

/**
 * ### Function to check if permit parameters are type of allowed
 * @param options Permit options
 * @returns True if options are allowed, false otherwise
 */
const isAllowedPermit = (
	options: PermitOptions
): options is AllowedPermitArguments => 'nonce' in options;

/** ### Erc20Permit Contract Interface */
const permitInterface = new Interface([
	{
		inputs: [
			{
				internalType: 'address',
				name: 'token',
				type: 'address',
			},
			{
				internalType: 'uint256',
				name: 'value',
				type: 'uint256',
			},
			{
				internalType: 'uint256',
				name: 'deadline',
				type: 'uint256',
			},
			{
				internalType: 'uint8',
				name: 'v',
				type: 'uint8',
			},
			{
				internalType: 'bytes32',
				name: 'r',
				type: 'bytes32',
			},
			{
				internalType: 'bytes32',
				name: 's',
				type: 'bytes32',
			},
		],
		name: 'selfPermit',
		outputs: [],
		stateMutability: 'payable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'token',
				type: 'address',
			},
			{
				internalType: 'uint256',
				name: 'nonce',
				type: 'uint256',
			},
			{
				internalType: 'uint256',
				name: 'expiry',
				type: 'uint256',
			},
			{
				internalType: 'uint8',
				name: 'v',
				type: 'uint8',
			},
			{
				internalType: 'bytes32',
				name: 'r',
				type: 'bytes32',
			},
			{
				internalType: 'bytes32',
				name: 's',
				type: 'bytes32',
			},
		],
		name: 'selfPermitAllowed',
		outputs: [],
		stateMutability: 'payable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'token',
				type: 'address',
			},
			{
				internalType: 'uint256',
				name: 'nonce',
				type: 'uint256',
			},
			{
				internalType: 'uint256',
				name: 'expiry',
				type: 'uint256',
			},
			{
				internalType: 'uint8',
				name: 'v',
				type: 'uint8',
			},
			{
				internalType: 'bytes32',
				name: 'r',
				type: 'bytes32',
			},
			{
				internalType: 'bytes32',
				name: 's',
				type: 'bytes32',
			},
		],
		name: 'selfPermitAllowedIfNecessary',
		outputs: [],
		stateMutability: 'payable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'token',
				type: 'address',
			},
			{
				internalType: 'uint256',
				name: 'value',
				type: 'uint256',
			},
			{
				internalType: 'uint256',
				name: 'deadline',
				type: 'uint256',
			},
			{
				internalType: 'uint8',
				name: 'v',
				type: 'uint8',
			},
			{
				internalType: 'bytes32',
				name: 'r',
				type: 'bytes32',
			},
			{
				internalType: 'bytes32',
				name: 's',
				type: 'bytes32',
			},
		],
		name: 'selfPermitIfNecessary',
		outputs: [],
		stateMutability: 'payable',
		type: 'function',
	},
]);

/**
 * ### Encodes permit data for given erc20 contract and options
 * @param erc20 Erc20 contract instance of contract address
 */
export const encodePermit =
	(erc20: Erc20 | Address) =>
		(options: PermitOptions): string => {
			const [functionName, amount, deadline] = isAllowedPermit(options)
				? ['selfPermitAllowed', options.nonce, options.expiry]
				: ['selfPermit', options.amount, options.deadline];

			return permitInterface.encodeFunctionData(functionName, [
				isAddress(erc20) ? erc20 : erc20.address,
				BigNumber.from(amount).toHexString(),
				BigNumber.from(deadline).toHexString(),
				options.v,
				options.r,
				options.s,
			]);
		};

/** ### Erc20Permit Token Contract */
export class Erc20Permit<C extends ERC20PermitContractInterface = ERC20PermitContractInterface> extends Erc20<C> {
	/** Encodes permit data for the given options */
	public encodePermit = encodePermit(this);

	/**
	 * ### Creates a new Erc20Permit instance
	 *
	 * @param account Account to use for interacting with the contract
	 * @param contract Contract instance or address of the Erc20Permit token contract
	 * @param factory Contract factory to use for creating the contract
	 *
	 * @returns New Erc20Permit token instance
	 */
	constructor(
		account: Account,
		contract: Address | C,
		factory: ContractFactory = ERC20Permit__factory
	) {
		super(account, contract, factory);
	}

	// public async version(): Promise<number> {
	// 	try {
	// 		return this.contract.version()
	// 	} catch (error) {
	// 		return 1;
	// 	}
	// }
	//
	// public async signPermit(
	// 	chainId: BigNumberish,
	// 	spender: string,
	// 	value: BigNumberish,
	// 	deadline: BigNumberish
	// ): Promise<Signature> {
	// 	const rawSignature = await this.account.signer._signTypedData(
	// 		{
	// 			name: await this.name(), // unique name of EIP-712 domain
	// 			version: await this.version(), // version of domain
	// 			chainId,
	// 			verifyingContract: this.address, // address that receives permit
	// 		},
	// 		{
	// 			Permit: [
	// 				{
	// 					name: "owner",
	// 					type: "address",
	// 				},
	// 				{
	// 					name: "spender",
	// 					type: "address",
	// 				},
	// 				{
	// 					name: "value",
	// 					type: "uint256",
	// 				},
	// 				{
	// 					name: "nonce",
	// 					type: "uint256",
	// 				},
	// 				{
	// 					name: "deadline",
	// 					type: "uint256",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			owner: this.account.address(),
	// 			spender,
	// 			value,
	// 			nonce: await token.nonces(address), // current nonce
	// 			deadline,
	// 		}
	// 	);
	//
	// 	return utils.splitSignature(rawSignature);
	// }
}
