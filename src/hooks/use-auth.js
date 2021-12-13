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
    onSubmit: async (values, { setStatus }) => {
      const response = await loginCustomer(values)

      if (response.error) {
        setStatus(response.error.message)
        console.log(response.error)
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
    onSubmit: async (values, { setStatus }) => {
      const response = await createCustomer(values)

      if (response.error) {
        setStatus(response.error.message)
        console.log(response.error)
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
