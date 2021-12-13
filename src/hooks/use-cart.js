import { useContext } from "react"
import CartContext from "../context/cart-context"

export const useCart = () => {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error(
      "useCart hook was used but a CartContext.Provider was not found in the parent tree. Make sure this is used in a component that is a child of CartProvider"
    )
  }

  return context
}
