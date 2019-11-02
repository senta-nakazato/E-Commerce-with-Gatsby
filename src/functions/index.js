// exports.handler = async (event, context) => {
//   return {
//     statusCode: 200,
//     body: JSON.stringify({
//       message: "Hi there Tacos",
//       event,
//     }),
//   }
// }

require("dotenv").config()
let stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
}

exports.handler = async (event, callback) => {
  if (!event.body || event.httpMethod !== "POST") {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({
        status: "invalid http method",
      }),
    }
  }

  const data = JSON.parse(event.body)

  if (!data.token.id || !data.charge.amount || !data.charge.idempotency) {
    console.log("event", event.body)

    console.error("Required information is missing.")

    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({
        status: "missing information",
      }),
    }
  }

  try {
    await stripe.customers
      .create({
        email: data.charge.email,
        source: data.token.id,
      })
      .then(customer => {
        console.log(
          `starting the charges, amount: ${data.charge.amount}, email: ${data.charge.email}`
        )
        return stripe.charges
          .create(
            {
              currency: "jpy",
              amount: data.charge.amount,
              receipt_email: data.charge.email,
              customer: customer.id,
              description: "Sample Charge",
            },
            {
              idempotency_key: data.charge.idempotency,
            }
          )
          .then(result => {
            console.log(`Charge created: ${result}`)
          })
          .then(charge => {
            const response = {
              statusCode: 200,
              headers,
              body: JSON.stringify({
                message: `Charge processed succesfully!`,
                charge,
              }),
            }
            callback(null, response)
          })
      })
  } catch (error) {
    console.log(error)

    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({
        status: error,
      }),
    }
  }
}
