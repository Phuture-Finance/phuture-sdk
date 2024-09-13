import type { JsonRpcSigner } from "@ethersproject/providers";
import type { ContractFactory } from "./contract";
import { Erc20 } from "./erc-20";
import { type BaseIndex, BaseIndex__factory } from "./typechain";

export type Anatomy = {
	asset: string;
	weight: number;
}[];

/**
 * ### Index Contract
 */
export class Index extends Erc20<BaseIndex> {
	/**
	 * ### Creates a new Index instance
	 *
	 * @param account Account to use for interacting with the contract
	 * @param contract Contract instance or address of the Index token contract
	 * @param factory Contract factory to use for creating the contract
	 *
	 * @returns New Index token instance
	 */
	constructor(
		account: JsonRpcSigner,
		contract: string | BaseIndex,
		factory: ContractFactory = BaseIndex__factory,
	) {
		super(account, contract, factory);
	}

	async getAnatomy(): Promise<Anatomy> {
		const { _assets, _weights } = await this.contract.anatomy();
		if (_assets.length !== _weights.length)
			throw new Error("Anatomy assets and weights length mismatch");

		return _assets.map((asset, i) => ({ asset, weight: Number(_weights[i]) }));
	}

	async getInactiveAnatomy(): Promise<Anatomy> {
		const _assets = await this.contract.inactiveAnatomy();
		return _assets.map((asset) => ({ asset, weight: 0 }));
	}
}
