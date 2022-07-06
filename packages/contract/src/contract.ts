import {Contract as EthersContract, Signer} from 'ethers';
import {Address, ContractFactory, isAddress} from '@phuture/types';

/**
 * ### Contract Instance
 */
export class Contract<C extends EthersContract> {
	/** ### Contract instance */
	public contract: C;

	/** ### Signer used for interacting with the contract */
	public _signer: Signer;

	constructor(
		signer: Signer,
		protected readonly contractFactory: ContractFactory,
		contract: C | Address,
	) {
		this._signer = signer;
		this.contract = isAddress(contract)
			? (contractFactory.connect(contract, signer) as C)
			: contract;
	}

	/**
	 * ### Get the address of the contract
	 *
	 * @returns Address of the contract
	 */
	get address(): Address {
		return this.contract.address;
	}

	/**
	 * ### Set the address of the contract
	 *
	 * @param address Address of the contract
	 */
	set address(address: Address) {
		this.contract = this.contractFactory.connect(address, this.signer) as C;
	}

	/**
	 * ### Get the signer used for interacting with the contract
	 *
	 * @returns Signer used for interacting with the contract
	 */
	get signer(): Signer {
		return this._signer;
	}

	/**
	 * ### Set the signer used for interacting with the contract
	 *
	 * @param signer Signer used for interacting with the contract
	 */
	set signer(signer: Signer) {
		this._signer = signer;
		this.contract = this.contractFactory.connect(this.address, signer) as C;
	}
}