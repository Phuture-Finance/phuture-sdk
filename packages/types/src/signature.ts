/** Recovery ID */
export type V = 0 | 1 | 27 | 28;

/** Raw signature output */
export interface Signature {
	v: V;
	r: string;
	s: string;
}
