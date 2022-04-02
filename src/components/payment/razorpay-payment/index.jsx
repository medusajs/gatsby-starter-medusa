import React, { useMemo } from "react"
import { useCart } from "../../../hooks/use-cart"
import RazorpayComponent from "./razorpay-component"
import InjectableCardFormRazorpay from "./injectable-card-form-razorpay"

const RAZORPAY_KEY = process.env.GATSBY_RAZORPAY_KEY || ""


const RazorpayPayment = ({session}) => {
  const { cart } = useCart()
  

  const razorpaySession = useMemo(() => {
    if (cart.payment_sessions) {
      return cart.payment_sessions.find(s => s.provider_id === "razorpay")
    }

    return null
  }, [cart.payment_sessions])

  if (!razorpaySession) {
    return null
  }

  const options = {
    client_secret: razorpaySession.data.client_secret,
  }

  return (
    <InjectableCardFormRazorpay session={razorpaySession} />
    
  )
}

export default RazorpayPayment
