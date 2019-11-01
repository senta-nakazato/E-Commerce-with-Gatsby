import React from "react"
import MyStoreCheckout from "@components/MyStoreCheckout"
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
      <Col>
        <Button color="danger" onClick={this.toggle}>
          Purchase
        </Button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          backdrop={this.state.backdrop}
        >
          <ModalHeader toggle={this.toggle}>Checkout</ModalHeader>
          <ModalBody>
            <StripeProvider apiKey="pk_test_1Y4LgFWhiJPEsivDjXsJA8cJ00tdvDj2SX">
              <CheckoutComponent />
            </StripeProvider>
          </ModalBody>
        </Modal>
      </Col>
    )
  }
}

export default CheckoutModal
