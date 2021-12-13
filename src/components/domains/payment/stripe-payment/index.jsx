import { Elements } from "@stripe/react-stripe-js"
import React from "react"
import getStripe from "../../../../utils/get-stripe"
import InjectablePaymentCard from "./injectable-payment-card"

const StripePayment = ({ session, setPaymentSession }) => {
  return (
    <div>
      <Elements stripe={getStripe()}>
        <InjectablePaymentCard
          session={session}
          onSetPaymentSession={setPaymentSession}
        />
      </Elements>
    </div>
  )
}

export default StripePayment
