import 'dotenv/config'

import { BigNumber, utils } from 'ethers'
import debug from 'debug'
import prepare from './prepare'
import yesno from 'yesno'
import { Address } from '../../../dist'

const autoRouterExampleDebug = debug('Auto Router Example')

const main = async () => {
  const {
    reserveToken,
    isSell,
    isMultiBurn,
    amount,
    index,
    autoRouter,
    token,
    provider,
    reserveDepositRouter,
    slippagePercentage,
    indexWithdrawRouter,
    createErc20,
  } = await prepare()
  const reserveBefore = await reserveDepositRouter.reserve()

  const indexBalanceBefore = await index.contract.balanceOf(
    await index.account.address(),
  )
  const tokenBalanceBefore = token
    ? await token.contract.balanceOf(await index.account.address())
    : 0
  const nativeBalanceBefore = await provider.getBalance(index.account.address())

  if (isSell === 'true' || isMultiBurn === 'true') {
    const indexAmount = utils.parseUnits(amount, await index.decimals())
    autoRouterExampleDebug('Selling %s', utils.formatEther(indexAmount))
    const [constituents, burnAmounts] = await Promise.all([
      index.constituents(),
      indexWithdrawRouter.burnTokensAmount(index, indexAmount),
    ])

    console.log(`Sell start(${isMultiBurn === 'true' ? 'MULTI' : 'COMMON'}) :`)
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
    const selectSellResult = await autoRouter.selectSell(
      index,
      indexAmount,
      token,
    )
    token &&
      console.dir(
        `${utils.formatUnits(
          tokenBalanceBefore,
          await token.decimals(),
        )} ${await token.symbol()} `,
      )
    if (isMultiBurn === 'true') {
      await Promise.all([
        constituents.map(async (el: { asset: string; weight: number }) => {
          const erc20Asset = await createErc20(el.asset)
          console.dir(
            `User has ${utils.formatUnits(
              await erc20Asset.contract.balanceOf(
                await index.account.address(),
              ),
              await erc20Asset.decimals(),
            )}  ${await erc20Asset.symbol()} on balance`,
          )
        }),
        (
          burnAmounts as { asset: Address; amount: BigNumber; weight: number }[]
        ).map(async ({ asset, amount, weight }) => {
          const erc20 = await createErc20(asset)
          console.table({
            amount: await utils.formatUnits(
              amount.toString(),
              await erc20.decimals(),
            ),
            symbol: await erc20.symbol(),
            address: asset,
            weight,
          })
        }),
      ])
    } else {
      console.table(selectSellResult)
    }

    if (
      await yesno({
        question: 'Do you want to sell?',
      })
    ) {
      if (isMultiBurn === 'true') {
        const result = await indexWithdrawRouter.burn(
          await index.address,
          indexAmount,
          await index.account.address(),
        )
        console.dir(result, { depth: 0 }) //INFO: Sell Result
        await Promise.all([
          constituents.map(async (el: { asset: string; weight: number }) => {
            const erc20Asset = await createErc20(el.asset)
            console.dir(
              `User has ${utils.formatUnits(
                await erc20Asset.contract.balanceOf(
                  await index.account.address(),
                ),
                await erc20Asset.decimals(),
              )}  ${await erc20Asset.symbol()} on balance`,
            )
          }),
          (
            burnAmounts as {
              asset: Address
              amount: BigNumber
              weight: number
            }[]
          ).map(async ({ asset, amount, weight }) => {
            const erc20 = await createErc20(asset)
            console.table({
              amount: await utils.formatUnits(
                amount.toString(),
                await erc20.decimals(),
              ),
              symbol: await erc20.symbol(),
              address: asset,
              weight,
            })
          }),
        ])
      } else {
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
      }

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
