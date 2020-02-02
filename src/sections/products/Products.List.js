import React from "react"
import styled from "@emotion/styled"

import Grid from "@components/Grid"
import ProductsItem from "@sections/products/Products.Item"

const ProductsList = ({ products }) => {
  return (
    <Section>
      <Grid narrow>
        {products.map(product => (
          <ProductsItem product={product} />
        ))}
      </Grid>
    </Section>
  )
}

export default ProductsList

const Section = styled.section`
  margin: 6rem 0;
`
