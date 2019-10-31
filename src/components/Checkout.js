import React, { useEffect, useState } from "react"
import styled from "styled-components"

const Checkout = ({ id }) => {
  const [stripe, setStripe] = useState(
    window.Stripe("pk_test_1Y4LgFWhiJPEsivDjXsJA8cJ00tdvDj2SX")
  )

  useEffect(() => {}, [])

  const redirectToCheckout = async event => {
    event.preventDefault()
    const error = await stripe.redirectToCheckout({
      items: [{ sku: `${id}`, quantity: 1 }],
      successUrl: `http://localhost:8000/success/`,
      cancelUrl: `http://localhost:8000/`,
    })

    if (error) {
      console.warn("Error:", error)
    }
  }

  return <Button onClick={event => redirectToCheckout(event)}>購入する</Button>
}

export default Checkout

const Button = styled.div`
  text-align: center;
  color: #fff;
  outline: none;
  padding: 12px 60px;
  box-shadow: 2px 5px 10px rgba(0, 0, 0, 0.1);
  background: rebeccapurple;
  border-radius: 6px;
  letter-spacing: 1.5px;
`
