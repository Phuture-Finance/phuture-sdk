import * as React from "react";
import {useEffect} from "react";
import {useConnect, useSigner} from "wagmi";
import {usePhuture} from "@phuture/sdk";

export default function Connect() {
	const {connect, connectors} = useConnect()
	const {data: signer} = useSigner()
	const {isConnected, connectSigner} = usePhuture()

	useEffect(() => {
		if(!isConnected) {
			console.log("connecting")
			signer && connectSigner(signer)
		}
	}, [signer, isConnected])

	return <button
		key={connectors[0].id}
		onClick={() => connect({connector: connectors[0]})}
		className="px-4 py-2 bg-blue-900 dark:bg-white rounded-xl text-white dark:text-blue-900 font-bold text-sm">
		{`Connect${isConnected ? 'ed' : ''} via ${connectors[0].name}`}
	</button>
}
