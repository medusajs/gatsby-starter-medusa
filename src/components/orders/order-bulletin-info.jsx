import React from "react"

const OrderBulletinInfo = ({ label, info }) => {
  return (
    <div className="text-sm">
      <p className="font-semibold mb-2">{label}</p>
      <p className="font-light">{info}</p>
    </div>
  )
}

export default OrderBulletinInfo
