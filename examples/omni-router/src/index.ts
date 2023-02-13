import 'dotenv/config'
import { BigNumber, utils } from 'ethers'
import yesno from 'yesno'

import prepare from './prepare'

const main = async () => {
  const { account, amount, omniRouter, isDeposit, index, token } =
    await prepare()

  if (!token) {
    throw new Error('Token not found')
  }

  const tokenDecimals = await token.contract.decimals()
  const tokenSymbol = await token.contract.symbol()

  const indexDecimals = await index.contract.decimals()
  const indexSymbol = await index.contract.symbol()
  const indexAddress = await index.account.address()

  const getBeforeData = async () => {
    const preBalance = await omniRouter.contract.balanceOf(indexAddress)
    const preTokens = await token?.contract.balanceOf(indexAddress)

    console.log('current balance:')
    console.dir(`${utils.formatEther(preBalance)} ${indexSymbol}`)

    console.log('current tokens: ')
    const amount = preTokens || '0'
    console.dir(`${utils.formatUnits(amount, tokenDecimals)} ${tokenSymbol}`)
  }

  if (isDeposit) {
    await getBeforeData()
    const tokenAmount = utils.parseUnits(amount, tokenDecimals)
    const previewInfo = await omniRouter.previewDeposit(tokenAmount)
    console.log('Preview deposit: ')
    console.dir(`${utils.formatEther(previewInfo)} ${indexSymbol}`)
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

      const postBalance = await omniRouter.contract.balanceOf(indexAddress)
      const postTokens =
        (await token?.contract.balanceOf(indexAddress)) || BigNumber.from(0)

      console.log('Balances: ')
      console.dir(`${utils.formatEther(postBalance)} ${indexSymbol}`)

      console.log('Tokens:')
      console.dir(
        `${utils.formatUnits(postTokens, tokenDecimals)} ${tokenSymbol}`,
      )
    }
  } else {
    await getBeforeData()

    const indexAmount = utils.parseUnits(amount, indexDecimals)
    console.log('Redeem amount:')
    console.dir(`${utils.formatEther(indexAmount)} ${indexSymbol}`)

    const previewInfo = await omniRouter.previewRedeem(indexAmount)
    console.log('(Preview) Redeem Amount:')
    console.dir(`${utils.formatUnits(previewInfo || '0', 6)} ${tokenSymbol}}`)
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

      const postRedeemBalance = await omniRouter.contract.balanceOf(
        indexAddress,
      )
      const postTokens =
        (await token?.contract.balanceOf(indexAddress)) || BigNumber.from(0)

      console.log('Balances: ')
      console.dir(`${utils.formatEther(postRedeemBalance)} ${indexSymbol}`)

      console.log('Tokens:')
      console.dir(`${utils.formatUnits(postTokens || '0', 6)} ${tokenSymbol}`)
    }
  }
}

main().catch(console.error)
