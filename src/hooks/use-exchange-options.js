import { graphql, useStaticQuery } from "gatsby"
import { useCallback, useState } from "react"

export const useExchangeOptions = (item, currencyCode) => {
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
      const variants = product.variants.filter(v => v.id !== variant_id)

      const withAmount = variants.map(v => {
        const price = v.prices.find(p => p.currency_code === currencyCode)

        return {
          variantId: v.id,
          title: v.title,
          amount: price ? price.amount : 0,
        }
      })

      return withAmount
    }

    return []
  }, [item, currencyCode, products])

  const handleAddExcange = (exchangeOption, quantity) => {
    setSelectedExchange({ ...exchangeOption, quantity })
  }

  return { selectedExchange, actions: { getExchangeOptions, handleAddExcange } }
}
