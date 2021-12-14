import { useFormik } from "formik"
import { navigate } from "gatsby"
import { useCallback, useEffect, useState } from "react"
import * as Yup from "yup"
import { useMedusa } from "./use-medusa"

export const useReturn = (initialValues = null) => {
  const client = useMedusa()

  const [order, setOrder] = useState(null)
  const [selectedItems, setSelectedItems] = useState([])
  const [returnOptions, setReturnOptions] = useState([])
  const [selectedShipping, setSelectedShipping] = useState(null)
  const [additionalItems, setAdditionalItems] = useState([])

  const [returnItemsError, setReturnItemsError] = useState(null)
  const [returnShippingError, setReturnShippingError] = useState(null)
  const [completionError, setCompletionError] = useState(null)

  const [notReturnable, setNotReturnable] = useState(false)

  const fetchOrderForm = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: initialValues?.email || "",
      display_id: initialValues?.display_id || "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Required"),
      display_id: Yup.number()
        .integer("Not a valid order number")
        .required("Required"),
    }),
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      setSubmitting(true)
      const orderRes = await client.orders
        .lookupOrder({ display_id: values.display_id, email: values.email })
        .then(({ order }) => order)
        .catch(_ => undefined)

      if (!orderRes) {
        setStatus("Order not found")
        setSubmitting(false)
        return
      }

      if (orderRes.fulfillment_status) {
        switch (orderRes.fulfillment_status) {
          case "returned":
            setNotReturnable(true)
            return
          case "not_fulfilled":
            setNotReturnable(true)
            return
          case "canceled":
            setNotReturnable(true)
            return
          case "requires_action":
            setNotReturnable(true)
            return
          default:
            setNotReturnable(false)
            break
        }
      }

      setOrder(orderRes)
    },
  })

  const getReturnShippingOptions = useCallback(async () => {
    if (order) {
      const regionId = order.region.id

      const options = await client.shippingOptions
        .list({ is_return: true, region_id: regionId })
        .then(({ shipping_options }) => shipping_options)
        .catch(_ => undefined)

      return options
    }

    return []
  }, [order, client.shippingOptions])

  const selectItem = item => {
    setSelectedItems(prevState => [...prevState, item])
  }

  const deselectItem = item => {
    const tmp = selectedItems.filter(i => i.id !== item.id)
    setSelectedItems(tmp)
  }

  const updateItemQuantity = (item, quantity) => {
    const tmp = selectedItems.map(i => {
      if (
        i.id === item.id &&
        quantity > 0 &&
        quantity <= i.fulfilled_quantity
      ) {
        return { ...i, quantity }
      }

      return i
    })

    setSelectedItems(tmp)
  }

  useEffect(() => {
    const getOptions = async () => {
      if (order) {
        const response = await getReturnShippingOptions(order.region.id)

        if (response) {
          setReturnOptions(response)
        }
      }
    }

    getOptions()
  }, [order, getReturnShippingOptions])

  const addExchangeItem = replacement => {
    const tmp = additionalItems.filter(i => i.id !== replacement.variantId)
    setAdditionalItems([...tmp, replacement])
  }

  const removeExchangeItem = replacement => {
    const tmp = additionalItems.filter(
      i => i.variantId !== replacement.variantId
    )
    setAdditionalItems(tmp)
  }

  const createReturn = useCallback(async () => {
    if (!order) {
      return
    }

    setReturnItemsError(null)
    setReturnShippingError(null)
    setCompletionError(null)

    const returnItems = selectedItems.map(i => ({
      item_id: i.id,
      quantity: i.quantity,
    }))

    if (returnItems.length === 0) {
      setReturnItemsError("Please select items to return")
      return
    }

    const exchangeItems = additionalItems.map(i => ({
      variant_id: i.variantId,
      quantity: i.quantity,
    }))

    const shippingOption = selectedShipping?.id ? selectedShipping.id : null

    if (!shippingOption) {
      setReturnShippingError("Please select a shipping option")
      return
    }

    if (exchangeItems.length > 0) {
      const swap = await client.swaps
        .create({
          order_id: order.id,
          return_items: returnItems,
          additional_items: exchangeItems,
          return_shipping_option: shippingOption,
        })
        .then(({ swap }) => swap)
        .catch(_ => undefined)

      if (!swap) {
        setCompletionError(
          "An error occured while processing your return. Please try again."
        )
      }

      navigate("/swap", { state: { swap } })
    } else {
      const newReturn = await client.returns
        .create({
          items: returnItems,
          order_id: order.id,
          return_shipping: {
            option_id: shippingOption,
          },
        })
        .then(({ return: returnRes }) => returnRes)
        .catch(_ => undefined)

      if (!newReturn) {
        setCompletionError(
          "An error occured while processing your return. Please try again."
        )
        return
      }

      navigate("/return-confirmed", { state: { confirmedReturn: newReturn } })
    }
  }, [
    selectedItems,
    order,
    additionalItems,
    selectedShipping,
    client.returns,
    client.swaps,
  ])

  return {
    order,
    fetchOrderForm,
    returnOptions,
    selectedItems,
    selectedShipping,
    additionalItems,
    returnItemsError,
    returnShippingError,
    completionError,
    notReturnable,
    actions: {
      setOrder,
      selectItem,
      deselectItem,
      updateItemQuantity,
      setSelectedShipping,
      addExchangeItem,
      removeExchangeItem,
      createReturn,
    },
  }
}
