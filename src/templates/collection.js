import React, { Fragment, useState } from "react"
import MobileProductFilter from "../components/categories/mobile-product-filter"
import ProductFilter from "../components/products/product-filter"
import ProductListItem from "../components/products/product-list-item"
import Grid from "../components/utility/grid"
import SearchEngineOptimization from "../components/utility/seo"
import { useFilter } from "../hooks/use-filter"
import Funnel from "../icons/funnel.svg"

const Collection = ({ pageContext }) => {
  const [open, setOpen] = useState(false)
  const [activeFilters, setActiveFilters] = useState(null)
  const { title, filterables, products } = pageContext
  const filteredProducts = useFilter(products, activeFilters)

  return (
    <Fragment>
      <SearchEngineOptimization title={title} />
      <MobileProductFilter
        open={open}
        setOpen={setOpen}
        filterables={filterables}
        activeFilters={activeFilters}
        setActiveFilters={setActiveFilters}
      />
      <div className="layout-base relative">
        <div className="w-full border-b border-ui-medium pb-6 mb-2 lg:mb-6 flex items-center justify-between">
          <h1 className="font-semibold">{title}</h1>
          <button className="lg:hidden" onClick={() => setOpen(!open)}>
            <span className="sr-only">Filter</span>
            <img src={Funnel} alt="" className="w-4 h-4" />
          </button>
        </div>
        <div className="flex relative">
          <div className="hidden lg:block lg:w-2/5 relative">
            <ProductFilter
              filterables={filterables}
              activeFilters={activeFilters}
              setActiveFilters={setActiveFilters}
            />
          </div>
          <div className="lg:ml-16">
            <Grid>
              {filteredProducts.map(product => {
                return (
                  <ProductListItem key={product.handle} product={product} />
                )
              })}
            </Grid>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default Collection
