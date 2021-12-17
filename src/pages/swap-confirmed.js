import React, { useEffect, useState } from "react"
import SearchEngineOptimization from "../components/utility/seo"

const OrderConfirmed = ({ location }) => {
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getOrder = async () => {
      const state = location.state
      const success = state?.success

      if (success) {
        setSuccess(success)
      }
      setLoading(false)
    }

    getOrder()
  }, [location.state])

  return !loading && success ? (
    <div className="layout-base flex justify-center pb-16">
      <SearchEngineOptimization title="Order Confirmed" />
      <div className="max-w-xl">
        <span className="text-xs font-medium mb-2">THANK YOU</span>
        <h1>Exchange Completed</h1>
        <p className="text-md font-light mt-3">
          Your exchange was successfully processed. You will receive an email
          with the tracking number of your parcel once it’s avaliable.
        </p>
      </div>
    </div>
  ) : (
    <div className="layout-base">
      <div className="flex justify-center items-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    </div>
  )
}

export default OrderConfirmed
