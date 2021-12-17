import React, { useEffect } from "react"
import { useCart } from "../../hooks/use-cart"
import ManualPayment from "./manual-payment"

const Payment = ({ cartId = null }) => {
  const {
    cart,
    actions: { createPaymentSession },
  } = useCart()

  useEffect(() => {
    const cartIdentifier = cartId || cart.id

    if (cartIdentifier && !cart.payment_sessions?.length > 0) {
      return createPaymentSession(cartId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart, cartId])

  return (
    <div>
      {cart &&
        cart.payment_sessions &&
        cart.payment_sessions.map(ps => {
          switch (ps.provider_id) {
            case "manual":
              return <ManualPayment key="manual" />
            default:
              return null
          }
        })}
    </div>
  )
}

export default Payment
