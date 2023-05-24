import { BigNumber } from 'ethers'
import * as yesno from 'yesno'
import prepare from './prepare'

export async function sellSavingsVault(amountToSell: BigNumber) {
  const maxLoss = parseInt(process.env['MAX_LOSS'], 10)
  console.log('maxLoss', maxLoss)
  const { savingsVault, savingsVaultRouter } = await prepare()

  const select = await savingsVaultRouter.selectSell(savingsVault, amountToSell)

  console.dir(select)

  const ok = await yesno({ question: 'Ready to continue?' })
  if (ok) {
    return await savingsVaultRouter.sell(
      select.isBurn,
      savingsVault,
      amountToSell,
      undefined,
      { maxLoss: maxLoss },
    )
  }

  return
}
