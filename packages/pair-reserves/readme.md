# Index Router



## Introduction

The Pair Reserves package. It acts as a contract interface for our pair reserve smart contracts.

# Getting started with development

In this section we will take a look at how to get up and running with this package.

Assuming you have correctly run all the Phuture SDK install commands. If not, take a look at the root Phuture SDK readme for more details.

## Development setup

Install dependencies:

> pnpm install

Generate Types :

> pnpm build

Types will be generated in:

> src/types/\*\*

Now you're ready to go!

## Usage


``` typescript
import { PairReserves } from "../src";

// create an instance 
const pair = new PairReserves(address, provider);

// perform a swap
const response = await router.getPairReserves(tokens, factoryAddress, codeHash);
```