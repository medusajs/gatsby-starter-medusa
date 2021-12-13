import React, {
  createContext,
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react"
import { useMedusa } from "../hooks/use-medusa"
import { useRegion } from "../hooks/use-region"

const defaultCartContext = {
  cart: {
    items: [],
  },
  cartShippingOptions: [],
  loading: false,
  actions: {
    updateCart: () => {},
    resetCart: () => {},
    addItem: async () => {},
    removeItem: async () => {},
    updateQuantity: async () => {},
    addDiscount: async () => {},
    addCheckoutInfo: async () => {},
    createPaymentSession: async () => {},
    setPaymentSession: async () => {},
    completeCart: async () => {},
  },
}

const ACTIONS = {
  UPDATE_CART: "UPDATE_CART",
  RESET_CART: "RESET_CART",
  UPDATE_SHIPPING_OPTIONS: "UPDATE_SHIPPING_OPTIONS",
}

const CartContext = createContext(defaultCartContext)
export default CartContext

const sortCart = items => {
  function compare(a, b) {
    if (a.created_at < b.created_at) {
      return -1
    }
    if (a.created_at > b.created_at) {
      return 1
    }
    return 0
  }

  return items.sort(compare)
}

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.UPDATE_CART:
      return {
        ...state,
        cart: { ...action.payload, items: sortCart(action.payload.items) },
      }
    case ACTIONS.RESET_CART:
      return {
        ...state,
        cart: { items: [] },
      }
    case ACTIONS.UPDATE_SHIPPING_OPTIONS:
      return {
        ...state,
        cartShippingOptions: action.payload,
      }
    default:
      break
  }
}

const CART_ID = "cart_id"

export const CartProvider = props => {
  const [state, dispatch] = useReducer(reducer, defaultCartContext)
  const [loading, setLoading] = useState(defaultCartContext.loading)
  const cartId = useRef()
  const client = useMedusa()
  const { region } = useRegion()

  useEffect(() => {
    if (state.cart.id) {
      localStorage.setItem(CART_ID, state.cart.id)
      cartId.current = state.cart.id
    }
  }, [state.cart?.id])

  const createCart = async () => {
    const cart = await client.carts
      .create()
      .then(({ cart }) => cart)
      .catch(_err => undefined)

    if (cart) {
      dispatch({ type: ACTIONS.UPDATE_CART, payload: cart })
      setLoading(false)
      return
    }

    setLoading(false)
  }

  const fetchCart = useCallback(async () => {
    let cart = undefined

    const id = localStorage.getItem(CART_ID) || cartId.current

    if (id) {
      cart = await client.carts
        .retrieve(id)
        .then(({ cart }) => cart)
        .catch(_ => undefined)
    }

    if (cart) {
      dispatch({ type: ACTIONS.UPDATE_CART, payload: cart })
      setLoading(false)
      return
    }

    await createCart()
  }, [])

  useEffect(() => {
    const initCart = async () => {
      await fetchCart()
    }

    initCart()
  }, [fetchCart])

  useEffect(() => {
    const updateCartRegion = async () => {
      const cart = await client.carts
        .update(cartId.current, { region_id: region.id })
        .then(({ cart }) => cart)

      dispatch({ type: ACTIONS.UPDATE_CART, payload: cart })
    }

    if (cartId.current && region?.id) {
      updateCartRegion()
    }
  }, [region?.id])

  const updateCart = cart => {
    dispatch({
      type: ACTIONS.UPDATE_CART,
      payload: cart,
    })
  }

  const resetCart = () => {
    dispatch({
      type: ACTIONS.RESET_CART,
    })
  }

  const addItem = async item => {
    const response = { cart: undefined, error: undefined }

    response.cart = await client.carts.lineItems
      .create(cartId.current, item)
      .then(({ cart }) => cart)
      .catch(err => {
        response.error = err.response.data
        return undefined
      })

    if (!response.error) {
      dispatch({ type: ACTIONS.UPDATE_CART, payload: response.cart })
    }

    return response
  }

  const removeItem = async id => {
    const response = { cart: undefined, error: undefined }

    response.cart = await client.carts.lineItems
      .delete(cartId.current, id)
      .then(({ cart }) => cart)
      .catch(err => {
        response.error = err.response.data
        return undefined
      })

    if (!response.error) {
      dispatch({ type: ACTIONS.UPDATE_CART, payload: response.cart })
    }

    return response
  }

  const updateQuantity = async item => {
    const response = { cart: undefined, error: undefined }

    response.cart = await client.carts.lineItems
      .update(cartId.current, item.id, { quantity: item.quantity })
      .then(({ cart }) => cart)
      .catch(err => {
        response.error = err.response.data
        return undefined
      })

    if (!response.error) {
      dispatch({ type: ACTIONS.UPDATE_CART, payload: response.cart })
    }

    return response
  }

  const addDiscount = async discount => {
    const response = { cart: undefined, error: undefined }

    response.cart = await client.carts.discounts
      .create(cartId.current, discount)
      .then(({ cart }) => cart)
      .catch(err => {
        response.error = err.response.data
        return undefined
      })

    if (!response.error) {
      dispatch({ type: ACTIONS.UPDATE_CART, payload: response.cart })
    }

    return response
  }

  const addCheckoutInfo = async ({
    shippingAddress,
    email,
    billingAddress,
  }) => {
    const response = { cart: undefined, error: undefined }

    const info = {
      shipping_address: shippingAddress,
      email,
    }

    if (billingAddress) {
      info["billing_address"] = billingAddress
    }

    response.cart = await client.carts.update(cartId.current, info)
  }

  const createPaymentSession = async cartId => {
    const cart = await client.carts
      .createPaymentSessions(cartId)
      .then(({ cart }) => cart)
      .catch(_err => undefined)

    if (cart) {
      dispatch({ type: ACTIONS.UPDATE_CART, payload: cart })
    }
  }

  const setPaymentSession = async (cartId, providerId) => {
    const cart = await client.carts
      .setPaymentSession(cartId, { provider_id: providerId })
      .then(({ cart }) => cart)
      .catch(_err => undefined)

    if (cart) {
      dispatch({ type: ACTIONS.UPDATE_CART, payload: cart })
    }

    return cart
  }

  const completeCart = async cartId => {
    const order = await client.carts
      .complete(cartId)
      .then(({ data: order }) => order)
      .catch(_err => undefined)

    if (order) {
      localStorage.removeItem(CART_ID)
      dispatch({ type: ACTIONS.RESET_CART })
    }

    return order
  }

  return (
    <CartContext.Provider
      {...props}
      value={{
        ...state,
        loading,
        actions: {
          updateCart,
          resetCart,
          addItem,
          removeItem,
          updateQuantity,
          addDiscount,
          addCheckoutInfo,
          createPaymentSession,
          setPaymentSession,
          completeCart,
        },
      }}
    />
  )
}
