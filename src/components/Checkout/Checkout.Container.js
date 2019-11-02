import React, { useState, useEffect } from "react"
import { Elements, StripeProvider } from "react-stripe-elements"

import CheckoutForm from "@components/Checkout/Checkout.Form"
import StripeHookProvider from "@components/Checkout/StripeHookProvider"

const CheckoutContainer = () => {
  const [stripe, setStripe] = useState(null)

  useEffect(() => {
    if (window.Stripe) {
      setStripe(window.Stripe("pk_test_1Y4LgFWhiJPEsivDjXsJA8cJ00tdvDj2SX"))
    } else {
      document.querySelector("#stripe-js").addEventListener("load", () => {
        setStripe(window.Stripe("pk_test_1Y4LgFWhiJPEsivDjXsJA8cJ00tdvDj2SX"))
      })
    }
  }, [])
  return (
    <StripeProvider stripe={stripe}>
      <Elements>
        <StripeHookProvider>
          <CheckoutForm />
        </StripeHookProvider>
      </Elements>
    </StripeProvider>
  )
}

export default CheckoutContainer
