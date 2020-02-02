import React, { useRef, useState, useEffect } from "react"
import styled from "@emotion/styled"

import Grid from "@components/Grid"
import Layout from "@components/Layout"

import ProductCondensed from "@sections/product/Product.Condensed"
import ProductImage from "@sections/product/Product.Image"
import ProductInfo from "@sections/product/Product.Info"
import ProductFeatures from "@sections/product/Product.Features"
import OurStory from "@sections/OurStory"

const ProductTemplate = ({ pageContext, location }) => {
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

export default ProductTemplate
