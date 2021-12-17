import { GatsbyImage } from "gatsby-plugin-image"
import React, { useState } from "react"
import { classNames } from "../../utils/class-names"

const ProductImages = ({ images = [] }) => {
  const [current, setCurrent] = useState(0)

  const handleInfiniteChange = change => {
    if (current + change < 0) {
      setCurrent(images.length - 1)
    } else if (current + change > images.length - 1) {
      setCurrent(0)
    } else {
      setCurrent(current + change)
    }
  }

  return (
    <div className="flex">
      <div className="hidden lg:flex flex-col items-center mr-4">
        {images.map(({ image }, index) => {
          return (
            <button
              key={index}
              className={classNames(
                "rounded-md overflow-hidden h-36 w-24 flex items-center justify-center bg-ui mb-4 last:mb-0",
                current === index
                  ? "border-2 border-ui-medium opacity-100"
                  : "opacity-75"
              )}
              onClick={() => setCurrent(index)}
            >
              <GatsbyImage
                image={image.childImageSharp.gatsbyImageData}
                alt={`Product #${index + 1}`}
                objectFit="cover"
                objectPosition="center"
                className="h-full w-full"
              />
            </button>
          )
        })}
      </div>
      <div className="relative h-auto w-full flex rounded-lg overflow-hidden">
        <span className="text-sm absolute right-4 top-3 z-10">{`${
          current + 1
        } / ${images?.length}`}</span>
        <div className="absolute flex items-center justify-between h-full px-4 my-auto left-0 right-0 lg:hidden z-10">
          <button onClick={() => handleInfiniteChange(-1)}>{`<`}</button>
          <button onClick={() => handleInfiniteChange(1)}>{`>`}</button>
        </div>
        <GatsbyImage
          className="relative h-full w-full object-cover object-center"
          image={images[current].image.childImageSharp.gatsbyImageData}
          alt={`Product #${current + 1}`}
        />
      </div>
    </div>
  )
}

export default ProductImages
