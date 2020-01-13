/* eslint-disable import/first */

import React from "react"
import PropTypes from "prop-types"
import { Provider } from "react-redux"
import store from "@redux/store"

import { Global } from "@emotion/core"
import { globalStyles } from "@styles"

import Header from "@components/Header"
import Footer from "@components/Footer"
import PanelProvider from "@components/Panel/Panel.Context"
import PanelSlideIn from "@components/Panel/Panel.SlideIn"

const Layout = ({ children, location }) => {
  return (
    <Provider store={store}>
      <PanelProvider>
        <Global styles={globalStyles} />
        <PanelSlideIn />
        <Header location={location} />
        <main style={{ minHeight: "100vh" }}>{children}</main>
        <Footer />
      </PanelProvider>
    </Provider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
