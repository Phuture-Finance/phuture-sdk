import {Interface} from '@ethersproject/abi';
import {BigNumber, BigNumberish} from 'ethers';
import {Signature} from '@phuture/types';
import Permit from '../abis/ERC20Permit.json';
import {Erc20} from './erc-20';

const permitInterface = new Interface(Permit);

export interface StandardPermitArguments extends Signature {
	amount: BigNumberish;
	deadline: BigNumberish;
}

export interface AllowedPermitArguments extends Signature {
	nonce: BigNumberish;
	expiry: BigNumberish;
}

export type PermitOptions = StandardPermitArguments | AllowedPermitArguments;

const isAllowedPermit = (
	options: PermitOptions,
): options is AllowedPermitArguments => 'nonce' in options;

export const encodePermit =
	(erc20: Erc20) =>
	(options: PermitOptions): string => {
		const [functionName, amount, deadline] = isAllowedPermit(options)
			? ['selfPermitAllowed', options.nonce, options.expiry]
			: ['selfPermit', options.amount, options.deadline];

		return permitInterface.encodeFunctionData(functionName, [
			erc20.contract.address,
			BigNumber.from(amount).toHexString(),
			BigNumber.from(deadline).toHexString(),
			options.v,
			options.r,
			options.s,
		]);
	};

export class Erc20Permit extends Erc20 {
	public encodePermit = encodePermit(this);
}
