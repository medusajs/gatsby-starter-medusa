import { useFormik } from "formik"
import Validator from "../utils/validator"
import { useCart } from "./use-cart"
import { useCustomer } from "./use-customer"
import { useMedusa } from "./use-medusa"

export const useContactForm = setState => {
  const client = useMedusa()
  const {
    cart,
    actions: { updateCart },
  } = useCart()

  const { customer } = useCustomer()

  const contactForm = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: cart?.email || customer?.email || "",
    },
    validationSchema: Validator.checkout.contactSchema,
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      setSubmitting(true)

      if (!cart?.id) {
        setStatus({ error: "An error has occurred, please try again." })
      }

      try {
        const cartRes = await client.carts
          .update(cart.id, {
            email: values.email,
          })
          .then(({ cart }) => cart)

        updateCart(cartRes)
      } catch (error) {
        setStatus({ error: "An error has occurred, please try again." })
        setSubmitting(false)
      }

      console.log("Update step")
      setStatus({ success: "Contact info updated." })
      setSubmitting(false)
      setState(1)
    },
  })

  return contactForm
}
