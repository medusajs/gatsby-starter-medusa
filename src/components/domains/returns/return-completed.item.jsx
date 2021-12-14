import React from "react"
import ImageContainer from "../utility/image-container"

const ReturnCompletedItem = ({ item }) => {
  return (
    <div className="flex mb-6 last:mb-0">
      <div className="mr-6">
        <ImageContainer src={item.thumbnail} alt={item.title} />
      </div>
      <div className="flex flex-col justify-between py-2">
        <div>
          <h3>{item.title}</h3>
          <div className="text-sm mt-4">
            <p className="mb-2 last:mb-0">
              Variant: <span>{item.description}</span>
            </p>
          </div>
        </div>
        <div className="text-sm text-ui-dark">
          <p>
            Quantity{" "}
            <span className="text-gray-700 font-semibold">{item.quantity}</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default ReturnCompletedItem
