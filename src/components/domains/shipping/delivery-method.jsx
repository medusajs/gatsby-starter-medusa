import React from "react"
import { classNames } from "../../../utils/class-names"
import { formatPrice } from "../../../utils/format-price"

const DeliveryMethod = ({
  method,
  currencyCode = "eur",
  isSelected,
  onSelect,
}) => {
  return (
    <div
      className={classNames(
        "bg-white border-2 border-ui-medium rounded-lg p-4 text-sm w-auto mr-4 last:mr-0 transition duration-150 ease-in-out cursor-pointer",
        isSelected ? "border-ui-dark" : ""
      )}
      onClick={onSelect}
      role="checkbox"
      onKeyDown={onSelect}
      tabIndex={0}
      aria-checked={isSelected}
    >
      <div className="flex justify-between">
        <div className="mr-8">
          <p className="font-semibold">{method.name}</p>
          <p className="mt-2 text-ui-dark text-xs">
            {formatPrice(method.amount, currencyCode)}
          </p>
        </div>
        {isSelected && (
          <div>
            <input
              type="checkbox"
              name="delivery"
              checked={true}
              readOnly
              className="rounded-xl text-ui-dark focus:ring-transparent w-5 h-5"
              tabIndex={-1}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default DeliveryMethod
