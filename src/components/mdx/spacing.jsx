import React from "react"

const Spacing = ({ size = "base" }) => {
  let translatedSize = 4

  switch (size) {
    case "xs":
      translatedSize = 2
      break
    case "sm":
      translatedSize = 4
      break
    case "base":
      translatedSize = 8
      break
    default:
      break
  }

  return <div className={`my-${translatedSize} w-full h-px`} />
}

export default Spacing
