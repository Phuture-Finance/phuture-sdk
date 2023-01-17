import { Account } from '../account'
import { Contract } from '../contract'
import {
  PhuturePriceOracle as PhuturePriceOracleContractInterface,
  PhuturePriceOracle__factory,
} from '../typechain'
import { Address, ChainId, ChainIds, ContractFactory } from '../types'

/** ### Default PhuturePriceOracle address for network */
export const defaultPhuturePriceOracleAddress: Record<ChainId, Address> = {
  /** ### Default PhuturePriceOracle address on mainnet. */
  [ChainIds.Mainnet]: '0x384ac33558821383ff4fc73d1dee3539a74bf540',
  /** ### Default PhuturePriceOracle address on c-chain. */
  //INFO: [ChainIds.CChain]: '0x69e848b2f41019340cec3e6696d5c937e74da96b', CChain main
  [ChainIds.CChain]: '0xee53039d099fc73171ee94386d59f24b05ceb68a', //INFO: CChain staging
}

/** ### ERC20 Token Contract */
export class PhuturePriceOracle<
  C extends PhuturePriceOracleContractInterface = PhuturePriceOracleContractInterface,
> extends Contract<C> {
  /**
   * ### Creates a new PhuturePriceOracle instance
   *
   * @param account Account to use for interacting with the contract
   * @param contract Contract instance or address of the PhuturePriceOracle contract
   * @param factory Contract factory to use for creating the contract
   *
   * @returns New PhuturePriceOracle token instance
   */
  constructor(
    account: Account,
    contract: Address | C,
    factory: ContractFactory = PhuturePriceOracle__factory,
  ) {
    super(account, contract, factory)
  }
}
