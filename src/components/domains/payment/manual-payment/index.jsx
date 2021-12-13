import { navigate } from "gatsby"
import React, { useEffect, useState } from "react"
import { useCart } from "../../../../hooks/use-cart"
import ErrorMessage from "../../utility/error-message"

const ManualPayment = ({ setPaymentSession, prePayment }) => {
  const {
    actions: { completeCart },
  } = useCart()

  const [processing, setProcessing] = useState(false)

  const handleTestPayment = async () => {
    setProcessing(true)
    const validCheckout = await prePayment()

    if (validCheckout) {
      await setPaymentSession().then(async cart => {
        if (cart) {
          const order = await completeCart(cart.id)

          if (order) {
            setProcessing(false)
            navigate("/order-confirmed", { state: { order } })
          }
        }
      })
    }

    setProcessing(false)
  }

  useEffect(() => {
    console.warn(
      "🚧 This is a test payment, and is for testing purposes only. Look at the Medusa documentation on how to use one of our existing payment plugins or how to implement one: https://docs.medusajs.com/guides/plugins"
    )
  }, [])

  return (
    <div className="py-4 flex flex-col">
      <ErrorMessage
        error={
          "This is for testing purposes only, and should not be used in a production environment."
        }
      />
      <button
        className="btn-ui mt-4"
        onClick={handleTestPayment}
        disabled={processing}
      >
        Pay
      </button>
    </div>
  )
}

export default ManualPayment
