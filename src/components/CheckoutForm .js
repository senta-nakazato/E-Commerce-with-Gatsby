import React from "react"
import { CardElement, injectStripe } from "react-stripe-elements"
import axios from "axios"
// import AddressSection from "./AddressSection"
// import CardSection from "./CardSection"
// import Success from "./Success"

class CheckoutForm extends React.Component {
  constructor(props) {
    super(props)
    // this.state = {
    //   name: undefined,
    //   email: undefined,
    //   address: undefined,
    //   city: undefined,
    //   state: undefined,
    //   program: undefined,
    //   schedule: undefined,
    //   price: undefined,
    //   success: false,
    //   number: undefined,
    // }
    // this.handleChnage = this.handleChnage.bind(this)
    // this.handleSubmit = this.handleSubmit.bind(this)
  }

  // handleChnage = event => {
  //   const name = event.target.name
  //   this.setState({ [name]: event.target.value })
  // }

  // handleSubmit = event => {
  //   event.preventDefault()

  //   this.props.stripe
  //     .createToken({
  //       name: this.state.name,
  //       address_city: this.state.city,
  //       address_line1: this.state.address,
  //       address_state: this.state.state,
  //       address_country: "US",
  //     })
  //     .then(({ token }) => {
  //       const charge = JSON.stringify({
  //         token,
  //         charge: {
  //           amount: 50,
  //           currency: "usd",
  //           email: this.state.email,
  //         },
  //       })
  //       axios
  //         .post(
  //           "https://e-commerce-with-gatsby.netlify.com/.netlify/functions/index",
  //           charge
  //         )
  //         .catch(function(error) {
  //           console.log(error)
  //         })
  //     })
  // }

  render() {
    return (
      <form onSubmit={this.handleSubmit} id="form-css" className="w-100">
        {/* {this.state.success === false ? (
          <div>
            <AddressSection
              handleChange={this.handleChange}
              schedule={this.state.schedule}
            />
            <CardSection />
          </div>
        ) : (
          <Success />
        )} */}
        <CardElement />
        {/* <button className="w-100 h4">Pay $50</button> */}
      </form>
    )
  }
}

export default injectStripe(CheckoutForm)
