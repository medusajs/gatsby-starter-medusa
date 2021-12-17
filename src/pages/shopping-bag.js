import React, { useEffect, useState } from "react"
import CartItem from "../components/cart/cart-item"
import CartReview from "../components/cart/cart-review"
import ProductListItem from "../components/products/product-list-item"
import Grid from "../components/utility/grid"
import SearchEngineOptimization from "../components/utility/seo"
import { useCart } from "../hooks/use-cart"
import { useSuggestions } from "../hooks/use-suggestions"

const ShoppingBag = () => {
  const [related, setRelated] = useState([])

  const { cart } = useCart()
  const { getSuggestionsFromCart } = useSuggestions()

  useEffect(() => {
    if (cart.items.length > 0) {
      const relatedProducts = getSuggestionsFromCart(cart)
      setRelated(relatedProducts)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart])

  return (
    <div className="layout-base">
      <SearchEngineOptimization title="Shopping Bag" />
      <div className="flex relative flex-col-reverse lg:flex-row">
        <div className="flex flex-col lg:mr-12 lg:w-3/5">
          <div className="mb-8">
            <h1 className="font-semibold">Shopping Bag</h1>
          </div>
          <div className="w-full">
            {cart.items.map(item => {
              return (
                <CartItem
                  key={item.id}
                  item={item}
                  currencyCode={cart.region?.currency_code}
                />
              )
            })}
          </div>
        </div>
        <div className="relative w-full mb-8 lg:mb-0 lg:w-2/5">
          <CartReview cart={cart} />
        </div>
      </div>
      {related.length > 0 && (
        <div className="my-12">
          <Grid
            title="You might also like"
            cta={{ to: "/products", text: "Browse all products" }}
          >
            {related.slice(0, 4).map(product => {
              return <ProductListItem key={product.handle} product={product} />
            })}
          </Grid>
        </div>
      )}
    </div>
  )
}

export default ShoppingBag
