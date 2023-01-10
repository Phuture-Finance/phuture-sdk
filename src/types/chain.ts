import { Network } from "@ethersproject/providers";

import { Address } from "./address";
import { Token } from "./token";

export type Chain = Network & {
	network: string;
	blockExplorer?: string;
	nativeCurrency?: Token
	wrappedNativeCurrency?: Token
	usdc?: Token
	multicall?: Address;
}
