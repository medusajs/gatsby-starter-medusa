import { useFormik } from "formik"
import React, { Fragment, useEffect, useState } from "react"
import * as Yup from "yup"
import { useCart } from "../../hooks/use-cart"
import Field from "../forms/field"

const DiscountField = () => {
  const [code, setCode] = useState()

  const {
    cart,
    actions: { addDiscount, removeDiscount },
  } = useCart()

  const discountForm = useFormik({
    initialValues: {
      discount_code: "",
    },
    validationSchema: Yup.object({
      discount_code: Yup.string().required("Discount code can't be empty"),
    }),
    onSubmit: async (values, { setErrors }) => {
      await addDiscount(values.discount_code)
        .then(() => {
          setCode(values.discount_code)
        })
        .catch(_ => {
          setErrors({ discount_code: "Invalid code" })
        })
    },
  })

  useEffect(() => {
    if (cart && cart.discounts?.length) {
      const code = cart.discounts[0].code

      if (code) {
        setCode(code)
      }
    } else {
      if (code) {
        setCode(undefined)
      }
    }
  }, [cart])

  const handleSubmit = e => {
    e.preventDefault()
    discountForm.handleSubmit()
  }

  return (
    <div>
      <p className="font-semibold text-sm mb-2">Discount code</p>
      <div className="flex items-start">
        {!code ? (
          <Fragment>
            <Field
              name={"discount_code"}
              defaultValue={discountForm.values.discount_code}
              formik={discountForm}
            />
            <div className="mx-2" />
            <button className="btn-ui" onClick={handleSubmit} type="submit">
              Apply
            </button>
          </Fragment>
        ) : (
          <Fragment>
            <div className="pointer-events-none w-full">
              <Field
                name={"discount_code"}
                defaultValue={code}
                formik={discountForm}
              />
            </div>
            <div className="mx-2" />
            <button
              className="btn-ui"
              onClick={async () => await removeDiscount()}
              type="button"
            >
              Remove
            </button>
          </Fragment>
        )}
      </div>
    </div>
  )
}

export default DiscountField
