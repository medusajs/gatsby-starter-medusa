import React from "react"
import { formatPrice } from "../../utils/format-price"
import DividedContainer from "../utility/divided-container"
import ImageContainer from "../utility/image-container"

const OrderCompletedItem = ({ item, currencyCode }) => {
  return (
    <div className="flex mb-6 last:mb-0">
      <div className="mr-6">
        <ImageContainer src={item.thumbnail} alt={item.title} />
      </div>
      <div className="flex flex-col justify-between py-2">
        <div>
          <h3>{item.title}</h3>
          <div className="text-sm mt-4">
            <p className="mb-2 last:mb-0">
              Variant: <span>{item.description}</span>
            </p>
          </div>
        </div>
        <div className="text-sm text-ui-dark">
          <DividedContainer>
            <p>
              Quantity{" "}
              <span className="text-gray-700 font-semibold">
                {item.quantity}
              </span>
            </p>
            <p>
              Price{" "}
              <span className="text-gray-700 font-semibold">
                {formatPrice(
                  item.unit_price,
                  currencyCode,
                  item.quantity,
                )}
              </span>
            </p>
          </DividedContainer>
        </div>
      </div>
    </div>
  )
}

export default OrderCompletedItem
