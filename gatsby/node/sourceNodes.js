module.exports = ({ actions }) => {
  actions.createTypes(`
    type Product implements Node {
      id: ID!
      name: String!
      price: Int!s
      colors: [ContentfulColor]
      images: File @fileByRelativePath
    }
  `)
}
