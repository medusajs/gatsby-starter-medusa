import { useFormik } from "formik"
import { useCallback, useEffect, useMemo, useState } from "react"
import * as Yup from "yup"
import { useMedusa } from "./use-medusa"

export const useReturn = (initialValues = null) => {
  const client = useMedusa()

  const [order, setOrder] = useState(null)
  const [selectedItems, setSelectedItems] = useState([])
  const [returnOptions, setReturnOptions] = useState([])
  const [selectedShipping, setSelectedShipping] = useState(null)
  const [additionalItems, setAdditionalItems] = useState([])

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

  // const getRegionalPrice = item => {
  //   if (!order) {
  //     return 0
  //   }

  //   const regionalPrice = item.prices.find(
  //     p => p.currency_code === order.currency_code
  //   )

  //   return regionalPrice?.amount ?? 0
  // }

  const addExchangeItem = (item, replacement) => {
    const tmp = additionalItems.filter(i => i.id !== item.id)

    // const price = getRegionalPrice(replacement)

    // delete replacement.prices

    const replacementItem = { id: item.id, ...replacement }

    setAdditionalItems([...tmp, replacementItem])
  }

  const getAdditionalItemsTotal = useCallback(() => {
    return additionalItems.reduce((sum, i) => sum + i.amount * i.quantity, 0)
  }, [additionalItems])

  const getReturnItemsTotal = useCallback(() => {
    return selectedItems.reduce((sum, i) => sum + i.unit_price * i.quantity, 0)
  }, [selectedItems])

  const getShippingTotal = useCallback(() => {
    return selectedShipping?.amount ?? 0
  }, [selectedShipping])

  const totals = useMemo(() => {
    return {
      returnItems: getReturnItemsTotal(),
      additionalItems: getAdditionalItemsTotal(),
      shipping: getShippingTotal(),
      currencyCode: order?.currency_code ?? "eur",
    }
  }, [order, getAdditionalItemsTotal, getReturnItemsTotal, getShippingTotal])

  const removeExchangeItem = item => {
    const tmp = additionalItems.filter(i => i.id !== item.id)
    setAdditionalItems(tmp)
  }

  return {
    order,
    fetchOrderForm,
    returnOptions,
    selectedItems,
    selectedShipping,
    additionalItems,
    totals,
    actions: {
      setOrder,
      selectItem,
      deselectItem,
      updateItemQuantity,
      setSelectedShipping,
      addExchangeItem,
      removeExchangeItem,
    },
  }
}
