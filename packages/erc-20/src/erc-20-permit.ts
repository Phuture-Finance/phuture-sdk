/* eslint-disable  @typescript-eslint/no-extraneous-class  */
import {Interface} from '@ethersproject/abi';
import Permit from '../abis/ERC20Permit.json';
import {BigintIsh, toHex} from './utils';
import {Token} from './utils/token';

export interface StandardPermitArguments {
	v: 0 | 1 | 27 | 28;
	r: string;
	s: string;
	amount: BigintIsh;
	deadline: BigintIsh;
}

export interface AllowedPermitArguments {
	v: 0 | 1 | 27 | 28;
	r: string;
	s: string;
	nonce: BigintIsh;
	expiry: BigintIsh;
}

export type PermitOptions = StandardPermitArguments | AllowedPermitArguments;

function isAllowedPermit(
	permitOptions: PermitOptions,
): permitOptions is AllowedPermitArguments {
	return 'nonce' in permitOptions;
}

export abstract class Erc20Permit {
	public static interface: Interface = new Interface(Permit);

	public static encodePermit(token: Token, options: PermitOptions) {
		return isAllowedPermit(options)
			? Erc20Permit.interface.encodeFunctionData('selfPermitAllowed', [
					token.address,
					toHex(options.nonce),
					toHex(options.expiry),
					options.v,
					options.r,
					options.s,
			  ])
			: Erc20Permit.interface.encodeFunctionData('selfPermit', [
					token.address,
					toHex(options.amount),
					toHex(options.deadline),
					options.v,
					options.r,
					options.s,
			  ]);
	}
}
