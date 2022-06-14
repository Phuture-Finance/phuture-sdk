# Graph Client
Access Phuture's Subgraph

## Introduction
This is the graphQL package used by Phuture SDK. it leverages  graphql-request and graph-ql-code-generator to create a graphQL SDK interface

# Getting started with development

In this section we will take a look at how to get up and running with this package.

Assuming you have correctly run all the Phuture SDK install commands. If not, take a look at the root Phuture SDK readme for more details.

## setup

Install dependencies:
>pnpm install

Generate schema:
>npm run generate

Schemas will be generated in 
>schemas/**

Now you're ready to go!

## Adding a schema
in the ```schemas``` subdirectory, you can add queries to the liquidity subgraph or the Phuture subgraph by creating a ```.graphql``` file that conforms with [graphQL Queries and Mutations](https://graphql.org/learn/queries/)

Once done, run:
>npm generate

This will build a new SDK with the queries strongly typed and ready to go.

## Using the Phuture's graphQl

Import it:

``` import {phutureGraphQL} from '@phuture/graphql' ```

Use it:

```const { userIndexHistories } = await phutureGraphQL().getUserIndexHistories(variables)```


