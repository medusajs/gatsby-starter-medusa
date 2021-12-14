import React from "react"

const ProductFilter = ({ filterables, activeFilters, setActiveFilters }) => {
  const handleChange = e => {
    const { key, value } = JSON.parse(e.target.value)
    const tmp = { ...activeFilters }

    if (e.target.checked) {
      if (!tmp[key]) {
        tmp[key] = []
      }

      tmp[key].push(value)
    } else {
      tmp[key] = tmp[key].filter(item => item !== value)

      if (tmp[key].length === 0) {
        delete tmp[key]
      }
    }

    setActiveFilters(tmp)
  }

  return (
    <div className="lg:sticky lg:top-0">
      {Object.keys(filterables).map((key, index) => {
        const filterable = filterables[key]
        return (
          <div key={index} className="py-4">
            <p className="font-medium mb-2">{filterable.title}</p>
            <div>
              {filterable.values.map((value, index) => {
                return (
                  <label
                    key={index}
                    className="block py-2 leading-5 text-sm text-gray-700"
                  >
                    <input
                      className="checkbox-ui"
                      type="checkbox"
                      value={JSON.stringify({ key, value })}
                      onChange={handleChange}
                    />
                    {value}
                  </label>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default ProductFilter
