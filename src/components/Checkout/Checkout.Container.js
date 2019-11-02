import React from "react"
import { Elements, StripeProvider } from "react-stripe-elements"

import CheckoutForm from "@components/Checkout/Checkout.Form"
import StripeHookProvider from "@components/Checkout/StripeHookProvider"

const CheckoutContainer = () => {
  return (
    <StripeProvider apiKey="pk_test_1Y4LgFWhiJPEsivDjXsJA8cJ00tdvDj2SX">
      <Elements>
        <StripeHookProvider>
          <CheckoutForm />
        </StripeHookProvider>
      </Elements>
    </StripeProvider>
  )
}

export default CheckoutContainer
