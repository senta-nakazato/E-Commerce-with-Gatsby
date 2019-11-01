import React from "react"
import { Elements, StripeProvider } from "react-stripe-elements"

// import CheckoutForm from "@components/Checkout/Checkout.Form"
import InjectedCheckoutForm from "@components/Checkout/Checkout.Form"

class CheckoutContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: false,
      backdrop: true,
    }
    this.toggle = this.toggle.bind(this)
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    })
  }

  render() {
    return (
      <>
        <StripeProvider apiKey="pk_test_1Y4LgFWhiJPEsivDjXsJA8cJ00tdvDj2SX">
          <Elements>
            {/* <CheckoutForm /> */}
            <InjectedCheckoutForm />
          </Elements>
        </StripeProvider>
      </>
    )
  }
}

export default CheckoutContainer
