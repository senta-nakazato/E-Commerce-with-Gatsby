import React from "react"
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap"
import Link from "gatsby-link"

class Success extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: true,
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
      <div>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
          backdrop={this.state.backdrop}
        >
          <ModalHeader>Success!!</ModalHeader>
          <ModalBody>
            <p>
              Thank you for signing up for one of our programs. A receipt will
              be emailed to you shortly. Click the button below to close this
              message.
            </p>
          </ModalBody>
          <ModalFooter>
            <Link to="/">
              <Button color="danger" onClick={this.toggle}>
                Close
              </Button>
            </Link>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

export default Success
