import React, { useEffect } from "react"
import { useCart } from "../../../hooks/use-cart"
import ManualPayment from "./manual-payment"

const Payment = () => {
  const {
    cart,
    actions: { setPaymentSession, createPaymentSession },
  } = useCart()

  useEffect(() => {
    if (cart && !cart.payment_sessions?.length > 0) {
      return createPaymentSession(cart.id)
    }
  }, [cart])

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
                  setPaymentSession={() => setPaymentSession(cart.id, "manual")}
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
