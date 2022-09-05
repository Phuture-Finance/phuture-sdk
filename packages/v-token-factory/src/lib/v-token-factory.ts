import {Address, ContractFactory} from '@phuture/types';
import {Contract} from '@phuture/contract';
import {Account} from '@phuture/account';
import {VTokenFactory as VTokenFactoryContractInterface, VTokenFactory__factory} from '../types';

export class VTokenFactory<C extends VTokenFactoryContractInterface = VTokenFactoryContractInterface> extends Contract<C> {
	constructor(
		account: Account,
		contract: Address | C,
		factory: ContractFactory = VTokenFactory__factory
	) {
		super(account, contract, factory);
	}
}
