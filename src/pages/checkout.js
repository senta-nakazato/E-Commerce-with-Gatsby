/* eslint-disable import/first */

import React from "react"
import { Provider } from "react-redux"
import store from "@redux/store"
import { Global } from "@emotion/core"
import styled from "@emotion/styled"
import { globalStyles } from "@styles"

import CheckoutReview from "@sections/checkout/Checkout.Review"
import CheckoutPayment from "@sections/checkout/Checkout.Payment"

import Header from "@components/Header"
import SEO from "@components/SEO"

const CheckoutPage = ({ location }) => {
  return (
    <Provider store={store}>
      <Global styles={globalStyles} />
      <SEO title="Checkout" pathName={location.pathname} />
      <Header location={location} checkout />
      <Wrapper>
        <CheckoutReview />
        <CheckoutPayment />
      </Wrapper>
    </Provider>
  )
}

export default CheckoutPage

const Wrapper = styled.div`
  background: rgb(234, 234, 238);

  min-height: 100vh;
  width: 100%;
  padding-top: 6rem;
  display: flex;
`
