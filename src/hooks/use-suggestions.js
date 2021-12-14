import { graphql, useStaticQuery } from "gatsby"

export const useSuggestions = () => {
  const data = useStaticQuery(graphql`
    query {
      products: allMedusaProducts {
        edges {
          node {
            handle
            title
            thumbnail {
              childImageSharp {
                gatsbyImageData
              }
            }
            variants {
              prices {
                amount
                currency_code
              }
            }
          }
        }
      }
    }
  `)

  const products = data.products.edges.map(edge => edge.node)

  const getSuggestionsFromCart = cart => {
    if (!cart) return []

    const cartProductHandles = cart.items.map(
      item => item.variant?.product?.handle
    )
    const suggestions = products.filter(
      product => !cartProductHandles.includes(product.handle)
    )

    return suggestions
  }

  return {
    getSuggestionsFromCart,
  }
}
