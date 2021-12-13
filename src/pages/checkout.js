import React, { Fragment, useState } from "react"
import BillingAddress from "../components/domains/checkout/billing-address"
import CheckoutLayout from "../components/domains/checkout/checkout-layout"
import CheckoutSummary from "../components/domains/checkout/checkout-summary"
import ContactInformation from "../components/domains/checkout/contact-information"
import SelectDelivery from "../components/domains/checkout/select-delivery"
import ShippingAddress from "../components/domains/checkout/shipping-address"
import Payment from "../components/domains/payment"
import Divider from "../components/domains/utility/divider"
import SearchEngineOptimization from "../components/seo"
import { useCart } from "../hooks/use-cart"
import { useCheckout } from "../hooks/use-checkout"

const Checkout = () => {
  const { cart } = useCart()

  const [hideBilling, setHideBilling] = useState(true)
  const [hideSummary, setHideSummary] = useState(true)

  const {
    forms: { contactForm, billingForm, shippingForm },
    shippingMethod: {
      selectedShippingMethod,
      setSelectedShippingMethod,
      getShippingOptions,
    },
    loading,
    setupCheckout,
  } = useCheckout(hideBilling)

  return (
    <Fragment>
      <SearchEngineOptimization title="Checkout" />
      <CheckoutLayout hideSummary={hideSummary} setHideSummary={setHideSummary}>
        <div>
          <ContactInformation controller={contactForm} />
          <Divider />
          <ShippingAddress controller={shippingForm} />
          <label class="flex items-center text-grey-700 font-light text-sm mt-4">
            <input
              className="checkbox-ui"
              type="checkbox"
              checked={hideBilling}
              onChange={() => setHideBilling(!hideBilling)}
            />
            Billing address is the same as shipping address
          </label>
          {!hideBilling && (
            <>
              <Divider />
              <BillingAddress controller={billingForm} />
            </>
          )}
          <Divider />
          <SelectDelivery
            getShippingOptions={getShippingOptions}
            setSelectedShippingMethod={setSelectedShippingMethod}
          />
          <Divider />
          <Payment setupCheckout={setupCheckout} />
        </div>
        <div className="lg:sticky lg:top-28">
          <CheckoutSummary
            cart={cart}
            shippingOption={selectedShippingMethod}
            hidden={hideSummary}
          />
        </div>
      </CheckoutLayout>
    </Fragment>
  )
}

export default Checkout
