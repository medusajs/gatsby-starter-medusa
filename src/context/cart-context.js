import React, { createContext, useEffect, useState } from "react"
import { useMedusa } from "../hooks/use-medusa"
import { useRegion } from "../hooks/use-region"

const defaultCartContext = {
  cart: {
    items: [],
  },
  loading: false,
  actions: {
    updateCart: () => {},
    resetCart: () => {},
    addItem: async () => {},
    removeItem: async () => {},
    updateQuantity: async () => {},
    addDiscount: async () => {},
    removeDiscount: async () => {},
    createPaymentSession: async () => {},
    setPaymentSession: async () => {},
    completeCart: async () => {},
    getCartShippingOptions: async () => {},
    addShippingMethod: async () => {},
  },
}

const CartContext = createContext(defaultCartContext)
export default CartContext

const CART_ID = "cart_id"
const isBrowser = typeof window !== "undefined"

export const CartProvider = props => {
  const [cart, setCart] = useState(defaultCartContext.cart)
  const [loading, setLoading] = useState(defaultCartContext.loading)
  const client = useMedusa()
  const { region } = useRegion()

  const setCartItem = cart => {
    if (isBrowser) {
      localStorage.setItem(CART_ID, cart.id)
    }

    setCart(cart)
  }

  useEffect(() => {
    const initializeCart = async () => {
      const existingCartId = isBrowser ? localStorage.getItem(CART_ID) : null

      if (existingCartId && existingCartId !== null) {
        try {
          const existingCart = await client.carts
            .retrieve(existingCartId)
            .then(({ cart }) => cart)
          if (!existingCart.completed_at) {
            setCartItem(existingCart)
            return
          }
        } catch (e) {
          localStorage.setItem(CART_ID, null)
        }
      }

      const newCart = await client.carts.create({}).then(({ cart }) => cart)
      setCartItem(newCart)
      setLoading(false)
    }

    initializeCart()
  }, [client.carts])

  useEffect(() => {
    const updateCartRegion = async () => {
      setLoading(true)

      const cartId = cart.id

      if (cart.region) {
        const isEqual = cart.region.id === region.id
        if (isEqual) {
          setLoading(false)
          return
        }
      }

      const cartRes = await client.carts
        .update(cartId, { region_id: region.id })
        .then(({ cart }) => cart)

      if (cartRes) {
        setCart(cartRes)
      }

      setLoading(false)
    }

    if (cart.id) {
      updateCartRegion()
    }
  }, [cart.id, cart.region, region?.id, client.carts])

  const addItem = async item => {
    setLoading(true)

    let cartId = cart.id

    if (!cartId) {
      const newCart = await client.carts.create({}).then(({ cart }) => cart)
      cartId = newCart.id
      setCartItem(newCart)
    }

    return client.carts.lineItems.create(cartId, item).then(({ cart }) => {
      setCart(cart)
      setLoading(false)
    })
  }

  const removeItem = async id => {
    setLoading(true)

    const cartId = cart.id

    return client.carts.lineItems.delete(cartId, id).then(({ cart }) => {
      setCart(cart)
      setLoading(false)
    })
  }

  const updateQuantity = async item => {
    setLoading(true)

    const cartId = cart.id

    return client.carts.lineItems
      .update(cartId, item.id, { quantity: item.quantity })
      .then(({ cart }) => {
        setCart(cart)
        setLoading(false)
      })
  }

  const addDiscount = async discount => {
    setLoading(true)

    const cartId = cart.id

    return client.carts
      .update(cartId, { discounts: [{ code: discount }] })
      .then(({ cart }) => {
        setCart(cart)
        setLoading(false)
      })
  }

  const removeDiscount = async () => {
    setLoading(true)

    const cartId = cart.id

    return client.carts.update(cartId, { discounts: [] }).then(({ cart }) => {
      setCart(cart)
      setLoading(false)
    })
  }

  const getCartShippingOptions = async (providedCartId = null) => {
    setLoading(true)

    const cartId = providedCartId || cart.id

    return client.shippingOptions
      .listCartOptions(cartId)
      .then(({ shipping_options }) => {
        setLoading(false)
        return shipping_options
      })
  }

  const addShippingMethod = async payload => {
    setLoading(true)

    const cartId = cart.id

    return client.carts.addShippingMethod(cartId, payload).then(({ cart }) => {
      setCart(cart)
      setLoading(false)
    })
  }

  const updateCart = async payload => {
    setLoading(true)

    const cartId = cart.id

    return client.carts.update(cartId, payload).then(({ cart }) => {
      setCart(cart)
      setLoading(false)
    })
  }

  const createPaymentSession = async (providedCartId = null) => {
    setLoading(true)

    const cartId = providedCartId ?? cart.id

    return client.carts.createPaymentSessions(cartId).then(({ cart }) => {
      setCart(cart)
      setLoading(false)
    })
  }

  const setPaymentSession = async (providerId, providedCartId = null) => {
    setLoading(true)

    const cartId = providedCartId ?? cart.id

    return client.carts
      .setPaymentSession(cartId, { provider_id: providerId })
      .then(({ cart }) => {
        setCart(cart)
        setLoading(false)
        return cart
      })
  }

  const completeCart = async (providedCartId = null) => {
    setLoading(true)

    const cartId = providedCartId ?? cart.id

    return client.carts.complete(cartId).then(({ data: order }) => {
      setCart(defaultCartContext.cart)
      setLoading(false)
      return order
    })
  }

  return (
    <CartContext.Provider
      {...props}
      value={{
        ...defaultCartContext,
        loading,
        cart,
        actions: {
          addItem,
          removeItem,
          updateQuantity,
          addDiscount,
          removeDiscount,
          createPaymentSession,
          setPaymentSession,
          completeCart,
          getCartShippingOptions,
          addShippingMethod,
          updateCart,
        },
      }}
    />
  )
}
