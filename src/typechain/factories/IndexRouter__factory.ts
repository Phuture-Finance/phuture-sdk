/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { IndexRouter, IndexRouterInterface } from "../IndexRouter";

const _abi = [
  {
    inputs: [],
    name: "WETH",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "index",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "recipient",
            type: "address",
          },
        ],
        internalType: "struct IIndexRouter.BurnParams",
        name: "_params",
        type: "tuple",
      },
    ],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "index",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "outputAsset",
            type: "address",
          },
          {
            internalType: "address",
            name: "recipient",
            type: "address",
          },
          {
            components: [
              {
                internalType: "address",
                name: "swapTarget",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "buyAssetMinAmount",
                type: "uint256",
              },
              {
                internalType: "bytes",
                name: "assetQuote",
                type: "bytes",
              },
            ],
            internalType: "struct IIndexRouter.BurnQuoteParams[]",
            name: "quotes",
            type: "tuple[]",
          },
        ],
        internalType: "struct IIndexRouter.BurnSwapParams",
        name: "_params",
        type: "tuple",
      },
    ],
    name: "burnSwap",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "index",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "outputAsset",
            type: "address",
          },
          {
            internalType: "address",
            name: "recipient",
            type: "address",
          },
          {
            components: [
              {
                internalType: "address",
                name: "swapTarget",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "buyAssetMinAmount",
                type: "uint256",
              },
              {
                internalType: "bytes",
                name: "assetQuote",
                type: "bytes",
              },
            ],
            internalType: "struct IIndexRouter.BurnQuoteParams[]",
            name: "quotes",
            type: "tuple[]",
          },
        ],
        internalType: "struct IIndexRouter.BurnSwapParams",
        name: "_params",
        type: "tuple",
      },
    ],
    name: "burnSwapValue",
    outputs: [
      {
        internalType: "uint256",
        name: "wethBalance",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "index",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "outputAsset",
            type: "address",
          },
          {
            internalType: "address",
            name: "recipient",
            type: "address",
          },
          {
            components: [
              {
                internalType: "address",
                name: "swapTarget",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "buyAssetMinAmount",
                type: "uint256",
              },
              {
                internalType: "bytes",
                name: "assetQuote",
                type: "bytes",
              },
            ],
            internalType: "struct IIndexRouter.BurnQuoteParams[]",
            name: "quotes",
            type: "tuple[]",
          },
        ],
        internalType: "struct IIndexRouter.BurnSwapParams",
        name: "_params",
        type: "tuple",
      },
      {
        internalType: "uint256",
        name: "_deadline",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "_v",
        type: "uint8",
      },
      {
        internalType: "bytes32",
        name: "_r",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "_s",
        type: "bytes32",
      },
    ],
    name: "burnSwapValueWithPermit",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "index",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "outputAsset",
            type: "address",
          },
          {
            internalType: "address",
            name: "recipient",
            type: "address",
          },
          {
            components: [
              {
                internalType: "address",
                name: "swapTarget",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "buyAssetMinAmount",
                type: "uint256",
              },
              {
                internalType: "bytes",
                name: "assetQuote",
                type: "bytes",
              },
            ],
            internalType: "struct IIndexRouter.BurnQuoteParams[]",
            name: "quotes",
            type: "tuple[]",
          },
        ],
        internalType: "struct IIndexRouter.BurnSwapParams",
        name: "_params",
        type: "tuple",
      },
      {
        internalType: "uint256",
        name: "_deadline",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "_v",
        type: "uint8",
      },
      {
        internalType: "bytes32",
        name: "_r",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "_s",
        type: "bytes32",
      },
    ],
    name: "burnSwapWithPermit",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_index",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "burnTokensAmount",
    outputs: [
      {
        internalType: "uint256[]",
        name: "_amounts",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "index",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "recipient",
            type: "address",
          },
        ],
        internalType: "struct IIndexRouter.BurnParams",
        name: "_params",
        type: "tuple",
      },
    ],
    name: "burnWithAmounts",
    outputs: [
      {
        internalType: "uint256[]",
        name: "_amounts",
        type: "uint256[]",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "index",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "recipient",
            type: "address",
          },
        ],
        internalType: "struct IIndexRouter.BurnParams",
        name: "_params",
        type: "tuple",
      },
      {
        internalType: "uint256",
        name: "_deadline",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "_v",
        type: "uint8",
      },
      {
        internalType: "bytes32",
        name: "_r",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "_s",
        type: "bytes32",
      },
    ],
    name: "burnWithPermit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_WETH",
        type: "address",
      },
      {
        internalType: "address",
        name: "_registry",
        type: "address",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "index",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amountInBase",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "recipient",
            type: "address",
          },
        ],
        internalType: "struct IIndexRouter.MintParams",
        name: "_params",
        type: "tuple",
      },
    ],
    name: "mint",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "index",
            type: "address",
          },
          {
            internalType: "address",
            name: "inputToken",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amountInInputToken",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "recipient",
            type: "address",
          },
          {
            components: [
              {
                internalType: "address",
                name: "asset",
                type: "address",
              },
              {
                internalType: "address",
                name: "swapTarget",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "buyAssetMinAmount",
                type: "uint256",
              },
              {
                internalType: "bytes",
                name: "assetQuote",
                type: "bytes",
              },
            ],
            internalType: "struct IIndexRouter.MintQuoteParams[]",
            name: "quotes",
            type: "tuple[]",
          },
        ],
        internalType: "struct IIndexRouter.MintSwapParams",
        name: "_params",
        type: "tuple",
      },
    ],
    name: "mintSwap",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "index",
            type: "address",
          },
          {
            internalType: "address",
            name: "inputToken",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amountInInputToken",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "recipient",
            type: "address",
          },
          {
            components: [
              {
                internalType: "address",
                name: "asset",
                type: "address",
              },
              {
                internalType: "address",
                name: "swapTarget",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "buyAssetMinAmount",
                type: "uint256",
              },
              {
                internalType: "bytes",
                name: "assetQuote",
                type: "bytes",
              },
            ],
            internalType: "struct IIndexRouter.MintQuoteParams[]",
            name: "quotes",
            type: "tuple[]",
          },
        ],
        internalType: "struct IIndexRouter.MintSwapParams",
        name: "_params",
        type: "tuple",
      },
    ],
    name: "mintSwapIndexAmount",
    outputs: [
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "index",
            type: "address",
          },
          {
            internalType: "address",
            name: "recipient",
            type: "address",
          },
          {
            components: [
              {
                internalType: "address",
                name: "asset",
                type: "address",
              },
              {
                internalType: "address",
                name: "swapTarget",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "buyAssetMinAmount",
                type: "uint256",
              },
              {
                internalType: "bytes",
                name: "assetQuote",
                type: "bytes",
              },
            ],
            internalType: "struct IIndexRouter.MintQuoteParams[]",
            name: "quotes",
            type: "tuple[]",
          },
        ],
        internalType: "struct IIndexRouter.MintSwapValueParams",
        name: "_params",
        type: "tuple",
      },
    ],
    name: "mintSwapValue",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "index",
            type: "address",
          },
          {
            internalType: "address",
            name: "inputToken",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amountInInputToken",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "recipient",
            type: "address",
          },
          {
            components: [
              {
                internalType: "address",
                name: "asset",
                type: "address",
              },
              {
                internalType: "address",
                name: "swapTarget",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "buyAssetMinAmount",
                type: "uint256",
              },
              {
                internalType: "bytes",
                name: "assetQuote",
                type: "bytes",
              },
            ],
            internalType: "struct IIndexRouter.MintQuoteParams[]",
            name: "quotes",
            type: "tuple[]",
          },
        ],
        internalType: "struct IIndexRouter.MintSwapParams",
        name: "_params",
        type: "tuple",
      },
      {
        internalType: "uint256",
        name: "_deadline",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "_v",
        type: "uint8",
      },
      {
        internalType: "bytes32",
        name: "_r",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "_s",
        type: "bytes32",
      },
    ],
    name: "mintSwapWithPermit",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "registry",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

export class IndexRouter__factory {
  static readonly abi = _abi;
  static createInterface(): IndexRouterInterface {
    return new utils.Interface(_abi) as IndexRouterInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IndexRouter {
    return new Contract(address, _abi, signerOrProvider) as IndexRouter;
  }
}
