import React, { useState } from "react"

import { css } from "@emotion/core"
import styled from "@emotion/styled"
import media from "@styles/media"
import { formatPrice } from "@utils/index"

import ColorVariants from "@components/ColorVarients"
import Action from "./Product.Action"

const ProductInfo = ({ product }) => {
  return (
    <Section>
      <Header>
        <Name>{product.name}</Name>
        <Price>{formatPrice(product.price)}</Price>
      </Header>
      <Description>{product.description.description}</Description>
      {product.colors && (
        <>
          <Heading>Color</Heading>
          <ColorVariants product={product} withName />
        </>
      )}
      <Action product={product} />
    </Section>
  )
}

export default ProductInfo

const Section = styled.section`
  grid-column: 8 col-start / 12 col-end;
`

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 2rem;
`

const Name = styled.h1`
  ${p => p.theme.styles.h1};
`

const Price = styled.p`
  font-size: 2rem;
`

const Description = styled.p`
  border-bottom: 1px solid ${p => p.theme.colors.border};
  font-size: 1.6rem;
  padding-bottom: 3.2rem;
  margin-bottom: 2rem;
`

const Heading = styled.h3`
  ${p => p.theme.styles.h3};
  color: ${p => p.theme.colors.heading};
  margin-bottom: 12px;
`
