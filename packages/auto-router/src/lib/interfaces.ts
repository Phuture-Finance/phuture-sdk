import { Zero0xQuoteOptions } from '@phuture/0x-aggregator';
import { Erc20, Erc20Permit, StandardPermitArguments } from '@phuture/erc-20';

import { Address } from '@phuture/types';
import { BigNumber, BigNumberish } from 'ethers';
import { TransactionResponse } from '@ethersproject/abstract-provider';

/** ### Router Interface */
export interface Router {
	/**
	 * ### Select Buy
	 *
	 * @param erc20PermitToken Contract which implements the ERC20Permit interface
	 * @param amountInInputToken amount in input token
	 * @param inputToken Erc20 or Erc20Permit interface of input token
	 * @param options 0x request options
	 *
	 * @returns isMint true if minting selected
	 * @returns target Address of the target contract
	 * @returns output Amount of output product shares
	 * @returns expectedAllowance Allowance for the input token
	 */
	selectBuy(
		erc20PermitToken: Erc20Permit,
		amountInInputToken: BigNumberish,
		inputToken?: Erc20,
		options?: Partial<Zero0xQuoteOptions>
	): Promise<{
		isMint: boolean;
		target: Address;
		outputAmount: BigNumber;
		expectedAllowance?: BigNumber;
	}>;

	/**
	 * ### Auto Buy
	 *
	 * @param isMint true if minting, false if swapping
	 * @param erc20PermitToken Contract which implements the ERC20Permit interface
	 * @param amountInInputToken Amount in input token
	 * @param inputTokenAddress Address of input token
	 * @param options 0x request options and permit options for transaction
	 *
	 * @returns mint or swap transaction
	 */
	buy(
		isMint: boolean,
		erc20PermitToken: Erc20Permit,
		amountInInputToken: BigNumberish,
		inputTokenAddress?: Address,
		options?: Partial<{
			permitOptions: Omit<StandardPermitArguments, 'amount'>;
			zeroExOptions: Partial<Zero0xQuoteOptions>;
		}>
	): Promise<TransactionResponse>;

	/**
	 * ### Buy mint
	 *
	 * @param erc20PermitToken Contract which implements the ERC20Permit interface
	 * @param amountInInputToken amount in input token
	 * @param inputTokenAddress Address of input token
	 * @param options 0x request options and permit options for transaction
	 *
	 * @returns mint transaction
	 */
	buyMint(
		erc20PermitToken: Erc20Permit,
		amountInInputToken: BigNumberish,
		inputTokenAddress?: Address,
		options?: Partial<{
			permitOptions: Omit<StandardPermitArguments, 'amount'>;
			zeroExOptions: Partial<Zero0xQuoteOptions>;
		}>
	): Promise<TransactionResponse>;

	/**
	 * ### Buy swap
	 *
	 * @param contractAddress Address of the product
	 * @param amountInInputToken amount in input token
	 * @param inputTokenAddress Address of input token
	 * @param zeroExOptions 0x request options and permit options for transaction
	 *
	 * @returns swap transaction
	 */
	buySwap(
		contractAddress: Address,
		amountInInputToken: BigNumberish,
		inputTokenAddress?: Address,
		zeroExOptions?: Partial<Zero0xQuoteOptions>
	): Promise<TransactionResponse>;

	/**
	 * ### Select sell
	 *
	 * @param erc20PermitToken Contract which implements the ERC20Permit interface
	 * @param sharesAmount Amount of product shares
	 * @param outputToken Contract which implements the ERC20 interface
	 * @param options 0x request options
	 *
	 * @returns isBurn true if burn is selected
	 * @returns indexAmount Amount of index
	 * @returns outputToken Amount of output token
	 * @returns expectedAllowance Allowance for the output token
	 */
	selectSell(
		erc20PermitToken: Erc20Permit,
		sharesAmount: BigNumberish,
		outputToken?: Erc20,
		options?: Partial<Zero0xQuoteOptions>
	): Promise<{
		isBurn: boolean;
		outputAmount: BigNumber;
		target: Address;
		expectedAllowance?: BigNumber;
	}>;

	/**
	 * ### Auto Sell
	 *
	 * @param isBurn true if burn, false if swap
	 * @param erc20PermitToken Contract which implements the ERC20Permit interface
	 * @param sharesAmount Amount of product shares
	 * @param outputTokenAddress Address of output token
	 * @param options permit options for transaction
	 * @param options 0x request options
	 *
	 * @returns burn or swap transaction
	 */
	sell(
		isBurn: boolean,
		erc20PermitToken: Erc20Permit,
		sharesAmount: BigNumberish,
		outputTokenAddress?: Address,
		options?: Partial<{
			permitOptions: Omit<StandardPermitArguments, 'amount'>;
			zeroExOptions: Partial<Zero0xQuoteOptions>;
		}>
	): Promise<TransactionResponse>;

	/**
	 * ### Sell Burn
	 *
	 * @param erc20PermitToken Contract which implements the ERC20Permit interface
	 * @param sharesAmount Amount of product shares
	 * @param outputTokenAddress Address of output token
	 * @param options permit options for transaction
	 * @param options 0x request options
	 *
	 * @returns burn transaction
	 */
	sellBurn(
		erc20PermitToken: Erc20Permit,
		sharesAmount: BigNumberish,
		outputTokenAddress?: Address,
		options?: Partial<{
			permitOptions: Omit<StandardPermitArguments, 'amount'>;
			zeroExOptions: Partial<Zero0xQuoteOptions>;
		}>
	): Promise<TransactionResponse>;

	/**
	 * ### Sell Swap
	 *
	 * @param contractAddress Address of the product
	 * @param sharesAmount Amount of product shares
	 * @param outputTokenAddress Address of output token
	 * @param options permit options for transaction
	 *
	 * @returns burn transaction
	 */
	sellSwap(
		contractAddress: Address, //change it here to address of Contract
		sharesAmount: BigNumberish,
		outputTokenAddress?: Address,
		options?: Partial<Zero0xQuoteOptions>
	): Promise<TransactionResponse>;
}
