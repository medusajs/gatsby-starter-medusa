import { useEffect, useState } from "react"
import { useMedusa } from "./use-medusa"
import { useRegion } from "./use-region"

export const useEstimatedShipping = cartId => {
  const [estimatedShipping, setEstimatedShipping] = useState(null)

  const { region } = useRegion()
  const client = useMedusa()

  useEffect(() => {
    const updateEstimation = async () => {
      if (cartId && region) {
        const shippingOptions = await client.shippingOptions
          .listCartOptions(cartId)
          .then(({ shipping_options }) => shipping_options)
          .catch(_err => [])

        if (!shippingOptions.length) {
          return
        }

        const cheapestOption = shippingOptions.reduce((prev, curr) =>
          prev.amount < curr.amount ? prev : curr
        )

        if (cheapestOption) {
          setEstimatedShipping(cheapestOption.amount)
        }
      }
    }

    updateEstimation()
  }, [cartId, client, region])

  return { estimatedShipping }
}
