import 'dotenv/config'

import prepare from './prepare'
import yesno from 'yesno'

const main = async () => {
  const { account, approvalAddress, token, approvalAmount } = await prepare()

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
    `Approval amount in ${await token.symbol()}: ${approvalAmount.toString()}`,
  )
  console.dir(`Target address:  ${approvalAddress}`)
  if (
    await yesno({
      question: 'Do you want to approve?',
    })
  ) {
    console.log('START APPROVING')
    await (await token.contract.approve(approvalAddress, approvalAmount)).wait()
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
