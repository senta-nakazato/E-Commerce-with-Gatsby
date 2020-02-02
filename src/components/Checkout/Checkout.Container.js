import React, { useState, useEffect } from "react"
import { Elements, StripeProvider } from "react-stripe-elements"

import CheckoutForm from "@components/Checkout/Checkout.Form"
// import StripeHookProvider from "@components/Checkout/StripeHookProvider"

const CheckoutContainer = () => {
  const [stripe, setStripe] = useState(null)

  useEffect(() => {
    if (window.Stripe) {
      setStripe(window.Stripe(process.env.GATSBY_STRIPE_TEST_KEY))
    } else {
      document.querySelector("#stripe-js").addEventListener("load", () => {
        setStripe(window.Stripe(process.env.GATSBY_STRIPE_TEST_KEY))
      })
    }
  }, [])

  return (
    <StripeProvider stripe={stripe}>
      <Elements>
        <CheckoutForm stripe={stripe} />
      </Elements>
    </StripeProvider>
  )
}

export default CheckoutContainer
