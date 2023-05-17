import { ethers } from 'ethers'
import { chainMappings, getOmniRemoteUrl } from 'omni/omni-transaction-service'

import { Address, ChainId } from '../../types'

import { _mockContract } from './constants'
import { EscrowData } from './types'

export class RetryService {
  async getEscrowBalances(
    user: Address,
    chainIds: ChainId[],
  ): Promise<EscrowData[]> {
    return await Promise.all(
      chainIds.map(async (chain) => {
        const provider = ethers.getDefaultProvider(
          await getOmniRemoteUrl(chainMappings[chain]),
        )
        console.log(provider)

        const escrowContract = _mockContract
        // const escrowContract = new ethers.Contract(
        //   escrowAddressMappings[chain],
        //   'ADD_ABI',
        //   provider,
        // )
        //FIXME: uncomment and use proper abi

        const { balances, address } = escrowContract.getBalance(user)
        return {
          chainId: chain as ChainId,
          balances: balances.map((balance, index) => ({
            address: address[index],
            balance,
          })),
        }
      }),
    )
  }
}
