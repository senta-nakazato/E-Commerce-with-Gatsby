import React, { useEffect, useState } from "react"
import styled from "@emotion/styled"

const Checkout = ({ sku }) => {
  const [stripe, setStripe] = useState()

  useEffect(() => {
    setStripe(window.Stripe("pk_test_1Y4LgFWhiJPEsivDjXsJA8cJ00tdvDj2SX"))
  }, [])

  const redirectToCheckout = async (event, sku) => {
    event.preventDefault()
    const error = await stripe.redirectToCheckout({
      items: [{ sku: sku, quantity: 1 }],
      successUrl: `https://e-commerce-with-gatsby.netlify.com/success`,
      cancelUrl: `https://e-commerce-with-gatsby.netlify.com/book`,
    })

    if (error) {
      console.warn("Error:", error)
    }
  }

  return (
    <Button onClick={event => redirectToCheckout(event, sku.id)}>
      購入する
    </Button>
  )
}

export default Checkout

const Button = styled.button`
  text-align: center;
  color: #fff;
  outline: none;
  padding: 12px 60px;
  box-shadow: 2px 5px 10px rgba(0, 0, 0, 0.1);
  background: rebeccapurple;
  border-radius: 6px;
  letter-spacing: 1.5px;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`
