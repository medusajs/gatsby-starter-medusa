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

  const [shippingAddressSubmitted, setShippingAddressSubmitted] =
    useState(false)
  const [billingAddressSubmitted, setBillingAddressSubmitted] = useState(false)
  const [contactSubmitted, setContactSubmitted] = useState(false)
  const [shippingMethodSubmitted, setShippingMethodSubmitted] = useState(false)

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

      const cartRes = await client.carts
        .update(cart.id, { email })
        .then(({ cart }) => {
          updateCart(cart)
          return cart
        })
        .catch(_err => {
          setStatus({ error: true })
          return undefined
        })

      if (cartRes) {
        setContactSubmitted(true)
      }
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

      const cartRes = await client.carts
        .update(cart.id, payload)
        .then(({ cart }) => {
          updateCart(cart)
          return cart
        })
        .catch(_err => {
          setStatus({ error: true })
          return undefined
        })

      if (cartRes) {
        setShippingAddressSubmitted(true)
      }
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
      const cartRes = await client.carts
        .update(cart.id, { billing_address: values })
        .then(({ cart }) => {
          updateCart(cart)
          return cart
        })
        .catch(_err => {
          setStatus({ error: true })
          return undefined
        })

      if (cartRes) {
        setBillingAddressSubmitted(true)
      }
    },
  })

  const setShippingOption = async () => {
    const cartRes = await client.carts
      .addShippingMethod(cart.id, {
        option_id: selectedShippingMethod.id,
      })
      .then(({ cart }) => {
        updateCart(cart)
        return cart
      })
      .catch(_err => {
        setShippingError("An error occured, please try again")
        return undefined
      })

    if (cartRes) {
      setShippingMethodSubmitted(true)
    }
  }

  const clearShippingMethod = () => {
    setSelectedShippingMethod(null)
    setShippingMethodSubmitted(false)
  }

  const setupCheckout = async () => {
    setLoading(true)

    setShippingError(null)
    contactForm.setErrors({})
    shippingForm.setErrors({})
    billingForm.setErrors({})

    await contactForm.submitForm()

    await shippingForm.submitForm()

    if (!sameBilling) {
      await billingForm.submitForm()
    }

    if (!selectedShippingMethod) {
      setShippingError("Please select a shipping method")
      setLoading(false)
      return false
    }

    await setShippingOption()

    console.log(
      contactSubmitted,
      shippingAddressSubmitted,
      billingAddressSubmitted,
      shippingMethodSubmitted
    )

    if (
      !contactSubmitted ||
      !shippingAddressSubmitted ||
      !shippingMethodSubmitted
    ) {
      setLoading(false)
      return false
    }

    if (!sameBilling && !billingAddressSubmitted) {
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
