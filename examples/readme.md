# Examples

## Introduction

Below examples are provided to demonstrate the usage of the different packages available through the PhutureSDK.

## Setup the local node(if needed)

1.Download anvil cli app
`curl -L https://foundry.paradigm.xyz | bash`
2.Install anvil cli app
`foundryup`
3.Prepare variables and start anvil
Go to https://chainlist.org, search for needed chain, copy RPC Server Address of choice
If you wish to fork from block in past – find (on Etherscan of Snowtrace) and copy blocknumber

## Start the local node

`anvil cli anvil -f <RPC Server Address>` for usual case
`anvil cli anvil -f <RPC Server Address> [--fork-block-number blocknumber]` for cases when you want to run it from the special blocknumber

## Run the scripts

`.env` file is your config. Please set up it to start running different cases.

## AutoRouter example

1.Install all global dependencies
`pnpm i`
2.Get to the folder
`cd examples/auto-router`
3.Run the script
`pnpm start`
