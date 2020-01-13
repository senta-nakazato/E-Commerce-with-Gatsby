import React, { useEffect, useRef, useState } from "react"

import { useDispatch, useSelector, useStore } from "react-redux"

import { graphql } from "gatsby"
import GatsbyImage from "gatsby-image"
import styled from "@emotion/styled"

import { formatPrice } from "@utils"
import { removeFromCart } from "@redux/actions"

import RemoveIcon from "@icons/Remove.Icon"

const ShoppingBag = () => {
  const products = useSelector(state => state.products)
  const dispatch = useDispatch()

  // const data = JSON.parse(localStorage.getItem("products"))
  // const [localProducts, setLocalProducts] = useState(null)

  // if (products) {
  //   products.forEach(item => {
  //     const matchedProduct = allProducts.find(product => item.id === product.id)
  //     matchedProduct.count = item.count
  //     products.push(matchedProduct)
  //   })
  // }

  // setLocalProducts(products)

  // const handleRemove = product => {
  //   console.log("delete")
  //   const deleteProduct = data.find(item => item.id === product.id)
  //   products.splice(products.indexOf(deleteProduct), 1)
  //   console.log(products)
  //   setLocalProducts(products)
  // }

  if (products.length === 0) {
    return <Frame>Empty</Frame>
  } else {
    return (
      <Frame>
        {products.map((product, index) => (
          <Row key={product.id}>
            <ImageContainer>
              <GatsbyImage fluid={product.images[0].small} />
            </ImageContainer>
            <Info>
              <Left>
                <Name>{product.name}</Name>
                <Price>{formatPrice(product.price)}</Price>
              </Left>
              <Right>
                <RemoveButton onClick={() => dispatch(removeFromCart(index))}>
                  <RemoveIcon />
                </RemoveButton>
                <Quantity>
                  数量：
                  <span>{product.quantity ? product.quantity : "1"}</span>
                </Quantity>
              </Right>
            </Info>
          </Row>
        ))}
      </Frame>
    )
  }
}

export default ShoppingBag

const Frame = styled.div`
  height: 100%;
  width: 32rem;
  overflow: scroll;
`
const Row = styled.div`
  display: flex;
  padding-bottom: 3.2rem;
  margin-bottom: 3.2rem;

  &:not(:last-child) {
    border-bottom: 1px solid ${p => p.theme.colors.border};
  }
`

const ImageContainer = styled.div`
  height: 8rem;
  width: 8rem;
  margin-right: 2rem;

  .gatsby-image-wrapper {
    height: 8rem;
    width: 8rem;
  }
`
const Info = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  height: auto;
  width: 100%;
`

const Name = styled.h3`
  font-size: 16px;
  margin-bottom: 8px;
`
const Left = styled.div`
  display: flex;
  flex-direction: column;
`
const Right = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-left: auto;
  height: 100%;
`
const Quantity = styled.p`
  font-size: 14px;
  font-weight: 300;
  margin-top: auto;
  text-align: left;

  span {
    font-size: 16px;
    font-weight: 600;
    padding-right: 4px;
  }
`
const Price = styled.p`
  font-size: 14px;
  font-weight: 300;
`
const RemoveButton = styled.button`
  height: 24px;
  width: 24px;
`
