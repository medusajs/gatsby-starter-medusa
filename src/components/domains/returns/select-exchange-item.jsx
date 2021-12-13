import React, { useEffect, useState } from "react"
import { useReturn } from "../../../hooks/use-return"
import Arrow from "../../../icons/arrow.svg"
import { classNames } from "../../../utils/class-names"
import QuantitySelector from "../../quantity-selector"

const SelectExchangeItem = ({ item }) => {
  const [selected, setSelected] = useState(false)
  const [selectedExchange, setSelectedExchange] = useState(null)
  const [options, setOptions] = useState([])
  const [quantity, setQuantity] = useState(item.quantity)
  const [variantId, setVariantId] = useState(null)
  const [amount, setAmount] = useState(0)

  const {
    actions: { removeExchangeItem, addExchangeItem, getExchangeOptions },
  } = useReturn()

  useEffect(() => {
    const res = getExchangeOptions(item)

    if (res.length) {
      setOptions(res)
      setVariantId(res[0].id)
    }

    return () => {}
  }, [item, getExchangeOptions])

  const handleQuantityChange = quantityUpdate => {
    if (quantityUpdate > 0) {
      setQuantity(quantityUpdate)
    }
  }

  const handleSelect = e => {
    const id = e.target.value

    setVariantId(id)
  }

  const handleAdd = () => {
    addExchangeItem(item, { ...selectedExchange, quantity })
  }

  const handleRemove = () => {
    removeExchangeItem(item)
  }

  return (
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
                <span className="text-ui-dark">Variant: </span>{" "}
                {item.description}
              </p>
            </div>
          </div>
        </div>
        <span className={classNames(selected ? "opacity-100" : "opacity-50")}>
          <img src={Arrow} alt="arrow" className="w-6 h-auto" />
        </span>
        <div
          className={classNames(
            selected ? "opacity-100" : "opacity-50 pointer-events-none",
            "flex items-center"
          )}
        >
          <select
            className="rounded-lg shadow border-none mr-2"
            onChange={handleSelect}
          >
            {options.map(o => {
              return (
                <option key={o.id} value={o.id}>
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
      {/* {isAdded && (
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
      )} */}
    </div>
  )
}

export default SelectExchangeItem
