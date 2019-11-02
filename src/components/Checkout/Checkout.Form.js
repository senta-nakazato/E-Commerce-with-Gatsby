import React, { useState } from "react"
import styled from "styled-components"
import axios from "axios"
import {
  CardElement,
  injectStripe,
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
} from "react-stripe-elements"
import uuidv1 from "uuid/v1"

const CheckoutForm = ({ stripe }) => {
  const [status, setStatus] = useState("default")
  const [email, setEmail] = useState("")
  const [prefecture, setPrefecture] = useState("")
  const [city, setCity] = useState("")
  const [postalCode, setPostalCode] = useState("")

  const handleSubmit = async event => {
    event.preventDefault()

    try {
      await stripe
        .createToken({
          address_city: city,
          address_country: "JP",
          address_zip: "212121",
        })
        .then(({ token }) => {
          const charge = JSON.stringify({
            token,
            charge: {
              amount: Math.floor(5000),
              currency: "jpy",
              email: email,
              idempotency: uuidv1(),
            },
          })
          axios
            .post(
              "https://e-commerce-with-gatsby.netlify.com/.netlify/functions/index",
              charge
            )
            .catch(function(error) {
              console.log(error)
            })
        })
    } catch (error) {
      setStatus("error")
      console.log(error)
    }
  }

  return (
    <form className="CheckoutForm" onSubmit={handleSubmit}>
      <h4>Would you like to complete the purchase?</h4>
      {/* <CardNumberElement /> */}
      {/* <CardExpiryElement /> */}
      {/* <CardCVCElement /> */}
      <Input
        name="email"
        type="email"
        onChange={event => setEmail(event.target.value)}
        placeholder="name@example.com"
      />
      {/* <Input
        name="postalCode"
        type="text"
        onChange={event => setPostalCode(event.target.value)}
        placeholder="name@example.com"
      /> */}
      <Input
        name="city"
        type="text"
        onChange={event => setCity(event.target.value)}
        placeholder="city"
      />
      <CardElement />
      <button
        className="CheckoutForm-button"
        type="submit"
        disabled={status === "submitting"}
      >
        {status === "submitting" ? "Submitting" : "Submit Order"}
      </button>
    </form>
  )
}

export default injectStripe(CheckoutForm)

const Input = styled.input``
