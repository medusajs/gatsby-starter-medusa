import React from "react"
import { classNames } from "../../utils/class-names"
import { onlyUnique } from "../../utils/only-unique"

const ProductOptionSelector = ({ option, current, updateOption }) => {
  const filteredOptions = option.values.map(v => v.value).filter(onlyUnique)
  return (
    <div className="text-sm">
      <p className="font-medium mb-2">Select {option.title}</p>
      <div>
        {filteredOptions.map((v, index) => {
          return (
            <button
              key={index}
              className={classNames(
                v === current
                  ? "bg-ui-dark text-white"
                  : "bg-ui hover:bg-ui-dark hover:text-white",
                "inline-flex items-center justify-center rounded-sm text-xs h-12 w-12 mr-2 last:mr-0 hover:bg-ui-dark hover:text-white"
              )}
              onClick={() => updateOption({ [option.id]: v })}
            >
              {v}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default ProductOptionSelector
