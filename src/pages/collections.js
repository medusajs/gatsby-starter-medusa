import { graphql } from "gatsby"
import React from "react"
import CollectionPreview from "../components/categories/collection-preview"
import Grid from "../components/utility/grid"
import SearchEngineOptimization from "../components/utility/seo"
import { useCollections } from "../hooks/use-collections"

const Collections = ({ data }) => {
  const { collections, products } = data
  const collectionPreviews = useCollections(collections, products)

  return (
    <div className="layout-base">
      <SearchEngineOptimization title="All Collections" />
      <div className="border-b border-ui-medium mb-8 pb-8">
        <h1 className="mb-2">All Collections</h1>
        <p className="font-light text-sm">
          Here you can browse all of our collections
        </p>
      </div>
      <Grid>
        {collectionPreviews.map(collection => {
          return (
            <CollectionPreview key={collection.id} collection={collection} />
          )
        })}
      </Grid>
    </div>
  )
}

export const query = graphql`
  query {
    collections: allMedusaCollections {
      edges {
        node {
          id
          title
          handle
        }
      }
    }
    products: allMedusaProducts {
      edges {
        node {
          collection_id
          thumbnail {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
      }
    }
  }
`

export default Collections
