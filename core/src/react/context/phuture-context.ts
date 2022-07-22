import {Context, createContext} from 'react';
import {Phuture} from '../..';

export interface PhutureContextValue {
	core?: Phuture;
}

const contextKey = '__PHUTURE_CONTEXT__';

export function getPhutureContext(): Context<PhutureContextValue> {
	let context = (createContext as any)[
		contextKey
	] as Context<PhutureContextValue>;
	if (!context) {
		Object.defineProperty(createContext, contextKey, {
			value: (context = createContext<PhutureContextValue>({})),
			enumerable: false,
			writable: false,
			configurable: true,
		});
		context.displayName = 'PhutureContext';
	}

	return context;
}

export {getPhutureContext as resetPhutureContext};
