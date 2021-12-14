import { useFormik } from "formik"
import Validator from "../utils/validator"
import { useCart } from "./use-cart"
import { useCustomer } from "./use-customer"
import { useMedusa } from "./use-medusa"

export const useShippingAddressForm = setState => {
  const client = useMedusa()
  const {
    cart,
    actions: { updateCart },
  } = useCart()

  const { customer } = useCustomer()

  const shippingAddressForm = useFormik({
    enableReinitialize: true,
    initialValues: {
      first_name:
        cart?.shipping_address?.first_name || customer?.first_name || "",
      last_name: cart?.shipping_address?.last_name || customer?.last_name || "",
      company: cart?.shipping_address?.company || "",
      address_1: cart?.shipping_address?.address_1 || "",
      address_2: cart?.shipping_address?.address_2 || "",
      country_code: cart?.shipping_address?.country_code || "",
      city: cart?.shipping_address?.city || "",
      province: cart?.shipping_address?.province || "",
      postal_code: cart?.shipping_address?.postal_code || "",
      phone: cart?.shipping_address?.phone || customer?.phone || "",
    },
    validationSchema: Validator.checkout.shippingSchema,
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      setSubmitting(true)

      if (!cart?.id) {
        setStatus({ error: "An error has occurred, please try again." })
        setSubmitting(false)
      }

      try {
        const shippingAddress = values
        const billingAddress = values

        delete billingAddress.phone

        const payload = {
          shipping_address: shippingAddress,
          billing_address: billingAddress,
        }

        const cartRes = await client.carts
          .update(cart.id, payload)
          .then(({ cart }) => cart)
        updateCart(cartRes)
      } catch (error) {
        setStatus({ error: "An error has occurred, please try again." })
      }

      setStatus({ success: "Address info updated." })
      setSubmitting(false)
      setState(2)
    },
  })

  return shippingAddressForm
}
