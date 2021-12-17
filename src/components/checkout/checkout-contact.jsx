import React from "react"
import Field from "../forms/field"

const CheckoutContact = ({ controller }) => {
  return (
    <div className="mt-3 mb-6">
      <Field
        formik={controller}
        name={"email"}
        defaultValue={controller.values.email}
        label={"Email"}
        autocomplete="email"
      />
    </div>
  )
}

export default CheckoutContact
