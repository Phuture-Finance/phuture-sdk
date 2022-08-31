import type { Address, ContractFactory } from '@phuture/types';
import { Account } from '@phuture/account';
import {FRPVault as FRPVaultContractInterface, FRPVault__factory} from '../types';
import {Erc4626} from "@phuture/erc-4626";
import { formatUnits } from 'ethers/lib/utils';
import {DefaultFRPViewsAddress, FRPViews} from "./frp-views";
import {isAddress, Network} from "@phuture/types";

/**
 * ### FRP Contract
 */
export class FRP extends Erc4626<FRPVaultContractInterface> {
	/** ### FRPViews */
	private _frpViews: FRPViews;
	/**
	 * ### Creates a new Frp instance
	 *
	 * @param account Account to use for interacting with the contract
	 * @param contract Contract instance or address of the Frp contract
	 * @param factory Contract factory to use for creating the contract
	 * @param frpViews Contract instance or address of the FRPViews contract
	 *
	 * @returns New Frp instance
	 */
	constructor(
		account: Account,
		contract: Address | FRPVaultContractInterface,
		factory: ContractFactory = FRPVault__factory,
		frpViews: Address | FRPViews = DefaultFRPViewsAddress[Network.Mainnet]
	) {
		super(account, contract, factory);
		this._frpViews = isAddress(frpViews) ? new FRPViews(account, frpViews) : frpViews;
	}

	public async getAPY(): Promise<string> {
		const apy = await this._frpViews.contract.getAPY(this.contract.address)
		return formatUnits(apy, 9);
	}
}
