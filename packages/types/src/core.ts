import type {HookCollection} from 'before-after-hook';

type LogFunc = (...args: unknown[]) => void;

export interface CoreInterface {
	log: {
		/** Error logger function */
		error: LogFunc;
		/** Warn logger function */
		warn: LogFunc;
		/** Info logger function */
		info: LogFunc;
		/** Debug logger function */
		debug: LogFunc;
	};
	hook: HookCollection;
	request: (request: Request) => Promise<Response>;
}
