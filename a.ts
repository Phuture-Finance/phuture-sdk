import { JsonRpcProvider } from "@ethersproject/providers"
import { constants, utils } from "ethers"
import { ERC20__factory } from "./src/typechain";

const provider = new JsonRpcProvider(
  'https://polygon-mainnet.infura.io/v3/5ea3ca1821e447ac901be4e67685c3be',
)

const DAI = '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063'
const wallet = '0xF977814e90dA44bFA03b6295A0616a897441aceC'

const slot = utils.keccak256(
  utils.defaultAbiCoder.encode(
    ['address', 'uint256'],
    [wallet.toLowerCase(), 0],
  ),
)
const resultWithoutOverride = await provider.getStorageAt(DAI, slot)

const stateDiff = {
  [DAI]: {
    stateDiff: {
      [slot]: utils.hexZeroPad(utils.hexValue(12345678), 32),
    },
  },
}
const resultWithOverride = await provider.send('eth_call', [
  {
    from: constants.AddressZero,
    to: DAI,
    data: ERC20__factory.createInterface().encodeFunctionData('balanceOf', [wallet]),
  },
  'latest',
  stateDiff,
])

console.log(
  'DAI balance w/o override:',
  utils.defaultAbiCoder.decode(['uint256'], resultWithoutOverride).toString(),
)
console.log(
  'DAI balance w/ override:',
  utils.defaultAbiCoder.decode(['uint256'], resultWithOverride).toString(),
)
