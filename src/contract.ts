import type { Contract as EthersContract, Signer } from "ethers";

export interface ContractFactory {
	connect(address: string, signer: Signer): EthersContract;
}

/** ### Contract Instance */
export class Contract<C extends EthersContract> {
	/** ### Contract instance */
	public contract: C;

	/**
	 * ### Constructs an instance of the contract class
	 *
	 * @param _account Account used for interacting with the contract
	 * @param contract Contract or contract address to interact with
	 * @param contractFactory Factory for creating the contract
	 *
	 * @returns {Contract} The contract instance
	 */
	constructor(
		public signer: Signer,
		contract: C | string,
		protected readonly contractFactory: ContractFactory,
	) {
		this.contract =
			typeof contract === "string"
				? (contractFactory.connect(contract, signer) as C)
				: contract;
	}
}
