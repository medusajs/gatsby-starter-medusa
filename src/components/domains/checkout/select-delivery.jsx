import _ from "lodash"
import React, { useEffect, useState } from "react"
import { useCart } from "../../../hooks/use-cart"
import { useRegion } from "../../../hooks/use-region"
import ShippingOptions from "../shipping/shipping-options"

const SelectDelivery = ({ getShippingOptions, setSelectedShippingMethod }) => {
  const [error, setError] = useState(null)
  const [shippingOptions, setShippingOptions] = useState([])

  const { cart } = useCart()
  const { region } = useRegion()

  useEffect(() => {
    if (!cart?.id) {
      return
    }

    getShippingOptions(cart.id).then(options => {
      if (_.isEmpty(options)) {
        setError("No shipping options available")
        return
      }

      if (options && options.length === 1) {
        setSelectedShippingMethod(options[0].id)
      }
      setError(null)
      setShippingOptions(options)
    })

    return () => {
      setShippingOptions([])
    }
  }, [cart?.id, setSelectedShippingMethod, getShippingOptions])

  useEffect(() => {
    if (region && cart?.id) {
      getShippingOptions(cart.id).then(options => {
        if (_.isEmpty(options)) {
          setError("No shipping options available")
          return
        }

        if (options && options.length === 1) {
          setSelectedShippingMethod(options[0].id)
        }
        setError(null)
        setShippingOptions(options)
      })

      return () => {
        setShippingOptions([])
      }
    }
  }, [region, cart?.id, setSelectedShippingMethod, getShippingOptions])

  return (
    <div>
      {!error && shippingOptions && (
        <ShippingOptions
          title="Delivery method"
          options={shippingOptions}
          currencyCode={cart?.region?.currency_code}
          onSelect={setSelectedShippingMethod}
        />
      )}
      {error && (
        <span role="alert" className="text-red-500">
          {error}
        </span>
      )}
    </div>
  )
}

export default SelectDelivery
