import { useState } from "react"

export const useCheckoutFlow = () => {
  const [state, setState] = useState(0)

  return {
    state,
    setState,
  }
}
