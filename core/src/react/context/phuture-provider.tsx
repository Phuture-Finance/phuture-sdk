import * as React from "react";
import { ReactNode, useCallback, useMemo, useReducer } from "react";
import {
	getPhutureContext,
	initialState,
	PhutureState,
} from "./phuture-context";
import { Signer } from "ethers";
import { Account } from "@phuture/account";

type Action = { type: "CONNECT"; signer: Signer } | { type: "DISCONNECT" };

function reducer(state: PhutureState, action: Action): PhutureState {
	switch (action.type) {
		case "CONNECT": {
			if (state.account) {
				const account = state.account;
				account.signer = action.signer;

				return {
					...state,
					account,
					isConnected: true,
				};
			}

			return {
				...state,
				account: new Account(action.signer),
				isConnected: true,
			};
		}
		case "DISCONNECT": {
			if (state.account) {
				const account = null;

				return {
					...state,
					account,
					isConnected: false,
				};
			}

			return { ...state, account: null, isConnected: false };
		}
	}
}

export interface PhutureProviderProps {
	children: ReactNode | ReactNode[] | null;
}

export const PhutureProvider: React.FC<PhutureProviderProps> = ({
	children,
}) => {
	const PhutureContext = getPhutureContext();

	const [state, dispatch] = useReducer(reducer, initialState);

	const connectSigner = useCallback(
		(signer: Signer) => dispatch({ type: "CONNECT", signer }),
		[dispatch]
	);

	const disconnectSigner = useCallback(
		() => dispatch({ type: "DISCONNECT" }),
		[dispatch]
	);

	const value = useMemo(
		() => ({
			...state,
			connectSigner,
			disconnectSigner,
		}),
		[state]
	);

	return (
		<PhutureContext.Provider value={value}>{children}</PhutureContext.Provider>
	);
};
