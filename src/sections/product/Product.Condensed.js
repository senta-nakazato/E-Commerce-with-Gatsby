import React, { useContext, useState } from "react"
import { useDispatch } from "react-redux"
import styled from "@emotion/styled"
import { formatPrice, useScrollPosition } from "@utils"

import { addToCart } from "@redux/actions"
import { ShoppingBagContext } from "@components/ShoppingBag/ShoppingBag.Context"
import ColorVariants from "@components/ColorVarients"

const ProductCondensed = ({ product }) => {
  const [isShow, setIsShow] = useState(false)
  const { toggleShoppingBag } = useContext(ShoppingBagContext)
  const dispatch = useDispatch()
  const target = false
  // const target = document.getElementById("home-hero")
  const contentHeight = target ? target.clientHeight - 100 : "600"

  function addToBag(item) {
    item.quantity = 1
    dispatch(addToCart(item))
    toggleShoppingBag()
  }

  useScrollPosition(
    ({ currPos }) => {
      currPos.y > contentHeight ? setIsShow(true) : setIsShow(false)
    },
    [isShow],
    false,
    true,
    300
  )

  return (
    <Section isShow={isShow}>
      <ProductInfo>
        <Name>{product.name}</Name>
        <Price>{formatPrice(product.price)}</Price>
      </ProductInfo>
      <Text>FREE SHIPPING FOR ORDERS OVER $10</Text>
      {product.colors && (
        <ColorContainer>
          <ColorVariants product={product} withName />
        </ColorContainer>
      )}
      <ActionButton onClick={() => addToBag(product)}>ADD TO BAG</ActionButton>
    </Section>
  )
}

export default ProductCondensed

const Section = styled.header`
  background: white;
  display: none;
  flex-direction: row;
  align-items: center;
  position: fixed;
  top: 0px;
  width: 100%;
  z-index: 900;
  height: 6rem;
  overflow: hidden;
  border-bottom: 1px solid rgb(224, 224, 224);

  ${p => p.isShow && `display: flex;`};
`

const ProductInfo = styled.div`
  display: flex;
  align-items: baseline;
  flex-grow: 1;
  margin-left: 2rem;
`
const Name = styled.h2`
  font-size: 2.5rem;
  font-weight: 400;
  margin-right: 8px;
  text-transform: uppercase;
`
const Price = styled.p`
  font-size: 1.6rem;
  font-weight: 300;
`
const Text = styled.p`
  font-size: 1.2rem;
  letter-spacing: 1px;
  padding-right: 2rem;
  width: 16rem;
`

const ColorContainer = styled.div`
  border-right: 1px solid rgb(224, 224, 224);
  border-left: 1px solid rgb(224, 224, 224);
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-right: 4rem;
  padding-left: 2rem;
  height: 6rem;
`

const ActionButton = styled.button`
  background: ${p => p.theme.colors.button};
  color: white;
  font-size: 1.2rem;
  font-weight: 600;
  letter-spacing: 2px;
  text-align: center;
  height: 6rem;
  padding: 0 1rem;
  width: 24rem;
  ${p => p.theme.transitions.opacity};

  &:hover {
    opacity: 0.8;
  }
`
