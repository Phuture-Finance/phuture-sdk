import {useContext, useEffect, useState} from 'react';
import {Phuture} from '../..';
import {getPhutureContext} from '../context';
import {Signer} from "ethers";
import {Account} from "@phuture/account";

const connectSigner = (core: Phuture) => (signer: Signer) => {
	core.account = new Account(signer);
}

export function usePhuture(core?: Phuture): { phuture: Phuture, connectSigner: (signer: Signer) => void, isConnected: boolean, account: Account | null } {
	const [isConnected, setIsConnected] = useState(false)
	const context = useContext(getPhutureContext());

	core ??= context.core;

	useEffect(() => {
		if (core) {
			console.log('Phuture core is now available.')
			setIsConnected(core.account !== null)
		}
	}, [core]);

	if (!core)
		throw new Error(
			'Could not find "core" in the context or passed in as an option. Wrap the root component in an <PhutureProvider>, or pass an Phuture core instance in via options.',
		);

	return {phuture: core, connectSigner: connectSigner(core), isConnected, account: core.account};
}
