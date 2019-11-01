exports.handler = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Hi there Tacos",
      event,
    }),
  }
}

// require("dotenv").config()
// var stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

// exports.handler = (event, context, callback) => {
//   const requestBody = JSON.parse(event.body)
//   const token = requestBody.token.id
//   const amount = requestBody.charge.amount
//   const currency = requestBody.charge.currency
//   const email = requestBody.charge.email

//   return stripe.charges
//     .create({
//       // Create Stripe charge with token
//       amount,
//       currency,
//       receipt_email: email,
//       description: "Serverless Stripe Test charge",
//       source: token,
//     })
//     .then(charge => {
//       // Success response
//       const response = {
//         statusCode: 200,
//         body: JSON.stringify({
//           message: `Charge processed succesfully!`,
//           charge,
//         }),
//       }
//       callback(null, response)
//     })
//     .catch(err => {
//       // Error response
//       const response = {
//         statusCode: 500,
//         body: JSON.stringify({
//           error: err.message,
//         }),
//       }
//       callback(null, response)
//     })
// }
