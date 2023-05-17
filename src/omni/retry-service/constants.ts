import { BigNumber, ethers } from 'ethers'

import { Address, ChainId, ChainIds } from '../../types'

export const escrowAddressMappings: Record<ChainId, Address> = {
  //FIXME add proper addresses
  [ChainIds.Mainnet]: ethers.constants.AddressZero,
  [ChainIds.Arbitrum]: ethers.constants.AddressZero,
  [ChainIds.CChain]: ethers.constants.AddressZero,
  [ChainIds.Polygon]: ethers.constants.AddressZero,
  //TESTNETS
  [ChainIds.EthereumGoerli]: ethers.constants.AddressZero,
  [ChainIds.ArbitrumGoerli]: ethers.constants.AddressZero,
  [ChainIds.PolygonMumbai]: ethers.constants.AddressZero,
  [ChainIds.AvalancheFuji]: ethers.constants.AddressZero,
}

export const _mockContract = {
  getBalance(user: Address) {
    console.log(user)
    return {
      address: ['0x01', '0x02'],
      balances: [BigNumber.from(111), BigNumber.from(222)],
    }
  },
} //TODO delete
