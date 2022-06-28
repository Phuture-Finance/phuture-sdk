# Swap

Swap Package for executing swaps on Phuture

## Introduction

This component leverages [zero x](https://docs.0x.org/) to find the best possible price and then execute a swap.

# Getting started with development

In this section we will take a look at how to get up and running with this package.

Assuming you have correctly run all the Phuture SDK install commands. If not, take a look at the root Phuture SDK readme for more details.

## setup

Install dependencies:

> pnpm install

Now you're ready to go!

## Using this package

Import it:

`import {Swap} from '@phuture/swap'`

Use it:

``` typescript
    const swapper = new Swap(provider?);
    const transactionResponse = await swapper.swap(payload);    
 ```

Check out the documentation to find out what the ```swap``` options are
