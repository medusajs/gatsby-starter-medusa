import { useEffect, useState } from "react"
import Validator from "../utils/validator"
import { useCart } from "./use-cart"
import { useMedusa } from "./use-medusa"

export const useShippingOptionForm = setState => {
  const client = useMedusa()
  const {
    cart,
    actions: { updateCart },
  } = useCart()

  const [error, setError] = useState(null)
  const [selectedShippingMethod, setSelectedShippingMethod] =
    useState(undefined)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const getCurrentMethod = () => {
      if (cart?.shipping_methods?.[0]?.shipping_option) {
        setSelectedShippingMethod(cart?.shipping_methods?.[0]?.shipping_option)
      }
    }

    getCurrentMethod()
  }, [cart?.shipping_methods])

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setError(null)

    if (!cart?.id) {
      setError("An error has occurred, please try again.")
      setIsSubmitting(false)
      return
    }

    const payload = {
      option_id: selectedShippingMethod?.id,
    }

    try {
      await Validator.checkout.shippingMethodSchema.validate(payload)
    } catch (error) {
      setError(error.message)
      setIsSubmitting(false)
      return
    }

    try {
      const cartRes = await client.carts
        .addShippingMethod(cart.id, payload)
        .then(({ cart }) => cart)
      updateCart(cartRes)
    } catch (error) {
      setError("An error has occurred, please try again.")
      setIsSubmitting(false)
      return
    }

    setIsSubmitting(false)
    setState(3)
  }

  return {
    handleSubmit,
    selectedShippingMethod,
    setSelectedShippingMethod,
    error,
    isSubmitting,
  }
}
