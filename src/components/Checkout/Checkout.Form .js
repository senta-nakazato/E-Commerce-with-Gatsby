import React from "react"
import { CardElement, injectStripe } from "react-stripe-elements"

const CheckoutForm = () => {
  const [status, setStatus] = useState("default")

  const submit = async event => {
    event.preventDefault()

    setStatus("submitting")

    try {
      let { token } = await stripe.createToken({ name: "Name" })

      let response = await fetch(
        "https://e-commerce-with-gatsby.netlify.com/.netlify/functions/index",
        {
          method: "POST",
          body: JSON.stringfy({
            amount: 50,
            token: token.id,
          }),
        }
      )

      if (response.ok) {
        setStatus("complete")
      } else {
        throw new Error("Network response was not ok.")
      }
    } catch (error) {
      setStatus("error")
    }
  }
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

  return (
    <form onSubmit={this.handleSubmit} id="form-css" className="w-100">
      <CardElement />
      <button className="w-100 h4">Pay $50</button>
    </form>
  )
}

const InjectedCheckoutForm = injectStripe(CheckoutForm)

export default InjectedCheckoutForm
