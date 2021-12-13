import { useMemo } from "react"

export const useCollections = (collections = [], products = []) => {
  const collectionPreviews = useMemo(() => {
    return collections.edges.map(({ node }) => {
      const { id, title, handle } = node
      const prods = products.edges.filter(
        ({ node }) => node.collection_id === id
      )

      return {
        id,
        title,
        handle,
        thumbnails: prods.map(({ node }) => node.thumbnail),
      }
    })
  }, [collections, products])

  return collectionPreviews
}
