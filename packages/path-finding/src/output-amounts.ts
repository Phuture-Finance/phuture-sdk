import {PathInfo} from "./get-paths";
import {BigNumber} from "ethers";

export interface OutputAmount {
    amountOut: string
    path: Array<string>
}

export const getOutputAmount = (amountInInfo: string, {pairInfo, path}: PathInfo): OutputAmount => {
    let amountInBN: BigNumber = BigNumber.from(amountInInfo)
    pairInfo.forEach((pair, index) => {
        const [reserve0, reserve1] =
            path[index] === pair.token0 ? [pair.reserve0, pair.reserve1] : [pair.reserve1, pair.reserve0]

        const amountInWithFee = amountInBN.mul(997)
        const numerator = amountInWithFee.mul(reserve1)
        const denominator = BigNumber.from(reserve0).mul(1000).add(amountInWithFee)
        amountInBN = numerator.div(denominator)
    })

    return {amountOut: amountInBN.toString(), path}
}

export const sortOutputAmounts = (outputsMatrix: Array<Array<OutputAmount>>): Array<Array<OutputAmount>> =>
    outputsMatrix.map((outputsArray) =>
        outputsArray.sort((a, b) => {
            if (b.path[0].toLowerCase() !== a.path[1].toLowerCase()) {
                if (BigNumber.from(b.amountOut).gt(a.amountOut)) {
                    return 1
                }

                if (BigNumber.from(b.amountOut).lt(a.amountOut)) {
                    return -1
                }

                return 0
            } else {
                return -1
            }
        }),
    )
