/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import type { Provider } from "@ethersproject/providers";
import { Contract, type Signer, utils } from "ethers";
import type {
	PhuturePriceOracle,
	PhuturePriceOracleInterface,
} from "../PhuturePriceOracle";

const _abi = [
	{
		inputs: [
			{
				internalType: "address",
				name: "_asset",
				type: "address",
			},
		],
		name: "refreshedAssetPerBaseInUQ",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		stateMutability: "nonpayable",
		type: "function",
	},
];

export class PhuturePriceOracle__factory {
	static readonly abi = _abi;
	static createInterface(): PhuturePriceOracleInterface {
		return new utils.Interface(_abi) as PhuturePriceOracleInterface;
	}
	static connect(
		address: string,
		signerOrProvider: Signer | Provider,
	): PhuturePriceOracle {
		return new Contract(address, _abi, signerOrProvider) as PhuturePriceOracle;
	}
}
