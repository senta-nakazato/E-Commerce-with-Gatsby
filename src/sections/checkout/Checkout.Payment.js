import React, { useState, useEffect } from "react"
import { Elements, StripeProvider } from "react-stripe-elements"
import { css } from "@emotion/core"
import styled from "@emotion/styled"

import CheckoutForm from "@components/Checkout/Checkout.Form"

const CheckoutPayment = () => {
  const [stripe, setStripe] = useState(null)
  const [showOverlay, setShowOverlay] = useState(false)

  const toggleOverlay = () => {
    setShowOverlay(true)
  }

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
    <Section>
      <Overlay showOverlay={showOverlay} />
      <StripeProvider stripe={stripe}>
        <Elements>
          <CheckoutForm stripe={stripe} toggleOverlay={toggleOverlay} />
        </Elements>
      </StripeProvider>
    </Section>
  )
}

export default CheckoutPayment

const Section = styled.section`
  background: transparent;
  flex-basis: 50%;
  padding: 4rem;
  margin: 0 auto;

  @media (max-width: 800px) {
    width: 100%;
    max-width: 40rem;
    padding: 8rem 2rem;
  }
`

const Overlay = styled.div`
  ${p =>
    p.showOverlay &&
    css`
      opacity: 1;
      visibility: hidden;
    `};
`
