import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { css } from "@emotion/core"
import styled from "@emotion/styled"
import { CardElement, injectStripe } from "react-stripe-elements"
import uuidv1 from "uuid/v1"
import media from "@styles/media"

const CheckoutForm = ({ stripe, toggleOverlay }) => {
  const [address, setAddress] = useState("")
  const [address2, setAddress2] = useState("")
  const [city, setCity] = useState("")
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [prefecture, setPrefecture] = useState("")
  const [postalcode, setPostalcode] = useState("")
  const [status, setStatus] = useState("")

  const products = useSelector(state => state.products)
  let totalAmount = 0
  if (products.length !== 0) {
    products.forEach(p => {
      totalAmount += p.quantity * p.price
    })
  }

  const createOptions = () => {
    return {
      style: {
        base: {
          fontSize: "16px",
          color: "black",
          letterSpacing: "0.025em",
          fontFamily: "Source Code Pro, monospace",
          "::placeholder": {
            color: "#cecece",
          },
          ":focus": {
            color: "black",
          },
          padding: "0",
        },
        invalid: {
          color: "rgb(202, 0, 0)",
        },
      },
    }
  }

  const handlePostcode = async event => {
    setPostalcode(event.target.value)

    try {
      const headers = {
        apikey: process.env.GATSBY_POSTCODE_API_KEY,
      }

      await fetch(
        `https://apis.postcode-jp.com/api/v3/postcodes?postcode=${postalcode}&startWith=true&normalize=true&general=true&office=true`,
        {
          method: "GET",
          headers,
        }
      ).then(response => {
        if (response.status === 200) {
          response.text().then(text => {
            const addressData = JSON.parse(text).data[0]
            if (JSON.parse(text).size > 0) {
              setCity(addressData.city)
              setPrefecture(addressData.pref)
              return setAddress(addressData.town)
            } else {
              setCity("")
              setPrefecture("")
              setAddress("")
            }
          })
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

  const handleSubmit = async event => {
    event.preventDefault()
    // toggleOverlay()
    setStatus("submitting")

    try {
      let { token } = await stripe.createToken({
        address_city: city,
        address_country: "JP",
        address_line1: address,
        address_line2: address2,
        address_state: prefecture,
        address_zip: postalcode,
        country: "JP",
      })

      const headers = {
        "Content-Type": "application/json",
      }

      await fetch("/.netlify/functions/checkout", {
        method: "POST",
        body: JSON.stringify({
          token,
          name: name,
          email: email,
          amount: Math.floor(totalAmount),
          token: "tok_visa", //testing token, later we would use real token
          idempotency: uuidv1(),
        }),
        headers,
      }).then(response => {
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
  }, [postalcode])

  return (
    <Container>
      <Form>
        <FieldHeading>お客様情報</FieldHeading>
        <Field>
          <Row>
            <Label htmlFor="name">お名前</Label>
            <Input
              id="name"
              type="text"
              placeholder="渡邉　康太郎"
              onChange={event => setName(event.target.value)}
            />
          </Row>
          <Row>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="text"
              placeholder="test@gmail.com"
              onChange={event => setEmail(event.target.value)}
            />
          </Row>
        </Field>

        <FieldHeading>お届け先住所</FieldHeading>
        <Field>
          <Row>
            <Label htmlFor="postalcode">郵便番号</Label>
            <Input
              id="postalcode"
              type="text"
              placeholder="112-3200"
              onChange={handlePostcode}
              // onChange={event => setPostalcode(event.target.value)}
            />
          </Row>
          <Row>
            <Label htmlFor="prefecture">都道府県</Label>
            <Input
              id="prefecture"
              type="text"
              placeholder="滋賀県"
              value={prefecture}
              onChange={event => setPrefecture(event.target.value)}
            />
          </Row>
          <Row>
            <Label htmlFor="city">市区町村</Label>
            <Input
              id="city"
              type="text"
              placeholder="南城市"
              value={city}
              onChange={event => setCity(event.target.value)}
            />
          </Row>
          <Row>
            <Label htmlFor="sddress">住所</Label>
            <Input
              id="address"
              type="text"
              placeholder="津波古112-2"
              value={address}
              onChange={event => setAddress(event.target.value)}
            />
          </Row>
          <Row>
            <Label htmlFor="address2">
              建物名・
              <br />
              部屋番号
            </Label>
            <Input
              id="address2"
              type="text"
              placeholder="レオパレスGatsby 202"
              onChange={event => setAddress2(event.target.value)}
            />
          </Row>
        </Field>

        <FieldHeading>お支払い情報</FieldHeading>
        <Field>
          <Row>
            <CardElement {...createOptions()} id="card" className="empty" />
          </Row>
        </Field>

        <CheckoutButton
          type="submit"
          disabled={status === "submitting"}
          onClick={handleSubmit}
        >
          {status === "submitting" ? "送信中" : "注文する"}
        </CheckoutButton>
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
  color: grey;
  min-width: 70px;
  overflow: hidden;
  padding: 11px 0;
  text-overflow: ellipsis;
  width: 30%;
  white-space: pre-wrap;
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
  display: flex;
  align-items: center;
  margin-left: 15px;
  & + & {
    border-top: 1px solid rgb(234, 234, 238);
  }
`

const Field = styled.fieldset`
  border-style: none;
  background: white;
  margin-bottom: 3.2rem;
  padding: 0;
  /* box-shadow: 0 6px 9px rgba(50, 50, 93, 0.06), 0 2px 5px rgba(0, 0, 0, 0.08),
    inset 0 1px 0 #829fff; */

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

const FieldHeading = styled.h2`
  color: ${p => p.theme.colors.font};
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 2px;
  margin-bottom: 8px;
`

const Input = styled.input`
  width: 100%;
  left: 0;
  bottom: 0;
  color: ${p => p.theme.colors.font};
  background-color: white;
  ${appearance}

  &::-webkit-input-placeholder {
    color: #cecece;
    transition: color 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
  }

  &.focused::-webkit-input-placeholder,
  &.focused::-moz-placeholder,
  &:not(.empty)::-moz-placeholder {
    color: #cecece;
  }

  &.focused,
  &::not(.empty) {
    opacity: 1;
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
    background-color: red;
  }

  &.focused.invalid + ${Label} + ${BaseLine} {
    background-color: green;
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

  /* .form .StripeElement--webkit-autofill {
    background: transparent !important;
  }

  .StripeElement--webkit-autofill {
    background: transparent !important;
  } */

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

  input:-internal-autofill-selected {
    background: white !important;
  }
  /* 
  input:-internal-autofill-selected {
    background: red !important;
  }import { useSelector } from 'react-redux';


  input::placeholder {
    color: green;
  }

  input:focus,
  .StripeElement--focus {
    box-shadow: rgba(50, 50, 93, 0.109804) 0px 4px 6px,
      rgba(0, 0, 0, 0.0784314) 0px 1px 3px;
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
  } */
  /* 
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
  } */
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
