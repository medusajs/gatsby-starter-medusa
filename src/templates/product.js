import { graphql, navigate } from "gatsby"
import React, { useEffect } from "react"
import ProductExpandable from "../components/products/product-expandable"
import ProductImages from "../components/products/product-images"
import ProductListItem from "../components/products/product-list-item"
import ProductOptionSelector from "../components/products/product-option-selector"
import QuantitySelector from "../components/products/quantity-selector"
import Grid from "../components/utility/grid"
import SearchEngineOptimization from "../components/utility/seo"
import { useCart } from "../hooks/use-cart"
import { useProduct } from "../hooks/use-product"
import { useRegion } from "../hooks/use-region"
import { formatPrice } from "../utils/format-price"
import { pickDetails } from "../utils/pick-details"
import { toKebab } from "../utils/to-kebab"

const Product = ({ data, pageContext }) => {
  const { product, related } = data
  const { regionId, currencyCode, handle } = pageContext
  const details = pickDetails(product)
  const {
    loading,
    actions: { addItem },
  } = useCart()

  const {
    variant,
    options,
    quantity,
    actions: {
      updateOptions,
      increaseQuantity,
      decreaseQuantity,
      resetOptions,
    },
  } = useProduct(product)

  const price = variant
    ? variant.prices.find(p => p.currency_code === currencyCode)
    : undefined

  const handleAddToCart = async () => {
    await addItem({ variant_id: variant.id, quantity })
    resetOptions()
  }

  const { region } = useRegion()

  useEffect(() => {
    if (region && region.id !== regionId) {
      navigate(`/${toKebab(region.name)}/${handle}`)
    }
  }, [region, handle, regionId])

  return (
    <div className="layout-base">
      <SearchEngineOptimization
        title={product.title}
        description={product.description}
      />
      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-3/5 lg:pr-14">
          <ProductImages images={product.images} />
        </div>
        <div className="mt-8 lg:mt-0 lg:w-2/5 lg:max-w-xl">
          <h1 className="font-semibold text-3xl">{product.title}</h1>
          <p className="text-lg mt-2 mb-4">
            {formatPrice(price?.amount, currencyCode, 1)}
          </p>
          <p className="font-light">{product.description}</p>
          {product.options.map((option, index) => {
            return (
              <div key={index} className="mt-6">
                <ProductOptionSelector
                  option={option}
                  current={options[option.id]}
                  updateOption={updateOptions}
                />
              </div>
            )
          })}
          <div className="inline-flex mt-4">
            <button
              className="btn-ui mr-2 px-12"
              onClick={() => handleAddToCart()}
              disabled={loading}
            >
              Add to bag
            </button>
            <QuantitySelector
              quantity={quantity}
              increment={increaseQuantity}
              decrement={decreaseQuantity}
            />
          </div>
          <div className="mt-12">
            {Object.keys(details).length > 0 && (
              <ProductExpandable title="Details">
                <ul className="list-inside list-disc">
                  {Object.keys(details).map((key, index) => {
                    return <li key={index}>{`${key}: ${details[key]}`}</li>
                  })}
                </ul>
              </ProductExpandable>
            )}
            {product.metadata?.care && (
              <ProductExpandable title="Care">
                <ul className="list-inside list-disc">
                  {product.metadata.care.map((instruction, index) => {
                    return <li key={index}>{`${instruction}`}</li>
                  })}
                </ul>
              </ProductExpandable>
            )}
          </div>
        </div>
      </div>
      <div className="my-12">
        <Grid
          title="You might also like"
          cta={{ to: "/products", text: "Browse all products" }}
        >
          {related.edges
            .map(({ node }) => node)
            .slice(0, 4)
            .map(product => {
              return <ProductListItem key={product.handle} product={product} />
            })}
        </Grid>
      </div>
    </div>
  )
}

export const query = graphql`
  query ($handle: String!) {
    product: medusaProducts(handle: { eq: $handle }) {
      id
      title
      description
      weight
      options {
        id
        title
        values {
          id
          value
        }
      }
      variants {
        options {
          value
          option_id
          id
        }
        id
        title
        prices {
          amount
          currency_code
        }
      }
      images {
        url
        image {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
    }
    related: allMedusaProducts(limit: 5, filter: { handle: { ne: $handle } }) {
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
`

export default Product
