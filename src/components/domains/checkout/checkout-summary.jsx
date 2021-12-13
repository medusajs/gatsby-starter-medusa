import React from "react"
import { classNames } from "../../../utils/class-names"
import Totals from "../../totals"
import CheckoutItem from "./checkout-item"
import DiscountField from "./discount-field"

const CheckoutSummary = ({ cart, shippingOption, hidden = true }) => {
  return (
    <div
      className={classNames(
        hidden ? "hidden lg:flex" : "flex",
        "absolute top-0 left-0 bottom-0 w-full flex-col lg:relative bg-white lg:rounded-lg shadow py-6 px-8 max-h-review overflow-hidden"
      )}
    >
      <div className="flex-grow overflow-y-scroll">
        {cart.items.map(item => {
          return (
            <div key={item.id} className="mb-4 last:mb-0">
              <CheckoutItem
                item={item}
                currencyCode={cart.region.currency_code}
              />
            </div>
          )
        })}
      </div>
      <div>
        <div className="my-4">
          <DiscountField cartId={cart.id} />
        </div>
        <Totals
          subtotal={cart.subtotal}
          total={cart.total}
          cartId={cart.id}
          shipping={shippingOption?.amount}
          currencyCode={cart.region?.currency_code}
          discount={cart.discount}
        />
      </div>
    </div>
  )
}

export default CheckoutSummary
