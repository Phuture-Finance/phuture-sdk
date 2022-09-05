import {Address, ContractFactory} from '@phuture/types';
import {Contract} from '@phuture/contract';
import {Account} from '@phuture/account';
import {VToken as VTokenContractInterface, VToken__factory} from '../types';

export class VToken<C extends VTokenContractInterface = VTokenContractInterface> extends Contract<C> {
	constructor(
		account: Account,
		contract: Address | C,
		factory: ContractFactory = VToken__factory
	) {
		super(account, contract, factory);
	}
}
