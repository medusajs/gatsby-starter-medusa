import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import React, { useMemo } from "react"

const CollectionPreview = ({ collection }) => {
  const randomThumbnail = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * collection.thumbnails.length)
    return (
      collection?.thumbnails?.[randomIndex]?.childImageSharp?.gatsbyImageData ??
      null
    )
  }, [collection])

  return (
    <Link to={`/collections/${collection.handle}`}>
      <div className="group relative">
        <div className="w-full min-h-auto bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
          <GatsbyImage
            image={randomThumbnail}
            alt={`Item from the ${collection.title} collection`}
            className="w-auto h-full object-center object-cover"
          />
        </div>
        <div className="mt-4">
          <h3 className="text-sm text-gray-700">
            <p className="font-normal">{collection.title}</p>
          </h3>
        </div>
      </div>
    </Link>
  )
}

export default CollectionPreview
