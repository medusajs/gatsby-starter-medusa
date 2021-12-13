import React, { useEffect, useState } from "react"
import { useRegion } from "../../../hooks/use-region"
import Field from "../forms/field"
import Select from "../forms/select"
import ErrorMessage from "../utility/error-message"

const BillingAddress = ({ controller }) => {
  const [countries, setCountries] = useState([])
  const { region } = useRegion()

  useEffect(() => {
    if (region) {
      setCountries(region.countries)
    }
  }, [region])
  return (
    <div>
      <h2>Billing address</h2>
      {controller.status && (
        <ErrorMessage
          error={
            "An error occured while processing your billing address. Please try again."
          }
        />
      )}
      <div className="flex items-center mt-4">
        <Field
          label="First name"
          autocomplete="given_name"
          name="first_name"
          formik={controller}
          defaultValue={controller.values.first_name}
        />
        <div className="mx-2" />
        <Field
          label="Last name"
          autocomplete="family-name"
          name="last_name"
          formik={controller}
          defaultValue={controller.values.last_name}
        />
      </div>
      <Field
        label="Company"
        className="mt-4"
        autocomplete="organization"
        name="company"
        formik={controller}
        defaultValue={controller.values.company}
      />
      <Field
        label="Address"
        className="mt-4"
        autocomplete="address-line1"
        name="address_1"
        formik={controller}
        defaultValue={controller.values.address_1}
      />
      <Field
        label="Apartment, suite, etc."
        className="mt-4"
        autocomplete="address-line2"
        name="address_2"
        formik={controller}
        defaultValue={controller.values.address_2}
      />
      <div className="flex items-center mt-4">
        <Select
          label="Country"
          autocomplete="country-code"
          name="country_code"
          formik={controller}
          defaultValue={controller.values.country_code}
          options={countries.map(country => ({
            label: country.display_name,
            value: country.iso_2,
          }))}
        />
        <div className="mx-2" />
        <Field
          label="City"
          autocomplete="city-code"
          name="city"
          formik={controller}
          defaultValue={controller.values.city}
        />
      </div>
      <div className="flex items-center mt-4">
        <Field
          label="State / Province"
          autocomplete="address-level1"
          name="province"
          formik={controller}
          defaultValue={controller.values.province}
        />
        <div className="mx-2" />
        <Field
          label="ZIP / Postal Code"
          autocomplete="postal-code"
          name="postal_code"
          formik={controller}
          defaultValue={controller.values.postal_code}
        />
      </div>
    </div>
  )
}

export default BillingAddress
