import React from "react"
import { classNames } from "../../utils/class-names"
import Totals from "../checkout/totals"
import CheckoutItem from "./checkout-item"
import DiscountField from "./discount-field"

const CheckoutSummary = ({ cart, shippingOption }) => {
  return (
    <div
      className={classNames(
        "flex w-full flex-col lg:relative bg-white mb-4 lg:mb-0 rounded-lg shadow py-6 px-8 max-h-review overflow-hidden"
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
          cart={cart}
          shippingOption={shippingOption}
        />
      </div>
    </div>
  )
}

export default CheckoutSummary
