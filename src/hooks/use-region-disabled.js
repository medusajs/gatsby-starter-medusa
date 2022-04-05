import { useLocation } from "@reach/router"
import { useEffect, useState } from "react"

export const useRegionDisabled = () => {
  const [disabled, setDisabled] = useState(false)

  const location = useLocation()

  useEffect(() => {
    if (
      location.pathname === "/checkout" ||
      location.pathname === "/checkout/"
    ) {
      setDisabled(true)
      return
    }

    console.log("location", location)

    setDisabled(false)
  }, [location])

  return disabled
}
