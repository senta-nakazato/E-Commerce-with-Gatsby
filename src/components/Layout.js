import React from "react"
import PropTypes from "prop-types"

import { Global } from "@emotion/core"
import { globalStyles } from "@styles"

import Header from "@components/Header"

const Layout = ({ children }) => {
  return (
    <>
      <Global styles={globalStyles} />
      <Header />
      <main style={{ minHeight: "100vh" }}>{children}</main>
      <footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.org">Gatsby</a>
      </footer>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
