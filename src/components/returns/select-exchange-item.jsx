import _ from "lodash"
import React, { useState } from "react"
import { useExchangeOptions } from "../../hooks/use-exchange-options"
import { classNames } from "../../utils/class-names"
import { formatPrice } from "../../utils/format-price"
import QuantitySelector from "../products/quantity-selector"

const SelectExchangeItem = ({
  item,
  currencyCode,
  taxRate,
  addExchangeItem,
  removeExchangeItem,
}) => {
  const [selected, setSelected] = useState(false)
  const [quantity, setQuantity] = useState(item.quantity)
  const [isAdded, setIsAdded] = useState(false)

  const getExchangeOptions = useExchangeOptions(item, currencyCode)

  // eslint-disable-next-line no-unused-vars
  const [options, setOptions] = useState(getExchangeOptions())
  const [selectedExchange, setSelectedExchange] = useState(
    getExchangeOptions()[0]
  )

  const handleQuantityChange = quantityUpdate => {
    if (quantityUpdate > 0) {
      setQuantity(quantityUpdate)
    }
  }

  const handleExchangeChange = e => {
    const id = e.target.value

    const exchange = options.find(option => option.id === id)

    if (exchange) {
      setSelectedExchange(exchange)
    }
  }

  const handleAdd = () => {
    addExchangeItem({ ...selectedExchange, quantity })
    setIsAdded(true)
  }

  const handleRemove = () => {
    removeExchangeItem({ ...selectedExchange, quantity })
    setIsAdded(false)
  }

  return !_.isEmpty(options) ? (
    <div className="flex items-center">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center">
          <input
            type="checkbox"
            className="checkbox-ui mr-2"
            defaultChecked={selected}
            onChange={() => setSelected(!selected)}
          />
          <div
            className={classNames(
              selected ? "opacity-100" : "opacity-50",
              "flex items-center"
            )}
          >
            <img
              src={item.thumbnail}
              alt={item.title}
              className="h-16 w-auto object-cover object-center mr-4 rounded-md"
            />
            <div>
              <p>{item.title}</p>
              <p>
                <span className="text-ui-dark">Price: </span>{" "}
                {formatPrice(
                  selectedExchange?.amount ?? 0,
                  currencyCode,
                  quantity,
                  taxRate
                )}
              </p>
            </div>
          </div>
        </div>
        <div
          className={classNames(
            selected ? "opacity-100" : "opacity-50 pointer-events-none",
            isAdded ? "opacity-50 pointer-events-none" : "flex items-center",
            "flex items-center"
          )}
        >
          <select
            className="rounded-lg shadow border-none mr-2"
            onChange={handleExchangeChange}
          >
            {options.map((o, i) => {
              return (
                <option key={i} value={o.id}>
                  {o.title}
                </option>
              )
            })}
          </select>
          <QuantitySelector
            quantity={quantity}
            increment={() => handleQuantityChange(quantity + 1)}
            decrement={() => handleQuantityChange(quantity - 1)}
          />
        </div>
      </div>
      {selectedExchange && (
        <div>
          {isAdded ? (
            <button className="ml-2 btn-ui" onClick={handleRemove}>
              Remove
            </button>
          ) : (
            <button className="ml-2 btn-ui" onClick={handleAdd}>
              Add
            </button>
          )}
        </div>
      )}
    </div>
  ) : (
    <p className="text-ui-dark">There is no exchanges for this product</p>
  )
}

export default SelectExchangeItem
