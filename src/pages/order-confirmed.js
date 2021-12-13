import React, { useEffect, useState } from "react"
import OrderCompletedItem from "../components/domains/orders/order-completed-item"
import SearchEngineOptimization from "../components/seo"
import Totals from "../components/totals"

const OrderConfirmed = ({ location }) => {
  const [order, setOrder] = useState(undefined)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getOrder = async () => {
      const state = location.state
      const stateOrder = state?.order

      if (stateOrder) {
        setOrder(stateOrder)
      }
      setLoading(false)
    }

    getOrder()
  }, [location.state])

  return !loading && order ? (
    <div className="layout-base flex justify-center pb-16">
      <SearchEngineOptimization title="Order Confirmed" />
      <div className="max-w-xl">
        <span className="text-xs font-medium mb-2">THANK YOU</span>
        <h1>Order Confirmed</h1>
        <p className="text-md font-light mt-3">
          Your order #{order.display_id} was successfully processed. You will
          receive an email with the tracking number of your parcel once it’s
          avaliable.
        </p>
        <div className="my-8">
          {order.items.map((item, index) => {
            return (
              <OrderCompletedItem
                key={index}
                item={item}
                currencyCode={order.currency_code}
                taxRate={order.tax_rate}
              />
            )
          })}
        </div>
        <Totals
          currencyCode={order.currency_code}
          subtotal={order.subtotal}
          shipping={order.shipping_total}
          total={order.total}
          discount={order.discounts}
        />
      </div>
    </div>
  ) : (
    <div>
      <p>loading...</p>
    </div>
  )
}

export default OrderConfirmed
