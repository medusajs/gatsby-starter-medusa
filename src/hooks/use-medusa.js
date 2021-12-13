import { useContext } from "react"
import MedusaContext from "../context/medusa-context"

export const useMedusa = () => {
  const { client } = useContext(MedusaContext)

  if (!client) {
    throw new Error(
      "No Medusa client found. Please ensure that useMedusa is used within a MedusaProvider."
    )
  }

  return client
}
