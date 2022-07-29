# Subgraph Client

Access Phuture's Subgraph

## Introduction

This is the graphQL package used by Phuture SDK.

# Getting started with development

In this section we will take a look at how to get up and running with this package.

Assuming you have correctly run all the Phuture SDK install commands. If not, take a look at the root Phuture SDK readme for more details.

## Building

Run `nx build subgraph` to build the library.

## Running unit tests

Run `nx test subgraph` to execute the unit tests via [Jest](https://jestjs.io).

## Adding a schema

in the `schemas` subdirectory, you can add queries to the liquidity subgraph or the Phuture subgraph by creating a `.graphql` file that conforms with [graphQL Queries and Mutations](https://graphql.org/learn/queries/)

Once done, run:

> npm generate

This will build a new SDK with the queries strongly typed and ready to go.
