import React from "react"
import Field from "../forms/field"
import ErrorMessage from "../utility/error-message"

const ContactInformation = ({ controller }) => {
  return (
    <div>
      <h2>Contact information</h2>
      {controller.status && (
        <ErrorMessage
          error={
            "An error occured while processing your contact information. Please try again."
          }
        />
      )}
      <Field
        label="Email"
        type="email"
        className="mt-4"
        autocomplete="email"
        name="email"
        formik={controller}
        defaultValue={controller.values.email}
      />
    </div>
  )
}

export default ContactInformation
