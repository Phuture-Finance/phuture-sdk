/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import type { Provider } from "@ethersproject/providers";
import { Contract, type Signer, utils } from "ethers";
import type { IndexHelper, IndexHelperInterface } from "../IndexHelper";

const _abi = [
	{
		inputs: [
			{
				internalType: "address",
				name: "_index",
				type: "address",
			},
		],
		name: "totalEvaluation",
		outputs: [
			{
				internalType: "uint256",
				name: "_totalEvaluation",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "_indexPriceInBase",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
];

export class IndexHelper__factory {
	static readonly abi = _abi;
	static createInterface(): IndexHelperInterface {
		return new utils.Interface(_abi) as IndexHelperInterface;
	}
	static connect(
		address: string,
		signerOrProvider: Signer | Provider,
	): IndexHelper {
		return new Contract(address, _abi, signerOrProvider) as IndexHelper;
	}
}
