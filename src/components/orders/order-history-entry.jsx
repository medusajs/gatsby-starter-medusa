import React from "react"
import OrderBulletin from "./order-bulletin"
import OrderHistoryItem from "./order-history-item"

const OrderHistoryEntry = ({ order }) => {
  return (
    <div className="border-b border-ui-medium last:border-none mb-12">
      <OrderBulletin order={order} />
      <div>
        {order.items.map((item, i) => {
          return (
            <OrderHistoryItem
              key={i}
              item={item}
              currencyCode={order.currency_code}
            />
          )
        })}
      </div>
    </div>
  )
}

export default OrderHistoryEntry
