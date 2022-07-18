# 0x Aggregator

Quote Aggregation Package for executing swaps on Phuture

## Introduction

This component leverages [zero x](https://docs.0x.org/) to find the best prices/liquidity, and can be used to perform a transaction.

# Getting started with development

In this section we will take a look at how to get up and running with this package.

Assuming you have correctly run all the Phuture SDK install commands. If not, take a look at the root Phuture SDK readme for more details.

## setup

Install dependencies:

> pnpm install

Now you're ready to go!

## Using this package

Use it:

```typescript
    import {0x-aggregator as aggregator} from '@phuture/0x-aggregator'
    const transactionResponse = await aggregator.quote(args...);
```
