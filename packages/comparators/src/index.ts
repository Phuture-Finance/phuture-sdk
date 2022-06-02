import {BigNumber} from "ethers";

export const assetComparator = (a: string, b: string): -1 | 1 => {
    const aBN = BigNumber.from(a)
    const bBN = BigNumber.from(b)
    if (aBN.eq(bBN)) {
        throw new Error(`Comparator duplicate: ${a} == ${b}`)
    }

    return aBN.lt(bBN) ? -1 : 1;
}
