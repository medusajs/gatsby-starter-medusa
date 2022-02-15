import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { navigate } from "gatsby"
import React, { useState } from "react"
import { useCart } from "../../../hooks/use-cart"

const InjectableCardForm = ({ session }) => {
  const [errorMessage, setErrorMessage] = useState(undefined)
  const [processing, setProcessing] = useState(false)
  const {
    cart,
    actions: { completeCart, setPaymentSession },
  } = useCart()

  const stripe = useStripe()
  const elements = useElements()

  const completeOrder = async () => {
    const cart = await setPaymentSession("stripe")

    if (!cart) {
      setProcessing(false)
      return
    }

    const order = await completeCart(cart.id)

    if (!order) {
      setProcessing(false)
      return
    }

    setProcessing(false)
    navigate("/order-confirmed", { state: { order } })
  }

  const handlePayment = async e => {
    e.preventDefault()
    setProcessing(true)

    if (!stripe || !elements) {
      return
    }

    const { client_secret } = session.data
    const email = cart.email
    const address = cart.shipping_address

    return stripe
      .confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: address.fullName,
            email: email,
            phone: address.phone,
            address: {
              city: address.city,
              country: address.country,
              line1: address.line1,
              line2: address.line2,
              postal_code: address.postal,
            },
          },
        },
      })
      .then(({ error, paymentIntent }) => {
        if (error) {
          const pi = error.payment_intent

          if (
            (pi && pi.status === "requires_capture") ||
            (pi && pi.status === "succeeded")
          ) {
            completeOrder()
          }

          setErrorMessage(error.message)
          setProcessing(false)
          return
        }

        if (
          (paymentIntent && paymentIntent.status === "requires_capture") ||
          paymentIntent.status === "succeeded"
        ) {
          completeOrder()
        }

        return
      })
  }

  return (
    <div className="mt-4">
      <div>
        <CardElement className="py-4" />
        {errorMessage && (
          <span className="text-rose-500 mt-4">{errorMessage}</span>
        )}
      </div>
      <div>
        <button
          className="btn-ui my-4 w-full flex items-center justify-center"
          disabled={processing}
          onClick={handlePayment}
        >
          {processing && (
            <svg
              class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          )}
          Pay
        </button>
      </div>
    </div>
  )
}
export default InjectableCardForm
