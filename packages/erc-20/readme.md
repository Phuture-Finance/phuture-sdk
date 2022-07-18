# ERC20

## Introduction

The ERC20 package, used to interface with the ERC20 contract.

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

```typescript
import { Erc20 } from "@phuture/erc-20";

// create an instance
const erc = new Erc20(signer, provider);

// use it
const response = await erc.decimals();
```
