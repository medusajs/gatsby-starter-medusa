import React, { useEffect, useState } from "react"
import { classNames } from "../../utils/class-names"

const Banner = () => {
  const [isHidden, setIsHidden] = useState(true)

  useEffect(() => {
    if (localStorage) {
      setIsHidden(localStorage.getItem("hideBannerMsg") === "true")
    }
  }, [])

  const hideBanner = () => {
    localStorage.setItem("hideBannerMsg", "true")
    setIsHidden(true)
  }

  return (
    <div
      className={classNames(
        isHidden ? "hidden" : "",
        "bg-ui-medium h-10 flex items-center justify-between text-sm font-medium text-blue px-4 sm:px-6 lg:px-8"
      )}
    >
      <p>Free shipping on all orders over $100</p>
      <button onClick={() => hideBanner()}>&times;</button>
    </div>
  )
}

export default Banner
