import { formatPrice } from "../utils/format-price"

export const usePrice = () => {
  const getFromPrice = (product, currencyCode) => {
    const { variants } = product

    let prices = []

    for (const variant of variants) {
      const currencySpecificPrices = variant.prices.filter(
        price => price.currency_code === currencyCode
      )
      prices = [...prices, ...currencySpecificPrices]
    }

    if (prices.length) {
      const lowestPrice = prices.reduce((lowest, current) => {
        if (lowest.amount > current.amount) {
          return current
        }
        return lowest
      })

      return formatPrice(lowestPrice.amount, lowestPrice.currency_code, 1)
    }

    return undefined
  }

  return { actions: { getFromPrice } }
}
