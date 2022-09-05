import {Address, ContractFactory} from '@phuture/types';
import {Contract} from '@phuture/contract';
import {Account} from '@phuture/account';
import {IndexNAV as IndexNAVContractInterface, IndexNAV__factory} from '../types';

export class IndexNAV<C extends IndexNAVContractInterface = IndexNAVContractInterface> extends Contract<C> {
	constructor(
		account: Account,
		contract: Address | C = '0x167DAEAa53FB3F2B5719b19Ad7397c0ADb6DE348',
		factory: ContractFactory = IndexNAV__factory
	) {
		super(account, contract, factory);
	}
}
