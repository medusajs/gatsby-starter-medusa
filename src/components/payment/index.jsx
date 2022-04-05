import React, { useEffect } from "react"
import { useCart } from "../../hooks/use-cart"
import ManualPayment from "./manual-payment"
import StripePayment from "./stripe-payment"

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
      {cart && cart.payment_sessions ? (
        cart.payment_sessions.map(ps => {
          switch (ps.provider_id) {
            case "stripe":
              return <StripePayment />
            case "manual":
              return <ManualPayment key="manual" />
            default:
              return null
          }
        })
      ) : (
        <div className="flex items-center py-4 justify-center">
          <svg
            class="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <div />
        </div>
      )}
    </div>
  )
}

export default Payment
