require("dotenv").config()

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY),
  headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
  }

module.exports.handler = async (event, context) => {
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
  console.log(data)

  if (!data.token || !data.amount || !data.idempotency) {
    console.error("Required information is missing.")

    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({
        status: "missing information",
      }),
    }
  }

  // stripe payment processing begins here
  try {
    await stripe.customers
      .create({
        email: data.email,
        source: data.token,
      })
      .then(customer => {
        console.log(
          `starting the charges, amt: ${data.amount}, email: ${data.email}`
        )
        return stripe.charges
          .create(
            {
              currency: "usd",
              amount: data.amount,
              receipt_email: data.email,
              customer: customer.id,
              description: "Sample Charge",
            },
            {
              idempotency_key: data.idempotency,
            }
          )
          .then(result => {
            console.log(`Charge created: ${result}`)
          })
      })

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        status: "it works! beep boop",
      }),
    }
  } catch (err) {
    console.log(err)

    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({
        status: err,
      }),
    }
  }
}
