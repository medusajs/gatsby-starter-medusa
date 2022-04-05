import React from "react"
import { useDiscount } from "../../hooks/use-discount"
import { useEstimatedShipping } from "../../hooks/use-estimated-shipping"
import { formatPrice } from "../../utils/format-price"

const Totals = ({ cart, shippingOption }) => {
  const { estimatedShipping } = useEstimatedShipping(cart.id)

  const inMemoryShippingAmount = shippingOption?.amount || estimatedShipping

  const appliedDiscount = useDiscount(cart.discounts)

  const currencyCode = cart.region?.currency_code || "eur"
  const total = cart.shipping_total
    ? cart.total - cart.shipping_total + inMemoryShippingAmount
    : cart.total + inMemoryShippingAmount

  return (
    <div className="font-light text-sm">
      <div className="flex items-center justify-between mb-2">
        <p>Subtotal</p>
        <p className="font-medium">
          {formatPrice(cart.subtotal, currencyCode)}
        </p>
      </div>
      {shippingOption && (
        <div className="flex items-center justify-between mb-2">
          <p>Shipping</p>
          <p className="font-medium">
            {formatPrice(shippingOption.amount, currencyCode)}
          </p>
        </div>
      )}
      {!shippingOption && estimatedShipping && (
        <div className="flex items-center justify-between mb-2">
          <p>Estimated shipping</p>
          <p className="font-medium">
            {formatPrice(estimatedShipping, currencyCode)}
          </p>
        </div>
      )}
      <div className="flex items-center justify-between mb-2">
        <p>Taxes</p>
        <p className="font-medium">
          {formatPrice(cart.tax_total, currencyCode)}
        </p>
      </div>
      {appliedDiscount ? (
        <div className="flex items-center justify-between mb-2">
          <div className="inline-flex items-center">
            <p>Discount</p>
            <span className="text-2xs py-1 px-3 rounded-2xl bg-ui-medium ml-2 font-medium">
              {appliedDiscount.code}
            </span>
          </div>
          <p className="font-medium">
            {appliedDiscount.type === "percentage"
              ? `- ${appliedDiscount.value}%`
              : appliedDiscount.type === "free_shipping"
              ? "Free Shipping"
              : `- ${formatPrice(appliedDiscount.value, currencyCode)}`}
          </p>
        </div>
      ) : null}
      <div className="h-px w-full bg-ui-medium mb-2" />
      <div className="flex items-center justify-between">
        <p>Total</p>
        <p className="font-medium">{formatPrice(total, currencyCode)}</p>
      </div>
    </div>
  )
}

export default Totals
