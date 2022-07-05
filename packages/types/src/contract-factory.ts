import {Contract, Signer} from 'ethers';
import {Address} from './address';

export interface ContractFactory {
	connect(address: Address, signer: Signer): Contract;
}
