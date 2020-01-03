import React, { useEffect, useState } from "react"
import { css } from "@emotion/core"
import styled from "@emotion/styled"
import {
  CardElement,
  injectStripe,
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
} from "react-stripe-elements"
import uuidv1 from "uuid/v1"
import media from "@styles/media"

const CheckoutForm = ({ stripe }) => {
  const [address, setAddress] = useState("default")
  const [city, setCity] = useState("")
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [prefecture, setPrefecture] = useState("")
  const [postalCode, setPostalCode] = useState("")
  const [status, setStatus] = useState("default")

  const handleBlur = () => {
    console.log("[blur]")
  }
  const handleChange = change => {
    console.log("[change]", change)
  }
  const handleClick = () => {
    console.log("[click]")
  }
  const handleFocus = () => {
    console.log("[focus]")
  }
  const handleReady = () => {
    console.log("[ready]")
  }

  const createOptions = () => {
    return {
      style: {
        base: {
          fontSize: "16px",
          color: "yellowgreen",
          letterSpacing: "0.025em",
          fontFamily: "Source Code Pro, monospace",
          "::placeholder": {
            color: "white",
          },
          ":focus": {
            color: "purple",
          },
          padding: "0",
        },
        invalid: {
          color: "#9e2146",
        },
      },
    }
  }

  useEffect(() => {
    const inputs = document.querySelectorAll("input")
    inputs.forEach(input => {
      input.addEventListener("focus", () => {
        input.classList.add("focused")
      })
      input.addEventListener("blur", () => {
        input.classList.remove("focused")
      })
      input.addEventListener("keyup", () => {
        if (input.value.length === 0) {
          input.classList.add("empty")
        } else {
          input.classList.remove("empty")
        }
      })
    })

    return () => {}
  }, [])

  const handleSubmit = async event => {
    event.preventDefault()
    setStatus("submitting")

    try {
      let { token } = await stripe.createToken({
        // address_city: city,
        address_country: "JP",
        address_zip: "212121",
      })

      const headers = {
        "Content-Type": "application/json",
      }

      await fetch(
        "https://e-commerce-with-gatsby.netlify.com/.netlify/functions/charge",
        {
          method: "POST",
          body: JSON.stringify(
            {
              token,
              name: name,
              email: email,
              amount: Math.floor(5000),
              token: "tok_visa",
              idempotency: uuidv1(),
            },
            headers
          ),
        }
      ).then(response => {
        if (response === 200) {
          setStatus("complete")
          console.log("Purchase Complete!")
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
    <Container>
      <Form onSubmit={() => handleSubmit}>
        <h4>Would you like to complete the purchase?</h4>
        <Field>
          <Row>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="本田飛鳥"
              onChange={event => console.log(event.target.value)}
            />
          </Row>
          <Row>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="text"
              placeholder="test@gmail.com"
              onChange={event => console.log(event.target.value)}
            />
          </Row>
        </Field>

        {/* <Field>
          <Row>
            <Label htmlFor="PostalCode">PostalCode</Label>
            <Input id="PostalCode" type="text" placeholder="112-3200" />
          </Row>
          <Row>
            <Label htmlFor="Prefecture">Prefecture</Label>
            <Input id="Prefecture" type="text" placeholder="滋賀県" />
          </Row>
          <Row>
            <Label htmlFor="City">City</Label>
            <Input id="City" type="text" placeholder="南城市" />
          </Row>
          <Row>
            <Label htmlFor="Address">Address</Label>
            <Input id="Address" type="text" placeholder="津波古112-2" />
          </Row>
        </Field> */}

        <Field>
          <Row>
            <CardElement
              onBlur={handleBlur}
              onChange={handleChange}
              onFocus={handleFocus}
              onReady={handleReady}
              {...createOptions()}
              id="card"
              className="empty"
            />
          </Row>
        </Field>

        <Button type="submit" disabled={status === "submitting"}>
          {status === "submitting" ? "Submitting" : "Submit Order"} $25
        </Button>
      </Form>
    </Container>
  )
}

export default injectStripe(CheckoutForm)

const appearance = css`
  appearance: none;
  outline: none;
  border-style: none;
`

const Label = styled.label`
  width: 15%;
  min-width: 70px;
  padding: 11px 0;
  color: #c4f0ff;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const BaseLine = styled.div`
  position: absolute;
  width: 100%;
  height: 1px;
  left: 0;
  bottom: 0;
  background-color: #cfd7df;
  transition: background-color 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
`

const Form = styled.form`
  font-family: Roboto, Open Sans, Segoe UI, sans-serif;
  font-weight: 500;
`

const Row = styled.div`
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  margin-left: 15px;
  & + & {
    border-top: 1px solid #819efc;
  }
`

const Field = styled.fieldset`
  margin-bottom: 2rem;
  padding: 0;
  border-style: none;
  background-color: #7795f8;
  box-shadow: 0 6px 9px rgba(50, 50, 93, 0.06), 0 2px 5px rgba(0, 0, 0, 0.08),
    inset 0 1px 0 #829fff;
  border-radius: 4px;

  ${p =>
    p.halfWidth &&
    css`
      width: 50%;
    `}
  ${p =>
    p.quaterWidth &&
    css`
      width: calc(25% - 10px);
    `};
`

const Input = styled.input`
  width: 100%;
  left: 0;
  bottom: 0;
  color: #32325d;
  background-color: transparent;
  ${appearance}

  &.focused::-webkit-input-placeholder,
  &.focused::-moz-placeholder,
  &:not(.empty)::-moz-placeholder {
    color: #cfd7df;
  }

  &.focused,
  &::not(.empty) {
    opacity: 1;
  }

  &:not(.empty)::-webkit-input-placeholder {
    color: #cfd7df;
  }

  &::-webkit-input-placeholder {
    color: transparent;
    transition: color 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
  }

  &:-webkit-autofill {
    -webkit-text-fill-color: #e39f48;
    transition: background-color 100000000s;
    -webkit-animation: 1ms void-animation-out;
  }

  &.StripeElement {
    opacity: 0;
    transition: opacity 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
    will-change: opacity;
  }

  &.focused + ${Label}, &:not(.empty) + ${Label} {
    color: #aab7c4;
    transform: scale(0.85) translateY(-25px);
    cursor: default;
  }

  &.focused + ${Label} {
    color: #24b47e;
  }

  &.invalid + ${Label} {
    color: #ffa27b;
  }

  &.focused + ${Label} + ${BaseLine} {
    background-color: #24b47e;
  }

  &.focused.invalid + ${Label} + ${BaseLine} {
    background-color: #e25950;
  }
`

const Button = styled.button`
  display: block;
  width: calc(100% - 30px);
  height: 40px;
  margin: 40px 15px 0;
  background-color: #f6a4eb;
  box-shadow: 0 6px 9px rgba(50, 50, 93, 0.06), 0 2px 5px rgba(0, 0, 0, 0.08),
    inset 0 1px 0 #ffb9f6;
  border-radius: 4px;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  ${appearance}

  &:hover {
    color: #fff;
    cursor: pointer;
    background-color: #7795f8;
    transform: translateY(-1px);
    box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);
  }
`

const Container = styled.div`
  color: #cfd7df;
  cursor: text;
  overflow: hidden;
  width: 100%;
  white-space: nowrap;
  text-overflow: ellipsis;
  transform-origin: 0 50%;
  transition-property: color, transform;
  transition-duration: 0.3s;
  transition-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);

  .form .StripeElement--webkit-autofill {
    background: transparent !important;
  }

  .StripeElement--webkit-autofill {
    background: transparent !important;
  }

  .StripeElement {
    width: 100%;
    padding: 12px 10px 12px 0;
  }

  input.StripeElement {
    display: block;
    margin: 10px 0 20px 0;
    max-width: 500px;
    padding: 10px 14px;
    font-family: "Source Code Pro", monospace;
    box-shadow: rgba(50, 50, 93, 0.14902) 0px 1px 3px,
      rgba(0, 0, 0, 0.0196078) 0px 1px 0px;
    border: 0;
    outline: 0;
    border-radius: 4px;
    background: white;

    font-size: 2rem !important;
  }

  input::placeholder {
    color: green;
  }

  input:focus,
  .StripeElement--focus {
    /* box-shadow: rgba(50, 50, 93, 0.109804) 0px 4px 6px,
      rgba(0, 0, 0, 0.0784314) 0px 1px 3px; */
    -webkit-transition: all 150ms ease;
    transition: all 150ms ease;
  }

  .StripeElement.IdealBankElement,
  .StripeElement.PaymentRequestButton {
    padding: 0;
  }

  form button:active {
    background-color: #d782d9;
    box-shadow: 0 6px 9px rgba(50, 50, 93, 0.06), 0 2px 5px rgba(0, 0, 0, 0.08),
      inset 0 1px 0 #e298d8;
  }

  form .error svg .base {
    fill: #fff;
  }

  form .error svg .glyph {
    fill: #6772e5;
  }

  form .error .message {
    color: #fff;
  }

  form .success .icon .border {
    stroke: #87bbfd;
  }

  form .success .icon .checkmark {
    stroke: #fff;
  }

  form .success .title {
    color: #fff;
  }

  form .success .message {
    color: #9cdbff;
  }

  form .success .reset path {
    fill: #fff;
  }
`
