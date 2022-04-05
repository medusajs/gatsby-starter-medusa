import React from "react"
import { useEstimatedShipping } from "../../hooks/use-estimated-shipping"
import { formatPrice } from "../../utils/format-price"

const Totals = ({
  subtotal = 0,
  shipping = null,
  discount = null,
  total = 0,
  currencyCode = "eur",
  cartId = null,
}) => {
  const { estimatedShipping } = useEstimatedShipping(cartId)

  const appliedDiscount = discount?.length ? discount[0] : 0

  const totalPrice = shipping ? subtotal + shipping : subtotal + estimatedShipping

  return (
    <div className="font-light text-sm">
      <div className="flex items-center justify-between mb-2">
        <p>Subtotal (incl. taxes)</p>
        <p className="font-medium">{formatPrice(subtotal, currencyCode)}</p>
      </div>
      {shipping && (
        <div className="flex items-center justify-between mb-2">
          <p>Shipping</p>
          <p className="font-medium">{formatPrice(shipping, currencyCode)}</p>
        </div>
      )}
      {!shipping && estimatedShipping && (
        <div className="flex items-center justify-between mb-2">
          <p>Estimated shipping</p>
          <p className="font-medium">
            {formatPrice(estimatedShipping, currencyCode)}
          </p>
        </div>
      )}
      {appliedDiscount ? (
        <div className="flex items-center justify-between mb-2">
          <div className="inline-flex items-center">
            <p>Discount</p>
            <span className="text-2xs py-1 px-3 rounded-2xl bg-ui-medium ml-2 font-medium">
              {discount.code}
            </span>
          </div>
          <p className="font-medium">
            {formatPrice(discount.amount, currencyCode)}
          </p>
        </div>
      ) : null}
      <div className="h-px w-full bg-ui-medium mb-2" />
      <div className="flex items-center justify-between">
        <p>Total</p>
        <p className="font-medium">{formatPrice(totalPrice, currencyCode)}</p>
      </div>
    </div>
  )
}

export default Totals
