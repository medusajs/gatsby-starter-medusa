import React, { useEffect, useState } from "react"
import Field from "../components/forms/field"
import SplitField from "../components/forms/split-field"
import OrderBulletin from "../components/orders/order-bulletin"
import ReturnSummary from "../components/returns/return-summary"
import SelectExchangeItem from "../components/returns/select-exchange-item"
import SelectReturnItem from "../components/returns/select-return-item"
import SelectReturnQuantity from "../components/returns/select-return-quantity"
import ShippingOptions from "../components/shipping/shipping-options"
import Divider from "../components/utility/divider"
import ErrorMessage from "../components/utility/error-message"
import Grid from "../components/utility/grid"
import SearchEngineOptimization from "../components/utility/seo"
import { useReturn } from "../hooks/use-return"
import { classNames } from "../utils/class-names"

const CreateReturn = ({ location }) => {
  const [initialValues, setInitialValues] = useState(null)

  const {
    order,
    fetchOrderForm,
    returnOptions,
    selectedItems,
    additionalItems,
    selectedShipping,
    returnItemsError,
    returnShippingError,
    completionError,
    notReturnable,
    actions: {
      setOrder,
      selectItem,
      deselectItem,
      updateItemQuantity,
      setSelectedShipping,
      addExchangeItem,
      removeExchangeItem,
      createReturn,
    },
  } = useReturn(initialValues)

  useEffect(() => {
    if (location.state && location.state.order) {
      const { order: res } = location.state
      setInitialValues({ display_id: res.display_id, email: res.email })
      setOrder(res)
    }
  }, [location.state, setOrder])

  useEffect(() => {
    if (returnItemsError) {
      document
        .getElementById("return-items-error")
        .scrollIntoView({ behavior: "smooth", block: "center" })
    }
  }, [returnItemsError])

  useEffect(() => {
    if (returnShippingError) {
      document
        .getElementById("return-shipping-error")
        .scrollIntoView({ behavior: "smooth", block: "center" })
    }
  }, [returnShippingError])

  return (
    <div className="layout-base">
      <SearchEngineOptimization title="Create Return" />
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between border-b border-ui-medium pb-8">
        <div>
          <h1>Create Return</h1>
          <p className="mt-2">
            Use this form to create returns and exchange items
          </p>
        </div>
        <div className="flex flex-col mt-4 lg:mt-0 lg:flex-row lg:items-baseline lg:w-1/2">
          <SplitField>
            <Field
              placeholder="Order number"
              formik={fetchOrderForm}
              name="display_id"
              defaultValue={fetchOrderForm.values.display_id}
            />
            <Field
              placeholder="Email"
              formik={fetchOrderForm}
              name="email"
              autocomplete="email"
              defaultValue={fetchOrderForm.values.email}
            />
          </SplitField>
          <div className="my-3 lg:my-0 lg:mx-2" />
          <button
            className="btn-ui"
            onClick={e => {
              e.preventDefault()
              fetchOrderForm.submitForm()
            }}
          >
            Retrieve
          </button>
        </div>
      </div>
      {order ? (
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/2">
            <div className="mt-8">
              <OrderBulletin order={order} cta={false} />
              <div className="mt-8">
                <h3>Select items</h3>
                <p>Select the items you wish to return</p>
                <div
                  className={classNames(
                    returnItemsError ? "block" : "hidden",
                    "mt-2"
                  )}
                  id="return-items-error"
                >
                  <ErrorMessage error={returnItemsError} />
                </div>
                <div className="mt-4">
                  <Grid>
                    {order.items.map(item => {
                      return (
                        <SelectReturnItem
                          key={item.id}
                          item={item}
                          currencyCode={order.currency_code}
                          onSelect={selectItem}
                          onDeselect={deselectItem}
                        />
                      )
                    })}
                  </Grid>
                </div>
              </div>
              <Divider />
              <div>
                <h3>Quantity</h3>
                <p>
                  Select the quantity of each item you wish to return. You can
                  only return up to the quantity you purchased.
                </p>
                {selectedItems.map(item => {
                  return (
                    <div key={item.id} className="mt-4">
                      <SelectReturnQuantity
                        item={item}
                        updateQuantity={updateItemQuantity}
                      />
                    </div>
                  )
                })}
              </div>
              <Divider />
              <div>
                <h3>Exchanges</h3>
                <p className="mt-1">
                  If you wish to exchange an item, select the quantity of the
                  item aswell as the variant you wish to receive instead.
                </p>
                {selectedItems.map(item => {
                  return (
                    <div key={item.id} className="mt-4">
                      <SelectExchangeItem
                        item={item}
                        currencyCode={order?.currency_code}
                        taxRate={order?.tax_rate}
                        addExchangeItem={addExchangeItem}
                        removeExchangeItem={removeExchangeItem}
                      />
                    </div>
                  )
                })}
              </div>
              <Divider />
              <div className="mt-4">
                {returnOptions.length && (
                  <ShippingOptions
                    options={returnOptions}
                    title="Return method"
                    description={
                      "We recommend purchasing a shipping label to ensure there is a tracking code and safe means for returning your product(s)."
                    }
                    onSelect={setSelectedShipping}
                    defaultValue={selectedShipping}
                    currencyCode={order.currency_code}
                  />
                )}
                <div
                  className={classNames(
                    returnShippingError ? "block" : "hidden",
                    "mt-2"
                  )}
                  id="return-shipping-error"
                >
                  <ErrorMessage error={returnShippingError} />
                </div>
              </div>
            </div>
          </div>
          <div className="lg:pl-16 lg:w-1/2 mt-8">
            <ReturnSummary
              selectedItems={selectedItems}
              additionalItems={additionalItems}
              selectedShipping={selectedShipping}
              currencyCode={order?.currency_code}
              completeReturn={createReturn}
              error={completionError}
            />
          </div>
        </div>
      ) : (
        <div className="flex w-full py-24 items-center justify-center">
          {notReturnable ? (
            <ErrorMessage
              error={
                "The selected order is not able to be returned. This can be because it has not been processed yet, or due to it already having been returned. If you wish to cancel your order or have any questions then don't hesitate to contact us"
              }
            />
          ) : (
            <p>Retrieve an order to create a return</p>
          )}
        </div>
      )}
    </div>
  )
}

export default CreateReturn
