import 'dotenv/config'

import { constants } from 'ethers'
import prepare from './prepare'
import yesno from 'yesno'

const main = async () => {
  const { account, approvalAddress, token } = await prepare()
  console.dir('START')
  console.log('INFO')
  console.dir(
    `Current allowance in ${await token.symbol()}: ${await token.contract.allowance(
      await account.address(),
      approvalAddress,
    )}`,
  )
  console.log('APPROVE')
  console.dir(
    `Approval amount in ${await token.symbol()}: ${constants.MaxUint256}`,
  )
  console.dir(`Target address:  ${approvalAddress}`)
  if (
    await yesno({
      question: 'Do you want to approve?',
    })
  ) {
    console.log('START APPROVING')
    await token.contract.approve(approvalAddress, constants.MaxUint256)
    console.dir(
      `Current allowance in ${await token.symbol()}: ${await token.contract.allowance(
        await account.address(),
        approvalAddress,
      )}`,
    )
  }
  console.dir('FINISH')
}

main().catch(console.error)
