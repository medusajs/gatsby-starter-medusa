import { useFormik } from "formik"
import Validator from "../utils/validator"
import { useCart } from "./use-cart"
import { useCustomer } from "./use-customer"

export const useContactForm = setState => {
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
        updateCart({ email: values.email })
      } catch (error) {
        setStatus({ error: "An error has occurred, please try again." })
        setSubmitting(false)
      }

      setStatus({ success: "Contact info updated." })
      setSubmitting(false)
      setState(1)
    },
  })

  return contactForm
}
