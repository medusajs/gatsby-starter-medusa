import { Link } from "gatsby"
import React from "react"
import { capitalize } from "../../../utils/capitalize"
import { classNames } from "../../../utils/class-names"
import { formatPrice } from "../../../utils/format-price"
import OrderBulletinInfo from "./order-bulletin-info"

const OrderBulletin = ({ order, cta = true }) => {
  return (
    <div className="bg-ui-light flex items-center justify-between p-4 rounded-md">
      <div
        className={classNames(
          "flex items-center",
          !cta ? "justify-between w-full" : ""
        )}
      >
        <div className="mr-10">
          <OrderBulletinInfo
            label="Order number"
            info={`#${order.display_id}`}
          />
        </div>
        <div className="hidden lg:block mr-10">
          <OrderBulletinInfo
            label="Date placed"
            info={new Date(order.created_at).toLocaleDateString()}
          />
        </div>
        <div className="hidden lg:block mr-10">
          <OrderBulletinInfo
            label="Shipment"
            info={capitalize(order.fulfillment_status.replace(/_/g, " "))}
          />
        </div>
        <div className="hidden lg:block mr-10">
          <OrderBulletinInfo
            label="Payment"
            info={capitalize(order.payment_status.replace(/_/g, " "))}
          />
        </div>
        <div className="hidden lg:block">
          <OrderBulletinInfo
            label="Total amount"
            info={formatPrice(order.total, order.currency_code)}
          />
        </div>
      </div>
      {cta && (
        <Link to="/create-return" state={{ order: order }}>
          <button className="btn-ui">Create return</button>
        </Link>
      )}
    </div>
  )
}

export default OrderBulletin
