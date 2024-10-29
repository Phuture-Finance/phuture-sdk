export const baseIndexAbi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'spender',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'value',
        type: 'uint256',
      },
    ],
    name: 'Approval',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'value',
        type: 'uint256',
      },
    ],
    name: 'Transfer',
    type: 'event',
  },
  {
    inputs: [],
    name: 'DOMAIN_SEPARATOR',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'spender',
        type: 'address',
      },
    ],
    name: 'allowance',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'anatomy',
    outputs: [
      {
        internalType: 'address[]',
        name: '_assets',
        type: 'address[]',
      },
      {
        internalType: 'uint8[]',
        name: '_weights',
        type: 'uint8[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'spender',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'approve',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'balanceOf',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_recipient',
        type: 'address',
      },
    ],
    name: 'burn',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'decimals',
    outputs: [
      {
        internalType: 'uint8',
        name: '',
        type: 'uint8',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'spender',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'subtractedValue',
        type: 'uint256',
      },
    ],
    name: 'decreaseAllowance',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'factory',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'inactiveAnatomy',
    outputs: [
      {
        internalType: 'address[]',
        name: '',
        type: 'address[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'spender',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'addedValue',
        type: 'uint256',
      },
    ],
    name: 'increaseAllowance',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_recipient',
        type: 'address',
      },
    ],
    name: 'mint',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'name',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
    ],
    name: 'nonces',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'spender',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'value',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'deadline',
        type: 'uint256',
      },
      {
        internalType: 'uint8',
        name: 'v',
        type: 'uint8',
      },
      {
        internalType: 'bytes32',
        name: 'r',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32',
        name: 's',
        type: 'bytes32',
      },
    ],
    name: 'permit',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'registry',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes4',
        name: '_interfaceId',
        type: 'bytes4',
      },
    ],
    name: 'supportsInterface',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'symbol',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'totalSupply',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'transfer',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'transferFrom',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const;

