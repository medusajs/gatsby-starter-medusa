//import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { navigate } from "gatsby"
import React, { useState } from "react"
import { useCart } from "../../../hooks/use-cart"
import RazorpayComponent from "./razorpay-component"

const InjectableCardFormRazorpay = ({ session }) => {
  const [errorMessage, setErrorMessage] = useState(undefined)
  const [processing, setProcessing] = useState(false)
  const {
    cart,
    actions: { completeCart, setPaymentSession,updatePaymentSession },
  } = useCart()


  const razorpay = new RazorpayComponent()
  
  const completeOrder = async (response) => {
    const cart = await setPaymentSession("razorpay")

    if (!cart) {
      setProcessing(false)
      return
    }
    const cart_updated = await updatePaymentSession(cart.id,"razorpay",response)

    if (!cart_updated) {
      setProcessing(false)
      return
    }

    const order = await completeCart(cart_updated.id)

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
    

   let razorpayPaymentResponse = razorpay.openPayModal(session,cart,completeOrder,setErrorMessage,setProcessing)  ;

    return razorpayPaymentResponse
    
      
  }

  return (
    <div className="mt-4">
      <div>
      {razorpay.loadComponent()}
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
          Pay via Razorpay
        </button>
      </div>
    </div>
  )
}
export default InjectableCardFormRazorpay
