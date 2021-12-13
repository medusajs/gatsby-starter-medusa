import { useFormik } from "formik"
import { useCallback, useEffect, useState } from "react"
import Validator from "../utils/validator"
import { useCart } from "./use-cart"
import { useCustomer } from "./use-customer"
import { useMedusa } from "./use-medusa"

export const useCheckout = (sameBilling = true) => {
  const client = useMedusa()
  const [selectedShippingMethod, setSelectedShippingMethod] = useState(null)
  const [loading, setLoading] = useState(false)
  const [cartId, setCartId] = useState(null)
  const [shippingError, setShippingError] = useState(null)

  const {
    cart,
    actions: { updateCart },
  } = useCart()

  useEffect(() => {
    if (cart.id !== cartId) {
      setCartId(cart.id)
    }
  }, [cart, cartId])

  const { customer } = useCustomer()

  const contactForm = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: customer?.email ?? cart?.email ?? "",
    },
    validationSchema: Validator.checkout.contactSchema,
    onSubmit: async (values, { setStatus }) => {
      const { email } = values

      await client.carts
        .update(cart.id, { email })
        .then(({ cart }) => updateCart(cart))
        .catch(_err => {
          setStatus({ error: true })
        })
    },
  })

  const shippingForm = useFormik({
    enableReinitialize: true,
    initialValues: {
      first_name: customer?.first_name ?? "",
      last_name: customer?.last_name ?? "",
      company: "",
      address_1: "",
      address_2: "",
      country_code: "",
      city: "",
      province: "",
      postal_code: "",
      phone: customer?.phone ?? "",
    },
    validationSchema: Validator.checkout.shippingSchema,
    onSubmit: async (values, { setStatus }) => {
      const payload = {
        shipping_address: values,
      }

      if (sameBilling) {
        delete values.phone
        payload.billing_address = values
      }

      await client.carts
        .update(cart.id, payload)
        .then(({ cart }) => updateCart(cart))
        .catch(_err => {
          setStatus({ error: true })
        })
    },
  })

  const billingForm = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      company: "",
      address_1: "",
      address_2: "",
      country_code: "",
      city: "",
      province: "",
      postal_code: "",
    },
    validationSchema: Validator.checkout.billingSchema,
    onSubmit: async (values, { setStatus }) => {
      await client.carts
        .update(cart.id, { billing_address: values })
        .then(({ cart }) => updateCart(cart))
        .catch(_err => {
          setStatus({ error: true })
        })
    },
  })

  const setShippingOption = async () => {
    let error = false

    await client.carts
      .addShippingMethod(cart.id, {
        option_id: selectedShippingMethod.id,
      })
      .then(({ cart }) => updateCart(cart))
      .catch(_err => {
        error = true
      })

    return error
  }

  const clearShippingMethod = () => {
    setSelectedShippingMethod(null)
  }

  const setupCheckout = async () => {
    setLoading(true)

    if (!contactForm.isValid) {
      setLoading(false)
      return false
    }

    await contactForm.submitForm()

    if (contactForm.status?.error) {
      setLoading(false)
      return false
    }

    if (!shippingForm.isValid) {
      setLoading(false)
      return false
    }

    await shippingForm.submitForm()

    if (shippingForm.status?.error) {
      setLoading(false)
      return false
    }

    if (!sameBilling) {
      if (!billingForm.isValid) {
        setLoading(false)
        return false
      }

      await billingForm.submitForm()

      if (billingForm.status?.error) {
        setLoading(false)
        return false
      }
    }

    if (!selectedShippingMethod) {
      setShippingError("Please select a shipping method")
      setLoading(false)
      return false
    }

    const shippingMethodError = await setShippingOption()

    if (shippingMethodError) {
      setShippingError("An error occured, please try again")
      setLoading(false)
      return false
    }

    setLoading(false)
    return true
  }

  const getShippingOptions = useCallback(async () => {
    if (cartId) {
      const options = await client.shippingOptions
        .listCartOptions(cartId)
        .then(({ shipping_options }) => shipping_options)
        .catch(_err => {
          setShippingError("An error occured, please try again")
          return undefined
        })

      return options
    }
  }, [cartId, client.shippingOptions])

  return {
    forms: {
      contactForm,
      billingForm,
      shippingForm,
    },
    shippingMethod: {
      getShippingOptions,
      selectedShippingMethod,
      setSelectedShippingMethod,
      clearShippingMethod,
      shippingError,
      setShippingError,
    },
    setupCheckout,
    loading,
  }
}
