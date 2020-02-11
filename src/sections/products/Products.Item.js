import React from "react"
import { Link } from "gatsby"
import GatsbyImage from "gatsby-image"
import styled from "@emotion/styled"
import media from "@styles/media"

import { formatPrice, slugify } from "@utils"

import ColorsVarients from "@components/ColorVarients"

const ProductsItem = ({ product }) => {
  console.log("product", product)
  return (
    <Frame>
      <Link to={`products/${slugify(product.name)}`}>
        <Image fluid={product.images[0].regular} />
        <Name>{product.name}</Name>
        <Price>{formatPrice(product.price)}</Price>
      </Link>
      <Color>{product.colors && <ColorsVarients product={product} />}</Color>
    </Frame>
  )
}

export default ProductsItem

const Frame = styled.div`
  margin: 6rem 0;
  grid-column: span 4 / auto;

  ${media.desktop`
    grid-column: span 6 / auto;
  `}

  ${media.tablet`
    grid-column: span 12 / auto;
  `}
`

const Image = styled(GatsbyImage)`
  height: 40rem;
  width: 100%;

  ${media.desktop`
    height: 48rem;
    margin: 0 auto;
  `}

  ${media.tablet`
    width: 80vw;  
  `}

  ${media.phablet`
    height: 40rem;
  `}
`

const Name = styled.h1`
  font-size: 1.8rem;
  font-weight: 400;
  text-align: center;
  margin-top: 2rem;
  margin-bottom: 12px;
`

const Price = styled.p`
  color: grey;
  font-size: 1.4rem;
  font-weight: 400;
  text-align: center;
`

const Color = styled.div`
  display: flex;
  justify-content: center;
  padding: 2rem 0;
`
