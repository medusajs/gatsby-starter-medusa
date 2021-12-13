import _ from "lodash"
import React from "react"

export const useProduct = (product = { options: [], variants: [] }) => {
  const [options, setOptions] = React.useState({})
  const [quantity, setQuantity] = React.useState(1)
  const { variants } = product

  React.useEffect(() => {
    const optionObj = {}
    for (const option of product.options) {
      Object.assign(optionObj, { [option.id]: option.values[0].value })
    }
    setOptions(optionObj)
  }, [product])

  const variantMap = React.useMemo(() => {
    const map = {}

    for (const variant of variants) {
      const tmp = {}

      for (const option of variant.options) {
        tmp[option.option_id] = option.value
      }

      map[variant.id] = tmp
    }

    return map
  }, [variants])

  const variant = React.useMemo(() => {
    let variantId = undefined

    for (const key of Object.keys(variantMap)) {
      if (_.isEqual(variantMap[key], options)) {
        variantId = key
      }
    }

    return product.variants.find(v => v.id === variantId)
  }, [options, variantMap, product.variants])

  const updateOptions = update => {
    setOptions({ ...options, ...update })
  }

  const increaseQuantity = () => {
    setQuantity(quantity + 1)
  }

  const decreaseQuantity = () => {
    if (quantity - 1 > 0) {
      setQuantity(quantity - 1)
    }
  }

  const resetOptions = () => {
    const optionObj = {}
    for (const option of product.options) {
      Object.assign(optionObj, { [option.id]: option.values[0].value })
    }
    setOptions(optionObj)
    setQuantity(1)
  }

  return {
    variant,
    options,
    quantity,
    actions: {
      updateOptions,
      increaseQuantity,
      decreaseQuantity,
      resetOptions,
    },
  }
}
