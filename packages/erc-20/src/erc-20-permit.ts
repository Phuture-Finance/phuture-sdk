import {Interface} from '@ethersproject/abi';
import {Address, ContractFactory, Signature} from '@phuture/types';
import {BigNumber, BigNumberish, Signer} from 'ethers';
import Permit from '../abis/ERC20Permit.json';
import {Erc20} from './erc-20';
import {
	ERC20Permit as ERC20PermitContractInterface,
	ERC20Permit__factory,
} from './types';

/** ### Erc20Permit Contract Interface */
const permitInterface = new Interface(Permit);

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
	options: PermitOptions,
): options is AllowedPermitArguments => 'nonce' in options;

/**
 * ### Encodes permit data for given erc20 contract and options
 * @param erc20 Erc20 contract instance of contract address
 */
export const encodePermit =
	(erc20: Erc20<any> | Address) =>
	(options: PermitOptions): string => {
		const [functionName, amount, deadline] = isAllowedPermit(options)
			? ['selfPermitAllowed', options.nonce, options.expiry]
			: ['selfPermit', options.amount, options.deadline];

		return permitInterface.encodeFunctionData(functionName, [
			erc20 instanceof Erc20 ? erc20.contract.address : erc20,
			BigNumber.from(amount).toHexString(),
			BigNumber.from(deadline).toHexString(),
			options.v,
			options.r,
			options.s,
		]);
	};

/**
 * ### Erc20Permit Token Contract
 */
export class Erc20Permit<
	C extends ERC20PermitContractInterface = ERC20PermitContractInterface,
> extends Erc20<C> {
	/** Encodes permit data for the given options */
	public encodePermit = encodePermit(this);

	/**
	 * ### Creates a new Erc20Permit instance
	 *
	 * @param signer Signer or provider to use for interacting with the contract
	 * @param contract Contract instance or address of the Erc20Permit token contract
	 * @param factory Contract factory to use for creating the contract
	 *
	 * @returns New Erc20Permit token instance
	 */
	constructor(
		signer: Signer,
		contract: Address | C,
		factory: ContractFactory = ERC20Permit__factory,
	) {
		super(signer, contract, factory);
	}
}
