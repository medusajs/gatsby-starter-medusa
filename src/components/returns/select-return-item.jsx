import React from "react"

const SelectReturnItem = ({ item, onSelect, onDeselect }) => {
  const handleChange = e => {
    if (e.target.checked) {
      onSelect(item)
    } else {
      onDeselect(item)
    }
  }

  return (
    <div>
      <div className="relative rounded-md overflow-hidden w-full h-auto">
        <input
          type="checkbox"
          className="absolute top-4 right-4 mr-0 checkbox-ui"
          onChange={handleChange}
          id={item.id}
        />
        <img
          src={item.thumbnail}
          alt={item.title}
          className="h-full w-auto object-cover object-center"
        />
      </div>
      <div className="mt-3 text-sm">
        <p className="font-normal">{item.title}</p>
        <p className="font-normal">
          <span className="text-ui-dark">Variant:</span> {item.description}
        </p>
      </div>
    </div>
  )
}

export default SelectReturnItem
