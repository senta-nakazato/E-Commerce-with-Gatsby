import React from "react"

import Layout from "@components/Layout"

import ProductsList from "@sections/products/Products.List"
import ProductsItem from "@sections/products/Products.Item"

const PostTemplate = ({ pageContext, location }) => {
  const { products } = pageContext

  return (
    <Layout location={location}>
      <ProductsList products={products} />
    </Layout>
  )
}

export default PostTemplate
