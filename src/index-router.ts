import {
  Account,
  Address,
  Chain,
  Client,
  Transport,
  encodeFunctionData,
} from 'viem';
import {
  estimateContractGas,
  estimateGas,
  simulateContract,
  writeContract,
} from 'viem/actions';
import { indexRouterAbi } from './abis';
import { InsufficientAllowanceError, getAllowance } from './get-allowance';

const BALANCE_OF_SLOT = 8;
const ALLOWANCE_SLOT = 9;

export type Anatomy = {
  asset: string;
  weight: number;
}[];

export async function mintSwap<
  chain extends Chain | undefined,
  account extends Account | undefined,
>(
  client: Client<Transport, chain, account>,
  parameters: {
    options: any;
    sellAmount: bigint;
    sellToken: Address;
    router: Address;
  },
) {
  const { options, sellAmount, sellToken, router } = parameters;

  const allowance = await getAllowance(client, {
    token: sellToken,
    spender: router,
  });

  if (allowance < sellAmount) {
    throw new InsufficientAllowanceError(router, sellAmount, allowance);
  }

  const { request } = await simulateContract(client, {
    address: router,
    abi: indexRouterAbi,
    functionName: 'mintSwap',
    args: [options],
  });

  return writeContract(client, request);

  // return this.contract.mintSwap(
  //   options as IIndexRouterV2.MintSwapParamsStruct,
  //   {
  //     gasLimit: estimatedGas.mul(105).div(100),
  //   },
  // );
}

// async function mintSwapValue<chain extends Chain, account extends Account>(
//   client: Client<Transport, chain, account>,
//   {
//     options,
//     sellAmount,
//   }: {
//     options: IIndexRouterV2.MintSwapParamsStruct;
//     sellAmount: bigint;
//   },
// ): Promise<ContractTransaction> {
//   const data = encodeFunctionData({
//     abi: indexRouterAbi,
//     functionName: 'mintSwapValue',
//     args: [
//       {
//         index: options.index,
//         quotes: options.quotes,
//         recipient: options.recipient,
//       },
//     ],
//   });

//   const mintSwapValueEstimatedGas = await estimateGas(client, {
//     account: client.account.address,
//     to: this.contract.address as Address,
//     data,
//     value: sellAmount,
//   });

//   return this.contract.mintSwapValue(mintSwapValueOptions, {
//     value: sellAmount,
//     gasLimit: (mintSwapValueEstimatedGas * BigInt(105)) / BigInt(100),
//   });
// }

// /**
//  * ### Mint Static
//  *
//  * @param options mint options
//  * @param sellAmount token's  amount
//  * @param sellToken (optional) erc20 token
//  *
//  * @returns mint amount
//  */
// async function mintSwapStatic(
//   options: IIndexRouterV2.MintSwapParamsStruct,
//   sellAmount: string,
//   sellToken?: Erc20,
// ): Promise<bigint> {
//   if (!sellToken) {
//     const mintSwapValueOptions: IIndexRouterV2.MintSwapValueParamsStruct = {
//       index: options.index,
//       quotes: options.quotes,
//       recipient: options.recipient,
//     };

//     return this.contract.callStatic.mintSwapValue(mintSwapValueOptions, {
//       value: sellAmount,
//     });
//   }

//   await sellToken.checkAllowance(this.contract.address, sellAmount);

//   return this.contract.callStatic.mintSwap(
//     options as IIndexRouterV2.MintSwapParamsStruct,
//   );
// }

// /**
//  * ### Mint Index Amount
//  *
//  * @param index index address
//  * @param amountInInputToken token's  amount
//  * @param quotes quotes for swaps
//  * @param inputToken (optional) token's address
//  *
//  * @returns mint amount in single token
//  */
// async function mintIndexAmount(
//   index: string,
//   amountInInputToken: string,
//   quotes: IIndexRouterV2.MintQuoteParamsStruct[],
//   inputToken: string,
// ): Promise<bigint> {
//   const option: IIndexRouterV2.MintSwapParamsStruct = {
//     inputToken,
//     amountInInputToken,
//     quotes,
//     index,
//     recipient: await this.signer.getAddress(),
//   };

//   return this.contract.mintSwapIndexAmount(option);
// }

// /**
//  * ### Burn
//  *
//  * @param index index address or it's erc20 interface
//  * @param amount index amount
//  * @param recipient address of account to receive tokens
//  *
//  * @returns burn transaction
//  */
// async function burn(
//   index: string,
//   amount: string,
//   recipient: string,
// ): Promise<ContractTransaction> {
//   const indexInstance = new Erc20(this.signer, index);
//   const burnParameters: IIndexRouterV2.BurnParamsStruct = {
//     index,
//     amount,
//     recipient,
//   };

//   await indexInstance.checkAllowance(this.contract.address, amount);

//   const estimatedGas = await this.contract.estimateGas.burn(burnParameters);

//   return this.contract.burn(burnParameters, {
//     gasLimit: estimatedGas.mul(105).div(100),
//   });
// }

// /**
//  * ### Burn Swap
//  *
//  * @param index index address or it's erc20 interface
//  * @param amount index amount
//  * @param recipient signer's address
//  * @param options burn swap options
//  *
//  * @returns burn swap transaction
//  */
// async function burnSwap(
//   index: string,
//   amount: string,
//   recipient: string,
//   outputAsset: string,
//   quotes: IIndexRouterV2.BurnQuoteParamsStruct[],
// ): Promise<ContractTransaction> {
//   const indexInstance = new Erc20(this.signer, index);
//   const burnParameters: IIndexRouterV2.BurnSwapParamsStruct = {
//     index,
//     amount,
//     recipient,
//     quotes,
//     outputAsset,
//   };

