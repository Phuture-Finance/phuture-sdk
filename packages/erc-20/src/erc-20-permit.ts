import {BigNumber, ethers, Signer, utils} from 'ethers';
import {
	defaultAbiCoder,
	formatUnits,
	keccak256,
	solidityPack,
	toUtf8Bytes,
} from 'ethers/lib/utils';
import {Erc20} from './erc-20';
import {ERC20 as ERC20ContractInterface, ERC20__factory} from './types';

const permitTypehash = keccak256(
	toUtf8Bytes(
		'Permit(address owner,address spender,uint256 value,uint256 nonce,uint256 deadline)',
	),
);

export class Erc20Permit extends Erc20 {
	async getApprovalDigest(
		spender: string,
		value: BigNumber,
		nonce: BigNumber,
		deadline: BigNumber,
	): Promise<string> {
		const {chainId} = await this.contract.provider.getNetwork();
		const tokenName = await this.contract.name();
		const domainSeparator = keccak256(
			defaultAbiCoder.encode(
				['bytes32', 'bytes32', 'bytes32', 'uint256', 'address'],
				[
					keccak256(
						toUtf8Bytes(
							'EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)',
						),
					),
					keccak256(toUtf8Bytes(tokenName)),
					keccak256(toUtf8Bytes('1')),
					chainId,
					this.contract.address.toLowerCase(),
				],
			),
		);

		const owner = await this.contract.signer.getAddress();

		return keccak256(
			solidityPack(
				['bytes1', 'bytes1', 'bytes32', 'bytes32'],
				[
					'0x19',
					'0x01',
					domainSeparator,
					keccak256(
						defaultAbiCoder.encode(
							[
								'bytes32',
								'address',
								'address',
								'uint256',
								'uint256',
								'uint256',
							],
							[permitTypehash, owner, spender, value, nonce, deadline],
						),
					),
				],
			),
		);
	}
}
