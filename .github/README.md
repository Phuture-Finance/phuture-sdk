# Phuture SDK

Phuture SDK is a JS library for using functionality related to defi indices made by [Phuture Finance](https://www.phuture.finance/) team.

## Installation

```bash
npm i @phuture/sdk
```

## Usage

### AutoRouter

AutoRouter package has been created to find the best deal to buy or sell an index based on gas price and returned amount. Depending on results this package can return mint/redeem transaction from Phuture's IndexRouter contract or 0x swap transaction.

```typescript
import {
  AutoRouter,
  Erc20,
  IndexRouter,
  ZeroExAggregator,
} from '@phuture/sdk'
import { ethers } from 'ethers'

const amount = '1000'
const account = new ethers.Wallet('PRIVATE_KEY', ethers.getDefaultProvider())

const indexRouter = new IndexRouter(account)
const zeroAggregator = new ZeroExAggregator()

const autoRouter = new AutoRouter(indexRouter, zeroAggregator)

// handle buy
autoRouter.autoBuy(indexTokenInterface, amount, erc20)

// handle sell
autoRouter.autoSell(indexTokenInterface, amount, erc20)
```

### 0x Aggregator

ZeroEx Aggregator package has been created to use methods related for managing Phuture's Index on most compatible defi exchanges

```typescript
import { Index, ZeroExAggregator } from '@phuture/sdk'
import { ethers } from 'ethers'

const amount = '1000000000000000';
const indexPDI = 'INDEX_CONTRACT';

const zeroAggregator = new ZeroExAggregator()

// get WETH/PDI swap params
const {
  buyAmount: buyAssetMinAmount,
  to: swapTarget,
  data: assetQuote,
} = await zeroEx.quote(
  '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2', // WETH
  indexPDI,
  amount,
)
```
