/** Recovery ID */
export type V = 0 | 1 | 27 | 28

/** Raw signature output */
export interface Signature {
	v: number
	r: string
	s: string
}
