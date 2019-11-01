import React from "react"
import { CardElement } from "react-stripe-elements"
import { Row, Col, Input } from "reactstrap"

class AddressSection extends React.Component {
  render() {
    return (
      <div>
        <Row>
          <Col xs="6" sm="6" md="6">
            <label className="w-100">
              Name
              <input
                className="w-100"
                type="text"
                name="name"
                onChange={this.props.handleChange}
                placeholder="Jane Doe"
                required
              />
            </label>
          </Col>
          <Col xs="6" sm="6" md="6">
            <label className="w-100">
              Email
              <input
                className="w-100"
                type="email"
                name="email"
                onChange={this.props.handleChange}
                placeholder="jane.doe@example.com"
                required
              />
            </label>
          </Col>
        </Row>
        <Row>
          <Col xs="6" sm="6" md="6">
            <label className="w-100">
              Address
              <input
                className="w-100"
                type="text"
                name="address"
                onChange={this.props.handleChange}
                placeholder="100 Legends Way"
                required
              />
            </label>
          </Col>
        </Row>
        <Row>
          <Col xs="5" sm="5" md="6">
            <label className="w-100">
              Cell
              <input
                className="w-100"
                type="tel"
                name="number"
                onChange={this.props.handleChange}
                placeholder="781-111-1111"
                required
              />
            </label>
          </Col>
          <Col xs="4" sm="4" md="6">
            <label className="w-100">
              City
              <input
                className="w-100"
                type="text"
                name="city"
                onChange={this.props.handleChange}
                placeholder="Boston"
                required
              />
            </label>
          </Col>
          <Col xs="3" sm="3" md="6">
            <label className="w-100">
              State
              <input
                className="w-100"
                type="text"
                name="state"
                onChange={this.props.handleChange}
                placeholder="MA"
                required
              />
            </label>
          </Col>
        </Row>
      </div>
    )
  }
}

export default AddressSection
