import React, { useEffect, useState } from "react"
import AccountLayout from "../../components/account/account-layout"
import OrderHistoryEntry from "../../components/orders/order-history-entry"
import SearchEngineOptimization from "../../components/utility/seo"
import { useCustomer } from "../../hooks/use-customer"

const OrderHistory = () => {
  const [orders, setOrders] = useState([])

  const {
    customer,
    loading,
    actions: { retrieveOrders },
  } = useCustomer()

  useEffect(() => {
    const getOrders = async () => {
      if (!loading && customer) {
        const orderResponse = await retrieveOrders()

        if (orderResponse) {
          setOrders(orderResponse)
        }
      }
    }

    getOrders()
  }, [loading, customer, retrieveOrders])

  return (
    <AccountLayout>
      <SearchEngineOptimization title="Order History" />
      <div className="bg-white shadow rounded-lg p-8">
        <div className="mb-6">
          <h1 className="text-xl">Order History</h1>
          <p className="text-sm font-light lg:w-2/3 leading-5">
            View the status of recent orders, and manage returns. It is not
            possible to return an order before it has been processed, if you
            wish to cancel your order then please contact us.
          </p>
        </div>
        <div>
          {orders.map(order => {
            return (
              <div key={order.display_id} className="mb-10 last:mb-0">
                <OrderHistoryEntry order={order} />
              </div>
            )
          })}
        </div>
      </div>
    </AccountLayout>
  )
}

export default OrderHistory
