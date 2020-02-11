import React, { useState, useContext } from "react"
import { css } from "@emotion/core"
import styled from "@emotion/styled"
import { useDispatch } from "react-redux"
import media from "@styles/media"

import { addToCart } from "@redux/actions"

import PlusIcon from "@icons/Plus.Icon"
import MinusIcon from "@icons/Minus.Icon"
import { ShoppingBagContext } from "@components/ShoppingBag/ShoppingBag.Context"

const Action = ({ product }) => {
  const [count, setCount] = useState(1)

  const dispatch = useDispatch()
  const { toggleShoppingBag } = useContext(ShoppingBagContext)

  function addToBag(item) {
    item.quantity = count
    dispatch(addToCart(item))
    toggleShoppingBag()
  }

  return (
    <Frame>
      <MediaQuery>
        <Quantity>
          <CountButton onClick={() => setCount(count - 1)} disable={count < 2}>
            <MinusIcon />
          </CountButton>
          <Number value={count} />
          <CountButton onClick={() => setCount(count + 1)}>
            <PlusIcon />
          </CountButton>
        </Quantity>
      </MediaQuery>

      <ActionButton onClick={() => addToBag(product)}>ADD TO BAG</ActionButton>
    </Frame>
  )
}

export default Action

const CountButton = styled.button`
  padding: 2rem;
  transform: scale(0.8);
  ${p =>
    p.disable &&
    css`
      pointer-events: none;
      opacity: 0.4;
    `};
`
const Number = styled.input`
  border: none;
  color: black;
  font-size: 2rem;
  font-weight: 400;
  line-height: 1.92;
  text-align: center;
  pointer-events: none;
  width: 4rem;
`
const Frame = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 4rem;
`
const ActionButton = styled.button`
  background: ${p => p.theme.colors.button};
  color: white;
  font-size: 1.2rem;
  font-weight: 600;
  letter-spacing: 2px;
  text-align: center;
  padding: 2rem 4rem;
  width: 50%;
  ${p => p.theme.transitions.opacity};

  ${media.phablet`
     width: 100%;
  `};

  &:hover {
    opacity: 0.8;
  }
`

const Quantity = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  color: rgba(0, 0, 0, 0);
  background-color: transparent;
  border: 1px solid rgb(8, 4, 0);
`

const MediaQuery = styled.div`
  ${media.phablet`
    display: none;
  `};
`
