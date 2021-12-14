import { navigate } from "gatsby"
import React, { useEffect, useState } from "react"
import { useCart } from "../../../../hooks/use-cart"
import ErrorMessage from "../../utility/error-message"

const ManualPayment = ({ setPaymentSession }) => {
  const {
    actions: { completeCart },
  } = useCart()

  const [processing, setProcessing] = useState(false)

  const handleTestPayment = async () => {
    setProcessing(true)
    await setPaymentSession().then(async cart => {
      console.log(cart)
      if (cart) {
        const order = await completeCart(cart.id)

        if (order) {
          setProcessing(false)
          navigate("/order-confirmed", { state: { order } })
        } else {
          console.log("Error completing cart")
          setProcessing(false)
        }
      }
    })

    setProcessing(false)

    return () => {
      setProcessing(false)
    }
  }

  useEffect(() => {
    console.warn(
      "🚧 This is a test payment, and is for testing purposes only. Look at the Medusa documentation on how to use one of our existing payment plugins or how to implement one: https://docs.medusajs.com/guides/plugins"
    )
  }, [])

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
