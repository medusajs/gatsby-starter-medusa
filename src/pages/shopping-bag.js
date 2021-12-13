import React from "react"
import CartItem from "../components/domains/cart/cart-item"
import CartReview from "../components/domains/cart/cart-review"
import SearchEngineOptimization from "../components/seo"
import { useCart } from "../hooks/use-cart"

const ShoppingBag = () => {
  const { cart } = useCart()
  return (
    <div className="layout-base">
      <SearchEngineOptimization title="Shopping Bag" />
      <div className="flex relative flex-col-reverse lg:flex-row">
        <div className="flex flex-col lg:mr-12 lg:w-3/5">
          <div className="mb-8">
            <h1 className="font-semibold">Shopping Bag</h1>
          </div>
          <div className="w-full">
            {cart.items.map(item => {
              return (
                <CartItem
                  key={item.id}
                  item={item}
                  currencyCode={cart.region?.currency_code}
                />
              )
            })}
          </div>
        </div>
        <div className="relative w-full mb-8 lg:mb-0 lg:w-2/5">
          <CartReview cart={cart} />
        </div>
      </div>
    </div>
  )
}

export default ShoppingBag
