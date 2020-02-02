const axios = require("axios")

exports.handler = async event => {
  console.log()
  const query = event.queryStringParameters
  const name = query.name || "Yuma"

  console.log(event, event)
  return {
    statusCode: 200,
    body: `welcom ${name}`,
  }
}
