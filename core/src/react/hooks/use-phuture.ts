import {Context, useContext} from 'react';
import {getPhutureContext, PhutureState} from '../context';

export function usePhuture() {
	const context = useContext(getPhutureContext());
	if (!context)
		throw new Error('`usePhuture` must be used within a `PhutureProvider`.',);

	return context;
}
