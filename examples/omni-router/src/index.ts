import 'dotenv/config'
import { utils } from 'ethers'
import yesno from 'yesno'

import prepare from './prepare'

const main = async () => {
  const { amount, omniRouter, isDeposit } = await prepare()

  if (isDeposit) {
    //INFO: deposit functionality here
    //TODO: log current balances of index and USDC

    const tokenAmount = utils.parseUnits(amount, 6) //TODO

    const previewInfo = await omniRouter.previewDeposit(tokenAmount)
    console.log('previewDepositInfo: ', previewInfo.toString()) //TODO: format amount to normal view
    if (
      await yesno({
        question: 'Do you want to deposit?',
      })
    ) {
      //TODO: run deposit function
      //TODO: log the deposit tx
      //TODO: log updated balances of index and USDC
      console.dir('RUN DEPOSIT')
    }
  } else {
    //INFO: redeem functionality here
    //TODO: log current balances of index and USDC
    const indexAmount = utils.parseUnits(amount, 18) //TODO
    console.log('indexAmount: ', indexAmount.toString())

    const previewInfo = await omniRouter.previewRedeem(indexAmount)
    console.log('previewRedeemInfo: ', previewInfo.toString()) //TODO: format amount to normal view
    if (
      await yesno({
        question: 'Do you want to redeem?',
      })
    ) {
      console.dir('RUN REDEEM')
      //TODO: run redeem function
      //TODO: log the redeem tx
      //TODO: log updated balances of index and USDC
    }
  }
}

main().catch(console.error)
