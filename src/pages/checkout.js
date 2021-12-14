import React from "react"
import CheckoutFlow from "../components/domains/checkout/checkout-flow"
import SearchEngineOptimization from "../components/seo"

const Checkout = () => {
  return (
    <div className="bg-ui">
      <SearchEngineOptimization title="Checkout" />
      <CheckoutFlow />
    </div>
  )
}

export default Checkout
