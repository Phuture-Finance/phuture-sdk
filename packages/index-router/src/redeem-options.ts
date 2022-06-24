import {IIndexRouter} from './types/IndexRouter';

export type BurnOptions =
	| IIndexRouter.BurnParamsStruct
	| IIndexRouter.BurnSwapParamsStruct; // INFO: the same for mintSwap & mintSwapValue
