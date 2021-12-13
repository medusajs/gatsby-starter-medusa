import { useMemo } from "react"

export const useFilter = (products, activeFilters = null) => {
  const filteredProducts = useMemo(() => {
    let filtered = []

    if (activeFilters) {
      const filters = Object.keys(activeFilters)

      filtered = products.filter(product => {
        return filters.every(filter => {
          return product.options.find(option => {
            if (
              option.title === filter &&
              activeFilters[filter].some(r =>
                option.values.map(v => v.value).includes(r)
              )
            ) {
              return product
            } else {
              return null
            }
          })
        })
      })
    } else {
      filtered = products
    }

    return filtered
  }, [products, activeFilters])

  return filteredProducts
}
