import {Address, ContractFactory} from '@phuture/types';
import {Contract} from '@phuture/contract';
import {Account} from '@phuture/account';
import {IndexNAV as IndexNAVContractInterface, IndexNAV__factory} from '../types';

export class IndexNav<C extends IndexNAVContractInterface = IndexNAVContractInterface> extends Contract<C> {
	constructor(
		account: Account,
		contract: Address | C = '0xfd41449A8CE634b6Aa5C006d0204f88Ea83EF263',
		factory: ContractFactory = IndexNAV__factory
	) {
		super(account, contract, factory);
	}
}
