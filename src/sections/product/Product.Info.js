import React, { useState } from "react"

import { css } from "@emotion/core"
import styled from "@emotion/styled"
import media from "@styles/media"

import Action from "./Product.Action"

const ProductInfo = ({ product }) => {
  const [currentColor, setCurrentColor] = useState(0)
  const [hoverColor, setHoverColor] = useState(null)

  function handleColorName() {
    if (hoverColor !== null) {
      return product.colors[hoverColor].name
    } else {
      return product.colors[currentColor].name
    }
  }

  function formatPrice(price, currency = "JPY") {
    let numberFormat = new Intl.NumberFormat(["ja-JP"], {
      style: "currency",
      currency: currency,
      currencyDisplay: "symbol",
    })
    return numberFormat.format(price)
  }

  return (
    <Section>
      <Header>
        <Name>{product.name}</Name>
        <Price>{formatPrice(product.price)}</Price>
      </Header>
      <Description>{product.description.description}</Description>
      <Heading>Color</Heading>
      {product.colors && (
        <>
          <ColorName>{handleColorName()}</ColorName>
          <ColorVariants>
            {product.colors.map((color, index) => (
              <Color
                hex={color.hex}
                onMouseEnter={() => setHoverColor(index)}
                onMouseLeave={() => setHoverColor(null)}
                onClick={() => setCurrentColor(index)}
                show={index === currentColor}
              />
            ))}
          </ColorVariants>
        </>
      )}
      <Action />
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

const ColorVariants = styled.div`
  display: flex;
  margin-bottom: 4rem;
`

const ColorName = styled.p`
  margin-bottom: 8px;
`

const Color = styled.div`
  background: ${p => p.hex};
  width: 2rem;
  height: 2rem;
  border-radius: 100%;

  margin-right: 12px;
  position: relative;
  cursor: pointer;

  &:after {
    display: block;
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 2.8rem;
    width: 2.8rem;
    background: transparent;
    border-radius: 100%;

    ${p => (p.show ? `border: 2px solid red;` : `border: none;`)};
  }
`
