import React, { useEffect } from "react"
import { useCart } from "../../../hooks/use-cart"
import ManualPayment from "./manual-payment"
import StripePayment from "./stripe-payment"

const Payment = ({ setupCheckout }) => {
  const {
    cart,
    actions: { setPaymentSession, createPaymentSession },
  } = useCart()

  useEffect(() => {
    if (cart && !cart.payment_sessions?.length) {
      return createPaymentSession(cart.id)
    }
  }, [cart])

  return (
    <div>
      <h2>Payment</h2>
      {cart &&
        cart.payment_sessions &&
        cart.payment_sessions.map(ps => {
          switch (ps.provider_id) {
            case "stripe":
              return (
                <StripePayment
                  key="stripe"
                  setPaymentSession={() => setPaymentSession(cart.id, "stripe")}
                  prePayment={setupCheckout}
                />
              )
            case "manual":
              return (
                <ManualPayment
                  key="manual"
                  setPaymentSession={() => setPaymentSession(cart.id, "manual")}
                  prePayment={setupCheckout}
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
