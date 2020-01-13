require("dotenv").config()

const log = (message, section) =>
  console.log(`\n\u001B[36m${message} \u001B[4m${section}\u001B[0m\u001B[0m\n`)

const path = require("path")

const templatesDirectory = path.resolve(__dirname, "../../src/templates")
const templates = {
  product: path.resolve(templatesDirectory, "product.template.js"),
}

const query = require("../data/data.query")

function slugify(string, base) {
  const slug = string
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036F]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "")

  return slug.replace(/\/\/+/g, "/")
}

module.exports = async ({ actions: { createPage }, graphql }) => {
  const basePath = "/"
  let allProducts

  try {
    log("Querying products source from Contentful")
    const result = await graphql(query.contentful.products)
    allProducts = result.data.products.nodes
  } catch (error) {
    console.error(error)
  }

  // Create product page
  log("Creating", "Product Page")
  allProducts.forEach(product => {
    createPage({
      path: `/products/${product.name}`,
      component: templates.product,
      context: {
        product,
        basePath,
        id: product.id,
      },
    })
  })
}
