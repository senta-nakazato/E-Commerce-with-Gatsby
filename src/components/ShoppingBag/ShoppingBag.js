import React, { useContext } from "react"
import { useDispatch, useSelector } from "react-redux"
import { navigate, Link } from "gatsby"
import GatsbyImage from "gatsby-image"
import styled from "@emotion/styled"
import media from "@styles/media"

import { formatPrice } from "@utils"
import { removeFromCart } from "@redux/actions"

import RemoveIcon from "@icons/Remove.Icon"
import { ShoppingBagContext } from "./ShoppingBag.Context"
import Button from "@components/Button"

const ShoppingBag = () => {
  const products = useSelector(state => state.products)
  const { toggleShoppingBag } = useContext(ShoppingBagContext)

  const handleClick = event => {
    event.preventDefault()
    toggleShoppingBag()
    navigate("/products")
  }

  let totalAmount = 0
  if (products.length !== 0) {
    products.forEach(p => {
      totalAmount += p.quantity * p.price
    })
  }

  if (products.length === 0) {
    return (
      <Frame>
        <Empty>
          <h1 className="heading">
            YOUR BAG
            <br />
            <p className="sub-heading">is currently empty</p>
          </h1>{" "}
          <Link to="/products">
            <Button text="SHOP ALL PRODUCTS" width="calc(100% - 30px)" white />
          </Link>
        </Empty>
      </Frame>
    )
  } else {
    return (
      <Frame>
        <ProductList>
          {products.map((product, index) => (
            <ProductItem product={product} index={index} />
          ))}
        </ProductList>
        <Summary as="table">
          <tr>
            <th>Subtotal</th>
            <td>{formatPrice(totalAmount)}</td>
          </tr>
          <tr>
            <th>Tax</th>
            <td>ー</td>
          </tr>
          <tr>
            <th>Shipping</th>
            <td>0</td>
          </tr>
          <hr />
          <tr className="total">
            <th>Total</th>
            <td>{formatPrice(totalAmount)}</td>
          </tr>
          <CheckoutButton onClick={() => navigate("/checkout")}>
            CHECK OUT
          </CheckoutButton>
        </Summary>
      </Frame>
    )
  }
}

export default ShoppingBag

const ProductItem = ({ product, index }) => {
  const dispatch = useDispatch()

  return (
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
  )
}

const Frame = styled.div`
  height: 100%;
  width: 32rem;
  position: relative;

  ${media.phablet`
    width: 100%;
  `}
`
const Empty = styled.div`
  text-align: center;

  .heading {
    font-size: 3.2rem;
    font-weight: 600;
    text-transform: uppercase;
    margin-bottom: 4rem;
  }

  .sub-heading {
    font-size: 2rem;
    font-weight: 300;
    letter-spacing: 1.2px;
    text-transform: none;
    margin-top: 1.6rem;
  }
`

const ProductList = styled.ul`
  margin-bottom: auto;
  height: 70%;
  overflow-y: auto;
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
const Summary = styled.table`
  position: absolute;
  bottom: 0;
  background: white;
  margin-top: auto;
  height: auto;
  width: 100%;
  tr {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 3.2rem;
    width: 100%;
  }
  th {
  }
  td {
    text-align: right;
    margin-left: auto;
  }
  hr {
    background: ${p => p.theme.colors.grey};
    margin: 8px 0;
    height: 0.7px;
    width: 100%;
  }
`
const CheckoutButton = styled.button`
  background: ${p => p.theme.colors.primary};
  color: white;
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  text-align: center;

  padding: 2rem;
  margin-top: 2rem;
  width: 100%;
`
