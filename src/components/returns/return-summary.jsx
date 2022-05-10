import { Link } from "gatsby"
import React, { useState } from "react"
import { formatPrice } from "../../utils/format-price"
import ErrorMessage from "../utility/error-message"

const ReturnSummary = ({
  selectedItems = [],
  additionalItems = [],
  selectedShipping = null,
  currencyCode,
  completeReturn,
  error,
}) => {
  const [accepted, setAccepted] = useState(false)

  const calculateReturnItemsTotal = (items = []) => {
    return items && items.length > 0
      ? items.reduce((sum, i) => sum + i.unit_price * i.quantity, 0)
      : 0
  }

  const calculateReturnShippingTotal = shipping => {
    return shipping ? shipping.amount : 0
  }

  const calculateAdditionalItemTotal = (additionalItems = []) => {
    return additionalItems && additionalItems.length > 0
      ? additionalItems.reduce((sum, i) => sum + i.amount * i.quantity, 0)
      : 0
  }

  const calculateReturnTotal = (items, shipping, additionalItems) => {
    return (
      calculateReturnItemsTotal(items) -
      calculateReturnShippingTotal(shipping) -
      calculateAdditionalItemTotal(additionalItems)
    )
  }

  return (
    <div className="bg-white shadow p-8 rounded-lg sticky top-28">
      <div className="flex flex-col">
        <h2 className="mb-3">Summary</h2>
        <div className="flex items-center justify-between mb-2">
          <p>Refund amount</p>
          <p>
            {formatPrice(
              calculateReturnItemsTotal(selectedItems),
              currencyCode
            )}
          </p>
        </div>
        <div className="flex items-center justify-between mb-2">
          <p>Shipping</p>
          <p>
            -{" "}
            {formatPrice(
              calculateReturnShippingTotal(selectedShipping),
              currencyCode
            )}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <p>Additional items</p>
          <p>
            -{" "}
            {formatPrice(
              calculateAdditionalItemTotal(additionalItems),
              currencyCode
            )}
          </p>
        </div>
        <div className="h-px w-full bg-ui-medium my-2" />
        <div className="flex items-center justify-between">
          <p>Total</p>
          <p>
            {formatPrice(
              calculateReturnTotal(
                selectedItems,
                selectedShipping,
                additionalItems
              ),
              currencyCode
            )}
          </p>
        </div>
        <label className="mt-3">
          <input
            type="checkbox"
            className="checkbox-ui"
            onChange={() => setAccepted(!accepted)}
          />
          <span>
            You agree with the{" "}
            <Link to="terms-and-conditions">Terms &amp; Conditions</Link> and
            our <Link to="/return-policy">Return Policy</Link>
          </span>
        </label>
        <button
          className="btn-ui mt-4 disabled:bg-ui disabled:cursor-default"
          disabled={!accepted}
          onClick={async () => await completeReturn()}
        >
          Confirm Return
        </button>
        {error && (
          <div className="mt-2">
            <ErrorMessage error={error} />
          </div>
        )}
      </div>
    </div>
  )
}

export default ReturnSummary
