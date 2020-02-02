import React from "react"
import { useSelector } from "react-redux"
import GatsbyImage from "gatsby-image"
import styled from "@emotion/styled"

import { formatPrice } from "@utils"

const CheckoutReview = () => {
  const products = useSelector(state => state.products)
  let totalAmount = 0
  if (products.length !== 0) {
    products.forEach(p => {
      totalAmount += p.quantity * p.price
    })
  }

  return (
    <Section>
      <Frame>
        <ProductList>
          {products.map((product, index) => (
            <ProductItem product={product} index={index} />
          ))}
        </ProductList>
        <Summary>
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
          <tr>
            <th>Total</th>
            <td className="total">{formatPrice(totalAmount)}</td>
          </tr>
        </Summary>
      </Frame>
    </Section>
  )
}

export default CheckoutReview

const ProductItem = ({ product }) => {
  const quantity = product.quantity ? product.quantity : "1"
  const price = product.price
  const total = quantity * price

  return (
    <Row key={product.id}>
      <ImageContainer>
        <GatsbyImage fluid={product.images[0].small} />
      </ImageContainer>
      <Info>
        <Left>
          <Name>{product.name}</Name>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Quantity>{quantity}</Quantity>
            <span style={{ padding: "0 4px" }}>×</span>
            <Price>{formatPrice(price)}</Price>
          </div>
        </Left>
        <Right>
          <Total>{formatPrice(total)}</Total>
        </Right>
      </Info>
    </Row>
  )
}

const Section = styled.section`
  background: rgb(250, 245, 243);
  flex-basis: 50%;
  padding: 4rem;
  padding-bottom: 6rem;
  margin: 0 auto;
`

const Frame = styled.div`
  height: 100%;
  width: 80%;
  min-width: 34rem;
  margin: 0 auto;
  position: relative;
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
  height: 6rem;
  width: 6rem;
  margin-right: 2rem;

  .gatsby-image-wrapper {
    height: 6rem;
    width: 6rem;
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

const Total = styled.p`
  font-size: 16px;
  font-weight: 500;
`
const Quantity = styled.p`
  font-size: 14px;
  font-weight: 400;
  text-align: left;
`
const Price = styled.p`
  font-size: 14px;
  font-weight: 400;
`
const Summary = styled.table`
  position: absolute;
  bottom: 0;
  background: rgb(250, 245, 243);
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
  .total {
    font-size: 2rem;
    font-weight: 600;
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
