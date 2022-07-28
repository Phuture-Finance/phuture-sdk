import { Contract, Signer } from 'ethers';
import { Address } from './address';
/** ### Contract factory Interface */
export interface ContractFactory {
    connect(address: Address, signer: Signer): Contract;
}
