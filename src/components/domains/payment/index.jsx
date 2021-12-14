import React, { useEffect } from "react"
import { useCart } from "../../../hooks/use-cart"
import ManualPayment from "./manual-payment"

const Payment = ({ cartId = null }) => {
  const {
    cart,
    actions: { setPaymentSession, createPaymentSession },
  } = useCart()

  useEffect(() => {
    if (!cart.payment_sessions?.length > 0) {
      return createPaymentSession(cartId)
    }
  }, [cart, cartId])

  return (
    <div>
      {cart &&
        cart.payment_sessions &&
        cart.payment_sessions.map(ps => {
          switch (ps.provider_id) {
            case "manual":
              return (
                <ManualPayment
                  key="manual"
                  setPaymentSession={() => setPaymentSession("manual", cartId)}
                />
              )
            default:
              return null
          }
        })}
    </div>
  )
}

export default Payment
