import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import React, { useState } from "react"

const InjectablePaymentCard = ({ session, onSetPaymentSession }) => {
  const [succeeded, setSucceeded] = useState(false)
  const [error, setError] = useState(false)
  const [processing, setProcessing] = useState(false)
  const [disabled, setDisabled] = useState(false)

  const stripe = useStripe()
  const elements = useElements()

  const handleChange = async event => {
    setDisabled(event.empty)
    setError(event.error ? event.error.message : false)
  }

  const handleSubmit = async event => {
    event.preventDefault()
    setProcessing(true)

    await onSetPaymentSession()

    const payload = await stripe.confirmCardPayment(session.client_secret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    })
    if (payload.error) {
      setError(`${payload.error.message}`)
      setProcessing(false)
    } else {
      setError(null)
      setProcessing(false)
      setSucceeded(true)
    }
  }

  return (
    <div>
      <form id="payment-form" onSubmit={handleSubmit}>
        <CardElement id="card-element" onChange={handleChange} />
        {error && (
          <div className="payment-form__error" role="alert">
            {error}
          </div>
        )}
        <button disabled={processing || disabled || succeeded} type="submit">
          Pay
        </button>
      </form>
    </div>
  )
}

export default InjectablePaymentCard
