import 'dotenv/config'

import { utils } from 'ethers'
import debug from 'debug'
import prepare from './prepare'
import yesno from 'yesno'

const autoRouterExampleDebug = debug('Auto Router Example')

const main = async () => {
  const {
    reserveToken,
    isSell,
    amount,
    index,
    autoRouter,
    token,
    provider,
    reserveDepositRouter,
    slippagePercentage,
  } = await prepare()
  const reserveBefore = await reserveDepositRouter.reserve()

  const indexBalanceBefore = await index.contract.balanceOf(
    await index.account.address(),
  )
  const tokenBalanceBefore = token
    ? await token.contract.balanceOf(await index.account.address())
    : 0
  const nativeBalanceBefore = await provider.getBalance(index.account.address())

  if (isSell === 'true') {
    const indexAmount = utils.parseUnits(amount, await index.decimals())
    autoRouterExampleDebug('Selling %s', utils.formatEther(indexAmount))

    const selectSellResult = await autoRouter.selectSell(
      index,
      indexAmount,
      token,
    )
    console.log('Sell start:')
    console.dir(
      `Selling ${utils.formatUnits(
        indexAmount.toString(),
        await index.decimals(),
      )} ${await index.symbol()} to ${
        token
          ? await token.symbol()
          : `NATIVE (chain: ${provider.network.chainId})`
      }`,
    )
    console.dir(
      `Current reserve:  ${utils.formatEther(
        reserveBefore,
      )} ${await reserveToken.symbol()}`,
    )
    console.log('Balances:')
    console.dir(
      `${utils.formatEther(indexBalanceBefore)} ${await index.symbol()}`,
    )
    console.dir(
      `${utils.formatEther(nativeBalanceBefore)} NATIVE (chain: ${
        provider.network.chainId
      })`,
    )
    token &&
      console.dir(
        `${utils.formatUnits(
          tokenBalanceBefore,
          await token.decimals(),
        )} ${await token.symbol()} `,
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
        indexAmount,
        token?.address,
        {
          zeroExOptions: {
            slippagePercentage,
          },
        },
      )

      console.dir(sellResult, { depth: 0 }) //INFO: Sell Result
      const reserveAfter = await reserveDepositRouter.reserve()
      const indexBalanceAfter = await index.contract.balanceOf(
        await index.account.address(),
      )
      const tokenBalanceAfter = token
        ? await token.contract.balanceOf(await index.account.address())
        : 0
      const nativeBalanceAfter = await provider.getBalance(
        index.account.address(),
      )
      console.log('Sell finish:')
      console.dir(
        `Current reserve:  ${utils.formatEther(
          reserveAfter,
        )} ${await reserveToken.symbol()}`,
      )

      console.log('Balances:')
      console.dir(
        `${utils.formatEther(indexBalanceAfter)} ${await index.symbol()}`,
      )
      console.dir(
        `${utils.formatEther(nativeBalanceAfter)} NATIVE (chain: ${
          provider.network.chainId
        })`,
      )
      token &&
        console.dir(
          `${utils.formatUnits(
            tokenBalanceAfter,
            await token.decimals(),
          )} ${await token.symbol()} `,
        )
    }
  } else {
    const assetAmount = utils.parseUnits(
      amount,
      token ? await token.decimals() : 18,
    )
    const selectBuyResult = await autoRouter.selectBuy(
      index,
      assetAmount,
      token,
    )
    console.log('Buy start:')
    console.dir(
      `Buying for:  ${utils.formatUnits(
        assetAmount.toString(),
        token ? await token.decimals() : 18,
      )} ${
        token
          ? await token.symbol()
          : `NATIVE (chain: ${provider.network.chainId})`
      }`,
    )
    console.dir(
      `Current reserve:  ${utils.formatEther(
        reserveBefore,
      )} ${await reserveToken.symbol()}`,
    )
    console.log('Balances:')
    console.dir(
      `${utils.formatEther(indexBalanceBefore)} ${await index.symbol()}`,
    )
    console.dir(
      `${utils.formatEther(nativeBalanceBefore)} NATIVE (chain: ${
        provider.network.chainId
      })`,
    )
    token &&
      console.dir(
        `${utils.formatUnits(
          tokenBalanceBefore,
          await token.decimals(),
        )} ${await token.symbol()} `,
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
        assetAmount,
        token?.address,
        {
          zeroExOptions: {
            slippagePercentage,
          },
        },
      )
      console.dir(buyResult, { depth: null }) //INFO: Buy Result
      const reserveAfter = await reserveDepositRouter.reserve()
      const indexBalanceAfter = await index.contract.balanceOf(
        await index.account.address(),
      )
      const tokenBalanceAfter = token
        ? await token.contract.balanceOf(await index.account.address())
        : 0
      const nativeBalanceAfter = await provider.getBalance(
        index.account.address(),
      )
      console.log('Buy finish:')
      console.dir(
        `Current reserve:  ${utils.formatEther(
          reserveAfter,
        )} ${await reserveToken.symbol()}`,
      )

      console.log('Balances:')
      console.dir(
        `${utils.formatEther(indexBalanceAfter)} ${await index.symbol()}`,
      )
      console.dir(
        `${utils.formatEther(nativeBalanceAfter)} NATIVE (chain: ${
          provider.network.chainId
        })`,
      )
      token &&
        console.dir(
          `${utils.formatUnits(
            tokenBalanceAfter,
            await token.decimals(),
          )} ${await token.symbol()} `,
        )
    }
  }
}

main().catch(console.error)
