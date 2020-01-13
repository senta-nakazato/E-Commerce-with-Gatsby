import React, { useRef, useState, useEffect } from "react"
import styled from "@emotion/styled"

import Layout from "@components/Layout"

import ProductCondensed from "@sections/product/Product.Condensed"
import ProductImage from "@sections/product/Product.Image"
import ProductInfo from "@sections/product/Product.Info"
import ProductFeatures from "@sections/product/Product.Features"
import OurStory from "@sections/OurStory"

const PostTemplate = ({ pageContext, location }) => {
  const { product } = pageContext

  return (
    <Layout location={location}>
      <ProductCondensed product={product} />
      <Grid>
        <ProductImage images={product.images} />
        <ProductInfo product={product} />
      </Grid>
      <ProductFeatures productFeatures={product.productFeatures} />
      <OurStory />
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
  min-height: 100vh;
  margin-top: 10rem;
`
