import { BigNumber } from 'ethers'
import { Erc20Permit } from '@phuture/erc-20'
import * as yesno from 'yesno'
import prepare from './prepare'

// Auto selling Index amount
export default async function autoSell(amountToSellDesired: BigNumber) {
  const { account, index, autoRouter } = await prepare()

  const tokenAddress = process.env['TOKEN_ADDRESS']
  if (!tokenAddress) {
    const select = await autoRouter.selectSell(index, amountToSellDesired)

    console.dir(select)

    if (await yesno({ question: 'Ready to continue?' })) {
      return autoRouter.sell(select.isBurn, index, amountToSellDesired)
    }

    return
  }

  const token = new Erc20Permit(account, tokenAddress)
  const selectWithToken = await autoRouter.selectSell(
    index,
    amountToSellDesired,
    token,
  )

  console.dir(selectWithToken)

  if (await yesno({ question: 'Ready to continue?' })) {
    return autoRouter.sell(
      selectWithToken.isBurn,
      index,
      amountToSellDesired,
      token.address,
    )
  }

  return
}
