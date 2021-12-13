import React from "react"

const CheckoutLayout = ({ children, hideSummary = true, setHideSummary }) => {
  return (
    <div className="bg-ui relative">
      <div className="layout-base">
        <div className="lg:flex">
          <div className="lg:w-1/2">{children[0]}</div>
          <div className="lg:w-1/2 lg:pl-16">{children[1]}</div>
        </div>
      </div>
      <div className="bg-white px-4 py-4 flex items-center sticky bottom-0 lg:hidden">
        <button
          className="btn-ui w-full"
          onClick={() => setHideSummary(!hideSummary)}
        >{`${hideSummary ? "View order" : "Hide order"}`}</button>
      </div>
    </div>
  )
}

export default CheckoutLayout
