import React from "react"
import CheckoutComponent from "@components/CheckoutComponent"
import { StripeProvider } from "react-stripe-elements"
import { Col, Modal, ModalHeader, ModalBody, Button } from "reactstrap"

class CheckoutModal extends React.Component {
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
          <CheckoutComponent />
        </StripeProvider>
      </>
    )
  }
}

export default CheckoutModal
