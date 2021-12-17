import React from "react"

const QuantitySelector = ({ quantity, increment, decrement }) => {
  return (
    <div className="flex items-center rounded-md px-4 py-2 shadow">
      <button onClick={() => decrement()}>–</button>
      <span className="w-8 text-center">{quantity}</span>
      <button onClick={() => increment()}>+</button>
    </div>
  )
}

export default QuantitySelector
