import React, { useMemo } from "react"
import { classNames } from "../../utils/class-names"

const ImageContainer = ({ size = "md", src, alt }) => {
  const styles = useMemo(() => {
    switch (size) {
      case "xs":
        return "w-24 h-32 rounded-sm"
      case "sm":
        return "w-32 h-48 rounded-md"
      case "md":
        return "w-48 h-64 rounded-lg"
      case "lg":
        return "w-full h-96 rounded-lg"
      case "xl":
        break
      default:
        break
    }
  }, [size])

  return (
    <div
      className={classNames(
        styles,
        "bg-ui-light overflow-hidden flex items-center justify-center"
      )}
    >
      <img
        className="w-5/6 h-auto object-center object-contain"
        src={src}
        alt={alt}
      />
    </div>
  )
}

export default ImageContainer
