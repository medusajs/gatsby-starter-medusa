import React, { useMemo } from "react"
import { useCart } from "../../../hooks/use-cart"
import InjectableCardFormRazorpay from "./injectable-card-form-razorpay"
/***
 * Component included to razorpay as payment mode in the gatsby starter
 * 
 * 
 */



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


  return (
    <InjectableCardFormRazorpay session={razorpaySession} />
    
  )
}

export default RazorpayPayment