//   await indexInstance.checkAllowance(this.contract.address, amount);

//   const estimatedGas = await this.contract.estimateGas.burnSwap(burnParameters);

//   return this.contract.burnSwap(burnParameters, {
//     gasLimit: estimatedGas.mul(105).div(100),
//   });
// }

// async function burnSwapValue(
//   index: string,
//   amount: string,
//   recipient: string,
//   outputAsset: string,
//   quotes: IIndexRouterV2.BurnQuoteParamsStruct[],
// ): Promise<ContractTransaction> {
//   const indexInstance = new Erc20(this.signer, index);
//   const burnParameters: IIndexRouterV2.BurnSwapParamsStruct = {
//     index,
//     amount,
//     recipient,
//     quotes,
//     outputAsset,
//   };

//   await indexInstance.checkAllowance(this.contract.address, amount);

//   const estimatedGas =
//     await this.contract.estimateGas.burnSwapValue(burnParameters);

//   return this.contract.burnSwapValue(burnParameters, {
//     gasLimit: estimatedGas.mul(105).div(100),
//   });
// }

// /**
//  * ### Burn Swap Static
//  *
//  * @param index index address or it's erc20 interface
//  * @param amount index amount
//  * @param recipient signer's address
//  * @param options burn swap options
//  *
//  * @returns burn swap amount
//  */
// async function burnSwapStatic(
//   index: string,
//   amount: string,
//   recipient: string,
//   outputAsset: string,
//   quotes: IIndexRouterV2.BurnQuoteParamsStruct[],
// ): Promise<bigint> {
//   const indexInstance = new Erc20(this.signer, index);
//   const burnParameters: IIndexRouterV2.BurnSwapParamsStruct = {
//     index,
//     amount,
//     recipient,
//     quotes,
//     outputAsset,
//   };

//   await indexInstance.checkAllowance(this.contract.address, amount);

//   return this.contract.callStatic.burnSwap(burnParameters);
// }

// /**
//  * ### Burn tokens amount view
//  *
//  * @param index index interface
//  * @param amount index amount
//  *
//  * @returns burn amount in single token or total from array of tokens
//  */
// async function burnTokensAmount(
//   index: string,
//   amount: string,
// ): Promise<{ asset: string; amount: bigint; weight: number }[]> {
//   const indexInstance = BaseIndex__factory.connect(index, this.signer);

//   const [anatomy, inactiveAnatomy, burnTokensAmounts] = await Promise.all([
//     this.getIndexAnatomy(indexInstance),
//     this.getIndexInactiveAnatomy(indexInstance),
//     this.contract.burnTokensAmount(index, amount),
//   ]);

//   return [...anatomy, ...inactiveAnatomy].map(
//     (constituent, constituentIndex) => ({
//       amount: burnTokensAmounts[constituentIndex] || BigInt(0),
//       ...constituent,
//     }),
//   );
// }

// /**
//  * ### Burn amounts static
//  *
//  * @param index index interface
//  * @param amount index amount
//  *
//  * @returns burn amount in single token or total from array of tokens
//  */
// async function burnAmount(
//   index: Address,
//   amount: bigint,
// ): Promise<{ asset: Address; amount: bigint; weight: number }[]> {
//   const indexInstance = BaseIndex__factory.connect(index, this.signer);

//   const recipient = await this.signer.getAddress();
//   const balanceOfOwnerSlot = utils.keccak256(
//     utils.defaultAbiCoder.encode(
//       ['address', 'uint256'],
//       [recipient, BALANCE_OF_SLOT],
//     ),
//   );

//   const allowanceOwnerSlot = utils.keccak256(
//     utils.defaultAbiCoder.encode(
//       ['address', 'uint256'],
//       [recipient, ALLOWANCE_SLOT],
//     ),
//   );
//   const spenderSlot = utils.keccak256(
//     utils.defaultAbiCoder.encode(
//       ['address', 'bytes32'],
//       [this.contract.address, allowanceOwnerSlot],
//     ),
//   );

//   const stateDiff = {
//     [index]: {
//       stateDiff: {
//         [balanceOfOwnerSlot]: utils.hexZeroPad(utils.hexValue(amount), 32),
//         [spenderSlot]: utils.hexZeroPad(utils.hexValue(amount), 32),
//       },
//     },
//   };

//   const [anatomy, inactiveAnatomy, rawBurnTokensAmounts] = await Promise.all([
//     this.getIndexAnatomy(indexInstance),
//     this.getIndexInactiveAnatomy(indexInstance),
//     this.signer.provider.send('eth_call', [
//       {
//         from: recipient,
//         to: this.contract.address,
//         data: this.contract.interface.encodeFunctionData('burnWithAmounts', [
//           {
//             index,
//             recipient,
//             amount,
//           },
//         ]),
//       },
//       'latest',
//       stateDiff,
//     ]),
//   ]);

//   const [burnTokensAmounts] = new utils.AbiCoder().decode(
//     ['uint[]'],
//     rawBurnTokensAmounts,
//   );

//   return [...anatomy, ...inactiveAnatomy].map(
//     (constituent, constituentIndex) => ({
//       amount: burnTokensAmounts[constituentIndex] || BigInt(0),
//       ...constituent,
//     }),
//   );
// }

// async function getIndexAnatomy(indexInstance: BaseIndex): Promise<Anatomy> {
//   const { _assets, _weights } = await indexInstance.anatomy();
//   return _assets.map((asset, i) => ({ asset, weight: Number(_weights[i]) }));
// }

// async function getIndexInactiveAnatomy(
//   indexInstance: BaseIndex,
// ): Promise<Anatomy> {
//   const _assets = await indexInstance.inactiveAnatomy();
//   return _assets.map((asset) => ({ asset, weight: 0 }));
// }
