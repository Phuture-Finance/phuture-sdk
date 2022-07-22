import * as React from 'react'
import '../styles/globals.css'
import type {AppProps} from 'next/app'
import NextHead from 'next/head'

import {createClient, WagmiConfig} from 'wagmi'
import {MetaMaskConnector} from 'wagmi/connectors/metaMask'
import {getDefaultProvider} from "ethers";
import Connect from "../components/connect";
import {PhutureProvider} from "@phuture/sdk";

const client = createClient({
	autoConnect: true,
	connectors: [new MetaMaskConnector()],
	provider() {
		return getDefaultProvider()
	}
})

function App({Component, pageProps}: AppProps) {
	return (
		<WagmiConfig client={client}>
			<PhutureProvider>
				<NextHead>
					<title>Phuture</title>
				</NextHead>
				<div className="min-h-screen flex flex-col">
					<header className="w-full p-4 border-b border-gray-500 flex justify-between items-center">
						<h1 className="text-xl font-bold">
							@phuture/sdk
						</h1>
						<Connect/>
					</header>
					<div className="grow flex justify-center items-center">
						<Component {...pageProps} />
					</div>
				</div>
			</PhutureProvider>
		</WagmiConfig>
	)
}

export default App
