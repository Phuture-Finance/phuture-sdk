import {IIndexRouter} from './types/IndexRouter';

export type MintOptions =
	| IIndexRouter.MintParamsStruct
	| IIndexRouter.MintSwapParamsStruct
	| IIndexRouter.MintSwapValueParamsStruct;
