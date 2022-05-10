import { useFormik } from "formik"
import { navigate } from "gatsby"
import Validator from "../utils/validator"
import { useCustomer } from "./use-customer"

export const useAuth = () => {
  const {
    actions: { loginCustomer, createCustomer },
  } = useCustomer()

  const loginForm = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Validator.loginSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values, { setStatus, validateForm }) => {
      const validationResponse = await validateForm(values)

      if (Object.keys(validationResponse).length > 0) {
        setStatus(validationResponse)
        return
      }

      const response = await loginCustomer(values)

      if (response.error) {
        setStatus({ authError: response.error })
        return
      }

      navigate("/")
    },
  })

  const registerForm = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      password: "",
    },
    validationSchema: Validator.registerSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values, { setStatus, validateForm }) => {
      const validationResponse = await validateForm(values)

      if (Object.keys(validationResponse).length > 0) {
        setStatus(validationResponse)
        return
      }

      const response = await createCustomer(values)

      if (response.error) {
        setStatus({ authError: response.error })
        return
      }

      navigate("/")
    },
  })

  return {
    forms: {
      loginForm,
      registerForm,
    },
  }
}
