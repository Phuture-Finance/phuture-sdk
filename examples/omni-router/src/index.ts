import 'dotenv/config'
import { BigNumber, utils } from 'ethers'
import yesno from 'yesno'

import prepare from './prepare'

const main = async () => {
  const { account, amount, omniRouter, isDeposit, index, token } =
    await prepare()

  if (isDeposit) {
    const before = {
      balance: BigNumber.from(0),
      tokens: BigNumber.from(0),
    }
    //TODO: log current balances of index and USDC
    const preBalance = await omniRouter.contract.balanceOf(
      await index.account.address(),
    )
    before.balance = preBalance

    const preTokens = await token?.contract.balanceOf(
      await index.account.address(),
    )
    before.tokens = preTokens || BigNumber.from(0)

    console.log('current balance is: ', utils.formatEther(before.balance))
    console.log(
      'current token amount it is: ',
      utils.formatEther(before.tokens),
    )
    const tokenAmount = utils.parseUnits(amount, 6) //TODO

    const previewInfo = await omniRouter.previewDeposit(tokenAmount)
    console.log('Preview deposit: ', utils.formatEther(previewInfo)) //TODO: format amount to normal view
    if (
      await yesno({
        question: 'Do you want to deposit?',
      })
    ) {
      const depositResult = await omniRouter.deposit(
        tokenAmount,
        account.address(),
      )

      console.dir(depositResult, { depth: 0 }) //INFO: Deposit Result

      const postBalance = await omniRouter.contract.balanceOf(
        await index.account.address(),
      )
      const postTokens =
        (await token?.contract.balanceOf(await index.account.address())) ||
        BigNumber.from(0)

      console.log('Balances: ')
      console.dir(
        `Current balance is: ${utils.formatEther(
          postBalance,
        )} ${await index.symbol()}`,
      )

      console.log('Tokens:')
      console.dir(`${utils.formatEther(postTokens)} ${await index.symbol()}`)
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
