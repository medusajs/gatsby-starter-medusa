import React, { useEffect, useState } from "react"
import SwapItem from "../components/domains/swaps/swap-item"
import SearchEngineOptimization from "../components/seo"
import { useMedusa } from "../hooks/use-medusa"
import { formatPrice } from "../utils/format-price"

const Swap = ({ location }) => {
  const [swap, setSwap] = useState(undefined)
  const [cart, setCart] = useState(undefined)
  const [loading, setLoading] = useState(true)
  const [amountDue, setAmountDue] = useState(undefined)
  const [currencyCode, setCurrencyCode] = useState("eur")
  const [taxRate, setTaxRate] = useState(0)
  const [swapItems, setSwapItems] = useState({
    additionalItems: [],
    returnItems: [],
    returnShipping: undefined,
  })

  const client = useMedusa()

  useEffect(() => {
    const getReturn = async () => {
      const state = location.state
      const stateSwap = state?.swap

      if (stateSwap) {
        setSwap(stateSwap)

        const cart = await client.carts
          .retrieve(stateSwap.cart_id)
          .then(({ cart }) => cart)
          .catch(_ => undefined)

        setCart(cart)
      }
      setLoading(false)
    }

    getReturn()
  }, [location.state])

  useEffect(() => {
    if (cart) {
      setCurrencyCode(cart.region.currency_code)
      setTaxRate(cart.region.tax_rate)

      setAmountDue(
        formatPrice(
          cart.total,
          cart.region.currency_code,
          1,
          cart.region.tax_rate
        )
      )

      const additionalItems = cart.items.filter(
        item => item.unit_price > 0 && item.variant_id !== null
      )
      const returnItems = cart.items.filter(
        item => item.unit_price < 0 && item.variant_id !== null
      )
      const returnShipping = cart.items.find(
        item => item.unit_price >= 0 && item.variant_id === null
      )

      setSwapItems({
        additionalItems,
        returnItems,
        returnShipping,
      })
    }
  }, [cart])

  return !loading && swap ? (
    <div className="layout-base flex justify-center pb-16">
      <SearchEngineOptimization title="Complete exchange" />
      <div className="max-w-xl">
        <span className="text-xs font-medium mb-2">ALMOST THERE</span>
        <h1>Amount Due – {amountDue}</h1>
        <p className="text-md font-light mt-3">
          The total of your additional items was greater then the total of the
          items you are returning. To complete your exchange you must pay the
          difference.
        </p>
        <div className="mt-8">
          <h3 className="mb-2">Additional Items</h3>
          {swapItems.additionalItems.map((item, index) => {
            return (
              <SwapItem
                key={index}
                item={item}
                currencyCode={currencyCode}
                taxRate={taxRate}
              />
            )
          })}
        </div>
        <div className="mt-8">
          <h3 className="mb-2">Return Items</h3>
          {swapItems.returnItems.map((item, index) => {
            return (
              <SwapItem
                key={index}
                item={item}
                currencyCode={currencyCode}
                taxRate={taxRate}
              />
            )
          })}
        </div>
        {swapItems.returnShipping && (
          <div className="mt-8">
            <p>{swapItems.returnShipping.title}</p>
          </div>
        )}
      </div>
    </div>
  ) : (
    <div>
      <p>loading...</p>
    </div>
  )
}

export default Swap
