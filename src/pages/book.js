import React from "react"
import { Link } from "gatsby"

import Layout from "@components/layout"
import SEO from "@components/SEO"

import BookCollection from "@sections/book/Book.Collection"

const BookPage = ({ location }) => {
  return (
    <Layout location={location}>
      <SEO title="Books" pathName={location.pathName} />
      <BookCollection />
      <Link to="/">Go to Home</Link>
    </Layout>
  )
}

export default BookPage