export const indexHelperAbi = [
  {
    inputs: [
      {
        internalType: 'address',
        name: '_index',
        type: 'address',
      },
    ],
    name: 'totalEvaluation',
    outputs: [
      {
        internalType: 'uint256',
        name: '_totalEvaluation',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_indexPriceInBase',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
] as const;

export const indexRouterAbi = [
  {
    inputs: [],
    name: 'WETH',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'index',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'recipient',
            type: 'address',
          },
        ],
        internalType: 'struct IIndexRouterV2.BurnParams',
        name: '_params',
        type: 'tuple',
      },
    ],
    name: 'burn',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'index',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'outputAsset',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'recipient',
            type: 'address',
          },
          {
            components: [
              {
                internalType: 'address',
                name: 'swapTarget',
                type: 'address',
              },
              {
                internalType: 'address',
                name: 'allowanceTarget',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'buyAssetMinAmount',
                type: 'uint256',
              },
              {
                internalType: 'bytes',
                name: 'assetQuote',
                type: 'bytes',
              },
            ],
            internalType: 'struct IIndexRouterV2.BurnQuoteParams[]',
            name: 'quotes',
            type: 'tuple[]',
          },
        ],
        internalType: 'struct IIndexRouterV2.BurnSwapParams',
        name: '_params',
        type: 'tuple',
      },
    ],
    name: 'burnSwap',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'index',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'outputAsset',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'recipient',
            type: 'address',
          },
          {
            components: [
              {
                internalType: 'address',
                name: 'swapTarget',
                type: 'address',
              },
              {
                internalType: 'address',
                name: 'allowanceTarget',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'buyAssetMinAmount',
                type: 'uint256',
              },
              {
                internalType: 'bytes',
                name: 'assetQuote',
                type: 'bytes',
              },
            ],
            internalType: 'struct IIndexRouterV2.BurnQuoteParams[]',
            name: 'quotes',
            type: 'tuple[]',
          },
        ],
        internalType: 'struct IIndexRouterV2.BurnSwapParams',
        name: '_params',
        type: 'tuple',
      },
    ],
    name: 'burnSwapValue',
    outputs: [
      {
        internalType: 'uint256',
        name: 'wethBalance',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'index',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'outputAsset',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'recipient',
            type: 'address',
          },
          {
            components: [
              {
                internalType: 'address',
                name: 'swapTarget',
                type: 'address',
              },
              {
                internalType: 'address',
                name: 'allowanceTarget',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'buyAssetMinAmount',
                type: 'uint256',
              },
              {
                internalType: 'bytes',
                name: 'assetQuote',
                type: 'bytes',
              },
            ],
            internalType: 'struct IIndexRouterV2.BurnQuoteParams[]',
            name: 'quotes',
            type: 'tuple[]',
          },
        ],
        internalType: 'struct IIndexRouterV2.BurnSwapParams',
        name: '_params',
        type: 'tuple',
      },
      {
        internalType: 'uint256',
        name: '_deadline',
        type: 'uint256',
      },
      {
        internalType: 'uint8',
        name: '_v',
        type: 'uint8',
      },
      {
        internalType: 'bytes32',
        name: '_r',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32',
        name: '_s',
        type: 'bytes32',
      },
    ],
    name: 'burnSwapValueWithPermit',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'index',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'outputAsset',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'recipient',
            type: 'address',
          },
          {
            components: [
              {
                internalType: 'address',
                name: 'swapTarget',
                type: 'address',
              },
              {
                internalType: 'address',
                name: 'allowanceTarget',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'buyAssetMinAmount',
                type: 'uint256',
              },
              {
                internalType: 'bytes',
                name: 'assetQuote',
                type: 'bytes',
              },
            ],
            internalType: 'struct IIndexRouterV2.BurnQuoteParams[]',
            name: 'quotes',
            type: 'tuple[]',
          },
        ],
        internalType: 'struct IIndexRouterV2.BurnSwapParams',
        name: '_params',
        type: 'tuple',
      },
      {
        internalType: 'uint256',
        name: '_deadline',
        type: 'uint256',
      },
      {
        internalType: 'uint8',
        name: '_v',
        type: 'uint8',
      },
      {
        internalType: 'bytes32',
        name: '_r',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32',
        name: '_s',
        type: 'bytes32',
      },
    ],
    name: 'burnSwapWithPermit',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_index',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256',
      },
    ],
    name: 'burnTokensAmount',
    outputs: [
      {
        internalType: 'uint256[]',
        name: '_amounts',
        type: 'uint256[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'index',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'recipient',
            type: 'address',
          },
        ],
        internalType: 'struct IIndexRouterV2.BurnParams',
        name: '_params',
        type: 'tuple',
      },
    ],
    name: 'burnWithAmounts',
    outputs: [
      {
        internalType: 'uint256[]',
        name: '_amounts',
        type: 'uint256[]',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'index',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'recipient',
            type: 'address',
          },
        ],
        internalType: 'struct IIndexRouterV2.BurnParams',
        name: '_params',
        type: 'tuple',
      },
      {
        internalType: 'uint256',
        name: '_deadline',
        type: 'uint256',
      },
      {
        internalType: 'uint8',
        name: '_v',
        type: 'uint8',
      },
      {
        internalType: 'bytes32',
        name: '_r',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32',
        name: '_s',
        type: 'bytes32',
      },
    ],
    name: 'burnWithPermit',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_WETH',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_registry',
        type: 'address',
      },
    ],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'index',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'amountInBase',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'recipient',
            type: 'address',
          },
        ],
        internalType: 'struct IIndexRouterV2.MintParams',
        name: '_params',
        type: 'tuple',
      },
    ],
    name: 'mint',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'index',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'inputToken',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'amountInInputToken',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'recipient',
            type: 'address',
          },
          {
            components: [
              {
                internalType: 'address',
                name: 'asset',
                type: 'address',
              },
              {
                internalType: 'address',
                name: 'swapTarget',
                type: 'address',
              },
              {
                internalType: 'address',
                name: 'allowanceTarget',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'buyAssetMinAmount',
                type: 'uint256',
              },
              {
                internalType: 'bytes',
                name: 'assetQuote',
                type: 'bytes',
              },
            ],
            internalType: 'struct IIndexRouterV2.MintQuoteParams[]',
            name: 'quotes',
            type: 'tuple[]',
          },
        ],
        internalType: 'struct IIndexRouterV2.MintSwapParams',
        name: '_params',
        type: 'tuple',
      },
    ],
    name: 'mintSwap',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'index',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'inputToken',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'amountInInputToken',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'recipient',
            type: 'address',
          },
          {
            components: [
              {
                internalType: 'address',
                name: 'asset',
                type: 'address',
              },
              {
                internalType: 'address',
                name: 'swapTarget',
                type: 'address',
              },
              {
                internalType: 'address',
                name: 'allowanceTarget',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'buyAssetMinAmount',
                type: 'uint256',
              },
              {
                internalType: 'bytes',
                name: 'assetQuote',
                type: 'bytes',
              },
            ],
            internalType: 'struct IIndexRouterV2.MintQuoteParams[]',
            name: 'quotes',
            type: 'tuple[]',
          },
        ],
        internalType: 'struct IIndexRouterV2.MintSwapParams',
        name: '_params',
        type: 'tuple',
      },
    ],
    name: 'mintSwapIndexAmount',
    outputs: [
      {
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'index',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'recipient',
            type: 'address',
          },
          {
            components: [
              {
                internalType: 'address',
                name: 'asset',
                type: 'address',
              },
              {
                internalType: 'address',
                name: 'swapTarget',
                type: 'address',
              },
              {
                internalType: 'address',
                name: 'allowanceTarget',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'buyAssetMinAmount',
                type: 'uint256',
              },
              {
                internalType: 'bytes',
                name: 'assetQuote',
                type: 'bytes',
              },
            ],
            internalType: 'struct IIndexRouterV2.MintQuoteParams[]',
            name: 'quotes',
            type: 'tuple[]',
          },
        ],
        internalType: 'struct IIndexRouterV2.MintSwapValueParams',
        name: '_params',
        type: 'tuple',
      },
    ],
    name: 'mintSwapValue',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'index',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'inputToken',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'amountInInputToken',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'recipient',
            type: 'address',
          },
          {
            components: [
              {
                internalType: 'address',
                name: 'asset',
                type: 'address',
              },
              {
                internalType: 'address',
                name: 'swapTarget',
                type: 'address',
              },
              {
                internalType: 'address',
                name: 'allowanceTarget',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'buyAssetMinAmount',
                type: 'uint256',
              },
              {
                internalType: 'bytes',
                name: 'assetQuote',
                type: 'bytes',
              },
            ],
            internalType: 'struct IIndexRouterV2.MintQuoteParams[]',
            name: 'quotes',
            type: 'tuple[]',
          },
        ],
        internalType: 'struct IIndexRouterV2.MintSwapParams',
        name: '_params',
        type: 'tuple',
      },
      {
        internalType: 'uint256',
        name: '_deadline',
        type: 'uint256',
      },
      {
        internalType: 'uint8',
        name: '_v',
        type: 'uint8',
      },
      {
        internalType: 'bytes32',
        name: '_r',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32',
        name: '_s',
        type: 'bytes32',
      },
    ],
    name: 'mintSwapWithPermit',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'registry',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
] as const;

export const phuturePriceOracleAbi = [
  {
    inputs: [
      {
        internalType: 'address',
        name: '_asset',
        type: 'address',
      },
    ],
    name: 'refreshedAssetPerBaseInUQ',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const;
