import { Link } from "gatsby"
import React from "react"
import Totals from "../../totals"

const CartReview = ({ cart }) => {
  return (
    <div className="bg-white rounded-md shadow px-8 py-6 w-full sticky top-28">
      <h3 className="font-semibold mb-4">Order Summary</h3>
      <div className="mb-4">
        <Totals
          subtotal={cart.subtotal}
          total={cart.total}
          currencyCode={cart.region?.currency_code}
          cartId={cart.id}
        />
      </div>
      <Link to="/checkout">
        <button className="btn-ui w-full">Checkout</button>
      </Link>
    </div>
  )
}

export default CartReview
