import { GatsbyImage } from "gatsby-plugin-image"
import React, { useMemo } from "react"
import { usePrice } from "../../hooks/use-price"
import { useRegion } from "../../hooks/use-region"
import RegionalLink from "../utility/regional-link"

const ProductListItem = ({ product }) => {
  const {
    actions: { getFromPrice },
  } = usePrice()

  const { region } = useRegion()

  const fromPrice = useMemo(() => {
    return getFromPrice(product, region?.currency_code, region?.tax_rate)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product, region])

  return (
    <RegionalLink to={product.handle} className="font-normal">
      <div key={product.id} className="group relative">
        <div className="w-full min-h-auto bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
          <GatsbyImage
            image={product.thumbnail?.childImageSharp?.gatsbyImageData}
            alt={product.title}
            className="w-auto h-full object-center object-cover"
          />
        </div>
        <div className="mt-4 flex justify-between">
          <h3 className="text-sm text-gray-700">
            <p className="font-normal">{product.title}</p>
          </h3>
          <p className="text-sm font-semibold text-gray-900">
            from {fromPrice}
          </p>
        </div>
      </div>
    </RegionalLink>
  )
}

export default ProductListItem
