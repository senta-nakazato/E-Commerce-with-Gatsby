import React, { useRef, useState, useEffect } from "react"

import styled from "@emotion/styled"

const ColorsVarients = ({ product, withName }) => {
  const [currentColor, setCurrentColor] = useState(0)
  const [hoverColor, setHoverColor] = useState(null)

  function handleColorName() {
    if (hoverColor !== null) {
      return product.colors[hoverColor].name
    } else {
      return product.colors[currentColor].name
    }
  }
  return (
    <>
      {withName && <ColorName>{handleColorName()}</ColorName>}
      <Container>
        {product.colors.map((color, index) => (
          <Color
            key={index}
            hex={color.hex}
            onMouseEnter={() => setHoverColor(index)}
            onMouseLeave={() => setHoverColor(null)}
            onClick={() => setCurrentColor(index)}
            show={index === currentColor}
          />
        ))}
      </Container>
    </>
  )
}

export default ColorsVarients

const Container = styled.div`
  display: flex;
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
    height: 2.6rem;
    width: 2.6rem;
    background: transparent;
    border-radius: 100%;

    ${p =>
      p.show
        ? `border: 1px solid ${p.theme.colors.primary};`
        : `border: none;`};
  }
`

const ColorName = styled.p`
  font-size: 1.2rem;
  font-weight: 400;
  margin-bottom: 8px;
`
