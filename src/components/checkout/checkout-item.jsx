import React from "react"
import { useCart } from "../../hooks/use-cart"
import { formatPrice } from "../../utils/format-price"
import QuantitySelector from "../products/quantity-selector"
import ImageContainer from "../utility/image-container"

const CheckoutItem = ({ item, currencyCode }) => {
  const {
    actions: { removeItem, updateQuantity },
  } = useCart()
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
          <p>{formatPrice(item.unit_price, currencyCode, item.quantity)}</p>
        </div>
        <div className="flex flex-col justify-between pr-2">
          <div className="flex justify-end">
            <button onClick={async () => removeItem(item.id)}>&times;</button>
          </div>
          <QuantitySelector
            quantity={item.quantity}
            increment={async () =>
              updateQuantity({ id: item.id, quantity: item.quantity + 1 })
            }
            decrement={async () =>
              updateQuantity({ id: item.id, quantity: item.quantity - 1 })
            }
          />
        </div>
      </div>
    </div>
  )
}

export default CheckoutItem
