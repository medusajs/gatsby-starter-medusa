import { navigate } from "gatsby"
import React, { useState } from "react"
import { useCart } from "../../../hooks/use-cart"
import ErrorMessage from "../../utility/error-message"

// 🚧 This is a test payment, and is for testing purposes only.
// Look at the Medusa documentation on how to use one of our
// existing payment plugins or how to implement one:
// https://docs.medusajs.com/guides/plugins

const ManualPayment = () => {
  const {
    actions: { completeCart, setPaymentSession },
  } = useCart()

  const [processing, setProcessing] = useState(false)

  const handleTestPayment = async () => {
    setProcessing(true)

    const cart = await setPaymentSession("manual")

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

  return (
    <div className="flex flex-col">
      <ErrorMessage
        error={
          "This is for testing purposes only, and should not be used in a production environment."
        }
      />
      <button
        className="btn-ui my-4"
        onClick={handleTestPayment}
        disabled={processing}
      >
        {processing ? "Processing..." : "Test Payment"}
      </button>
    </div>
  )
}

export default ManualPayment
