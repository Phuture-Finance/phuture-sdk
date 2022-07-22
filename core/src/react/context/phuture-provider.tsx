import * as React from 'react';
import {ReactNode, useCallback, useMemo, useReducer} from 'react';
import {getPhutureContext, initialState, PhutureState} from './phuture-context';
import {Signer} from "ethers";
import {Account} from "@phuture/account";

type Action = { type: 'CONNECT', signer: Signer };

function reducer(state: PhutureState, action: Action): PhutureState {
	switch (action.type) {
		case "CONNECT": {
			if (state.account) {
				const account = state.account;
				account.signer = action.signer;

				return {
					...state,
					account
				};
			}

			return {...state, account: new Account(action.signer)}
		}
	}
}

export interface PhutureProviderProps {
	children: ReactNode | ReactNode[] | null;
}

export const PhutureProvider: React.FC<PhutureProviderProps> = ({children}) => {
	const PhutureContext = getPhutureContext();

	const [state, dispatch] = useReducer(reducer, initialState)

	const connectSigner = useCallback(
		(signer: Signer) => dispatch({type: "CONNECT", signer}),
		[dispatch]
	)

	const value = useMemo(
		() => ({
			...state,
			connectSigner
		}),
		[state]
	)

	return (
		<PhutureContext.Provider value={value}>{children}</PhutureContext.Provider>
	);
};
