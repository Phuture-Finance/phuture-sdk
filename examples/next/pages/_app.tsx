import type { AppProps } from 'next/app'
import NextHead from 'next/head'
import * as React from 'react'

import {
	WagmiConfig,
	configureChains,
	createClient,
	defaultChains,
} from 'wagmi'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { infuraProvider } from 'wagmi/providers/infura'

const { chains, provider, webSocketProvider } = configureChains(defaultChains, [
	infuraProvider({ apiKey: process.env.NEXT_PUBLIC_INFURA_API_KEY }),
])

const client = createClient({
	autoConnect: true,
	connectors: [
		new MetaMaskConnector({ chains }),
	],
	provider,
	webSocketProvider,
})

function App({ Component, pageProps }: AppProps) {
	return (
		<WagmiConfig client={client}>
			<NextHead>
				<title>Phuture</title>
			</NextHead>
			<Component {...pageProps} />
		</WagmiConfig>
	)
}

export default App
