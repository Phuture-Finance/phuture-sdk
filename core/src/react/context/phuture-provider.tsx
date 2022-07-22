import * as React from 'react';
import {ReactNode} from 'react';

import {Phuture} from '../..';
import {getPhutureContext} from './phuture-context';

export interface PhutureProviderProps {
	core: Phuture;
	children: ReactNode | ReactNode[] | null;
}

export const PhutureProvider: React.FC<PhutureProviderProps> = ({
																		core,
																		children
																	}) => {
	const PhutureContext = getPhutureContext();

	return (
		<PhutureContext.Consumer>
			{(context: any = {}) => {
				if (core && context.core !== core)
					context = Object.assign({}, context, {core});

				if (!context.core)
					throw 'PhutureProvider was not passed a core instance. Make sure you pass it via the "core" prop.'

				return <PhutureContext.Provider value={context}>{children}</PhutureContext.Provider>
			}}
		</PhutureContext.Consumer>
	);
};
