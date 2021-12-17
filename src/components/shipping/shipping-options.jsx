import { RadioGroup } from "@headlessui/react"
import React, { Fragment } from "react"
import { formatPrice } from "../../utils/format-price"

const ShippingOptions = ({
  options = [],
  title,
  description = null,
  currencyCode = "eur",
  onSelect,
  defaultValue,
}) => {
  // Since there is an object structure difference between the selected
  // shipping method and the shipping options, we check if a option is
  // selected using the id.
  const selected = options.find(o => o.id === defaultValue?.id)

  return (
    <div>
      <RadioGroup value={selected} onChange={onSelect}>
        <RadioGroup.Label as="h3">{title}</RadioGroup.Label>
        {description && (
          <RadioGroup.Description as="p">{description}</RadioGroup.Description>
        )}
        <div className="space-y-2 mt-4">
          {options.map(option => {
            return (
              <RadioGroup.Option
                key={option.id}
                value={option}
                className="bg-white relative shadow rounded-lg border-1 px-5 py-4 cursor-pointer flex focus:outline-none"
              >
                {({ checked }) => (
                  <Fragment>
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center">
                        <div className="text-sm">
                          <RadioGroup.Label as="p" className="font-medium">
                            {option.name}
                          </RadioGroup.Label>
                          <RadioGroup.Description
                            as="span"
                            className={`inline ${
                              checked ? "text-sky-100" : "text-gray-500"
                            }`}
                          >
                            <span className="mt-2 text-ui-dark text-xs">
                              {formatPrice(option.amount, currencyCode)}
                            </span>
                          </RadioGroup.Description>
                        </div>
                      </div>
                      {checked && (
                        <div className="flex-shrink-0 text-white">
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
                  </Fragment>
                )}
              </RadioGroup.Option>
            )
          })}
        </div>
      </RadioGroup>
    </div>
  )
}

export default ShippingOptions
