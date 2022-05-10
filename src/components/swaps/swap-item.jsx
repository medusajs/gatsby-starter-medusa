import React from "react"
import { formatPrice } from "../../utils/format-price"
import DividedContainer from "../utility/divided-container"

const SwapItem = ({ item, currencyCode, taxRate }) => {
  return (
    <div className="flex items-center">
      <img
        src={item.thumbnail}
        alt={item.title}
        className="rounded-md w-auto h-24 object-cover object-center"
      />
      <div className="ml-2 flex flex-col justify-between">
        <div className="flex flex-col flex-grow">
          <p className="font-semibold">{item.title}</p>
          <p className="text-sm">
            <span className="text-ui-dark">Variant:</span> {item.variant.title}
          </p>
        </div>
        <div className="flex text-sm mt-4">
          <DividedContainer>
            <p>
              <span className="text-ui-dark">Quantity</span> {item.quantity}
            </p>
            <p>
              <span className="text-ui-dark">Total</span>{" "}
              {formatPrice(
                item.unit_price,
                currencyCode,
                item.quantity,
                taxRate
              )}
            </p>
          </DividedContainer>
        </div>
      </div>
    </div>
  )
}

export default SwapItem
