/* eslint-disable import/first */

import React from "react"
import PropTypes from "prop-types"
import { Provider } from "react-redux"
import store from "@redux/store"

import { Global } from "@emotion/core"
import { globalStyles } from "@styles"

import Header from "@components/Header"
import Footer from "@components/Footer"
import ShoppingBagProvider from "@components/ShoppingBag/ShoppingBag.Context"
import ShoppingBagSlideIn from "@components/ShoppingBag/ShoppingBag.SlideIn"

const Layout = ({ children, location }) => {
  return (
    <Provider store={store}>
      <ShoppingBagProvider>
        <Global styles={globalStyles} />
        <ShoppingBagSlideIn />

        <Header location={location} />
        <main style={{ minHeight: "100vh" }}>{children}</main>
        <Footer />
      </ShoppingBagProvider>
    </Provider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
