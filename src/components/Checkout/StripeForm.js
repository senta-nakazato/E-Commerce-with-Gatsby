import React, { useEffect } from "react"
import { css } from "@emotion/core"
import styled from "@emotion/styled"

const StripeForm = () => {
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
  return (
    <Container>
      <Form>
        <>
          <Row>
            <Field quarterWidth>
              <Input
                id="zip"
                className="empty"
                type="text"
                placeholder="94107"
                required=""
                autocomplete="907-9898"
              />
              <Label for="zip">ZIP</Label>
              <BaseLine />
            </Field>

            <Field quarterWidth>
              <Input
                id="state"
                className="empty"
                type="text"
                placeholder="沖縄県"
                required=""
                autocomplete="address-level1"
              />
              <Label for="state">State</Label>
              <BaseLine />
            </Field>

            <Field halfWidth>
              <Input
                id="city"
                className="empty"
                type="text"
                placeholder="南城市"
                required=""
                autocomplete="address-level2"
              />
              <Label for="city">City</Label>
              <BaseLine />
            </Field>
          </Row>

          <Row>
            <Field>
              <Input
                id="address"
                className="empty"
                type="text"
                placeholder="津波古112-2"
                required=""
                autocomplete="address-line1"
              />
              <Label for="address">Address</Label>
              <BaseLine />
            </Field>
          </Row>
        </>

        <Row>
          <Field>
            <Input id="card-number" className="empty" />
            <Label for="card-number">Card number</Label>
            <BaseLine />
          </Field>
        </Row>

        <Row>
          <Field halfWidth>
            <Input id="card-expiry" className="empty" />
            <Label for="card-expiry">Expiration</Label>
            <BaseLine />
          </Field>
          <Field halfWidth>
            <Input id="card-cvc" className="empty" />
            <Label for="card-cvc">CVC</Label>
            <BaseLine />
          </Field>
        </Row>

        <Button type="submit">Pay $25</Button>
      </Form>
    </Container>
  )
}

export default StripeForm

const appearance = css`
  appearance: none;
  outline: none;
  border-style: none;
`

const Label = styled.label`
  position: absolute;
  width: 100%;
  left: 0;
  bottom: 8px;
  color: #cfd7df;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  transform-origin: 0 50%;
  cursor: text;
  pointer-events: none;
  transition-property: color, transform;
  transition-duration: 0.3s;
  transition-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);
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
  background-color: #fff;
  font-family: Source Code Pro, Consolas, Menlo, monospace;
  font-size: 16px;
  font-weight: 500;
`

const Row = styled.div`
  display: flex;
  margin: 0 5px 10px;
`

const Field = styled.div`
  position: relative;
  width: 100%;
  height: 50px;
  margin: 0 10px;

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
  position: absolute;
  width: 100%;
  left: 0;
  bottom: 0;
  padding-bottom: 7px;
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
  background-color: #24b47e;
  border-radius: 4px;
  color: #fff;
  text-transform: uppercase;
  font-weight: 600;
  cursor: pointer;
  ${appearance}
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
`
