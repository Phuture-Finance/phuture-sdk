import {Context, createContext} from 'react';
import {Account} from "@phuture/account";

export interface PhutureState {
	account: Account | null
}

export const initialState: PhutureState = {
	account: null
};

const contextKey = '__PHUTURE_CONTEXT__';

export function getPhutureContext(): Context<PhutureState | any> {
	let context = (createContext as any)[contextKey] as Context<PhutureState>;
	if (!context) {
		Object.defineProperty(createContext, contextKey, {
			value: (context = createContext<PhutureState>(initialState)),
			enumerable: false,
			writable: false,
			configurable: true,
		});
		context.displayName = 'PhutureContext';
	}

	return context;
}
