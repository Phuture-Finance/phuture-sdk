import {
  type Account,
  type Address,
  type Chain,
  type Client,
  type Prettify,
  type ReadContractErrorType,
  type ReadContractParameters,
  type Transport,
  erc20Abi,
} from 'viem';
import type { AccountNotFoundError } from 'viem/_types/errors/account';
import type { ErrorType } from 'viem/_types/errors/utils';
import { readContract } from 'viem/actions';
import { getAction, parseAccount } from 'viem/utils';

/**
 * ### Error thrown on insufficient allowance
 */
export class InsufficientAllowanceError extends Error {
  /**
   * ### Creates an instance of InsufficientAllowanceError
   *
   * @param target Address of the allowance target
   * @param expectedAllowance Expected allowance
   * @param actualAllowance Actual allowance
   *
   * @returns Instance of InsufficientAllowanceError
   */
  constructor(
    public readonly target: Address,
    public readonly expectedAllowance: bigint,
    public readonly actualAllowance: bigint,
  ) {
    const message = `Insufficient allowance: expected ${expectedAllowance.toString()}, but got ${actualAllowance.toString()}`;
    super(message);
    this.name = this.constructor.name;

    this.target = target;
    this.expectedAllowance = expectedAllowance;
    this.actualAllowance = actualAllowance;

    if ('setPrototypeOf' in Object)
      Object.setPrototypeOf(this, new.target.prototype);
  }
}

export type GetAllowanceParameters = Prettify<
  Pick<ReadContractParameters, 'account' | 'blockNumber' | 'blockTag'> & {
    token: Address;
    spender: Address;
  }
>;

export type GetAllowanceReturnType = bigint;

export type GetAllowanceErrorType =
  | AccountNotFoundError
  | ReadContractErrorType
  | ErrorType;

export async function getAllowance<
  chain extends Chain | undefined,
  account extends Account | undefined,
>(
  client: Client<Transport, chain, account>,
  parameters: GetAllowanceParameters,
): Promise<GetAllowanceReturnType> {
  const {
    token,
    spender,
    blockNumber,
    blockTag,
    account: account_,
  } = parameters;

  const account = account_ ? parseAccount(account_) : client.account;

  const readContractParameters = {
    abi: erc20Abi,
    address: token,
    functionName: 'allowance',
    args: [account!.address, spender],
    blockNumber,
    blockTag,
  } as const;

  const readContractAction = getAction(client, readContract, 'readContract');

  return await readContractAction(readContractParameters);
}
