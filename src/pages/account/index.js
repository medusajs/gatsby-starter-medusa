import { useFormik } from "formik"
import React from "react"
import * as Yup from "yup"
import AccountLayout from "../../components/account/account-layout"
import Field from "../../components/forms/field"
import FormContainer from "../../components/forms/form-container"
import SearchEngineOptimization from "../../components/utility/seo"
import { useCustomer } from "../../hooks/use-customer"

const Account = () => {
  const {
    customer,
    actions: { updateCustomerDetails },
  } = useCustomer()

  const contactForm = useFormik({
    enableReinitialize: true,
    initialValues: {
      first_name: customer?.first_name || "",
      last_name: customer?.last_name || "",
      email: customer?.email || "",
      phone: customer?.phone || "",
    },
    validationSchema: Yup.object({
      first_name: Yup.string().required("Required"),
      last_name: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email").required("Required"),
      phone: Yup.string().optional(),
    }),
    onSubmit: async values => {
      const response = await updateCustomerDetails(values)
    },
  })

  const passwordForm = useFormik({
    enableReinitialize: true,
    initialValues: {
      password: "",
      passwordConfirmation: "",
    },
    validationSchema: Yup.object({
      password: Yup.string().required("Password is required"),
      passwordConfirmation: Yup.string().oneOf(
        [Yup.ref("password"), null],
        "Passwords must match"
      ),
    }),
    onSubmit: async (values, { setStatus }) => {
      const response = await updateCustomerDetails({
        password: values.password,
      })

      if (response.error) {
        return
      }

      setStatus({ success: true })
    },
  })

  return (
    <AccountLayout>
      <SearchEngineOptimization title="Account" />
      <div>
        <FormContainer
          title="Contact"
          description="We need this information in case we need to contact you."
          handleSubmit={contactForm.handleSubmit}
        >
          <div className="flex items-center mb-4">
            <Field
              label="First name"
              autocomplete="given-name"
              name="first_name"
              formik={contactForm}
              defaultValue={contactForm.values.first_name}
            />
            <div className="mx-2" />
            <Field
              label="Last name"
              autocomplete="family-name"
              name="last_name"
              formik={contactForm}
              defaultValue={contactForm.values.last_name}
            />
          </div>
          <div className="flex items-center">
            <Field
              label="Email"
              autocomplete="email"
              name="email"
              formik={contactForm}
              defaultValue={contactForm.values.email}
            />
            <div className="mx-2" />
            <Field
              label="Phone (optional)"
              autocomplete="tel"
              name="phone"
              formik={contactForm}
              defaultValue={contactForm.values.phone}
            />
          </div>
        </FormContainer>
      </div>
      <div className="mt-16">
        <FormContainer
          title="Password"
          description="You can use this form to reset your password."
          handleSubmit={passwordForm.handleSubmit}
        >
          <div className="flex items-center">
            <Field
              label="New Password"
              type="password"
              autocomplete="new-password"
              name="password"
              formik={passwordForm}
              defaultValue={passwordForm.values.password}
            />
            <div className="mx-2" />
            <Field
              label="Confirm Password"
              type="password"
              autocomplete="new-password"
              name="passwordConfirmation"
              formik={passwordForm}
              defaultValue={passwordForm.values.passwordConfirmation}
            />
          </div>
        </FormContainer>
      </div>
    </AccountLayout>
  )
}

export default Account
