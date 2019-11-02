import React, { useState } from "react"
import styled from "styled-components"
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
      let { token } = await stripe.createToken({
        address_city: city,
        address_country: "JP",
        address_zip: "212121",
      })
      console.log("token", token)

      const headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
      }

      await fetch(
        "https://e-commerce-with-gatsby.netlify.com/.netlify/functions/index",
        {
          headers,
          method: "POST",
          body: JSON.stringify({
            token,
            email: email,
            amount: Math.floor(5000),
            idempotency: uuidv1(),
          }),
        }
      ).then(response => {
        if (response === 200) {
          setStatus("complete")
        } else {
          response.text().then(text => console.log(text))
          throw new Error("Network response was not ok.")
        }
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
