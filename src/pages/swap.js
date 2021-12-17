import { navigate } from "gatsby"
import React, { useEffect, useState } from "react"
import ShippingOptions from "../components/shipping/shipping-options"
import SwapItem from "../components/swaps/swap-item"
import Divider from "../components/utility/divider"
import ErrorMessage from "../components/utility/error-message"
import SearchEngineOptimization from "../components/utility/seo"
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
  const [additionalShippingOptions, setAdditionalShippingOptions] = useState([])
  const [seletedShippingOption, setSelectedShippingOption] = useState(undefined)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [paymentError, setPaymentError] = useState(undefined)

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

        const options = await client.shippingOptions
          .listCartOptions(cart.id)
          .then(({ shipping_options }) => shipping_options)
          .catch(_ => [])

        setSelectedShippingOption(options?.[0])

        setAdditionalShippingOptions(options)
      }
      setLoading(false)
    }

    getReturn()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state])

  useEffect(() => {
    if (cart) {
      setCurrencyCode(cart.region.currency_code)
      setTaxRate(cart.region.tax_rate)

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

  useEffect(() => {
    let amountDue = 0

    if (cart) {
      amountDue += cart.total
    }

    if (seletedShippingOption) {
      amountDue += seletedShippingOption.amount
    }

    setAmountDue(formatPrice(amountDue, currencyCode, 1, taxRate))
  }, [cart, seletedShippingOption, currencyCode, taxRate])

  const handlePayment = async () => {
    setIsSubmitting(true)

    const cartWithShipping = await client.carts
      .addShippingMethod(cart.id, {
        option_id: seletedShippingOption?.id,
      })
      .then(({ cart }) => cart)
      .catch(_ => undefined)

    if (cartWithShipping) {
      setCart(cartWithShipping)
    } else {
      setIsSubmitting(false)
      setPaymentError("An error has occurred, please try again.")
      return
    }

    if (!cart.payment_sessions || cart.payment_sessions?.length === 0) {
      const cartRes = await client.carts
        .createPaymentSessions(cart.id)
        .then(({ cart }) => cart)
        .catch(_ => undefined)

      if (cartRes) {
        setCart(cartRes)
      } else {
        setIsSubmitting(false)
        return
      }
    }

    const cartWithPayment = await client.carts
      .setPaymentSession(cart.id, { provider_id: "manual" })
      .then(({ cart }) => cart)
      .catch(_ => undefined)

    if (cartWithPayment) {
      setCart(cartWithPayment)
    } else {
      setIsSubmitting(false)
      setPaymentError("An error has occurred, please try again.")
      return
    }

    const confirmed = await client.carts
      .complete(cart.id)
      .then(res => res)
      .catch(_ => undefined)

    if (confirmed) {
      navigate("/swap-confirmed", { state: { success: true }, replace: true })
    } else {
      setIsSubmitting(false)
      setPaymentError("An error has occurred, please try again.")
      return
    }
  }

  return !loading && swap ? (
    <div className="layout-base flex justify-center pb-16">
      <SearchEngineOptimization title="Complete Exchange" />
      <div className="max-w-xl">
        <span className="text-xs font-medium mb-2">ALMOST THERE</span>
        <h1>Difference Due</h1>
        <p className="text-md font-light mt-3">
          The total of your additional items was greater then the total of the
          items you are returning. To complete your exchange you must pay the
          difference.
        </p>
        <Divider />
        <div>
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
        <Divider />
        <div>
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
        <Divider />
        <h3>Select shipping for additiona items</h3>
        <ShippingOptions
          options={additionalShippingOptions}
          currencyCode={currencyCode}
          onSelect={setSelectedShippingOption}
          defaultValue={seletedShippingOption}
        />
        <Divider />
        {swapItems.returnShipping && (
          <div className="flex items-center justify-between">
            <p className="font-semibold">
              {swapItems.returnShipping.title}{" "}
              <span className="font-light">(for return items)</span>
            </p>
            <p>
              {formatPrice(
                swapItems.returnShipping.unit_price,
                currencyCode,
                1,
                taxRate
              )}
            </p>
          </div>
        )}
        {seletedShippingOption && (
          <div className="flex items-center justify-between mt-2">
            <p className="font-semibold">
              {seletedShippingOption.name}{" "}
              <span className="font-light">(for exchange items)</span>
            </p>
            <p>
              {formatPrice(
                seletedShippingOption.amount,
                currencyCode,
                1,
                taxRate
              )}
            </p>
          </div>
        )}
        <Divider />
        <div className="flex items-center justify-between mt-2">
          <p className="font-semibold">Amount Due</p>
          <p>{amountDue}</p>
        </div>
        <div>
          {paymentError && (
            <div className="mt-2">
              <ErrorMessage error={paymentError} />
            </div>
          )}
          <ErrorMessage
            error={
              "This is for testing purposes only, and should not be used in a production environment."
            }
          />
          <button
            className="w-full btn-ui mt-2"
            onClick={handlePayment}
            disabled={isSubmitting}
          >
            Pay
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div>
      <p>loading...</p>
    </div>
  )
}

export default Swap
