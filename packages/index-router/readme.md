# Index Router



## Introduction

This is the Index-Router package. It acts as a contract interface for our smart contracts. Use it for minting and burning.

# Getting started with development

In this section we will take a look at how to get up and running with this package.

Assuming you have correctly run all the Phuture SDK install commands. If not, take a look at the root Phuture SDK readme for more details.

## setup

Install dependencies:

> pnpm install

Generate Types :

> pnpm build

Types will be generated in:

> src/types/\*\*

Now you're ready to go!

## Usage


``` typescript
import { DefaultIndexRouterAddress, IndexRouter } from "../src";

// create an instance 
const router = new IndexRouter(signer, routerContract);

// perform a swap
const response = await router.mint(swapOptions, amount);
```
