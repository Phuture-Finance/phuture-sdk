import 'dotenv/config'

import { utils } from 'ethers'
import debug from 'debug'
import prepare from './prepare'
import yesno from 'yesno'

const autoRouterExampleDebug = debug('Auto Router Example')

const main = async () => {
  const { isSell, desiredAmount, index, autoRouter, token } = await prepare()

  if (isSell) {
    autoRouterExampleDebug('Selling %s', utils.formatEther(desiredAmount))

    const selectSellResult = await autoRouter.selectSell(
      index,
      desiredAmount,
      token,
    )

    console.table(selectSellResult)

    if (
      await yesno({
        question: 'Do you want to sell?',
      })
    ) {
      const sellResult = await autoRouter.sell(
        selectSellResult.isBurn,
        index,
        desiredAmount,
        token?.address,
      )

      console.table(sellResult)
    }
  } else {
    autoRouterExampleDebug('Buying %s', utils.formatEther(desiredAmount))
    // const buyResult = await autoBuy(desiredAmount)
    // autoRouterExampleDebug('Buy result: %O', buyResult)
    const selectBuyResult = await autoRouter.selectBuy(
      index,
      desiredAmount,
      token,
    )

    console.table(selectBuyResult)

    if (
      await yesno({
        question: 'Do you want to buy?',
      })
    ) {
      const buyResult = await autoRouter.buy(
        selectBuyResult.isMint,
        index,
        desiredAmount,
        token?.address,
      )

      console.table(buyResult)
    }
  }
}

main().catch(console.error)
