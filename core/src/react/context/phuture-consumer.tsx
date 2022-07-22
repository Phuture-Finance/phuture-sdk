import {Phuture} from "../..";
import React, {FC, ReactNode} from "react";
import {getPhutureContext} from "./phuture-context";

export interface PhutureConsumerProps {
	children: (core: Phuture) => ReactNode;
}

export const PhutureConsumer: FC<PhutureConsumerProps> = ({children}) => {
	const PhutureContext = getPhutureContext();

	return (
		<PhutureContext.Consumer>
			{(context: any) => {
				if (!context || !context.core)
					throw 'Could not find "core in the context of PhutureConsumer. Wrap the root component in an <PhutureProvider>.'

				return children(context.client);
			}}
		</PhutureContext.Consumer>
	);
};
