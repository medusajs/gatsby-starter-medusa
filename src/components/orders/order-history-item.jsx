import React from "react"
import { useCart } from "../../hooks/use-cart"
import RegionalLink from "../utility/regional-link"

const OrderHistoryItem = ({ item, currencyCode }) => {
  const {
    actions: { addItem },
  } = useCart()

  return (
    <div className="flex mt-8 mb-8 last:mb-0">
      <div className="h-64 w-72 bg-ui-light rounded-lg mr-6">
        <img
          className="w-full h-auto object-cover object-center"
          src={item.thumbnail}
          alt={item.title}
        />
      </div>
      <div className="flex flex-col justify-between w-full py-2">
        <div className="flex items-baseline justify-between">
          <div>
            <h3 className="text-sm lg:text-lg">{item.title}</h3>
            <div className="text-sm flex flex-col mt-2">
              <span className="mb-2">
                <span className="text-ui-dark">Variant: </span>
                <span>{item.description}</span>
              </span>
              <span>
                <span className="text-ui-dark">Quantity: </span>
                <span>{item.quantity}</span>
              </span>
            </div>
          </div>
          <span className="text-sm lg:text-lg font-semibold">
            {((item.unit_price * item.quantity) / 100).toFixed(2)}{" "}
            {currencyCode.toUpperCase()}
          </span>
        </div>
        <div>
          <div className="flex items-center text-sm font-medium">
            <RegionalLink to={item.variant.product.handle}>
              View Product
            </RegionalLink>
            <div className="bg-ui-dark h-4 w-px mx-4" />
            <button
              className="text-gray-500 hover:text-gray-700 font-medium"
              onClick={() =>
                addItem({
                  variant_id: item.variant.id,
                  quantity: item.quantity,
                })
              }
            >
              Buy Again
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderHistoryItem
