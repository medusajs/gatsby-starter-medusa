import { useCallback } from "react"
import { useMedusa } from "./use-medusa"

export const useRetrieveOrder = orderId => {
  const client = useMedusa()

  const retrieve = useCallback(async () => {
    const order = await client.orders
      .retrieve(orderId)
      .then(({ order }) => order)
      .catch(_ => undefined)
    return order
  }, [client.orders, orderId])

  return retrieve
}
