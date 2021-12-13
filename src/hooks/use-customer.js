import { useContext } from "react"
import CustomerContext from "../context/customer-context"

export const useCustomer = () => {
  const context = useContext(CustomerContext)
  if (!context) {
    throw new Error(
      "useCustomer hook was used but a CustomerContext.Provider was not found in the parent tree. Make sure this is used in a component that is a child of CustomerProvider"
    )
  }

  return context
}
