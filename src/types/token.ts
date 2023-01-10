import { Address } from "./address";

export interface Token {
	decimals: number;
	symbol: string;
	name: string;
	address: Address;
}
