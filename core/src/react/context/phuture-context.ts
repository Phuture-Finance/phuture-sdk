import { Context, createContext } from "react";
import { Account } from "@phuture/account";
import { Index } from "@phuture/index";
import { AutoRouter } from "@phuture/auto-router";
import { IndexRouter } from "@phuture/index-router/dist/src/types";
import { ZeroExAggregator } from "@phuture/0x-aggregator";
import { Subgraph } from "@phuture/subgraph";
import { Address } from "@phuture/types";

export interface PhutureState {
	isConnected: boolean;
	account: Account | null;
	indices: Map<Address, Index>;
	autoRouter: AutoRouter | null;
	indexRouter: IndexRouter | null;
	zeroExAggregator: ZeroExAggregator;
	subgraph: Subgraph;
}

export const initialState: PhutureState = {
	isConnected: false,
	account: null,
	indices: new Map(),
	autoRouter: null,
	indexRouter: null,
	zeroExAggregator: new ZeroExAggregator(),
	subgraph: Subgraph.fromUrl(),
};

const contextKey = "__PHUTURE_CONTEXT__";

export function getPhutureContext(): Context<PhutureState | any> {
	let context = (createContext as any)[contextKey] as Context<PhutureState>;
	if (!context) {
		Object.defineProperty(createContext, contextKey, {
			value: (context = createContext<PhutureState>(initialState)),
			enumerable: false,
			writable: false,
			configurable: true,
		});
		context.displayName = "PhutureContext";
	}

	return context;
}
