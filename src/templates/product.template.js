import React, { useRef, useState, useEffect } from "react"

import styled from "@emotion/styled"

import Layout from "@components/Layout"

import ProductImage from "@sections/product/Product.Image"
import ProductInfo from "@sections/product/Product.Info"

const PostTemplate = ({ pageContext, location }) => {
  const { product, name } = pageContext

  return (
    <Layout location={location}>
      <Grid>
        <ProductImage images={product.images} />
        <ProductInfo product={product} />
      </Grid>
    </Layout>
  )
}

export default PostTemplate

const Grid = styled.div`
  display: grid;
  grid-column-gap: 1.5vw;
  grid-template-columns:
    [left] minmax(9%, 1fr) repeat(12, [col-start] minmax(0px, 70px) [col-end])
    minmax(9%, 1fr) [right];
  margin: 4rem 0 8rem;
`
