import React from "react"
import { formatPrice } from "../../utils/format-price"
import ImageContainer from "../utility/image-container"

const CheckoutItem = ({ item, currencyCode }) => {
  return (
    <div className="flex">
      <div className="mr-4">
        <ImageContainer src={item.thumbnail} alt={item.title} size="sm" />
      </div>
      <div className="flex justify-between w-full text-sm py-2">
        <div className="flex flex-col justify-between">
          <div>
            <p className="font-semibold mb-2">{item.title}</p>
            <p>Variant: {item.description}</p>
          </div>
          <div>
            <p className="mb-2">Quantity: {item.quantity}</p>
            <p className="font-medium">
              Total: {formatPrice(item.unit_price, currencyCode, item.quantity)}
            </p>
          </div>
        </div>
        <div>
          <p>
            <p className="font-medium">
              {formatPrice(item.unit_price, currencyCode, 1)}
            </p>
          </p>
        </div>
      </div>
    </div>
  )
}

export default CheckoutItem
