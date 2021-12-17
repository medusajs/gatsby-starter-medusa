import React from "react"
import ShippingOptions from "../shipping/shipping-options"

const CheckoutDelivery = ({ controller, options, currencyCode = "eur" }) => {
  const { setSelectedShippingMethod, selectedShippingMethod } = controller
  return (
    <div className="my-8">
      <ShippingOptions
        defaultValue={selectedShippingMethod}
        onSelect={setSelectedShippingMethod}
        options={options}
        currencyCode={currencyCode}
      />
    </div>
  )
}

export default CheckoutDelivery
