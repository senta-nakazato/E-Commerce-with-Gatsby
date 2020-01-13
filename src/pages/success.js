import React from "react"
import { Link } from "gatsby"

import Layout from "@components/layout"
import SEO from "@components/SEO"

const SuccessPage = ({ location }) => (
  <Layout location={location}>
    <SEO title="Success" />
    <h1>Successd!</h1>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export default SuccessPage
