import React from "react"

const CheckoutLayout = ({ children }) => {
  return (
    <div className="bg-ui relative">
      <div className="layout-base">
        <div className="flex flex-col-reverse lg:flex-row">
          <div className="lg:w-1/2">{children[0]}</div>
          <div className="lg:w-1/2 lg:pl-16">{children[1]}</div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutLayout
