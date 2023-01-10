# Phuture SDK

Phuture SDK is a JS library for using functionality related to defi indices made by [Phuture Finance](https://www.phuture.finance/) team.

## Installation

Use the package manager [pnpm](https://pnpm.io/) to install SDK's dependencies.

```bash
pnpm i @phuture/sdk
```

## Usage

### AutoRouter

AutoRouter package has been created to find the best deal to buy or sell an index based on gas price and returned amount. Depending on results this package can return mint/redeem transaction from Phuture's IndexRouter contract or 0x swap transaction.

```typescript
import {
  Account,
  AutoRouter,
  Erc20,
  IndexRouter,
  ZeroExAggregator,
} from '@phuture/sdk'
import { ethers } from 'ethers'

const amount = '1000'
const account = new Account(
  new ethers.Wallet('PRIVATE_KEY', ethers.getDefaultProvider()),
)

const indexRouter = new IndexRouter(account)
const zeroAggregator = new ZeroExAggregator()
const erc20 = new Erc20(account, 'ERC20_TOKEN_ADDRESS')

const autoRouter = new AutoRouter(indexRouter, zeroAggregator)

// handle buy
autoRouter.autoBuy(indexTokenInterface, amount, erc20)

// handle sell
autoRouter.autoBuy(indexTokenInterface, amount, erc20)
```

### Erc20

Erc20 package has been created to wrap the usual erc20 interface to use it

```typescript
import { Erc20 } from '@phuture/sdk'
import { ethers } from 'ethers'

const account = new Account(
  new ethers.Wallet('PRIVATE_KEY', ethers.getDefaultProvider()),
)

const erc20 = new Erc20(account, 'ERC20_TOKEN_ADDRESS')

// get token's decimals
erc20.decimals()

// get token's symbol
erc20.symbol()
```

### Index

Index package has been created to wrap the Phuture's Index interface to use it

```typescript
import { Index } from '@phuture/sdk'
import { ethers } from 'ethers'

const account = new Account(
  new ethers.Wallet('PRIVATE_KEY', ethers.getDefaultProvider()),
)

const indexPDI = new Index(account, 'INDEX_CONTRACT')

// get amount of input tokens to set underlying tokens amount
const { amounts, amountToSell } = indexPDI.scaleAmount(10000000000)
```

### Index Router

Index Router package has been created to use methods from Phuture's IndexRouter contract such as mint, burn and others.

```typescript
import { IndexRouter } from '@phuture/sdk'
import { ethers } from 'ethers'

const account = new Account(
  new ethers.Wallet('PRIVATE_KEY', ethers.getDefaultProvider()),
)
const mintOptions = {
  index: 'INDEX_ADDRESS',
  amountInBase: 100000,
  recipient: 'RECIPIENT_ADDRESS',
}
const burnOptions = {
  quotes: [], // can get it from 0x aggregator
}

const indexRouter = new IndexRouter(account)

// run mint transaction
const mintTx = await indexRouter.mintSwap(mintOptions, 'AMOUNT_IN_INPUT_TOKEN')

// run burn transaction
const burnTx = await indexRouter.burnSwap(
  'INDEX_ADDRESS',
  'AMOUNT_IN_INDEX',
  'RECIPIENT_ADDRESS',
  burnOptions,
)
```

### 0x Aggregator

ZeroEx Aggregator package has been created to use methods related for managing Phuture's Index on most compatible defi exchanges

```typescript
import { Index, ZeroExAggregator } from '@phuture/sdk'
import { ethers } from 'ethers'

const account = new Account(
  new ethers.Wallet('PRIVATE_KEY', ethers.getDefaultProvider()),
)
const indexPDI = new Index(account, 'INDEX_CONTRACT')

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

### Subgraph

Subgraph package has been created to get data related to index and users that hold the index

```typescript
import { Subgraph } from '@phuture/sdk'

const client = Subgraph.fromUrl()

// get user data
const { data } = await client.query({
  query: gql`
    query User($userId: ID!) {
      user(id: $userId) {
        id
      }
    }
  `,
  variables: { userId },
})
```
