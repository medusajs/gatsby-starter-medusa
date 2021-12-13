import { useMedusa } from "./use-medusa"

export const useOrder = () => {
  const client = useMedusa()

  const retrieve = async orderId => {
    const order = await client.orders
      .retrieve(orderId)
      .then(({ order }) => order)
      .catch(_ => undefined)
    return order
  }

  const retireveByCartId = async cartId => {
    const order = await client.orders
      .retrieveByCartId()
      .then(({ order }) => order)
      .catch(_ => undefined)
    return order
  }

  return { actions: { retrieve, retireveByCartId } }
}
