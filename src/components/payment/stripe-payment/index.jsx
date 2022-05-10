import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import React, { useMemo } from "react"
import { useCart } from "../../../hooks/use-cart"
import InjectableCardForm from "./injectable-card-form"

const STRIPE_KEY = process.env.GATSBY_STRIPE_KEY || ""
const stripePromise = loadStripe(STRIPE_KEY)

const StripePayment = () => {
  const { cart } = useCart()

  const stripeSession = useMemo(() => {
    if (cart.payment_sessions) {
      return cart.payment_sessions.find(s => s.provider_id === "stripe")
    }

    return null
  }, [cart.payment_sessions])

  if (!stripeSession) {
    return null
  }

  const options = {
    client_secret: stripeSession.data.client_secret,
  }

  return (
    <Elements stripe={stripePromise} options={options}>
      <InjectableCardForm session={stripeSession} />
    </Elements>
  )
}

export default StripePayment
