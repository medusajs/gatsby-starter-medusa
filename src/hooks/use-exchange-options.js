import { graphql, useStaticQuery } from "gatsby"
import { useCallback, useState } from "react"

export const useExchangeOptions = item => {
  const [selectedExchange, setSelectedExchange] = useState(null)

  const { raw } = useStaticQuery(graphql`
    query {
      raw: allMedusaProducts {
        edges {
          node {
            id
            options {
              id
            }
            variants {
              id
              title
              prices {
                amount
                currency_code
              }
              options {
                value
                option_id
                id
              }
            }
          }
        }
      }
    }
  `)

  const products = raw.edges.map(({ node }) => node)

  const getExchangeOptions = useCallback(() => {
    const {
      variant: { product_id },
      variant_id,
    } = item

    const product = products.find(p => p.id === product_id)

    if (product) {
      return product.variants.filter(v => v.id !== variant_id)
    }

    return []
  }, [item, products])

  const handleAddExcange = (exchangeOption, quantity) => {
    setSelectedExchange({ ...exchangeOption, quantity })
  }

  return { selectedExchange, actions: { getExchangeOptions, handleAddExcange } }
}
