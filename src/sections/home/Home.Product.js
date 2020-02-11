import React from "react"
import { Link as GatsbyLink } from "gatsby"

import GatsbyImage from "gatsby-image"
import styled from "@emotion/styled"
import media from "@styles/media"

import { formatPrice, slugify } from "@utils/index"

import ArrowIcon from "@icons/Arrow.Icon"

const Product = ({ product }) => {
  const { name, price } = product
  const image = product.images[0].fluid

  return (
    <Link to={`/products/${slugify(name)}`}>
      <Image fluid={image} />
      <Header>
        <Name>{name}</Name>
        <Price>{formatPrice(price)}</Price>
      </Header>
      <ActionLink className="action-link">
        <Text>DETAIL PAGE</Text>
        <ArrowIcon />
      </ActionLink>
    </Link>
  )
}

export default Product

const Link = styled(GatsbyLink)`
  &:hover .action-link {
    transform: translateX(1.2rem);
  }
`
const Image = styled(GatsbyImage)`
  height: 50rem;
  width: 50rem;

  ${media.desktop`
   height: 35rem;
    width: 35rem;
  `}

  ${media.phablet`
   height: 30rem;
    width: 80vw;
  `}
`
const Name = styled.h2`
  font-size: 2.5rem;
  font-weight: 400;
  margin-top: 2rem;
  margin-right: 2rem;

  ${media.phablet`
     font-size: 2.2rem;
     width: 70%;
  `}
`
const Price = styled.span`
  color: ${p => p.theme.colors.grey};
  font-size: 16px;
  font-weight: 300;
  letter-spacing: 1px;

  ${media.phablet`
     width: 30%;
  `}
`
const Header = styled.div`
  display: flex;
  align-items: baseline;
  margin-bottom: 1.2rem;

  ${media.phablet`
     width: 80vw;
  `}
`
const Text = styled.span`
  font-size: 1.2rem;
  font-weight: 400;
  letter-spacing: 1px;
  text-transform: uppercase;
  text-align: center;
  margin-right: 8px;
  white-space: nowrap;
`
const ActionLink = styled.button`
  transition: all 0.2s var(--ease-in-out-quad);
  display: flex;
  margin-top: 2rem;

  ${media.phablet`
     width: auto;
  `}
`
