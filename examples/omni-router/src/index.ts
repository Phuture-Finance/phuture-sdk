import 'dotenv/config'
import { BigNumber, utils } from 'ethers'
import yesno from 'yesno'

import prepare from './prepare'

const main = async () => {
  const { account, amount, omniRouter, isDeposit, index, token } =
    await prepare()

  const getbeforeData = async () => {
    const preBalance = await omniRouter.contract.balanceOf(
      await index.account.address(),
    )
    const preTokens = await token?.contract.balanceOf(
      await index.account.address(),
    )

    console.log('current balance is: ', utils.formatEther(preBalance))
    console.log(
      'current token amount is: ',
      utils.formatUnits(preTokens || '0', 6),
    )
  }

  if (isDeposit) {
    await getbeforeData()
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
      console.dir(`${utils.formatUnits(postTokens, 6)} ${await index.symbol()}`)
    }
  } else {
    await getbeforeData()
    const indexAmount = utils.parseUnits(amount, 6) //TODO
    console.log('indexAmount: ', indexAmount.toString())

    const previewInfo = await omniRouter.previewRedeem(indexAmount)
    console.log('previewRedeemInfo: ', previewInfo.toString()) //TODO: format amount to normal view
    if (
      await yesno({
        question: 'Do you want to redeem?',
      })
    ) {
      const redeemResult = await omniRouter.redeem(
        indexAmount,
        account.address(),
        account.address(),
      )

      console.dir(redeemResult, { depth: 0 }) //INFO: Deposit Result

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
      console.dir(
        `${utils.formatUnits(postTokens || '0', 6)} ${
          token ? await token.contract.symbol() : 'USDC'
        }`,
      )
    }
  }
}

main().catch(console.error)
