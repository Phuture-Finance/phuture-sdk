import { BigNumber } from 'ethers'
import * as yesno from 'yesno'
import { Erc20Permit } from '@phuture/erc-20'
import prepare from './prepare'

export default async function buySavingsVault(amountToDeposit: BigNumber) {
  const { account, savingsVault, metaRouter } = await prepare()
  const tokenAddress = process.env['TOKEN_ADDRESS']
  if (!tokenAddress) {
    const select = await metaRouter.selectBuy(savingsVault, amountToDeposit)

    console.dir(select)

    if (await yesno({ question: 'Ready to continue?' })) {
      await metaRouter.buy(select.isMint, savingsVault, amountToDeposit)
    }
    return
  }

  const token = new Erc20Permit(account, tokenAddress)
  const selectWithToken = await metaRouter.selectBuy(
    savingsVault,
    amountToDeposit,
    token,
  )

  console.dir(selectWithToken)

  if (await yesno({ question: 'Ready to continue?' })) {
    await metaRouter.buy(
      selectWithToken.isMint,
      savingsVault,
      amountToDeposit,
      tokenAddress,
    )
  }
  return
}

export async function sellSavingsVault(amountToSell: BigNumber) {
  const { account, savingsVault, metaRouter } = await prepare()
  const tokenAddress = process.env['TOKEN_ADDRESS']
  if (!tokenAddress) {
    const select = await metaRouter.selectSell(savingsVault, amountToSell)

    console.dir(select)

    if (await yesno({ question: 'Ready to continue?' })) {
      await metaRouter.sell(select.isBurn, savingsVault, amountToSell)
    }

    return
  }

  const token = new Erc20Permit(account, tokenAddress)
  const selectWithToken = await metaRouter.selectSell(
    savingsVault,
    amountToSell,
    token,
  )

  console.dir(selectWithToken)

  if (await yesno({ question: 'Ready to continue?' })) {
    await metaRouter.sell(
      selectWithToken.isBurn,
      savingsVault,
      amountToSell,
      tokenAddress,
    )
  }
  return
}
